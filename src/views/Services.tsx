/* NUVEL — Services view. */
import { Ic } from "../components/icons";
import { useReveal } from "../components/useReveal";
import { SERVICES } from "../data";
import type { Go } from "../router";

const ENGAGEMENTS = [
  { t: "Sprint", d: "One focused thing, shipped. A landing page, a redesign, a single CRM module — scoped tight and live in days, not quarters.", m: "From 1 week" },
  { t: "Project", d: "A whole product, end to end. Strategy, design, build and launch in one unbroken engagement — no hand-off gaps, no momentum lost.", m: "2–4 weeks" },
  { t: "Partner", d: "Your design and build team, on call. New pages, continuous improvements and evolving systems — we stay in the loop as you grow.", m: "Monthly" },
];

export function Services({ go }: { go: Go }) {
  useReveal([]);
  return (
    <div className="view view-enter">
      <section className="section page-head-sec">
        <div className="wrap">
          <span className="eyebrow">Services</span>
          <h1 className="display page-h1">
            We design,
            <br />
            build &amp; <span className="serif">launch.</span>
          </h1>
          <p className="lede" style={{ maxWidth: "48ch", marginTop: "1.6rem" }}>
            Websites are our craft. CRM systems are how we keep your business running behind them. Everything ships fast, looks sharp, and is yours to own.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap svc-stack">
          {SERVICES.map((s, i) => (
            <div
              className={"svc-panel liquid-glass reveal" + (s.key === "websites" ? " primary" : "")}
              data-delay={i * 80}
              key={s.key}
            >
              <div className="svc-panel-left">
                <span className="svc-big-n">{s.n}</span>
                {s.key === "websites" && (
                  <span className="tag liquid-glass" style={{ marginTop: "1rem" }}>
                    Core focus
                  </span>
                )}
              </div>
              <div className="svc-panel-main">
                <h2 className="h-sec">{s.title}</h2>
                <p className="lede" style={{ margin: "1rem 0 1.6rem", maxWidth: "44ch" }}>
                  {s.lead}
                </p>
                <ul className="svc-points">
                  {s.points.map((p) => (
                    <li key={p}>
                      {Ic.plus({ style: { width: ".9rem", height: ".9rem", opacity: 0.5 } })}
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* engagement / how to work */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="titles">
              <span className="eyebrow reveal">Engagements</span>
              <h2 className="h-sec reveal" data-delay="60">
                Pick a <span className="serif">pace</span>.
              </h2>
            </div>
            <p className="muted reveal" data-delay="120">
              Fixed scope or an ongoing partner — pick the shape, we keep the speed.
            </p>
          </div>
          <div className="engage-list">
            {ENGAGEMENTS.map((e, i) => (
              <button
                className="engage-row reveal"
                data-delay={i * 80}
                key={e.t}
                onClick={() => go("contact")}
              >
                <span className="engage-row-n">{String(i + 1).padStart(2, "0")}</span>
                <div className="engage-row-head">
                  <h3>{e.t}</h3>
                  <span className="tag liquid-glass">{e.m}</span>
                </div>
                <p className="engage-row-d muted">{e.d}</p>
                <span className="engage-row-cta">
                  Enquire
                  <span className="engage-arrow">{Ic.arrowUpRight()}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
