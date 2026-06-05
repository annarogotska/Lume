/* NUVEL — buttons, pills, media. */
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Ic } from "./icons";
import type { Go, Route } from "../router";

export function CtaBand({
  go,
  eyebrow = "Ready when you are",
  title,
  sub,
  primaryLabel = "Start a project",
  primaryTo = "contact",
  secondaryLabel,
  secondaryTo,
}: {
  go: Go;
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  primaryLabel?: string;
  primaryTo?: Route;
  secondaryLabel?: string;
  secondaryTo?: Route;
}) {
  return (
    <section className="section cta-band-sec">
      <div className="wrap">
        <div className="cta-band liquid-glass-strong reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h-sec cta-band-title">{title}</h2>
          {sub && <p className="muted cta-band-sub">{sub}</p>}
          <div className="cta-band-actions">
            <CTA onClick={() => go(primaryTo)}>{primaryLabel}</CTA>
            {secondaryLabel && secondaryTo && (
              <Ghost onClick={() => go(secondaryTo)} icon="arrow">
                {secondaryLabel}
              </Ghost>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTA({
  children,
  onClick,
  icon = "arrow",
}: {
  children: ReactNode;
  onClick?: () => void;
  icon?: string;
  href?: string;
}) {
  const I = Ic[icon] || Ic.arrow;
  return (
    <button className="btn hover-pop" onClick={onClick} style={{ borderRadius: 999 }}>
      <Fragment>
        <span>{children}</span>
        <span className="icon-circle">{I()}</span>
      </Fragment>
    </button>
  );
}

export function Ghost({
  children,
  onClick,
  icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  icon?: string;
}) {
  const I = icon ? Ic[icon] || Ic.arrow : null;
  return (
    <button className="btn-ghost liquid-glass hover-pop" onClick={onClick}>
      {children}
      {I && I()}
    </button>
  );
}

export function Pill({ children, icon }: { children: ReactNode; icon?: string }) {
  const I = icon ? Ic[icon] || Ic.spark : null;
  return (
    <span className="pill liquid-glass">
      {I && I()}
      {children}
    </span>
  );
}

export function Media({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const isVid = /\.(mp4|webm|mov)$/i.test(src || "");
  if (isVid)
    return (
      <video
        className={className}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={style}
        aria-label={alt || ""}
      />
    );
  return <img className={className} src={src} alt={alt || ""} loading="lazy" decoding="async" style={style} />;
}
