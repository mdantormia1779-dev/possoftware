"use client";

import React, { useEffect, useRef, useState, type MouseEvent } from "react";
import { Mail, Send } from "lucide-react";

/* ------------------------------ Constants ------------------------------ */

const EASE = "cubic-bezier(0.22,1,0.36,1)";

/* ------------------------------- Component ------------------------------ */

export function BlogNewsletter(): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  // Scroll reveal (ekbar e hoy)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cursor spotlight (CSS variable, tai re-render hoy na)
  const handleMove = (e: MouseEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const reveal = (delay: number): React.CSSProperties => ({
    transitionDelay: inView ? `${delay}ms` : "0ms",
    transitionTimingFunction: EASE,
  });

  const revealCls = (base = ""): string =>
    [
      "bn-trans transition-all duration-1000",
      inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-sm",
      base,
    ].join(" ");

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      style={{ transitionTimingFunction: EASE }}
      className={[
        "bn-trans group/news relative transition-all duration-1000",
        inView ? "scale-100 opacity-100" : "scale-95 opacity-0",
      ].join(" ")}
    >
      <style>{`
        @keyframes bn-border { 0%,100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
        @keyframes bn-float { 0%,100% { transform: translate3d(0,0,0) scale(1) } 50% { transform: translate3d(18px,-20px,0) scale(1.12) } }
        @keyframes bn-shine { 0% { transform: translateX(-150%) skewX(-20deg) } 55%,100% { transform: translateX(450%) skewX(-20deg) } }
        @media (prefers-reduced-motion: reduce) {
          .bn-anim { animation: none !important; }
          .bn-trans { transition: none !important; }
        }
      `}</style>

      {/* Outer glow */}
      <div
        aria-hidden="true"
        className="bn-trans pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-to-r from-indigo-500/25 via-violet-500/15 to-cyan-400/25 opacity-0 blur-2xl transition-opacity duration-700 group-hover/news:opacity-100"
      />

      {/* Animated gradient border */}
      <div
        className="bn-anim rounded-3xl bg-gradient-to-r from-indigo-500/40 via-cyan-400/40 to-violet-500/40 bg-[length:300%_300%] p-px"
        style={{ animation: "bn-border 8s ease-in-out infinite" }}
      >
        <div className="relative isolate flex flex-col items-center justify-between gap-6 overflow-hidden rounded-[calc(1.5rem-1px)] bg-card p-8 sm:flex-row sm:p-10">
          {/* Muted base tint */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-muted/40" />

          {/* Grid pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,rgba(99,102,241,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.10)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_at_left,black_15%,transparent_70%)]"
          />

          {/* Floating blobs */}
          <div
            aria-hidden="true"
            className="bn-anim pointer-events-none absolute -left-16 -top-16 -z-10 size-56 rounded-full bg-indigo-500/20 blur-3xl"
            style={{ animation: "bn-float 9s ease-in-out infinite" }}
          />
          <div
            aria-hidden="true"
            className="bn-anim pointer-events-none absolute -bottom-20 -right-12 -z-10 size-60 rounded-full bg-cyan-400/20 blur-3xl"
            style={{ animation: "bn-float 12s ease-in-out infinite reverse" }}
          />

          {/* Cursor spotlight */}
          <div
            aria-hidden="true"
            className="bn-trans pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/news:opacity-100"
            style={{
              background:
                "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.15), transparent 70%)",
            }}
          />

          {/* Text */}
          <div className="space-y-2 text-center sm:text-left">
            <div style={reveal(100)} className={revealCls()}>
              <h4 className="text-lg font-bold text-foreground">
                Get Weekly Business Management Tips For{" "}
                <span
                  className="bn-anim bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent"
                  style={{ animation: "bn-border 5s ease-in-out infinite" }}
                >
                  Bangladesh
                </span>
              </h4>
            </div>

            <div style={reveal(220)} className={revealCls()}>
              <p className="text-xs text-muted-foreground">
                Join 4,200+ entrepreneurs receiving insights on inventory optimization, retail automation, and tax compliance.
              </p>
            </div>
          </div>

          {/* Input + button */}
          <div
            style={reveal(340)}
            className={revealCls("flex w-full items-center gap-2 sm:w-auto")}
          >
            {/* Input with glow ring on focus */}
            <div className="group/input relative w-full sm:w-64">
              <div
                aria-hidden="true"
                className="bn-trans absolute -inset-0.5 rounded-[0.85rem] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 opacity-0 blur-sm transition-opacity duration-500 group-focus-within/input:opacity-70"
              />
              <Mail
                aria-hidden="true"
                className="bn-trans pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground transition-all duration-300 group-focus-within/input:scale-110 group-focus-within/input:text-indigo-500"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                className="bn-trans relative w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs text-foreground transition-all duration-300 placeholder:transition-opacity placeholder:duration-300 hover:border-indigo-500/40 focus:border-transparent focus:outline-none focus:placeholder:opacity-50"
              />
            </div>

            {/* Subscribe button */}
            <button
              type="button"
              className={[
                "group/btn relative inline-flex shrink-0 cursor-pointer items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-xs font-bold text-white",
                "bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-[length:200%_100%] bg-left",
                "shadow-md shadow-indigo-500/25 ring-1 ring-white/10",
                "transition-all duration-500 hover:-translate-y-0.5 hover:bg-right hover:shadow-lg hover:shadow-indigo-500/40",
                "active:translate-y-0 active:scale-95",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "motion-reduce:transition-none",
              ].join(" ")}
            >
              {/* Idle shine (bar bar chole) */}
              <span
                aria-hidden="true"
                className="bn-anim absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ animation: "bn-shine 4.5s ease-in-out infinite" }}
              />
              <span className="relative">Subscribe</span>
              <Send className="relative size-3.5 transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1 group-hover/btn:rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}