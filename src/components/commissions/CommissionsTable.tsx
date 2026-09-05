import React from "react";
import { Employee } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface CommissionsTableProps {
  employees: Employee[];
}

export function CommissionsTable({ employees }: CommissionsTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
      <div className="p-4 border-b border-border bg-muted/20">
        <h3 className="text-sm font-bold text-foreground">Sales Staff Incentive Matrix</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="p-3.5 font-semibold text-foreground">Employee</th>
              <th className="p-3.5 font-semibold text-foreground">Outlet Branch</th>
              <th className="p-3.5 font-semibold text-foreground">Designation</th>
              <th className="p-3.5 font-semibold text-foreground">Commission Rate</th>
              <th className="p-3.5 font-semibold text-foreground">Month Sales Handled (৳)</th>
              <th className="p-3.5 text-right font-semibold text-foreground">Commission Earned (৳)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {employees.map((emp) => {
              const salesHandled = emp.designation.includes("Manager") ? 84500 : 46200;
              const earned = (salesHandled * emp.commissionRate) / 100;

              return (
                <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 font-bold text-foreground">{emp.name}</td>
                  <td className="p-3.5 text-muted-foreground">{emp.branchName}</td>
                  <td className="p-3.5 text-muted-foreground">{emp.designation}</td>
                  <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{emp.commissionRate}%</td>
                  <td className="p-3.5 font-mono">{formatCurrency(salesHandled)}</td>
                  <td className="p-3.5 text-right font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(earned)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
