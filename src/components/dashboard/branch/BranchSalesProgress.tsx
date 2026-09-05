import React from "react";
import { formatCurrency } from "@/lib/utils";

interface BranchSalesProgressProps {
  branchName: string;
  branchSalesTotal: number;
  branchDailyTarget: number;
  targetPercent: number;
}

export function BranchSalesProgress({
  branchName,
  branchSalesTotal,
  branchDailyTarget,
  targetPercent,
}: BranchSalesProgressProps) {
  return (
    <div className="lg:col-span-2 rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Daily Branch Sales Progress
          </h3>
          <p className="text-xs text-muted-foreground">
            Revenue vs target progress for {branchName}
          </p>
        </div>
        <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 font-mono">
          {targetPercent}% Achieved
        </span>
      </div>

      {/* Custom Progress Bar */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted/60 rounded-full overflow-hidden p-0.5 border border-border/60">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${targetPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>Earned: {formatCurrency(branchSalesTotal)}</span>
          <span>Daily Target: {formatCurrency(branchDailyTarget)}</span>
        </div>
      </div>

      {/* Cashier Till Breakdown */}
      <div className="pt-3 border-t border-border/60">
        <h4 className="text-xs font-bold text-foreground mb-2.5">
          Active Counter Registers Today
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-muted/20 border border-border/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-black text-xs">
                C1
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">Counter 1 (Main POS)</div>
                <div className="text-[10px] text-muted-foreground">Cashier: Tanzim • 28 Invoices</div>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-xs text-foreground">
              ৳54,200
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-muted/20 border border-border/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-black text-xs">
                C2
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">Counter 2 (Express)</div>
                <div className="text-[10px] text-muted-foreground">Cashier: Farhana • 14 Invoices</div>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-xs text-foreground">
              ৳30,300
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
