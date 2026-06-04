/* NUVEL — background video: crossfade-loop (soft dissolve at the seam) + mouse parallax. */
import { useEffect, useRef } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_080827_a9e5ad52-b6ee-4e79-b393-d936f179cfd7.mp4";

const FADE = 1; // seconds of crossfade overlap
const VISIBLE = "0.8"; // resting opacity (matches the screen-blend look)

// On touch / small screens skip the video entirely — the gradient backdrop
// carries the look, and decoding two clips would waste battery and data.
const LITE =
  typeof window !== "undefined" && window.matchMedia("(hover: none), (max-width: 768px)").matches;

export function BgStage({ on = true }: { on?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const showVideo = on && !LITE;

  // Crossfade loop: when the active clip nears its end, start the idle copy from
  // 0 and dissolve between them — no hard loop cut. (Real reverse playback isn't
  // possible in browsers: negative playbackRate is ignored and frame-seeking stalls.)
  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      a.pause();
      return;
    }
    let active: HTMLVideoElement = a;
    let switching = false;
    const onTick = (e: Event) => {
      const v = e.target as HTMLVideoElement;
      if (v !== active || switching || !v.duration) return;
      if (v.currentTime < v.duration - FADE) return;
      switching = true;
      const other = v === a ? b : a;
      other.currentTime = 0;
      other.style.opacity = VISIBLE;
      other.play().catch(() => {});
      v.style.opacity = "0";
      active = other;
      window.setTimeout(() => {
        v.pause();
        switching = false;
      }, FADE * 1000);
    };
    a.addEventListener("timeupdate", onTick);
    b.addEventListener("timeupdate", onTick);
    a.style.opacity = VISIBLE;
    b.style.opacity = "0";
    a.play().catch(() => {});
    return () => {
      a.removeEventListener("timeupdate", onTick);
      b.removeEventListener("timeupdate", onTick);
    };
  }, [showVideo]);

  // mouse parallax
  useEffect(() => {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0;
    const S = 20;
    const move = (e: MouseEvent) => {
      tx = ((e.clientX - innerWidth / 2) / (innerWidth / 2)) * S;
      ty = ((e.clientY - innerHeight / 2) / (innerHeight / 2)) * S;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      wrap.style.transform = `scale(1.08) translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("mousemove", move);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div className="bg-stage" aria-hidden="true">
      <div className="bg-parallax" ref={wrapRef}>
        {showVideo && (
          <>
            <video ref={aRef} className="bg-video" muted playsInline preload="auto" src={VIDEO_SRC} />
            <video ref={bRef} className="bg-video" muted playsInline preload="auto" src={VIDEO_SRC} />
          </>
        )}
      </div>
      <div className="vignette" />
      <div className="grain" />
    </div>
  );
}
