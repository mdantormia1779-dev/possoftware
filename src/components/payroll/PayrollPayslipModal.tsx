import React from "react";
import { PayrollItem, PayrollRun, Organization } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { FileCheck, X, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PayrollPayslipModalProps {
  item: PayrollItem | null;
  run: PayrollRun | null;
  currentOrg: Organization;
  onClose: () => void;
}

export function PayrollPayslipModal({
  item,
  run,
  currentOrg,
  onClose,
}: PayrollPayslipModalProps) {
  if (!item || !run) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-indigo-600" />
            <h3 className="font-bold text-base text-foreground">Official Salary Payslip</h3>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-muted/20 space-y-4 text-xs">
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
            <div className="flex justify-between text-emerald-600">
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
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-1.5" /> Print Payslip
          </Button>
        </div>
      </div>
    </div>
  );
}
