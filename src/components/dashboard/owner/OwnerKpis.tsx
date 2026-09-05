import React from "react";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, TrendingUp, Package, CreditCard } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface OwnerKpisProps {
  todaySalesTotal: number;
  grossProfitEstimate: number;
  totalStockValuation: number;
  totalDueOutstanding: number;
  skusCount: number;
}

export function OwnerKpis({
  todaySalesTotal,
  grossProfitEstimate,
  totalStockValuation,
  totalDueOutstanding,
  skusCount,
}: OwnerKpisProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Today's Total Sales"
        value={formatCurrency(todaySalesTotal)}
        change="+18.4%"
        isPositive={true}
        icon={DollarSign}
        description="vs yesterday"
        iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
        iconTextColor="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        title="Est. Gross Profit"
        value={formatCurrency(grossProfitEstimate)}
        change="+14.2%"
        isPositive={true}
        icon={TrendingUp}
        description="42% blended margin"
        iconBgColor="bg-indigo-50 dark:bg-indigo-950/60"
        iconTextColor="text-indigo-600 dark:text-indigo-400"
      />

      <StatCard
        title="Inventory Valuation"
        value={formatCurrency(totalStockValuation)}
        icon={Package}
        description={`${skusCount} SKUs across branches`}
        iconBgColor="bg-blue-50 dark:bg-blue-950/60"
        iconTextColor="text-blue-600 dark:text-blue-400"
      />

      <StatCard
        title="Customer Due Balance"
        value={formatCurrency(totalDueOutstanding)}
        change="3 Overdue"
        isPositive={false}
        icon={CreditCard}
        description="Pending recovery"
        iconBgColor="bg-rose-50 dark:bg-rose-950/60"
        iconTextColor="text-rose-600 dark:text-rose-400"
      />
    </div>
  );
}
