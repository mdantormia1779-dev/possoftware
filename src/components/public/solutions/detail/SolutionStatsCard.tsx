// SolutionStatsCard.tsx
import React from "react";
import { ShieldCheck } from "lucide-react";
import { SolutionData } from "./solutionTypes";

export function SolutionStatsCard({ solution }: { solution: SolutionData }) {
  return (
    <div className="lg:col-span-5 relative">
      {/* Soft glow behind card */}
      <div className="pointer-events-none absolute -inset-4 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 blur-2xl rounded-3xl" />

      <div className="relative p-7 sm:p-8 rounded-3xl border border-border/80 bg-card/90 backdrop-blur-sm shadow-xl shadow-black/[0.03] dark:shadow-black/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 space-y-6 max-w-full overflow-hidden">
        <div className="flex items-center justify-between gap-4 pb-5 border-b border-border/70">
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Recommended Tier
            </span>
            <h4 className="text-xl font-black text-foreground mt-1 truncate">
              {solution.recommendedPlan}
            </h4>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl sm:text-3xl font-black bg-gradient-to-br from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              {solution.recommendedPrice}
            </span>
            <p className="text-[11px] text-muted-foreground mt-0.5">Billed monthly</p>
          </div>
        </div>

        <div className="space-y-3.5">
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Operational Benchmarks
          </h5>
          <div className="grid grid-cols-1 gap-2.5">
            {solution.stats.map((stat, idx) => (
              <div
                key={idx}
                className="group p-3.5 rounded-xl bg-muted/40 border border-border/50 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:bg-muted/70 flex items-center justify-between gap-3 transition-all duration-200"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground/90 truncate">{stat.label}</p>
                  <p className="text-[11px] text-muted-foreground/80 truncate">{stat.detail}</p>
                </div>
                <span className="text-base font-extrabold text-foreground shrink-0 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40">
          <div className="shrink-0 h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-xs leading-relaxed text-emerald-800 dark:text-emerald-300">
            100% Offline-First Architecture. Works through power cuts and broadband disruptions.
          </span>
        </div>
      </div>
    </div>
  );
}