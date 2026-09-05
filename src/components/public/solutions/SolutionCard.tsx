import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SolutionItem } from "./solutionsData";

interface SolutionCardProps {
  solution: SolutionItem;
}

export function SolutionCard({ solution }: SolutionCardProps) {
  return (
    <div className="p-8 rounded-3xl border border-border bg-card shadow-xs hover:shadow-xl transition-all hover:border-indigo-300 dark:hover:border-indigo-700 flex flex-col justify-between">
      <div>
        <div className="text-4xl mb-4">{solution.icon}</div>
        <h3 className="text-xl font-bold text-foreground mb-1">{solution.title}</h3>
        <p className="text-xs text-muted-foreground mb-6 font-medium">{solution.tagline}</p>
        <ul className="space-y-2.5 text-xs text-muted-foreground mb-8">
          {solution.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={`/solutions/${solution.slug}`}
        className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-muted/60 hover:bg-muted text-xs font-semibold text-foreground group transition-colors"
      >
        <span>Explore {solution.title.split(" ")[0]} Edition</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo-600 transition-colors" />
      </Link>
    </div>
  );
}
