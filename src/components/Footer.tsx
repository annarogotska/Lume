/* NUVEL — footer (editorial split). */
import { LogoMark } from "./LogoMark";
import { NAV } from "./Nav";
import { STUDIO } from "../data";
import type { Go } from "../router";

export function Footer({ go, name }: { go: Go; name: string }) {
  const links = NAV.filter((n) => n.k !== "home");
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-main">
          <div className="foot-lead reveal">
            <div className="eyebrow">Got something to build?</div>
            <h2 className="foot-headline">
              Let's make it <span className="serif">fast</span> and unforgettable.
            </h2>
            <div className="foot-lead-row">
              <button className="foot-link" onClick={() => go("contact")}>
                Start a project →
              </button>
              <span className="foot-status">
                <i className="foot-dot" /> Available for new projects
              </span>
            </div>
          </div>

          <div className="foot-links">
            <nav className="foot-col">
              <span className="eyebrow">Explore</span>
              {links.map((n) => (
                <button key={n.k} className="muted-8" onClick={() => go(n.k)}>
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="foot-col">
              <span className="eyebrow">Studio</span>
              <span className="muted-8">{STUDIO.location}</span>
              <span className="muted-8">Mon–Fri</span>
              <span className="muted-8">Replies within a day</span>
            </div>
          </div>
        </div>

        <div className="foot-bottom muted-2">
          <button className="foot-brand-min" onClick={() => go("home")} aria-label={name}>
            <LogoMark className="logo-bars" />
            <span className="foot-name">{name}</span>
            <span className="foot-copy">© {new Date().getFullYear()}</span>
          </button>
          <button
            className="foot-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
