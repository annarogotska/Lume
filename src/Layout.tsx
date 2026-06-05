/* NUVEL — root layout: Nav + Footer + BgStage + look + theme-light toggle. */
import { useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ClientOnly } from "vite-react-ssg";
import { BgStage } from "./components/BgStage";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { STUDIO } from "./data";
import { ROUTES, type Go, type Route } from "./router";

function pathToRoute(pathname: string): Route {
  const seg = pathname.replace(/^\//, "").split("/")[0] || "home";
  return (ROUTES as readonly string[]).includes(seg) ? (seg as Route) : "home";
}

export function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const route = pathToRoute(pathname);

  const go: Go = useCallback(
    (r, id) => {
      const path = r === "home" ? "/" : `/${r}${id ? "/" + id : ""}`;
      if (typeof window !== "undefined" && window.location.pathname === path) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      navigate(path);
      if (typeof window !== "undefined") window.scrollTo({ top: 0 });
    },
    [navigate],
  );

  // White theme for case + post detail pages
  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", route === "case" || route === "post");
    return () => document.documentElement.classList.remove("theme-light");
  }, [route]);

  // Baked look (accent, blur, video filter)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent-color", "#ffffff");
    root.style.setProperty("--glass-blur", "50px");
    root.style.setProperty("--video-filter", "contrast(1.05) brightness(0.95) saturate(1.12)");
    // play class for entrance animations
    if (document.visibilityState === "visible") root.classList.add("play");
  }, []);

  return (
    <>
      <ClientOnly>{() => <BgStage on />}</ClientOnly>
      <Nav route={route} go={go} name={STUDIO.name} />
      <main id="app" key={pathname}>
        <Outlet context={go} />
        <Footer go={go} name={STUDIO.name} />
      </main>
    </>
  );
}
