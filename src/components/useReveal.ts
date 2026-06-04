/* NUVEL — reveal-on-scroll, powered by GSAP ScrollTrigger.batch.
 *
 * Elements with .reveal start hidden (CSS: html.play .reveal { opacity: 0 })
 * and fade/slide up in batched, staggered groups as they enter the viewport.
 * `clearProps: "transform"` is intentional: it leaves NO inline transform on
 * the element afterwards, so glass cards keep blurring the background video
 * (a lingering transform on a glass element's box would defeat backdrop-filter). */
import { useEffect, type DependencyList } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../anim/gsap";

export function useReveal(deps: DependencyList = []) {
  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>(".reveal");
    if (!els.length) return;

    // Reduced motion: CSS already forces .reveal visible — do nothing.
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(els, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.08,
              overwrite: true,
              clearProps: "transform",
            },
          ),
      });
    });

    // Recompute trigger positions once fonts/layout settle.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
