import React from "react";
import { formatCurrency } from "@/lib/utils";

export function BranchReportsTab() {
  return (
    <div className="space-y-4 text-xs">
      <h4 className="font-bold text-foreground">Monthly Branch Profitability & Cost Statement</h4>
      <div className="p-4 rounded-2xl border border-border bg-muted/20 space-y-2">
        <div className="flex justify-between py-1 border-b border-border">
          <span className="text-muted-foreground">Gross Sales Revenue:</span>
          <strong className="font-mono text-foreground">{formatCurrency(780000)}</strong>
        </div>
        <div className="flex justify-between py-1 border-b border-border">
          <span className="text-muted-foreground">Cost of Goods Sold (COGS):</span>
          <strong className="font-mono text-muted-foreground">-{formatCurrency(460000)}</strong>
        </div>
        <div className="flex justify-between py-1 border-b border-border">
          <span className="text-muted-foreground">Outlet Rent & Utilities:</span>
          <strong className="font-mono text-muted-foreground">-{formatCurrency(85000)}</strong>
        </div>
        <div className="flex justify-between py-1 border-b border-border">
          <span className="text-muted-foreground">Staff Salaries & Commissions:</span>
          <strong className="font-mono text-muted-foreground">-{formatCurrency(92000)}</strong>
        </div>
        <div className="flex justify-between pt-2 text-sm">
          <span className="font-extrabold text-foreground">Net Branch Profit (EBITDA):</span>
          <strong className="font-mono font-black text-emerald-600">{formatCurrency(143000)}</strong>
        </div>
      </div>
    </div>
  );
}
