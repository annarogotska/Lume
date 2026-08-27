/* NUVEL — Contact view. Supabase Edge Function submission + Calendly popup + bot protection. */
import { useEffect, useRef, useState } from "react";
import { Ic } from "../components/icons";
import { useReveal } from "../components/useReveal";
import { submitContact } from "../lib/supabase";
import type { Go } from "../router";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
    gtag?: (...args: unknown[]) => void;
  }
}

function track(event: string, params?: Record<string, unknown>) {
  window.gtag?.("event", event, params);
}

const CALENDLY_URL = "https://calendly.com/contact-nuvel-studio/30min";
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /https?:\/\//i;

interface FormState {
  name: string;
  email: string;
  type: "Website" | "CRM" | "Both";
  budget: string;
  msg: string;
}

export function Contact({ go }: { go: Go }) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", type: "Website", budget: "", msg: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Bot protection: honeypot text value + page load timestamp
  const [honeypot, setHoneypot] = useState("");
  const loadedAt = useRef(Date.now());
  useReveal([]);

  useEffect(() => {
    // Track form impression — helps measure view→submit gap (large gap = bots or UX issue)
    track("form_view", { form_id: "contact" });
  }, []);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
  };

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    // --- Bot filters (silent — no feedback to bots) ---
    if (honeypot) return;                                  // honeypot filled
    if (Date.now() - loadedAt.current < 3000) return;     // submitted in < 3 s

    // --- Human-facing validation ---
    if (URL_RE.test(form.name)) {
      setError("Please enter your name.");
      return;
    }
    if (!EMAIL_RE.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.msg.trim().length < 10) {
      setError("Please tell us a bit more about your project.");
      return;
    }

    const turnstileToken = (e.currentTarget.elements.namedItem("cf-turnstile-response") as HTMLInputElement | null)?.value ?? "";

    setSending(true);
    setError(null);
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        type: form.type,
        budget: form.budget,
        message: form.msg,
        honeypot,
        loadedAt: loadedAt.current,
        turnstileToken,
      });
      // Track successful submit (fires only after Web3Forms confirms success)
      track("form_submit", { form_id: "contact", project_type: form.type });
      go("thank-you");
    } catch (err) {
      setError("Something went wrong. Please try again, or email us directly.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="view view-enter">
      <section className="section page-head-sec contact-sec">
        <div className="wrap contact-grid">
          <div className="contact-left">
            <span className="eyebrow">Start a project</span>
            <h1 className="display page-h1" style={{ fontSize: "clamp(2.4rem,6.5vw,5rem)" }}>
              Let's build
              <br />
              something <span className="serif">fast.</span>
            </h1>
            <p className="lede" style={{ maxWidth: "38ch", marginTop: "1.4rem" }}>
              Tell us what you're making. Fill in the brief and we'll reply within one business day — usually with first ideas already brewing.
            </p>
          </div>

          <div className="contact-right liquid-glass-strong reveal">
            <form onSubmit={submit} className="contact-form">

              {/* Honeypot — hidden from humans, screen readers excluded, bots fill it */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              {/* Cloudflare Turnstile — only renders once VITE_TURNSTILE_SITE_KEY is set */}
              {TURNSTILE_SITE_KEY && <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />}

              <label className="field">
                <span>Your name</span>
                <input value={form.name} onChange={set("name")} placeholder="Jane Doe" autoComplete="name" required />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" autoComplete="email" required />
              </label>
              <label className="field">
                <span id="need-label">What do you need?</span>
                <div className="seg" role="group" aria-labelledby="need-label">
                  {(["Website", "CRM", "Both"] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={form.type === t ? "on" : ""}
                      aria-pressed={form.type === t}
                      onClick={() => setForm({ ...form, type: t })}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </label>
              <label className="field">
                <span>Rough budget (optional)</span>
                <input value={form.budget} onChange={set("budget")} placeholder="e.g. €5–10k" />
              </label>
              <label className="field">
                <span>Tell us about it</span>
                <textarea
                  rows={4}
                  value={form.msg}
                  onChange={set("msg")}
                  placeholder="A few sentences about the project, goals, and timeline…"
                />
              </label>
              <button
                className="btn liquid-glass-strong hover-pop"
                type="submit"
                disabled={sending}
                style={{ alignSelf: "flex-start", marginTop: ".4rem", opacity: sending ? 0.6 : 1 }}
              >
                <span>{sending ? "Sending…" : "Send brief"}</span>
                <span className="icon-circle">{Ic.arrow()}</span>
              </button>
              {error && (
                <p className="form-error" role="alert">{error}</p>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0.4rem 0" }}>
                <span style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                <span className="muted" style={{ fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>or</span>
                <span style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
              </div>

              <a
                href={CALENDLY_URL}
                onClick={openCalendly}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: "1rem", padding: "1rem 1.4rem", borderRadius: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)",
                  cursor: "pointer", transition: "background 0.18s, border-color 0.18s",
                  textDecoration: "none", color: "inherit",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.11)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.32)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>📅</span>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: "0.95rem" }}>Book a 30-min call</div>
                    <div className="muted" style={{ fontSize: "0.8rem", marginTop: "0.15rem" }}>Pick a time that works for you</div>
                  </div>
                </div>
                <span style={{ opacity: 0.5 }}>{Ic.arrow()}</span>
              </a>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
