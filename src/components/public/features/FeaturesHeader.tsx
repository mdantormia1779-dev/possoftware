import React from "react";
import { Layers, WifiOff, Landmark } from "lucide-react";

const QUICK_STATS = [
  { icon: Layers, label: "17 modules, one login" },
  { icon: WifiOff, label: "Runs fully offline" },
  { icon: Landmark, label: "Built around BDT & bKash/Nagad" },
];

export function FeaturesHeader() {
  return (
    <div className="text-center space-y-5 max-w-3xl mx-auto">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-600/10 px-3 py-1 rounded-full">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
        The complete business operating system
      </span>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
        Everything a growing Bangladeshi business needs
      </h1>

      <p className="text-base text-muted-foreground leading-relaxed">
        From the checkout counter to the balance sheet, one platform keeps every branch in sync
        and stays financially disciplined &mdash; even when the internet doesn&rsquo;t.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1">
        {QUICK_STATS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
          >
            <Icon className="h-3.5 w-3.5 text-indigo-600" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}