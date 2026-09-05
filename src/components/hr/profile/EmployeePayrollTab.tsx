import React from "react";
import { Employee } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface EmployeePayrollTabProps {
  emp: Employee;
}

export function EmployeePayrollTab({ emp }: EmployeePayrollTabProps) {
  const houseRent = emp.baseSalary * 0.2;
  const earnedCommission = 3850;
  const pfDeduction = 1200;
  const netPayout = emp.baseSalary + houseRent + earnedCommission - pfDeduction;

  return (
    <div className="space-y-4 text-xs">
      <h4 className="font-bold text-foreground">Payslip Breakdown — Current Month</h4>
      <div className="p-4 rounded-2xl border border-border bg-card space-y-2 font-mono">
        <div className="flex justify-between py-1 border-b border-border">
          <span className="font-sans text-muted-foreground">Base Basic Salary:</span>
          <strong className="text-foreground">{formatCurrency(emp.baseSalary)}</strong>
        </div>
        <div className="flex justify-between py-1 border-b border-border">
          <span className="font-sans text-muted-foreground">House Rent &amp; Conveyance Allowance:</span>
          <strong className="text-foreground">{formatCurrency(houseRent)}</strong>
        </div>
        <div className="flex justify-between py-1 border-b border-border">
          <span className="font-sans text-muted-foreground">Earned Sales Commission:</span>
          <strong className="text-emerald-600">+{formatCurrency(earnedCommission)}</strong>
        </div>
        <div className="flex justify-between py-1 border-b border-border">
          <span className="font-sans text-muted-foreground">Provident Fund Deduction (PF):</span>
          <strong className="text-rose-600">-{formatCurrency(pfDeduction)}</strong>
        </div>
        <div className="flex justify-between pt-2 text-sm">
          <span className="font-sans font-black text-foreground">Net Payout Amount:</span>
          <strong className="font-black text-indigo-600 dark:text-indigo-400">
            {formatCurrency(netPayout)}
          </strong>
        </div>
      </div>
    </div>
  );
}
