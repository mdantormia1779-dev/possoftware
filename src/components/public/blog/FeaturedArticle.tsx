"use client";

import React, {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Sparkles, Tag, Calendar, Clock, ArrowRight } from "lucide-react";
import { Article } from "./blogData";

/* -------------------------------- Types -------------------------------- */

interface FeaturedArticleProps {
  article: Article;
}

interface RevealProps {
  inView: boolean;
  delay: number;
  className?: string;
  children: ReactNode;
}

/* ------------------------------ Constants ------------------------------ */

const EASE = "cubic-bezier(0.22,1,0.36,1)";

/* -------------------------------- Hooks -------------------------------- */

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState<boolean>(false);

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
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------------------ Sub parts ------------------------------ */

function Reveal({ inView, delay, className = "", children }: RevealProps) {
  const style: CSSProperties = {
    transitionDelay: inView ? `${delay}ms` : "0ms",
    transitionTimingFunction: EASE,
  };

  return (
    <div
      style={style}
      className={[
        "fa-trans transition-all duration-1000",
        inView
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-6 opacity-0 blur-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/* ------------------------------ Component ------------------------------ */

export function FeaturedArticle({
  article,
}: FeaturedArticleProps): React.JSX.Element {
  const { ref, inView } = useInView<HTMLDivElement>();

  // Cursor spotlight (CSS variable, tai re-render hoy na)
  const handleMove = (e: MouseEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      style={{ transitionTimingFunction: EASE }}
      className={[
        "fa-trans group/card relative transition-all duration-1000",
        "hover:-translate-y-1.5",
        inView ? "scale-100 opacity-100" : "scale-95 opacity-0",
      ].join(" ")}
    >
      <style>{`
        @keyframes fa-border { 0%,100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
        @keyframes fa-float { 0%,100% { transform: translate3d(0,0,0) scale(1) } 50% { transform: translate3d(18px,-20px,0) scale(1.12) } }
        @keyframes fa-shine { 0% { transform: translateX(-150%) skewX(-20deg) } 55%,100% { transform: translateX(400%) skewX(-20deg) } }
        @media (prefers-reduced-motion: reduce) {
          .fa-anim { animation: none !important; }
          .fa-trans { transition: none !important; }
        }
      `}</style>

      {/* Outer glow (hover e ashe) */}
      <div
        aria-hidden="true"
        className="fa-trans pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-cyan-400/30 opacity-0 blur-2xl transition-opacity duration-700 group-hover/card:opacity-100"
      />

      {/* Animated gradient border */}
      <div
        className="fa-anim rounded-3xl bg-gradient-to-r from-indigo-500/50 via-cyan-400/50 to-violet-500/50 bg-[length:300%_300%] p-px shadow-lg transition-shadow duration-500 group-hover/card:shadow-2xl group-hover/card:shadow-indigo-500/20"
        style={{ animation: "fa-border 8s ease-in-out infinite" }}
      >
        <div className="relative isolate overflow-hidden rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-indigo-50/90 via-card to-cyan-50/50 p-8 dark:from-indigo-950/60 dark:via-card dark:to-cyan-950/40 sm:p-12">
          {/* Grid pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,rgba(99,102,241,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.10)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
          />

          {/* Floating blobs */}
          <div
            aria-hidden="true"
            className="fa-anim pointer-events-none absolute -right-16 -top-16 -z-10 size-64 rounded-full bg-indigo-500/20 blur-3xl"
            style={{ animation: "fa-float 9s ease-in-out infinite" }}
          />
          <div
            aria-hidden="true"
            className="fa-anim pointer-events-none absolute -bottom-20 -left-16 -z-10 size-64 rounded-full bg-cyan-400/20 blur-3xl"
            style={{ animation: "fa-float 12s ease-in-out infinite reverse" }}
          />

          {/* Cursor spotlight */}
          <div
            aria-hidden="true"
            className="fa-trans pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
            style={{
              background:
                "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.16), transparent 70%)",
            }}
          />

          <div className="space-y-6">
            {/* Badge row */}
            <Reveal inView={inView} delay={100} className="flex items-center gap-3">
              <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-3 py-1 text-xs font-bold text-white shadow-md shadow-indigo-500/30">
                <Sparkles className="fa-anim size-3.5 motion-safe:animate-pulse" />
                Featured Guide
                <span
                  aria-hidden="true"
                  className="fa-anim absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  style={{ animation: "fa-shine 4s ease-in-out infinite" }}
                />
              </span>

              <span className="group/tag inline-flex cursor-default items-center gap-1 rounded-full border border-transparent px-2.5 py-1 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-foreground">
                <Tag className="size-3 transition-transform duration-300 group-hover/tag:-rotate-12 group-hover/tag:scale-125" />
                {article.category}
              </span>
            </Reveal>

            {/* Title + summary */}
            <div className="max-w-4xl space-y-3">
              <Reveal inView={inView} delay={220}>
                <h2 className="cursor-pointer text-2xl font-extrabold tracking-tight text-foreground transition-all duration-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-violet-500 hover:to-cyan-400 hover:bg-clip-text hover:text-transparent sm:text-4xl">
                  {article.title}
                </h2>
                {/* Title underline (card hover e draw hoy) */}
                <span
                  aria-hidden="true"
                  className="fa-trans mt-3 block h-[3px] w-24 origin-left scale-x-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(99,102,241,0.6)] transition-transform duration-700 group-hover/card:scale-x-100"
                />
              </Reveal>

              <Reveal inView={inView} delay={340}>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {article.summary}
                </p>
              </Reveal>
            </div>

            {/* Footer row */}
            <Reveal
              inView={inView}
              delay={460}
              className="flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-4"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-2 font-semibold text-foreground">
                  <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-400 text-[10px] font-black text-white shadow-sm">
                    {article.author?.charAt(0)}
                  </span>
                  {article.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" /> {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {article.readTime}
                </span>
              </div>

              <Link
                href="/register"
                className={[
                  "group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-xs font-bold text-white",
                  "bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-[length:200%_100%] bg-left",
                  "shadow-md shadow-indigo-500/25 ring-1 ring-white/10",
                  "transition-all duration-500 hover:-translate-y-0.5 hover:bg-right hover:shadow-lg hover:shadow-indigo-500/40",
                  "active:translate-y-0 active:scale-95",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-full w-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-[250%]"
                />
                <span className="relative">Read Case Study &amp; Try System</span>
                <ArrowRight className="relative size-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}