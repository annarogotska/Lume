/* NUVEL — routing types. Navigation handled by React Router + history.pushState. */

export const ROUTES = ["home", "work", "case", "services", "service", "process", "blog", "post", "contact", "thank-you"] as const;
export type Route = (typeof ROUTES)[number];

/** Navigate helper passed down to views/components. */
export type Go = (route: Route, id?: string) => void;

/** Convert a route + optional id to a crawlable href string. */
export function routeHref(route: Route, id?: string): string {
  if (route === "home") return "/";
  if (id) return `/${route}/${id}`;
  return `/${route}`;
}
