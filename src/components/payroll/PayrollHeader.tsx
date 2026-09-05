import React from "react";
import Link from "next/link";
import { CreditCard, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PayrollHeaderProps {
  onCalculateNextMonth: () => void;
}

export function PayrollHeader({ onCalculateNextMonth }: PayrollHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link href="/app/hr" className="p-2 rounded-lg border border-border hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Payroll Processing &amp; Payslips</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monthly salary calculations, commissions, tax deductions, and printable employee payslips
          </p>
        </div>
      </div>

      <Button variant="primary" size="sm" onClick={onCalculateNextMonth}>
        <Sparkles className="h-4 w-4 mr-1.5" /> Calculate Next Month Payroll
      </Button>
    </div>
  );
}
