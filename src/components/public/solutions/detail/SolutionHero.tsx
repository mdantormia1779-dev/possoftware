// SolutionHero.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SolutionData } from "./solutionTypes";
import { SolutionStatsCard } from "./SolutionStatsCard";

interface SolutionHeroProps {
  slug: string;
  solution: SolutionData;
}

export function SolutionHero({ slug, solution }: SolutionHeroProps) {
  const Icon = solution.icon;

  return (
    <div className="relative space-y-10">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Breadcrumb */}
      <div className="relative flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Link
          href="/solutions"
          className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
        >
          Solutions
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-foreground font-semibold capitalize">{slug}</span>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-7 space-y-7">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-border/80 bg-card/70 backdrop-blur-sm shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-colors duration-200">
            <div className={`p-1.5 rounded-full ${solution.bgGradient} shadow-sm`}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <span className="text-foreground/90">
              Industry Solution for {solution.title.split(" ")[0]}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.08] bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
            {solution.title}
          </h1>

          <div className="relative pl-5 py-4 pr-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/50 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-cyan-500" />
            <p className="text-base font-bold text-indigo-950 dark:text-indigo-200">
              {solution.banglaTitle}
            </p>
            <p className="text-xs text-indigo-800/80 dark:text-indigo-300 mt-1 leading-relaxed">
              {solution.banglaDesc}
            </p>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            {solution.subtitle}. Specially tailored for the retail environment and supply chain dynamics of Bangladesh.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-sm shadow-md shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card hover:bg-muted hover:border-indigo-300 dark:hover:border-indigo-700 font-semibold text-sm transition-all duration-300 text-foreground"
            >
              Book In-Person Demo
            </Link>
          </div>
        </div>

        <SolutionStatsCard solution={solution} />
      </div>
    </div>
  );
}