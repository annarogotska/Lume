/* NUVEL — app shell: hash routing + baked look + layout.
 *
 * The prototype shipped a live "Tweaks" editor (studio name, accent, glass blur,
 * video on/off, grayscale) wired to the Claude Design host. That editor is a
 * design-tool artifact, so it's dropped here — its DEFAULT values are baked in
 * below so the production look matches the prototype's resting state exactly. */
import { Fragment, useEffect, useState } from "react";
import { BgStage } from "./components/BgStage";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./views/Home";
import { Work, CaseDetail } from "./views/Work";
import { Services } from "./views/Services";
import { Process } from "./views/Process";
import { Contact } from "./views/Contact";
import { STUDIO, CASES } from "./data";
import { parseHash, type Go, type Route } from "./router";

const TAGLINE = "Design at the speed of thought";
const META: Record<Route, { title: string; desc: string }> = {
  home: { title: `Nuvel — ${TAGLINE}`, desc: "A design & build studio. Fast, fearless websites — and the platforms behind them — designed, built and shipped in one to two weeks." },
  work: { title: "Work — Nuvel", desc: "Selected websites and platforms — brand to checkout, marketplace to launchpad. Most shipped end-to-end in one to two weeks." },
  case: { title: `Case study — Nuvel`, desc: "A Nuvel case study — the challenge, the approach and the result." },
  services: { title: "Services — Nuvel", desc: "Websites, platforms & CRM, brand and design systems — designed, built and shipped fast." },
  process: { title: "Process — Nuvel", desc: "A tight four-step rhythm — Spark, Shape, Build, Launch — from brief to launched in two weeks." },
  contact: { title: "Start a project — Nuvel", desc: "Tell us what you're building. We reply within one business day." },
};

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

const LOOK = {
  accent: "#ffffff",
  glassBlur: 50,
  videoBg: true,
  videoGrayscale: false,
};

export default function App() {
  const [{ route, id }, setLoc] = useState(parseHash());
  const name = STUDIO.name;

  // hash routing
  useEffect(() => {
    const onHash = () => {
      setLoc(parseHash());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);

  const go: Go = (r, cid) => {
    const target = "#" + r + (cid ? "/" + cid : "");
    if (location.hash === target) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    location.hash = target;
  };

  // Case detail pages use a light (white) theme instead of the video background.
  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", route === "case");
    return () => document.documentElement.classList.remove("theme-light");
  }, [route]);

  // baked look (formerly applied by the Tweaks panel)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent-color", LOOK.accent);
    root.style.setProperty("--glass-blur", LOOK.glassBlur + "px");
    root.style.setProperty(
      "--video-filter",
      LOOK.videoGrayscale
        ? "grayscale(1) contrast(1.06) brightness(0.85)"
        : "contrast(1.05) brightness(0.95) saturate(1.12)",
    );
  }, []);

  // Per-route document title + meta description / Open Graph (basic SEO).
  useEffect(() => {
    const base = META[route] ?? META.home;
    let { title, desc } = base;
    if (route === "case" && id) {
      const c = CASES.find((x) => x.id === id);
      if (c) {
        title = `${c.title} — Nuvel`;
        desc = c.tldr;
      }
    }
    document.title = title;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", desc);
  }, [route, id]);

  let view;
  if (route === "home") view = <Home go={go} />;
  else if (route === "work") view = <Work go={go} />;
  else if (route === "case") view = <CaseDetail id={id} go={go} />;
  else if (route === "services") view = <Services go={go} />;
  else if (route === "process") view = <Process />;
  else if (route === "contact") view = <Contact go={go} />;
  else view = <Home go={go} />;

  return (
    <Fragment>
      <BgStage on={LOOK.videoBg} />
      <Nav route={route} go={go} name={name} />
      <main id="app" key={route + (id || "")}>
        {view}
        <Footer go={go} name={name} />
      </main>
    </Fragment>
  );
}
