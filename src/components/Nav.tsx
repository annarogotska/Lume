/* NUVEL — navigation bar + mobile menu. */
import { Fragment, useEffect, useState } from "react";
import { Ic } from "./icons";
import { LogoMark } from "./LogoMark";
import { STUDIO } from "../data";
import type { Go, Route } from "../router";

export const NAV: { k: Route; label: string }[] = [
  { k: "home", label: "Home" },
  { k: "work", label: "Work" },
  { k: "services", label: "Services" },
  { k: "process", label: "Process" },
  { k: "contact", label: "Contact" },
];

export function Nav({ route, go, name }: { route: Route; go: Go; name: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [route]);
  const links = NAV.filter((n) => n.k !== "home");
  return (
    <Fragment>
      <header className="nav-bar">
        <div className="nav-pill liquid-glass">
          <button className="nav-logo" onClick={() => go("home")} aria-label={name}>
            <LogoMark className="logo-bars" />
            <span className="nav-name">{name}</span>
          </button>
          <nav className="nav-links">
            {links.map((n) => (
              <button
                key={n.k}
                className={"nav-link" + (route === n.k || (route === "case" && n.k === "work") ? " active" : "")}
                onClick={() => go(n.k)}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <button className="nav-cta liquid-glass-strong" onClick={() => go("contact")}>
            Start a project
          </button>
          <button className="nav-burger" onClick={() => setOpen(true)} aria-label="Menu">
            {Ic.menu()}
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-menu liquid-glass-strong view-enter">
          <button className="mm-close liquid-glass" onClick={() => setOpen(false)} aria-label="Close">
            {Ic.close()}
          </button>
          <div className="mm-links">
            {NAV.map((n, i) => (
              <button key={n.k} style={{ animationDelay: i * 60 + "ms" }} onClick={() => go(n.k)}>
                <span className="mm-n">0{i + 1}</span>
                {n.label}
                {Ic.arrowUpRight()}
              </button>
            ))}
          </div>
          <div className="mm-foot muted-2">{STUDIO.email}</div>
        </div>
      )}
    </Fragment>
  );
}
