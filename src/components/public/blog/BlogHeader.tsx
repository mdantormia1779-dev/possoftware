"use client";

import React, { useEffect, useRef, useState, type MouseEvent } from "react";

const TITLE_WORDS: string[] = ["XYZ", "Business", "OS", "Insights"];
const HIGHLIGHT_WORD = "Insights";
const WORD_STAGGER_MS = 110;
const EASE = "cubic-bezier(0.22,1,0.36,1)";

export function BlogHeader(): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Cursor spotlight (CSS variable, tai re-render hoy na)
  const handleMove = (e: MouseEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const titleEnd = TITLE_WORDS.length * WORD_STAGGER_MS;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="group/hero relative isolate overflow-hidden rounded-3xl px-4 py-14 sm:py-20"
    >
      <style>{`
        @keyframes bh-gradient { 0%,100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
        @keyframes bh-float { 0%,100% { transform: translate3d(0,0,0) scale(1) } 50% { transform: translate3d(20px,-24px,0) scale(1.1) } }
        @keyframes bh-shine { 0% { transform: translateX(-150%) skewX(-20deg) } 60%,100% { transform: translateX(350%) skewX(-20deg) } }
        @media (prefers-reduced-motion: reduce) {
          .bh-anim { animation: none !important; }
          .bh-trans { transition: none !important; }
        }
      `}</style>

      {/* Background: grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(99,102,241,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.12)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      {/* Background: floating blobs */}
      <div
        aria-hidden="true"
        className="bh-anim pointer-events-none absolute -left-20 -top-16 -z-10 size-72 rounded-full bg-indigo-500/20 blur-3xl"
        style={{ animation: "bh-float 9s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="bh-anim pointer-events-none absolute -bottom-20 -right-16 -z-10 size-80 rounded-full bg-cyan-400/20 blur-3xl"
        style={{ animation: "bh-float 11s ease-in-out infinite reverse" }}
      />

      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="bh-trans pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.16), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-3xl space-y-5 text-center">
        {/* Badge */}
        <div
          className="bh-trans transition-all duration-700"
          style={{
            transitionTimingFunction: EASE,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.9)",
          }}
        >
          <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-indigo-500/25 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 backdrop-blur-md dark:text-indigo-400">
            <span className="relative flex size-2">
              <span className="bh-anim absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
            </span>
            Knowledge &amp; Insights
            <span
              aria-hidden="true"
              className="bh-anim absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ animation: "bh-shine 4s ease-in-out infinite" }}
            />
          </span>
        </div>

        {/* Title: word by word blur reveal */}
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {TITLE_WORDS.map((word, i) => {
            const isHighlight = word === HIGHLIGHT_WORD;
            return (
              <span
                key={word}
                className="bh-trans mr-[0.25em] inline-block last:mr-0 transition-all duration-700"
                style={{
                  transitionDelay: mounted ? `${200 + i * WORD_STAGGER_MS}ms` : "0ms",
                  transitionTimingFunction: EASE,
                  opacity: mounted ? 1 : 0,
                  filter: mounted ? "blur(0)" : "blur(10px)",
                  transform: mounted
                    ? "translateY(0) rotateX(0)"
                    : "translateY(28px) rotateX(-40deg)",
                }}
              >
                {isHighlight ? (
                  <span
                    className="bh-anim bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent"
                    style={{ animation: "bh-gradient 5s ease-in-out infinite" }}
                  >
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            );
          })}
        </h1>

        {/* Animated underline */}
        <div className="flex justify-center" aria-hidden="true">
          <span
            className="bh-trans h-[3px] origin-center rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_14px_rgba(99,102,241,0.7)] transition-all duration-1000"
            style={{
              transitionDelay: mounted ? `${titleEnd + 250}ms` : "0ms",
              transitionTimingFunction: EASE,
              width: mounted ? "9rem" : "0rem",
              opacity: mounted ? 1 : 0,
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          className="bh-trans text-base text-muted-foreground transition-all duration-1000"
          style={{
            transitionDelay: mounted ? `${titleEnd + 400}ms` : "0ms",
            transitionTimingFunction: EASE,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            filter: mounted ? "blur(0)" : "blur(6px)",
          }}
        >
          Practical strategies, tax compliance playbooks, and modern technology guides for ambitious Bangladeshi business owners.
        </p>
      </div>
    </div>
  );
}