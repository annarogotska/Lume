/* NUVEL — background video: ping-pong playback + mouse parallax. */
import { useEffect, useRef } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_080827_a9e5ad52-b6ee-4e79-b393-d936f179cfd7.mp4";

export function BgStage({ on = true }: { on?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ping-pong: play forward, then reverse back to the start (no hard loop cut).
  // Browsers ignore negative playbackRate, so reverse is driven by rAF seeking.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    let raf = 0;
    let last = 0;
    const reverse = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = v.currentTime - dt;
      if (t <= 0.03) {
        v.currentTime = 0;
        v.play().catch(() => {});
        return;
      }
      v.currentTime = t;
      raf = requestAnimationFrame(reverse);
    };
    const onEnded = () => {
      last = performance.now();
      raf = requestAnimationFrame(reverse);
    };
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("ended", onEnded);
      cancelAnimationFrame(raf);
    };
  }, [on]);

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
        {on && <video ref={videoRef} autoPlay muted playsInline preload="auto" src={VIDEO_SRC} />}
      </div>
      <div className="vignette" />
      <div className="grain" />
    </div>
  );
}
