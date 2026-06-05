/* NUVEL — routing types. Navigation handled by React Router + history.pushState. */

export const ROUTES = ["home", "work", "case", "services", "service", "process", "blog", "post", "contact"] as const;
export type Route = (typeof ROUTES)[number];

/** Navigate helper passed down to views/components. */
export type Go = (route: Route, id?: string) => void;
