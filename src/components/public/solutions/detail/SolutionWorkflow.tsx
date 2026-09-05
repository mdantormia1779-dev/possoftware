import React from "react";
import { SolutionData } from "./solutionTypes";

export function SolutionWorkflow({ solution }: { solution: SolutionData }) {
  return (
    <div className="p-8 sm:p-12 rounded-3xl border border-border bg-card/60 backdrop-blur-sm space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Speed & Accuracy
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
          The {solution.title.split(" ")[0]} Checkout Experience
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {solution.workflow.map((w, idx) => (
          <div key={idx} className="relative p-5 rounded-2xl bg-background border border-border space-y-2">
            <span className="text-3xl font-black text-indigo-600/30 dark:text-indigo-400/30">
              {w.step}
            </span>
            <h4 className="text-sm font-bold text-foreground">{w.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{w.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
