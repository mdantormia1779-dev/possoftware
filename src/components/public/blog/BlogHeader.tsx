"use client";

import React from "react";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

interface BlogHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function BlogHeader({
  query,
  onQueryChange,
}: BlogHeaderProps): React.JSX.Element {
  return (
    <section
      className={[
        "relative isolate overflow-hidden border-b border-slate-200 bg-[#f5f7fc]",
        "dark:border-slate-800 dark:bg-slate-900",
        inter.className,
      ].join(" ")}
    >
      {/* Soft blue glow (top-left) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[190px] -top-[200px] -z-10 size-[560px] bg-[radial-gradient(closest-side,rgba(147,197,253,0.58),rgba(147,197,253,0.22)_55%,transparent)] dark:opacity-30"
      />

      {/* Soft mint glow (right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[185px] -top-[95px] -z-10 size-[520px] bg-[radial-gradient(closest-side,rgba(167,243,208,0.6),rgba(167,243,208,0.25)_55%,transparent)] dark:opacity-25"
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-20 pt-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <span className="size-1.5 rounded-full bg-[#10b981]" />
          Blog
        </span>

        <h1
          className={[
            "mt-6 text-4xl font-bold leading-none tracking-tight text-[#0b1730] sm:text-5xl",
            "dark:text-white",
            jakarta.className,
          ].join(" ")}
        >
          Insights to Help Your Business Grow
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-[#5b6577] dark:text-slate-300">
          Practical guides, industry trends and product tips from the team
          behind XYZ Business OS.
        </p>

        {/* Search */}
        <div className="relative mt-8 w-full max-w-md">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#7c8698]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
            className="w-full rounded-lg border border-slate-200 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-[#7c8698] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-500/20"
          />
        </div>
      </div>
    </section>
  );
}