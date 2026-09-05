import React from "react";

export function PricingAddons() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-foreground">Modular Add-ons</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Scale individual resources as your business expands</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-foreground">Additional Branch Outlet</div>
            <div className="text-[11px] text-muted-foreground">Extra location with sync</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">৳1,200</div>
            <div className="text-[10px] text-muted-foreground">/ month</div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-foreground">Transactional SMS Bundle</div>
            <div className="text-[11px] text-muted-foreground">Non-masking/Masking</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">৳0.35</div>
            <div className="text-[10px] text-muted-foreground">/ SMS</div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-foreground">Custom Accounting Report</div>
            <div className="text-[11px] text-muted-foreground">Designed by ERP engineer</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">৳5,000</div>
            <div className="text-[10px] text-muted-foreground">one-time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
