import React from "react";
import { Branch } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface BranchCardMetricsProps {
  branch: Branch;
}

export function BranchCardMetrics({ branch }: BranchCardMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border text-xs">
      <div className="p-2.5 rounded-xl bg-muted/30 border border-border">
        <span className="text-[10px] text-muted-foreground block font-sans">Today&apos;s Sales</span>
        <strong className="text-foreground font-mono font-bold">
          {formatCurrency(branch.totalSalesToday || 45000)}
        </strong>
      </div>
      <div className="p-2.5 rounded-xl bg-muted/30 border border-border">
        <span className="text-[10px] text-muted-foreground block font-sans">Stock Value</span>
        <strong className="text-foreground font-mono font-bold">
          {formatCurrency(branch.totalStockValue || 850000)}
        </strong>
      </div>
    </div>
  );
}
