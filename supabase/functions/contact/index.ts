// Supabase Edge Function: stores a contact lead and emails the studio (via Resend).
// Deploy:  supabase functions deploy contact
// Secrets: supabase secrets set RESEND_API_KEY=... CONTACT_TO_EMAIL=you@domain.com
//          (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected automatically.)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const { name, email, type, budget, message } = await req.json();

    if (!name?.trim() || !email?.trim()) return json({ error: "Name and email are required." }, 400);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "Please enter a valid email." }, 400);

    // Store the lead (service role bypasses RLS — clients never touch the table directly).
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { error: dbErr } = await admin.from("contacts").insert({
      name, email, project_type: type ?? null, budget: budget ?? null, message: message ?? null,
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
      console.warn("Email skipped — set RESEND_API_KEY and CONTACT_TO_EMAIL secrets.");
    }

    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ error: "Server error — please try again." }, 500);
  }
});
