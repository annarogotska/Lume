// Supabase Edge Function: stores a contact lead and emails the studio (via Resend).
// Deploy:  supabase functions deploy contact
// Secrets: supabase secrets set RESEND_API_KEY=... CONTACT_TO_EMAIL=you@domain.com
//          (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected automatically.)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://nuvel.studio",
  "https://www.nuvel.studio",
  "http://localhost:5173",
];

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const URL_RE = /https?:\/\//i;

// Web3Forms fallback — used only while RESEND_API_KEY isn't configured yet,
// so email delivery never silently breaks. Drop this once Resend is confirmed working.
const WEB3FORMS_KEY = "ebf50d7f-3ccd-4013-86bb-1046a208dcf4";

async function sendViaWeb3Forms(name: string, email: string, type: string, budget: string, message: string) {
  const r = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      name,
      email,
      subject: `New project brief — ${name} (${type ?? "—"})`,
      message: [`Type: ${type}`, budget ? `Budget: ${budget}` : null, message ? `\n${message}` : null]
        .filter(Boolean)
        .join("\n"),
    }),
  });
  const data = await r.json();
  if (!data.success) throw new Error(data.message ?? "Web3Forms error");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    // Origin/Referer check — filters requests that don't even try to look like
    // they came from the site. Not spoof-proof, but cuts the simplest bots for free.
    const origin = req.headers.get("origin") ?? req.headers.get("referer") ?? "";
    if (!ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) return json({ error: "Forbidden" }, 403);

    const { name, email, type, budget, message, honeypot, loadedAt, turnstileToken } = await req.json();

    // --- Bot filters (silent — same signals the client already checks, enforced again server-side
    // so a request that skips the browser entirely can't just skip these too). ---
    if (honeypot) return json({ ok: true });
    if (typeof loadedAt !== "number" || Date.now() - loadedAt < 3000) return json({ ok: true });

    // Cloudflare Turnstile — only enforced once TURNSTILE_SECRET_KEY is set, so the
    // form keeps working before it's configured (fail-open until then, not after).
    const TURNSTILE_SECRET = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (TURNSTILE_SECRET) {
      if (!turnstileToken) return json({ ok: true });
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
      const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: turnstileToken, ...(ip ? { remoteip: ip } : {}) }),
      });
      const { success } = await verify.json();
      if (!success) return json({ ok: true });
    }

    if (!name?.trim() || !email?.trim()) return json({ error: "Name and email are required." }, 400);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "Please enter a valid email." }, 400);
    if (URL_RE.test(name)) return json({ ok: true }); // link dropped in the name field — spam pattern
    if (typeof message === "string" && message.trim().length > 0 && message.trim().length < 10) {
      return json({ error: "Please tell us a bit more about your project." }, 400);
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const userAgent = req.headers.get("user-agent") ?? null;

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Rate limit — no more than 5 submissions from the same IP in 15 minutes.
    // Reuses the leads table already being written to, so it costs nothing extra.
    if (ip) {
      const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
      const { count } = await admin
        .from("contacts")
        .select("id", { count: "exact", head: true })
        .eq("ip", ip)
        .gte("created_at", since);
      if ((count ?? 0) >= 5) return json({ ok: true });
    }

    // Store the lead (service role bypasses RLS — clients never touch the table directly).
    const { error: dbErr } = await admin.from("contacts").insert({
      name, email, project_type: type ?? null, budget: budget ?? null, message: message ?? null,
      ip, user_agent: userAgent,
    });
    if (dbErr) throw dbErr;

    // Notify the studio by email.
    const RESEND = Deno.env.get("RESEND_API_KEY");
    const TO = Deno.env.get("CONTACT_TO_EMAIL");
    const FROM = Deno.env.get("CONTACT_FROM_EMAIL") ?? "Nuvel <onboarding@resend.dev>";
    if (RESEND && TO) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM,
          to: [TO],
          reply_to: email,
          subject: `New project brief — ${name} (${type ?? "—"})`,
          html:
            `<h2 style="font-family:sans-serif">New brief from ${esc(name)}</h2>` +
            `<p style="font-family:sans-serif"><b>Email:</b> ${esc(email)}<br>` +
            `<b>Type:</b> ${esc(type)}<br>` +
            `<b>Budget:</b> ${esc(budget) || "—"}</p>` +
            `<p style="font-family:sans-serif"><b>Message:</b><br>${esc(message).replace(/\n/g, "<br>") || "—"}</p>`,
        }),
      });
      if (!r.ok) console.error("Resend error:", r.status, await r.text());
    } else {
      console.warn("RESEND_API_KEY/CONTACT_TO_EMAIL not set — falling back to Web3Forms for email delivery.");
      await sendViaWeb3Forms(name, email, type, budget, message);
    }

    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ error: "Server error — please try again." }, 500);
  }
});
