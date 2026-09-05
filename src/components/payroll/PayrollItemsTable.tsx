import React from "react";
import { PayrollRun, PayrollItem } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { FileCheck } from "lucide-react";

interface PayrollItemsTableProps {
  selectedRun: PayrollRun;
  onViewPayslip: (item: PayrollItem) => void;
}

export function PayrollItemsTable({
  selectedRun,
  onViewPayslip,
}: PayrollItemsTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs space-y-4 p-5">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h3 className="text-base font-bold text-foreground">
            Disbursement Breakdown — {selectedRun.monthYear}
          </h3>
          <p className="text-xs text-muted-foreground">
            Auto-calculated sales commissions &amp; bank net pay
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-foreground">
            Total Salary Expense: {formatCurrency(selectedRun.totalAmount)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="p-3 font-semibold text-foreground">Employee</th>
              <th className="p-3 font-semibold text-foreground">Designation</th>
              <th className="p-3 font-semibold text-foreground">Branch</th>
              <th className="p-3 font-semibold text-foreground">Base Salary (৳)</th>
              <th className="p-3 font-semibold text-foreground">Sales Commission (৳)</th>
              <th className="p-3 font-semibold text-foreground">Deductions (৳)</th>
              <th className="p-3 font-semibold text-foreground">Net Salary (৳)</th>
              <th className="p-3 text-right font-semibold text-foreground">Payslip</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {selectedRun.items.map((item) => (
              <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3 font-bold text-foreground">{item.employeeName}</td>
                <td className="p-3 text-muted-foreground">{item.designation}</td>
                <td className="p-3 text-muted-foreground">{item.branchName}</td>
                <td className="p-3 font-mono">{formatCurrency(item.baseSalary)}</td>
                <td className="p-3 font-mono text-emerald-600 font-semibold">+{formatCurrency(item.commission)}</td>
                <td className="p-3 font-mono text-muted-foreground">-{formatCurrency(item.deductions)}</td>
                <td className="p-3 font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                  {formatCurrency(item.netSalary)}
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => onViewPayslip(item)}
                    className="px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-[11px] font-semibold text-foreground"
                  >
                    <FileCheck className="h-3.5 w-3.5 inline mr-1" /> View Payslip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
