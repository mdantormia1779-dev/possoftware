import React, { useRef } from "react";
import { PayrollItem, PayrollRun, Organization } from "@/lib/types";
import { FileCheck, X, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { printDocument } from "@/utils/printDocument";
import { PayrollPayslipPrintable } from "./PayrollPayslipPrintable";

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
  const printableRef = useRef<HTMLDivElement>(null);

  if (!item || !run) return null;

  const handlePrint = () => {
    printDocument(printableRef.current, {
      title: `Payslip-${item.employeeName}-${run.monthYear}`,
      size: "a4",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-border no-print">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-indigo-600" />
            <h3 className="font-bold text-base text-foreground">Official Salary Payslip</h3>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <PayrollPayslipPrintable
          ref={printableRef}
          item={item}
          run={run}
          currentOrg={currentOrg}
        />

        <div className="flex justify-end gap-2 pt-2 no-print">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1.5" /> Print Payslip
          </Button>
        </div>
      </div>
    </div>
  );
}
