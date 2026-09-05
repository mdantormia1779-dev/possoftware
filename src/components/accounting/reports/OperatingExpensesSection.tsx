import React from "react";
import { formatCurrency } from "@/lib/utils";

interface OperatingExpensesSectionProps {
  staffSalaryExpense: number;
  commissionsExpense: number;
  rentExpense: number;
  utilitiesExpense: number;
  marketingExpense: number;
  totalOperatingExpenses: number;
}

export function OperatingExpensesSection({
  staffSalaryExpense,
  commissionsExpense,
  rentExpense,
  utilitiesExpense,
  marketingExpense,
  totalOperatingExpenses,
}: OperatingExpensesSectionProps) {
  return (
    <div className="space-y-2">
      <h4 className="font-bold text-foreground uppercase tracking-wider text-xs border-b border-border pb-1">
        3. Operating &amp; Administrative Expenses
      </h4>
      <div className="flex justify-between py-1">
        <span>Staff Salaries &amp; Allowances</span>
        <span className="font-mono">{formatCurrency(staffSalaryExpense)}</span>
      </div>
      <div className="flex justify-between py-1">
        <span>Sales Staff POS Commissions</span>
        <span className="font-mono">{formatCurrency(commissionsExpense)}</span>
      </div>
      <div className="flex justify-between py-1">
        <span>Outlet Showroom &amp; Floor Leases (Banani, Dhanmondi, GEC)</span>
        <span className="font-mono">{formatCurrency(rentExpense)}</span>
      </div>
      <div className="flex justify-between py-1">
        <span>DESCO / DPDC Electricity &amp; Generator Utilities</span>
        <span className="font-mono">{formatCurrency(utilitiesExpense)}</span>
      </div>
      <div className="flex justify-between py-1">
        <span>SMS Broadcast Campaigns &amp; Marketing</span>
        <span className="font-mono">{formatCurrency(marketingExpense)}</span>
      </div>
      <div className="flex justify-between py-1.5 font-bold border-t border-border text-rose-600">
        <span>Total Operating Expenses</span>
        <span className="font-mono">({formatCurrency(totalOperatingExpenses)})</span>
      </div>
    </div>
  );
}
