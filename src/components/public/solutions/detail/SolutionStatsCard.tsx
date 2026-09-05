import React from "react";
import { ShieldCheck } from "lucide-react";
import { SolutionData } from "./solutionTypes";

export function SolutionStatsCard({ solution }: { solution: SolutionData }) {
  return (
    <div className="lg:col-span-5 p-8 rounded-3xl border border-border bg-card shadow-lg space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Recommended Tier
          </span>
          <h4 className="text-xl font-black text-foreground">{solution.recommendedPlan}</h4>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {solution.recommendedPrice}
          </span>
          <p className="text-[11px] text-muted-foreground">Billed monthly</p>
        </div>
      </div>

      <div className="space-y-4">
        <h5 className="text-xs font-bold uppercase tracking-wider text-foreground">
          Operational Benchmarks
        </h5>
        <div className="grid grid-cols-1 gap-3">
          {solution.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-muted/50 border border-border/60 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-[11px] text-muted-foreground/80">{stat.detail}</p>
              </div>
              <span className="text-base font-extrabold text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-3">
        <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
        <span>100% Offline-First Architecture. Works through power cuts and broadband disruptions.</span>
      </div>
    </div>
  );
}
