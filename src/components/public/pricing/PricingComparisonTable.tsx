import React from "react";
import { Check } from "lucide-react";
import { COMPARISON_FEATURES } from "./pricingData";

export function PricingComparisonTable() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center tracking-tight">
        Compare Plan Features
      </h2>

      <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-sm">
        <table className="w-full text-left text-xs min-w-[640px]">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="p-5 font-semibold text-foreground text-sm">Feature</th>
              <th className="p-5 text-center font-semibold text-foreground text-sm">
                Starter
              </th>
              <th className="p-5 text-center font-bold text-indigo-600 dark:text-indigo-400 text-sm bg-indigo-50/60 dark:bg-indigo-950/30 border-x border-indigo-200/50 dark:border-indigo-800/40">
                Business
              </th>
              <th className="p-5 text-center font-semibold text-foreground text-sm">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {COMPARISON_FEATURES.map((feat, idx) => (
              <tr key={idx} className="group hover:bg-muted/30 transition-colors duration-200">
                <td className="p-5 font-semibold text-foreground align-middle">
                  {feat.name}
                </td>
                <td className="p-5 text-center text-muted-foreground align-middle">
                  {typeof feat.starter === "boolean" ? (
                    feat.starter ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 mx-auto">
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span className="text-muted-foreground/50">—</span>
                    )
                  ) : (
                    feat.starter
                  )}
                </td>
                <td className="p-5 text-center font-semibold text-indigo-700 dark:text-indigo-300 align-middle bg-indigo-50/60 dark:bg-indigo-950/30 border-x border-indigo-200/50 dark:border-indigo-800/40 group-hover:bg-indigo-50/90 dark:group-hover:bg-indigo-950/50 transition-colors duration-200">
                  {typeof feat.business === "boolean" ? (
                    feat.business ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 mx-auto">
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span className="text-indigo-400/60 dark:text-indigo-500/50">—</span>
                    )
                  ) : (
                    feat.business
                  )}
                </td>
                <td className="p-5 text-center font-semibold text-muted-foreground align-middle">
                  {typeof feat.enterprise === "boolean" ? (
                    feat.enterprise ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 mx-auto">
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span className="text-muted-foreground/50">—</span>
                    )
                  ) : (
                    feat.enterprise
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}