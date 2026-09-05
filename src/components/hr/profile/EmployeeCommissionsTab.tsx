import React from "react";
import { Employee } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface EmployeeCommissionsTabProps {
  emp: Employee;
}

export function EmployeeCommissionsTab({ emp }: EmployeeCommissionsTabProps) {
  return (
    <div className="space-y-4 text-xs">
      <h4 className="font-bold text-foreground">Floor Sales &amp; Incentive Matrix</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-muted/40 border border-border">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Month Sales Volume</span>
          <p className="text-lg font-black text-foreground mt-1">{formatCurrency(385000)}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-muted/40 border border-border">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Commission Rate</span>
          <p className="text-lg font-black text-indigo-600 mt-1">{emp.commissionRate}%</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-[10px] text-emerald-700 dark:text-emerald-300 uppercase font-bold">
            Calculated Incentive
          </span>
          <p className="text-lg font-black text-emerald-600 mt-1">{formatCurrency(3850)}</p>
        </div>
      </div>
    </div>
  );
}
