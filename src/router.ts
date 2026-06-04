/* NUVEL — tiny hash router (matches the prototype). */

export const ROUTES = ["home", "work", "case", "services", "process", "contact"] as const;
export type Route = (typeof ROUTES)[number];

export interface Location {
  route: Route;
  id: string | null;
}

/** Navigate helper passed down to views/components. */
export type Go = (route: Route, id?: string) => void;

export function parseHash(): Location {
  const h = (location.hash || "#home").replace(/^#/, "");
  const [r, id] = h.split("/");
  const route = (ROUTES as readonly string[]).includes(r) ? (r as Route) : "home";
  return { route, id: id || null };
}
