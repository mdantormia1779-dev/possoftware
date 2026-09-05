import React from "react";
import { Check } from "lucide-react";
import { COMPARISON_FEATURES } from "./pricingData";

export function PricingComparisonTable() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground text-center">
        Compare Plan Features
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="p-4 font-semibold text-foreground">Feature</th>
              <th className="p-4 text-center font-semibold text-foreground">Starter</th>
              <th className="p-4 text-center font-semibold text-indigo-600 dark:text-indigo-400">Business</th>
              <th className="p-4 text-center font-semibold text-foreground">Enterprise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {COMPARISON_FEATURES.map((feat, idx) => (
              <tr key={idx} className="hover:bg-muted/30">
                <td className="p-4 font-medium text-foreground">{feat.name}</td>
                <td className="p-4 text-center text-muted-foreground">
                  {typeof feat.starter === "boolean" ? (
                    feat.starter ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : "-"
                  ) : (
                    feat.starter
                  )}
                </td>
                <td className="p-4 text-center font-semibold text-indigo-600 dark:text-indigo-400">
                  {typeof feat.business === "boolean" ? (
                    feat.business ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : "-"
                  ) : (
                    feat.business
                  )}
                </td>
                <td className="p-4 text-center text-muted-foreground font-semibold">
                  {typeof feat.enterprise === "boolean" ? (
                    feat.enterprise ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : "-"
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
