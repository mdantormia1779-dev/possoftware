import React, { forwardRef } from "react";
import { PayrollItem, PayrollRun, Organization } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface PayrollPayslipPrintableProps {
  item: PayrollItem;
  run: PayrollRun;
  currentOrg: Organization;
}

export const PayrollPayslipPrintable = forwardRef<HTMLDivElement, PayrollPayslipPrintableProps>(
  ({ item, run, currentOrg }, ref) => {
    return (
      <div ref={ref} className="p-4 rounded-2xl border border-border bg-card space-y-4 text-xs text-foreground">
        <div className="text-center border-b border-border pb-3">
          <h4 className="text-base font-extrabold text-foreground uppercase">{currentOrg.name}</h4>
          <p className="text-muted-foreground text-[10px]">{currentOrg.address}</p>
          <span className="inline-block mt-1 font-bold text-indigo-600 text-xs uppercase">
            Payslip for {run.monthYear}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px]">Employee Name</span>
            <strong className="text-foreground">{item.employeeName}</strong>
          </div>
          <div>
            <span className="text-muted-foreground block text-[10px]">Designation</span>
            <strong className="text-foreground">{item.designation}</strong>
          </div>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-border">
          <div className="flex justify-between">
            <span>Base Monthly Salary:</span>
            <span className="font-mono">{formatCurrency(item.baseSalary)}</span>
          </div>
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Sales Performance Commission:</span>
            <span className="font-mono font-semibold">+{formatCurrency(item.commission)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Unpaid Leave / Tax Deductions:</span>
            <span className="font-mono">-{formatCurrency(item.deductions)}</span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-foreground pt-2 border-t border-border">
            <span>NET SALARY DISBURSED:</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono">
              {formatCurrency(item.netSalary)}
            </span>
          </div>
        </div>

        <div className="pt-8 border-t border-border grid grid-cols-2 gap-8 text-xs">
          <div className="text-center">
            <div className="border-t border-dashed border-border pt-1 font-semibold text-muted-foreground">
              Employee Signature
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-dashed border-border pt-1 font-semibold text-muted-foreground">
              HR / Accounts Signatory
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PayrollPayslipPrintable.displayName = "PayrollPayslipPrintable";
