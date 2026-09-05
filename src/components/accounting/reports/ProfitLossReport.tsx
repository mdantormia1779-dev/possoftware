import React from "react";
import { formatCurrency } from "@/lib/utils";
import { OperatingExpensesSection } from "./OperatingExpensesSection";

interface ProfitLossReportProps {
  grossSales: number;
  discounts: number;
  netSalesRevenue: number;
  cogs: number;
  grossProfit: number;
  staffSalaryExpense: number;
  commissionsExpense: number;
  rentExpense: number;
  utilitiesExpense: number;
  marketingExpense: number;
  totalOperatingExpenses: number;
  netOperatingIncome: number;
}

export function ProfitLossReport({
  grossSales,
  discounts,
  netSalesRevenue,
  cogs,
  grossProfit,
  staffSalaryExpense,
  commissionsExpense,
  rentExpense,
  utilitiesExpense,
  marketingExpense,
  totalOperatingExpenses,
  netOperatingIncome,
}: ProfitLossReportProps) {
  return (
    <div className="space-y-6">
      {/* Revenue */}
      <div className="space-y-2">
        <h4 className="font-bold text-foreground uppercase tracking-wider text-xs border-b border-border pb-1">
          1. Operating Revenue
        </h4>
        <div className="flex justify-between py-1">
          <span>Gross Merchandise Sales (POS &amp; Online)</span>
          <span className="font-mono">{formatCurrency(grossSales)}</span>
        </div>
        <div className="flex justify-between py-1 text-muted-foreground">
          <span>Less: Promotional Discounts &amp; Coupons</span>
          <span className="font-mono">{formatCurrency(discounts)}</span>
        </div>
        <div className="flex justify-between py-1.5 font-bold border-t border-border">
          <span>Net Sales Revenue</span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400">{formatCurrency(netSalesRevenue)}</span>
        </div>
      </div>

      {/* COGS */}
      <div className="space-y-2">
        <h4 className="font-bold text-foreground uppercase tracking-wider text-xs border-b border-border pb-1">
          2. Cost of Goods Sold (COGS)
        </h4>
        <div className="flex justify-between py-1">
          <span>Purchase Cost of Sold Inventory</span>
          <span className="font-mono">({formatCurrency(cogs)})</span>
        </div>
        <div className="flex justify-between py-1.5 font-bold border-t border-border">
          <span>Gross Operating Margin / Profit</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(grossProfit)}</span>
        </div>
      </div>

      {/* Operating Expenses */}
      <OperatingExpensesSection
        staffSalaryExpense={staffSalaryExpense}
        commissionsExpense={commissionsExpense}
        rentExpense={rentExpense}
        utilitiesExpense={utilitiesExpense}
        marketingExpense={marketingExpense}
        totalOperatingExpenses={totalOperatingExpenses}
      />

      {/* Net Profit Summary */}
      <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between text-sm font-extrabold text-foreground">
        <span>NET COMPREHENSIVE INCOME / PROFIT:</span>
        <span className="text-indigo-600 dark:text-indigo-400 font-mono text-base">
          {formatCurrency(netOperatingIncome)}
        </span>
      </div>
    </div>
  );
}
