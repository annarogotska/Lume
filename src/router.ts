/* NUVEL — path-based router (replaces hash router for proper SEO indexing). */

export const ROUTES = ["home", "work", "case", "services", "service", "process", "blog", "post", "contact"] as const;
export type Route = (typeof ROUTES)[number];

export interface Location {
  route: Route;
  id: string | null;
}

/** Navigate helper passed down to views/components. */
export type Go = (route: Route, id?: string) => void;

export function parsePath(): Location {
  const raw = window.location.pathname.replace(/^\//, "") || "home";
  const [r, id] = raw.split("/");
  const route = (ROUTES as readonly string[]).includes(r) ? (r as Route) : "home";
  return { route, id: id || null };
}
