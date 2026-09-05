import React from "react";
import { PayrollRun } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";

interface PayrollRunCardsProps {
  payrollRuns: PayrollRun[];
  selectedRun: PayrollRun | null;
  onSelectRun: (run: PayrollRun) => void;
}

export function PayrollRunCards({
  payrollRuns,
  selectedRun,
  onSelectRun,
}: PayrollRunCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {payrollRuns.map((run) => (
        <div
          key={run.id}
          onClick={() => onSelectRun(run)}
          className={`p-5 rounded-2xl border bg-card shadow-xs cursor-pointer transition-all ${
            selectedRun?.id === run.id
              ? "border-indigo-600 ring-2 ring-indigo-500/20"
              : "border-border hover:border-indigo-300"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">{run.monthYear}</h3>
              <span className="text-xs text-muted-foreground">{run.items.length} Employees</span>
            </div>
            <StatusBadge status={run.status} />
          </div>
          <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-3">
            {formatCurrency(run.totalAmount)}
          </div>
          <span className="text-[10px] text-muted-foreground block mt-1">
            Disbursed from Ledger 1040 (City Bank)
          </span>
        </div>
      ))}
    </div>
  );
}
