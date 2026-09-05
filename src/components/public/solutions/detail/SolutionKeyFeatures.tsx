import React from "react";
import { SolutionData } from "./solutionTypes";

export function SolutionKeyFeatures({ solution }: { solution: SolutionData }) {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Engineered Capabilities
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
          Why Top Bangladeshi {solution.title.split(" ")[0]} Businesses Choose Us
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {solution.keyFeatures.map((feat, idx) => {
          const FeatIcon = feat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-border bg-card hover:border-indigo-400 transition-all hover:shadow-md space-y-3"
            >
              <div className={`p-2.5 rounded-xl w-fit ${solution.bgGradient}`}>
                <FeatIcon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">{feat.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
