/* NUVEL — Work list + Case detail. */
import { useState, useRef } from "react";
import { Ic } from "../components/icons";
import { Media } from "../components/ui";
import { useReveal } from "../components/useReveal";
import { gsap, useGSAP, prefersReducedMotion } from "../anim/gsap";
import { CASES, type CaseType } from "../data";
import type { Go } from "../router";

export function Work({ go }: { go: Go }) {
  const [filter, setFilter] = useState<"All" | CaseType>("All");
  useReveal([filter]);
  const types: ("All" | CaseType)[] = ["All", "Website", "Platform"];
  const list = CASES.filter((c) => filter === "All" || c.type === filter);
  return (
    <div className="view view-enter">
      <section className="section page-head-sec">
        <div className="wrap">
          <span className="eyebrow">Work · {CASES.length} projects</span>
          <h1 className="display page-h1">
            Things we
            <br />
            shipped <span className="serif">fast.</span>
          </h1>
          <p className="lede" style={{ maxWidth: "48ch", marginTop: "1.6rem" }}>
            A selection of websites and platforms — brand to checkout, marketplace to launchpad. Most shipped end-to-end in one to two weeks.
          </p>
          <div className="filter-row">
            {types.map((t) => (
              <button
                key={t}
                className={"filter-pill liquid-glass" + (filter === t ? " on" : "")}
                onClick={() => setFilter(t)}
              >
                {t}
                {t !== "All" ? "s" : ""}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="work-grid">
            {list.map((c, i) => (
              <button
                className="work-card liquid-glass hover-pop reveal"
                data-delay={(i % 2) * 90}
                key={c.id}
                onClick={() => go("case", c.id)}
              >
                <div className="slot-frame wc-cover">
                  <Media src={c.cover} alt={c.client} />
                </div>
                <div className="work-card-head">
                  <div style={{ minWidth: 0 }}>
                    <h3>{c.title}</h3>
                    <div className="wc-meta">
                      <span className="tag liquid-glass">{c.type}</span>
                      <span className="muted-2" style={{ fontSize: ".8rem" }}>
                        {c.client} · {c.sector} · {c.year}
                      </span>
                    </div>
                    <span className="wc-tool">{c.tool}</span>
                  </div>
                  <span className="wc-arrow liquid-glass">{Ic.arrowUpRight()}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function CaseDetail({ id, go }: { id: string | null; go: Go }) {
  const idx = Math.max(0, CASES.findIndex((c) => c.id === id));
  const c = CASES[idx];
  const next = CASES[(idx + 1) % CASES.length];
  const phasesRef = useRef<HTMLDivElement>(null);
  useReveal([id]);

  // Self-drawing timeline: the progress line draws across the phases and each
  // node pops as the line reaches it, when the block scrolls into view.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = phasesRef.current;
      if (!root) return;
      const fill = root.querySelector(".phases-line-fill");
      const nodes = gsap.utils.toArray<HTMLElement>(".phase-node", root);
      const bodies = gsap.utils.toArray<HTMLElement>(".case-phase-body", root);
      gsap.set(nodes, { scale: 0, transformOrigin: "center" });
      gsap.set(bodies, { opacity: 0, y: 16 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
      tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0);
      nodes.forEach((n, i) => {
        const at = nodes.length > 1 ? (i / (nodes.length - 1)) * 1.1 : 0;
        tl.to(n, { scale: 1, duration: 0.35, ease: "back.out(2)" }, at);
        tl.to(bodies[i], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, at + 0.05);
      });
    },
    { scope: phasesRef, dependencies: [id] },
  );

  if (!c) return null;
  return (
    <div className="view view-enter case-view">
      <section className="section case-head-sec">
        <div className="wrap">
          <button className="back-link muted-8" onClick={() => go("work")}>
            {Ic.arrow({ style: { transform: "rotate(180deg)", width: "1rem", height: "1rem" } })} All work
          </button>
          <div className="case-meta-top">
            <span className="tag liquid-glass">{c.type}</span>
            <span className="muted-2">{c.sector}</span>
            <span className="muted-2">·</span>
            <span className="muted-2">{c.year}</span>
          </div>
          <h1 className="display case-h1">{c.title}</h1>
          <p className="lede case-tldr">{c.tldr}</p>
          <div className="case-services">
            {c.services.map((s) => (
              <span className="pill liquid-glass" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* hero cover */}
      <section className="case-cover-sec">
        <div className="wrap">
          <div className="slot-frame case-cover reveal">
            <Media src={c.cover} alt={c.client} />
          </div>
        </div>
      </section>

      {/* metrics */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="stat-row case-metrics">
            {c.metrics.map((m, i) => (
              <div className="stat liquid-glass reveal" data-delay={i * 70} key={m.k}>
                <div className="v">{m.v}</div>
                <div className="k">{m.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* overview — facts, stack, highlights */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap case-overview">
          <div className="case-overview-facts reveal">
            <div className="fact">
              <span className="eyebrow">Role</span>
              <p>{c.role}</p>
            </div>
            <div className="fact">
              <span className="eyebrow">Timeline</span>
              <p>{c.duration}</p>
            </div>
            <div className="fact">
              <span className="eyebrow">Year</span>
              <p>{c.year}</p>
            </div>
            <div className="fact fact-stack">
              <span className="eyebrow">Built with</span>
              <div className="stack-row">
                {c.stack.map((s) => (
                  <span className="stack-pill" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="case-overview-highlights reveal" data-delay={80}>
            <span className="eyebrow">Highlights</span>
            <ul className="case-highlights">
              {c.highlights.map((h) => (
                <li key={h}>
                  {Ic.plus({ style: { width: ".85rem", height: ".85rem", opacity: 0.5, flex: "0 0 auto", marginTop: ".28rem" } })}
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* story — alternating text + media */}
      <section className="section" style={{ paddingTop: "clamp(20px,3vw,40px)" }}>
        <div className="wrap case-story">
          {c.sections.map((s) => (
            <div className="case-row reveal" key={s.label}>
              <div className="case-row-text">
                <span className="eyebrow">{s.label}</span>
                <p>{s.body}</p>
              </div>
              <div className="case-row-media">
                <Media src={s.media} alt={c.client + " — " + s.label} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* phases — how the work came together */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow reveal">How it came together</span>
          <div className="case-phases-wrap" ref={phasesRef}>
            <div className="phases-line">
              <span className="phases-line-fill" />
            </div>
            <ol className="case-phases">
              {c.phases.map((p, i) => (
                <li className="case-phase" key={p.label}>
                  <span className="phase-node" />
                  <div className="case-phase-body">
                    <span className="case-phase-n">{String(i + 1).padStart(2, "0")}</span>
                    <h3>
                      {p.label.includes(" · ") ? (
                        <>
                          <span className="phase-pre">{p.label.split(" · ")[0]} · </span>
                          {p.label.split(" · ").slice(1).join(" · ")}
                        </>
                      ) : (
                        p.label
                      )}
                    </h3>
                    <p className="muted">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* takeaway — a CTA banner for a prospective client */}
      <section className="section">
        <div className="wrap">
          <div className="case-cta reveal">
            <span className="eyebrow">Thinking about your project?</span>
            <h2 className="case-cta-head">
              Let&rsquo;s build <span className="case-cta-accent">yours</span>.
            </h2>
            <p className="case-cta-sub">{c.takeaway}</p>
            <div className="case-cta-actions">
              <button className="case-cta-btn hover-pop" onClick={() => go("contact")}>
                Start a project
                <span className="case-cta-arrow">{Ic.arrowUpRight()}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* next */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <button className="next-case liquid-glass-strong hover-pop" onClick={() => go("case", next.id)}>
            <div className="next-case-text">
              <span className="eyebrow">Next project</span>
              <h2 className="h-sec">{next.title}</h2>
            </div>
            <div className="next-case-cover slot-frame">
              <Media src={next.cover} alt={next.client} />
              <span className="next-case-arrow">{Ic.arrow()}</span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}
