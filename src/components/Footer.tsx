/* NUVEL — footer. */
import { LogoMark } from "./LogoMark";
import { CTA } from "./ui";
import { NAV } from "./Nav";
import { STUDIO } from "../data";
import type { Go } from "../router";

export function Footer({ go, name }: { go: Go; name: string }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-cta reveal">
          <div className="eyebrow">Got something to build?</div>
          <h2 className="h-sec">
            Let's make it <span className="serif">fast</span>
            <br />
            and unforgettable.
          </h2>
          <div className="foot-actions">
            <CTA onClick={() => go("contact")}>Start a project</CTA>
          </div>
        </div>

        <div className="foot-grid">
          <div className="foot-brand">
            <button className="foot-logo" onClick={() => go("home")} aria-label={name}>
              <LogoMark className="logo-bars" />
              <span className="foot-name">{name}</span>
            </button>
            <p className="muted-2">{STUDIO.tagline}.</p>
          </div>
          <div className="foot-col">
            <span className="eyebrow">Menu</span>
            {NAV.map((n) => (
              <button key={n.k} className="muted-8" onClick={() => go(n.k)}>
                {n.label}
              </button>
            ))}
          </div>
          <div className="foot-col">
            <span className="eyebrow">Studio</span>
            <span className="muted-8">{STUDIO.location}</span>
            <span className="muted-8">Available for new projects</span>
            <button className="foot-link" onClick={() => go("contact")}>
              Start a project →
            </button>
          </div>
        </div>
        <div className="foot-bottom muted-2">
          <span>© {new Date().getFullYear()} {name} Studio</span>
          <span>{STUDIO.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
