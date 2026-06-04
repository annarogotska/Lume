/* NUVEL — Contact view. Submits to Supabase (stores lead + emails the studio). */
import { useState } from "react";
import { Ic } from "../components/icons";
import { useReveal } from "../components/useReveal";
import { submitContact } from "../lib/supabase";
import type { Go } from "../router";

interface FormState {
  name: string;
  email: string;
  type: "Website" | "CRM" | "Both";
  budget: string;
  msg: string;
}

export function Contact({ go }: { go: Go }) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", type: "Website", budget: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useReveal([sent]);
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
      setSent(true);
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
          </div>

          <div className="contact-right liquid-glass-strong reveal">
            {sent ? (
              <div className="contact-thanks" role="status" aria-live="polite">
                <span className="icon-circle" style={{ width: "3.5rem", height: "3.5rem", marginBottom: "1.2rem" }}>
                  {Ic.spark({ style: { width: "1.4rem", height: "1.4rem" } })}
                </span>
                <h2 className="h-sec" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>
                  Got it.
                </h2>
                <p className="muted" style={{ marginTop: "1rem", maxWidth: "30ch" }}>
                  Thanks {form.name || "there"} — we'll be in touch within a day. (Demo form — no data is sent.)
                </p>
                <button
                  className="btn-ghost liquid-glass hover-pop"
                  style={{ marginTop: "1.6rem" }}
                  onClick={() => go("home")}
                >
                  Back home {Ic.arrow()}
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
