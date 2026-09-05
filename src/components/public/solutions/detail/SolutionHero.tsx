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
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Link href="/solutions" className="hover:text-foreground">
          Solutions
        </Link>
        <span>/</span>
        <span className="text-foreground capitalize">{slug}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-border bg-muted/60">
            <div className={`p-1 rounded-full ${solution.bgGradient}`}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <span>Industry Solution for {solution.title.split(" ")[0]}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {solution.title}
          </h1>

          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/50">
            <p className="text-base font-bold text-indigo-950 dark:text-indigo-200">
              {solution.banglaTitle}
            </p>
            <p className="text-xs text-indigo-800/80 dark:text-indigo-300 mt-1">
              {solution.banglaDesc}
            </p>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {solution.subtitle}. Specially tailored for the retail environment and supply chain dynamics of Bangladesh.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card hover:bg-muted font-semibold text-sm transition-colors text-foreground"
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
