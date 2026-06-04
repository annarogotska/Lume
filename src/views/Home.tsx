/* NUVEL — Home view. */
import { useRef } from "react";
import { Ic } from "../components/icons";
import { Media } from "../components/ui";
import { LogoMark } from "../components/LogoMark";
import { useReveal } from "../components/useReveal";
import { gsap, useGSAP, prefersReducedMotion } from "../anim/gsap";
import { CASES, CAPS, WHY, STATS, SERVICES, STUDIO } from "../data";
import type { Go } from "../router";

export function Home({ go }: { go: Go }) {
  const featured = CASES.slice(0, 4);
  const heroRef = useRef<HTMLElement>(null);
  useReveal([]);

  // Staggered hero entrance. clearProps:"transform" leaves the glass eyebrow /
  // secondary button with no lingering transform so their blur survives.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(
        [".hero-name", ".hero-headline", ".hero-lede", ".hero-cta-center", ".hero-trust"],
        {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "transform",
        },
      );
    },
    { scope: heroRef },
  );

  return (
    <div className="view view-enter">
      {/* ---------- HERO ---------- */}
      <section className="hero" ref={heroRef}>
        <span className="hero-name select-none">
          <LogoMark className="hero-name-mark" />
          {STUDIO.name}
        </span>

        <h1 className="hero-headline">
          Fast, fearless <span className="serif">websites</span> — and the{" "}
          <span className="serif">platforms</span> behind them.
        </h1>

        <p className="hero-lede">
          Whole products designed, built and shipped in one to two weeks.
        </p>

        <div className="hero-cta-center">
          <button className="hero-btn-primary" onClick={() => go("contact")}>
            <span className="hero-btn-label">Start a project</span>
            <span className="hero-btn-shine" />
          </button>
          <button className="hero-btn-secondary liquid-glass" onClick={() => go("work")}>
            See our work
          </button>
        </div>

        <div className="hero-trust">
          {STATS.slice(0, 3).map((s) => (
            <span key={s.k} className="hero-trust-item">
              <strong>{s.v}</strong> {s.k}
            </span>
          ))}
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <div className="marquee liquid-glass" style={{ borderRadius: 0 }}>
        <div className="marquee-track">
          {[...CAPS, ...CAPS].map((c, i) => (
            <span className="marquee-item" key={i}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- WHY ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div className="titles">
              <span className="eyebrow reveal">Why Nuvel</span>
              <h2 className="h-sec reveal" data-delay="60">
                Speed and craft,
                <br />
                not a trade-off.
              </h2>
            </div>
            <p className="muted reveal" data-delay="120">
              Most studios make you choose: fast or beautiful. Our process is built so you don't have to.
            </p>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div className="why-card liquid-glass reveal" data-delay={i * 90} key={w.t}>
                <span className="why-n">0{i + 1}</span>
                <h3>{w.t}</h3>
                <p className="muted">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED WORK ---------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="titles">
              <span className="eyebrow reveal">Selected work</span>
              <h2 className="h-sec reveal" data-delay="60">
                Recent <span className="serif">launches</span>
              </h2>
            </div>
            <button className="btn-ghost liquid-glass hover-pop reveal" data-delay="120" onClick={() => go("work")}>
              All projects {Ic.arrow()}
            </button>
          </div>

          <div className="work-grid">
            {featured.map((c, i) => (
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
                  <div>
                    <h3>{c.title}</h3>
                    <div className="wc-meta">
                      <span className="tag liquid-glass">{c.type}</span>
                      <span className="muted-2" style={{ fontSize: ".8rem" }}>
                        {c.client} · {c.year}
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

      {/* ---------- STATS ---------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="stat-row">
            {STATS.map((s, i) => (
              <div className="stat liquid-glass reveal" data-delay={i * 70} key={s.k}>
                <div className="v">{s.v}</div>
                <div className="k">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SERVICES TEASER ---------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="titles">
              <span className="eyebrow reveal">What we do</span>
              <h2 className="h-sec reveal" data-delay="60">
                Three ways
                <br />
                we move fast.
              </h2>
            </div>
            <button className="btn-ghost liquid-glass hover-pop reveal" data-delay="120" onClick={() => go("services")}>
              Explore services {Ic.arrow()}
            </button>
          </div>
          <div className="svc-teaser">
            {SERVICES.map((s, i) => (
              <button
                className="svc-row liquid-glass hover-pop reveal"
                data-delay={i * 80}
                key={s.key}
                onClick={() => go("services")}
              >
                <span className="svc-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p className="muted">{s.lead}</p>
                <span className="svc-arrow">{Ic.arrowUpRight()}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
