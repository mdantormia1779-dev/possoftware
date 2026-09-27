import React from "react";
import { Building2, MessageSquareText, FileBarChart } from "lucide-react";

export function PricingAddons() {
  return (
    <div className="relative rounded-3xl border border-border bg-gradient-to-b from-card to-card/60 p-6 sm:p-9 shadow-sm space-y-7 overflow-hidden">
      {/* subtle corner glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-indigo-500/[0.06] blur-3xl" />

      <div className="relative">
        <h3 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
          Modular Add-ons
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Scale individual resources as your business expands
        </p>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="group p-5 rounded-2xl border border-border/70 bg-muted/20 hover:bg-muted/40 hover:border-indigo-300 dark:hover:border-indigo-700/60 flex items-start justify-between gap-3 transition-all duration-300 hover:-translate-y-0.5">
          <div className="flex items-start gap-3 min-w-0">
            <span className="shrink-0 h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Building2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-foreground leading-snug">
                Additional Branch Outlet
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Extra location with sync
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">৳1,200</div>
            <div className="text-[10px] text-muted-foreground">/ month</div>
          </div>
        </div>

        <div className="group p-5 rounded-2xl border border-border/70 bg-muted/20 hover:bg-muted/40 hover:border-indigo-300 dark:hover:border-indigo-700/60 flex items-start justify-between gap-3 transition-all duration-300 hover:-translate-y-0.5">
          <div className="flex items-start gap-3 min-w-0">
            <span className="shrink-0 h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <MessageSquareText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-foreground leading-snug">
                Transactional SMS Bundle
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Non-masking/Masking
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">৳0.35</div>
            <div className="text-[10px] text-muted-foreground">/ SMS</div>
          </div>
        </div>

        <div className="group p-5 rounded-2xl border border-border/70 bg-muted/20 hover:bg-muted/40 hover:border-indigo-300 dark:hover:border-indigo-700/60 flex items-start justify-between gap-3 transition-all duration-300 hover:-translate-y-0.5">
          <div className="flex items-start gap-3 min-w-0">
            <span className="shrink-0 h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <FileBarChart className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-foreground leading-snug">
                Custom Accounting Report
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Designed by ERP engineer
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">৳5,000</div>
            <div className="text-[10px] text-muted-foreground">one-time</div>
          </div>
        </div>
      </div>
    </div>
  );
}