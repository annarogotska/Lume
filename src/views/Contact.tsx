/* NUVEL — Contact view. Submits via Web3Forms; Calendly popup for call booking. */
import { useEffect, useState } from "react";
import { Ic } from "../components/icons";
import { useReveal } from "../components/useReveal";
import { submitContact } from "../lib/supabase";
import type { Go } from "../router";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

const CALENDLY_URL = "https://calendly.com/contact-nuvel-studio/30min";

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
  useReveal([]);

  useEffect(() => {
    // Load Calendly widget assets only on this page
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        type: form.type,
        budget: form.budget,
        message: form.msg,
      });
      go("thank-you");
    } catch (err) {
      setError("Something went wrong sending your brief. Please try again, or email us directly.");
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
            <div className="contact-alt reveal" style={{ marginTop: "2.4rem" }}>
              <p className="muted" style={{ fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                Prefer to talk first?
              </p>
              <a
                href={CALENDLY_URL}
                className="btn-ghost liquid-glass hover-pop"
                onClick={openCalendly}
                style={{ display: "inline-flex" }}
              >
                Book a 30-min call {Ic.arrow()}
              </a>
            </div>
          </div>

          <div className="contact-right liquid-glass-strong reveal">
            <form onSubmit={submit} className="contact-form">
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
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
