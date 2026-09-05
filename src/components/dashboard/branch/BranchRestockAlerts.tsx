import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface BranchRestockAlertsProps {
  branchName: string;
  branchLowStock: Product[];
}

export function BranchRestockAlerts({
  branchName,
  branchLowStock,
}: BranchRestockAlertsProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Branch Restock Alerts
          </h3>
          <p className="text-xs text-muted-foreground">
            Items near depletion at {branchName}
          </p>
        </div>
        <Link
          href="/app/inventory/transfers"
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <span>Transfer from HQ</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-2 text-xs">
        {branchLowStock.slice(0, 4).map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/60 shadow-subtle-xs"
          >
            <div className="truncate pr-2">
              <div className="font-bold text-foreground truncate">{p.name}</div>
              <div className="text-[10px] text-muted-foreground font-mono">
                SKU: {p.sku} • Price: {formatCurrency(p.sellingPrice)}
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-mono">
                {p.totalStock} {p.unit} left
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
