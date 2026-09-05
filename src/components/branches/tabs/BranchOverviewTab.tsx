import React from "react";
import { Branch } from "@/types";
import { formatCurrency } from "@/lib/utils";

export function BranchOverviewTab({ branch }: { branch: Branch }) {
  return (
    <div className="space-y-4 text-xs">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-muted/40 border border-border">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Assigned Staff</span>
          <p className="text-xl font-black text-foreground mt-1">{branch.employeeCount || 6}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-muted/40 border border-border">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Today&apos;s Revenue</span>
          <p className="text-xl font-black text-emerald-600 mt-1">
            {formatCurrency(branch.totalSalesToday || 45000)}
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-muted/40 border border-border">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Total Stock Value</span>
          <p className="text-xl font-black text-foreground mt-1">
            {formatCurrency(branch.totalStockValue || 850000)}
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-muted/40 border border-border">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Outlet Status</span>
          <p className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Operational
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl border border-border bg-card space-y-2">
        <h4 className="font-bold text-foreground">Management & Contact Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground">
          <div>
            <span className="font-semibold text-foreground">Branch Manager:</span>{" "}
            {branch.managerName || "Mahfuzur Rahman"}
          </div>
          <div>
            <span className="font-semibold text-foreground">Manager Contact:</span>{" "}
            {branch.managerPhone || "+880 1711-234567"}
          </div>
          <div>
            <span className="font-semibold text-foreground">Official Email:</span>{" "}
            {branch.email || "branch@xyzpos.com"}
          </div>
          <div>
            <span className="font-semibold text-foreground">POS Terminal Count:</span> 2 Counter Registers
          </div>
        </div>
      </div>
    </div>
  );
}
