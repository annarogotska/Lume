/* NUVEL — Service detail view (one rich page per service). */
import { useRef, useState } from "react";
import { useReveal } from "../components/useReveal";
import { CTA, Ghost, CtaBand } from "../components/ui";
import { Ic } from "../components/icons";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../anim/gsap";
import { SERVICES } from "../data";
import type { Go } from "../router";
import { routeHref } from "../router";

const WHY_ICONS = ["bolt", "layers", "gauge", "spark"];

export function ServiceDetail({ id, go }: { id: string | null; go: Go }) {
  useReveal([id]);
  const stackRef = useRef<HTMLDivElement>(null);
  const [getActive, setGetActive] = useState(0);
  const svc = SERVICES.find((s) => s.key === id) ?? SERVICES[0];
  const d = svc.detail;
  const others = SERVICES.filter((s) => s.key !== svc.key);

  // Scroll-stack: each step card pins, the next scrolls over it while the
  // covered card scales + dims for depth (cards are solid, so transform is safe).
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".how-stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const top = 110 + i * 16;
        gsap.fromTo(
          card,
          { scale: 1, opacity: 1 },
          {
            scale: 0.93,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top 85%", end: `top ${top}px`, scrub: true },
          },
        );
      });
      ScrollTrigger.refresh();
    },
    { scope: stackRef, dependencies: [id] },
  );

  return (
    <div className="view view-enter svc-detail">
      {/* hero */}
      <section className="section page-head-sec">
        <div className="wrap">
          <span className="eyebrow">{d.label}</span>
          <h1 className="display page-h1">{svc.title}</h1>
          <p className="lede" style={{ maxWidth: "54ch", marginTop: "1.6rem" }}>
            {d.intro}
          </p>
          <div className="svc-head-cta">
            <CTA href={routeHref("contact")} onClick={() => go("contact")}>Start a project</CTA>
            <Ghost href={routeHref("work")} onClick={() => go("work")} icon="arrow">
              See our work
            </Ghost>
          </div>
        </div>
      </section>

      {/* how we work */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="titles">
              <span className="eyebrow">How we work</span>
              <h2 className="h-sec">How we approach {svc.title.toLowerCase()}.</h2>
            </div>
            <p className="muted">A tight, opinionated way of working — built for speed without cutting corners.</p>
          </div>
          <div className="how-stack" ref={stackRef}>
            {d.how.map((b, i) => (
              <div className="how-stack-card" style={{ ["--i" as string]: i, zIndex: i + 1 }} key={b.t}>
                <div className="how-stack-top">
                  <span className="how-stack-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="how-stack-of">step {i + 1} / {d.how.length}</span>
                </div>
                <div className="how-stack-body">
                  <h3>{b.t}</h3>
                  <p className="muted">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* what we deliver */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="titles">
              <span className="eyebrow">What you get</span>
              <h2 className="h-sec">Services we provide.</h2>
            </div>
            <p className="muted">Everything under {svc.title.toLowerCase()}, designed and built end-to-end.</p>
          </div>
          <div className="get-split reveal">
            <div className="get-list">
              {d.deliver.map((b, i) => (
                <button
                  className={"get-item" + (getActive === i ? " on" : "")}
                  key={b.t}
                  onMouseEnter={() => setGetActive(i)}
                  onFocus={() => setGetActive(i)}
                >
                  <span className="gi-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="gi-t">{b.t}</span>
                  <span className="gi-arrow">{Ic.arrowUpRight()}</span>
                  <p className="gi-desc muted">{b.d}</p>
                </button>
              ))}
            </div>
            <div className="get-detail">
              <div className="get-fade" key={getActive}>
                <span className="get-detail-n">{String(getActive + 1).padStart(2, "0")}</span>
                <h3>{d.deliver[getActive].t}</h3>
                <p>{d.deliver[getActive].d}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* why us */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="titles">
              <span className="eyebrow">Why Nuvel</span>
              <h2 className="h-sec">Why work with us.</h2>
            </div>
            <p className="muted">The advantages of a design &amp; build studio that ships fast and hands over clean.</p>
          </div>
          <div className="svc-why-grid">
            {d.why.map((b, i) => (
              <div className="svc-why-card liquid-glass reveal" key={b.t}>
                <span className="svc-why-ic">{(Ic[WHY_ICONS[i % WHY_ICONS.length]] || Ic.spark)()}</span>
                <h3>{b.t}</h3>
                <p className="muted">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="faq-panel liquid-glass-strong reveal">
            <div className="faq-aside">
              <span className="eyebrow">Questions</span>
              <h2 className="h-sec">Good to know.</h2>
              <p className="muted">More about {svc.title.toLowerCase()} — anything else, just ask.</p>
              <a href="/contact" className="faq-cta" onClick={(e) => { e.preventDefault(); go("contact"); }}>
                Ask us anything <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="faq-list">
              {d.faq.map((f) => (
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

      {/* related services */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow reveal" style={{ display: "block", marginBottom: "1.2rem" }}>
            More services
          </span>
          <div className="svc-related">
            {others.map((o) => (
              <a href={routeHref("service", o.key)} className="svc-related-card liquid-glass hover-pop reveal" key={o.key} onClick={(e) => { e.preventDefault(); go("service", o.key); }}>
                <span className="svc-related-n">{o.n}</span>
                <h3>{o.title}</h3>
                <p className="muted">{o.lead}</p>
                <span className="svc-related-arrow">{Ic.arrowUpRight()}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        go={go}
        eyebrow="Ready when you are"
        title={
          <>
            Let's build your {svc.title.toLowerCase()} — <span className="serif">fast.</span>
          </>
        }
        sub={d.seoDesc}
        primaryLabel="Start a project"
        secondaryLabel="All services"
        secondaryTo="services"
      />
    </div>
  );
}
