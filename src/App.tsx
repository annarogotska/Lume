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
import { ServiceDetail } from "./views/ServiceDetail";
import { Blog, PostDetail } from "./views/Blog";
import { Process } from "./views/Process";
import { Contact } from "./views/Contact";
import { STUDIO, CASES, SERVICES, FAQ } from "./data";
import { POSTS } from "./blog";
import { parseHash, type Go, type Route } from "./router";

const META: Record<Route, { title: string; desc: string }> = {
  home: { title: "Nuvel — design & build studio for fast websites & apps", desc: "A design & build studio. Fast, fearless websites — and the platforms behind them — designed, built and shipped in one to two weeks." },
  work: { title: "Selected work — websites & platforms · Nuvel studio", desc: "Selected websites and platforms — brand to checkout, marketplace to launchpad. Most shipped end-to-end in one to two weeks." },
  case: { title: "Case study — Nuvel", desc: "A Nuvel case study — the challenge, the approach and the result." },
  services: { title: "Services — websites, platforms, brand & systems · Nuvel", desc: "Websites, platforms & CRM, brand and design systems — designed, built and shipped fast by one tight, opinionated studio." },
  service: { title: "Services — Nuvel", desc: "A Nuvel service — designed, built and shipped fast." },
  process: { title: "Our process — from brief to launched in two weeks · Nuvel", desc: "A tight four-step rhythm — Spark, Shape, Build, Launch — taking your project from brief to launched in about two weeks." },
  blog: { title: "Journal — web design, fast websites & AI · Nuvel", desc: "Ideas on web design, fast websites, design systems and how AI is changing the way great products get built — from a studio that ships in two weeks." },
  post: { title: "Journal — Nuvel", desc: "An article from Nuvel — a design & build studio shipping fast websites and platforms." },
  contact: { title: "Start a project — work with the Nuvel design studio", desc: "Tell us what you're building — a website, a platform or a full product. We reply within one business day." },
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

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: object) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-ld="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-ld", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  document.head.querySelector(`script[data-ld="${id}"]`)?.remove();
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
    document.documentElement.classList.toggle("theme-light", route === "case" || route === "post");
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

  // Per-route document title + meta description / Open Graph / canonical / FAQ schema.
  useEffect(() => {
    const base = META[route] ?? META.home;
    let { title, desc } = base;

    if (route === "case" && id) {
      const c = CASES.find((x) => x.id === id);
      if (c) { title = `${c.title} — Nuvel`; desc = c.tldr; }
    }
    if (route === "service" && id) {
      const s = SERVICES.find((x) => x.key === id);
      if (s) { title = s.detail.seoTitle; desc = s.detail.seoDesc; }
    }
    if (route === "post" && id) {
      const post = POSTS.find((x) => x.slug === id);
      if (post) { title = post.seoTitle; desc = post.seoDesc; }
    }

    document.title = title;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", desc);

    // Canonical: homepage stays clean, other routes use hash URL
    const canonical = route === "home"
      ? "https://nuvel.studio/"
      : `https://nuvel.studio/#${route}${id ? "/" + id : ""}`;
    setCanonical(canonical);

    // FAQPage schema — inject on process page and service detail pages
    let faqItems: { q: string; a: string }[] | null = null;
    if (route === "process") faqItems = FAQ;
    if (route === "service" && id) {
      const s = SERVICES.find((x) => x.key === id);
      if (s?.detail.faq.length) faqItems = s.detail.faq;
    }
    if (faqItems) {
      setJsonLd("faq", {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      });
    } else {
      removeJsonLd("faq");
    }
  }, [route, id]);

  let view;
  if (route === "home") view = <Home go={go} />;
  else if (route === "work") view = <Work go={go} />;
  else if (route === "case") view = <CaseDetail id={id} go={go} />;
  else if (route === "services") view = <Services go={go} />;
  else if (route === "service") view = <ServiceDetail id={id} go={go} />;
  else if (route === "blog") view = <Blog go={go} />;
  else if (route === "post") view = <PostDetail id={id} go={go} />;
  else if (route === "process") view = <Process go={go} />;
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
