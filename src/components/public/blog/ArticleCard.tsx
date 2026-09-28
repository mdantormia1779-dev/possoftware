"use client";

import React, {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { Article } from "./blogData";

/* -------------------------------- Types -------------------------------- */

interface ArticleCardProps {
  article: Article;
  /** Grid er position, stagger delay er jonno (optional, na dile 0) */
  index?: number;
}

/* ------------------------------ Constants ------------------------------ */

const EASE = "cubic-bezier(0.22,1,0.36,1)";
const MAX_TILT = 6; // degree
const STAGGER_MS = 80;
const MAX_STAGGER_STEPS = 6;

/* ------------------------------- Component ------------------------------ */

export function ArticleCard({
  article,
  index = 0,
}: ArticleCardProps): React.JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  // Scroll reveal (ekbar e hoy)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Tilt + spotlight (CSS variable/style, tai re-render hoy na)
  const handleMove = (e: PointerEvent<HTMLAnchorElement>): void => {
    if (e.pointerType !== "mouse") return;
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = x / r.width - 0.5;
    const py = y / r.height - 0.5;

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.transform = `perspective(900px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) translateY(-6px)`;
  };

  const handleLeave = (): void => {
    const el = cardRef.current;
    if (el) el.style.transform = "";
  };

  const delay = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS;

  return (
    <div
      ref={wrapperRef}
      style={{
        transitionDelay: inView ? `${delay}ms` : "0ms",
        transitionTimingFunction: EASE,
      }}
      className={[
        "h-full transition-all duration-1000 motion-reduce:transition-none",
        inView
          ? "translate-y-0 scale-100 opacity-100 blur-0"
          : "translate-y-8 scale-95 opacity-0 blur-sm",
      ].join(" ")}
    >
      <Link
        ref={cardRef}
        href={`/blog/${article.id}`}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={[
          "group relative block h-full rounded-2xl p-px will-change-transform",
          "bg-border transition-[transform,box-shadow] duration-300 ease-out",
          "hover:shadow-2xl hover:shadow-indigo-500/15",
          "active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "motion-reduce:transition-none",
        ].join(" ")}
      >
        {/* Gradient border (hover e ashe) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        />

        {/* Outer glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/25 to-cyan-400/25 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Card body */}
        <div className="relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[calc(1rem-1px)] bg-card p-6">
          {/* Cursor spotlight */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.14), transparent 70%)",
            }}
          />

          {/* Corner glow */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 -z-10 size-32 rounded-full bg-cyan-400/0 blur-2xl transition-all duration-700 group-hover:bg-cyan-400/20"
          />

          {/* Top accent bar */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-transform duration-700 group-hover:scale-x-100"
            style={{ transitionTimingFunction: EASE }}
          />

          {/* Shine sweep */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[420%]"
          />

          <div className="space-y-3">
            {/* Category + arrow */}
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground transition-all duration-300 group-hover:bg-indigo-500/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                <span className="size-1.5 rounded-full bg-indigo-500/60 transition-all duration-300 group-hover:scale-125 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                {article.category}
              </span>

              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 group-hover:text-indigo-500 group-hover:opacity-100 -rotate-45 -translate-x-2 group-hover:translate-x-0">
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            {/* Title */}
            <h4 className="line-clamp-2 text-base font-bold text-foreground transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-violet-500 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent">
              {article.title}
            </h4>

            {/* Title underline */}
            <span
              aria-hidden="true"
              className="block h-[2px] w-12 origin-left scale-x-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-transform duration-700 group-hover:scale-x-100"
              style={{ transitionTimingFunction: EASE }}
            />

            {/* Summary */}
            <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
              {article.summary}
            </p>
          </div>

          {/* Meta row */}
          <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-6 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-0.5">
              <Calendar className="size-3 transition-colors duration-300 group-hover:text-indigo-500" />
              {article.date}
            </span>
            <span className="flex items-center gap-1 font-medium transition-transform duration-300 group-hover:-translate-x-0.5">
              <Clock className="size-3 transition-colors duration-300 group-hover:text-cyan-500" />
              {article.readTime}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}