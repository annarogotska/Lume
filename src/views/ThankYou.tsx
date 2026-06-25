/* NUVEL — Thank-you page. Shown after contact form submission.
   Google Ads conversion event fires here via gtag. */
import { useEffect } from "react";
import { Ic } from "../components/icons";
import { routeHref } from "../router";
import type { Go } from "../router";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function ThankYou({ go }: { go: Go }) {
  useEffect(() => {
    // Fire Google Ads conversion — replace AW-XXXXXXXXX/LABEL with your conversion action ID
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-18268881732/eJjHCKGvmMUcEMSGpIdE",
        value: 1.0,
        currency: "EUR",
      });
    }
  }, []);

  return (
    <div className="view view-enter">
      <section className="section page-head-sec" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: "52ch", margin: "0 auto" }}>
          <span className="icon-circle" style={{ width: "4rem", height: "4rem", margin: "0 auto 1.6rem" }}>
            {Ic.spark({ style: { width: "1.6rem", height: "1.6rem" } })}
          </span>
          <span className="eyebrow" style={{ display: "block", marginBottom: "1rem" }}>Brief received</span>
          <h1 className="display page-h1" style={{ fontSize: "clamp(2.4rem,6.5vw,4.4rem)" }}>
            We'll be in touch <span className="serif">soon.</span>
          </h1>
          <p className="lede" style={{ marginTop: "1.4rem" }}>
            Thanks for reaching out — we typically reply within one business day, usually with first ideas already brewing.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2.4rem", flexWrap: "wrap" }}>
            <a href={routeHref("home")} className="btn hover-pop" onClick={(e) => { e.preventDefault(); go("home"); }}>
              <span>Back home</span>
              <span className="icon-circle">{Ic.arrow()}</span>
            </a>
            <a href={routeHref("work")} className="btn-ghost liquid-glass hover-pop" onClick={(e) => { e.preventDefault(); go("work"); }}>
              See our work {Ic.arrow()}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
