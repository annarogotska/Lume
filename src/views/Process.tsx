/* NUVEL — Process view. */
import { useReveal } from "../components/useReveal";
import { Ghost } from "../components/ui";
import { PROCESS, PRINCIPLES, TOOLS, FAQ } from "../data";
import type { Go } from "../router";

export function Process({ go }: { go: Go }) {
  useReveal([]);
  return (
    <div className="view view-enter proc-page">
      <section className="section page-head-sec">
        <div className="wrap">
          <span className="eyebrow">Process</span>
          <h1 className="display page-h1">
            Two weeks,
            <br />
            start to <span className="serif">live.</span>
          </h1>
          <p className="lede" style={{ maxWidth: "46ch", marginTop: "1.6rem" }}>
            No drawn-out decks or month-long discovery. A tight, opinionated four-step rhythm that gets you to a launched, beautiful result — fast.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="proc-panel reveal">
            <div className="proc-flow">
              <span className="proc-flow-line" aria-hidden="true" />
              {PROCESS.map((p) => (
                <div className="flow-step" key={p.n}>
                  <span className="flow-dot" aria-hidden="true" />
                  <span className="flow-num">{p.n}</span>
                  <div className="flow-head">
                    <h3>{p.t}</h3>
                    <span className="tag liquid-glass">{p.days}</span>
                  </div>
                  <p className="muted">{p.d}</p>
                  <ul className="flow-deliver">
                    {p.deliver.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="proc-inline-cta reveal">
            <span className="muted">See this two-week process applied to real websites and platforms.</span>
            <Ghost onClick={() => go("work")} icon="arrow">
              See the work
            </Ghost>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="titles">
              <span className="eyebrow">How we work</span>
              <h2 className="h-sec">Six principles behind the speed.</h2>
            </div>
            <p className="muted">
              Fast is a by-product of how we work, not a corner we cut. These hold on every project.
            </p>
          </div>
          <div className="prin-grid">
            {PRINCIPLES.map((p, i) => (
              <div className="prin-card liquid-glass reveal" key={p.t}>
                <span className="prin-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.t}</h3>
                <p className="muted">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="titles">
              <span className="eyebrow">The stack</span>
              <h2 className="h-sec">Built with tools that keep up.</h2>
            </div>
            <p className="muted">
              A lean, modern toolkit — design, front-end, backend and motion in one tight pipeline.
            </p>
          </div>
          <div className="stack-panel liquid-glass reveal">
            <div className="stack-list">
              {TOOLS.map((t, i) => (
                <div className="stack-item" key={t.name} style={{ ["--tc" as string]: t.c }}>
                  <span className="stack-row">
                    <span className="stack-index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="stack-dot" />
                    <span className="stack-name">{t.name}</span>
                    <span className="stack-role">{t.role}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="faq-panel liquid-glass-strong reveal">
            <div className="faq-aside">
              <span className="eyebrow">Questions</span>
              <h2 className="h-sec">Good to know.</h2>
              <p className="muted">
                The things people ask before we start. Anything else — just reach out.
              </p>
              <button className="faq-cta" onClick={() => go("contact")}>
                Ask us anything <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="faq-list">
              {FAQ.map((f) => (
                <details className="faq-item" key={f.q}>
                  <summary>
                    <span>{f.q}</span>
                    <span className="faq-mark" aria-hidden="true" />
                  </summary>
                  <p className="muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="proc-promise liquid-glass-strong reveal">
            <span className="eyebrow">The promise</span>
            <h2 className="h-sec" style={{ marginTop: "1rem", maxWidth: "18ch" }}>
              You'll see <span className="serif">real design</span> in the first week — every time.
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
