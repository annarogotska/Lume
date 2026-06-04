/* NUVEL — buttons, pills, media. */
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Ic } from "./icons";

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
    <button className="btn liquid-glass-strong hover-pop" onClick={onClick} style={{ borderRadius: 999 }}>
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
