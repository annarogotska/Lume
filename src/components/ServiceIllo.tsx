/* Small animated line illustrations for the home services rows. CSS-driven
   (keyframes in views.css); animations pause under prefers-reduced-motion. */
const FRAME = { stroke: "currentColor", strokeOpacity: 0.3 } as const;

export function ServiceIllo({ kind }: { kind: string }) {
  if (kind === "crm") {
    // live dashboard — bars rising/falling
    return (
      <svg className="svc-illo" viewBox="0 0 80 56" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="76" height="52" rx="6" {...FRAME} />
        <line x1="12" y1="46" x2="68" y2="46" {...FRAME} />
        <g fill="currentColor">
          <rect className="illo-col c1" x="16" y="14" width="9" height="30" rx="2" />
          <rect className="illo-col c2" x="30" y="14" width="9" height="30" rx="2" />
          <rect className="illo-col c3" x="44" y="14" width="9" height="30" rx="2" />
          <rect className="illo-col c4" x="58" y="14" width="9" height="30" rx="2" />
        </g>
      </svg>
    );
  }
  if (kind === "brand") {
    // design system — orbiting tokens
    return (
      <svg className="svc-illo" viewBox="0 0 80 56" fill="none" aria-hidden="true">
        <g className="illo-spin" style={{ transformOrigin: "40px 28px" }}>
          <circle cx="40" cy="14" r="6" fill="currentColor" />
          <rect x="56" y="34" width="11" height="11" rx="2.5" fill="currentColor" fillOpacity="0.6" />
          <circle cx="20" cy="38" r="5" stroke="currentColor" strokeWidth="2" />
        </g>
        <circle className="illo-pulse" cx="40" cy="28" r="3" fill="currentColor" />
      </svg>
    );
  }
  // websites — browser with content loading in
  return (
    <svg className="svc-illo" viewBox="0 0 80 56" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="76" height="52" rx="6" {...FRAME} />
      <line x1="2" y1="15" x2="78" y2="15" {...FRAME} />
      <circle cx="9" cy="8.5" r="1.5" fill="currentColor" fillOpacity="0.55" />
      <circle cx="15" cy="8.5" r="1.5" fill="currentColor" fillOpacity="0.55" />
      <circle cx="21" cy="8.5" r="1.5" fill="currentColor" fillOpacity="0.55" />
      <g fill="currentColor">
        <rect className="illo-bar w1" x="10" y="24" width="42" height="6" rx="3" />
        <rect className="illo-bar w2" x="10" y="35" width="58" height="4" rx="2" fillOpacity="0.5" />
        <rect className="illo-bar w3" x="10" y="43" width="32" height="4" rx="2" fillOpacity="0.5" />
      </g>
    </svg>
  );
}
