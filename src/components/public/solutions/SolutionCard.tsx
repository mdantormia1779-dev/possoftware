import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SolutionItem } from "./solutionsData";

interface SolutionCardProps {
  solution: SolutionItem;
}

export function SolutionCard({ solution }: SolutionCardProps) {
  return (
    <div className="group relative h-full flex flex-col justify-between p-8 rounded-3xl border border-border bg-gradient-to-b from-card to-card/60 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 hover:border-indigo-300 dark:hover:border-indigo-700/70 transition-all duration-300 ease-out overflow-hidden">
      {/* Subtle top glow on hover */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/50 dark:to-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 text-3xl shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 ease-out">
          {solution.icon}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-1.5 tracking-tight">
          {solution.title}
        </h3>
        <p className="text-xs text-muted-foreground/90 mb-7 font-medium leading-relaxed">
          {solution.tagline}
        </p>

        <ul className="space-y-3 text-xs text-muted-foreground mb-8">
          {solution.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 mt-0.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
              </span>
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={`/solutions/${solution.slug}`}
        className="relative inline-flex items-center justify-between w-full p-3.5 rounded-xl bg-foreground/[0.03] hover:bg-indigo-600 border border-border hover:border-indigo-600 text-xs font-semibold text-foreground hover:text-white group/link transition-all duration-300"
      >
        <span>Explore {solution.title.split(" ")[0]} Edition</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/link:text-white group-hover/link:translate-x-1 transition-all duration-300" />
      </Link>
    </div>
  );
}