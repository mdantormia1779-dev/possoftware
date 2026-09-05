import React from "react";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, TrendingUp, Building2, ShieldCheck } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface AccountingKpisProps {
  totalRevenue: number;
  totalExpenses: number;
  netOperatingProfit: number;
  totalAssets: number;
}

export function AccountingKpis({
  totalRevenue,
  totalExpenses,
  netOperatingProfit,
  totalAssets,
}: AccountingKpisProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Total Gross Revenue"
        value={formatCurrency(totalRevenue)}
        change="+16.8%"
        isPositive={true}
        icon={TrendingUp}
        description="Sales & other income"
        iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
        iconTextColor="text-emerald-600 dark:text-emerald-400"
      />
      <StatCard
        title="Operating Expenses"
        value={formatCurrency(totalExpenses)}
        icon={DollarSign}
        description="COGS, Rent, Payroll, Utility"
        iconBgColor="bg-amber-50 dark:bg-amber-950/60"
        iconTextColor="text-amber-600 dark:text-amber-400"
      />
      <StatCard
        title="Net Operating Profit"
        value={formatCurrency(netOperatingProfit)}
        change="32.5% Margin"
        isPositive={true}
        icon={ShieldCheck}
        description="Gross revenue minus costs"
        iconBgColor="bg-indigo-50 dark:bg-indigo-950/60"
        iconTextColor="text-indigo-600 dark:text-indigo-400"
      />
      <StatCard
        title="Total Company Assets"
        value={formatCurrency(totalAssets)}
        icon={Building2}
        description="Cash, Banks, Stock, Receivables"
        iconBgColor="bg-blue-50 dark:bg-blue-950/60"
        iconTextColor="text-blue-600 dark:text-blue-400"
      />
    </div>
  );
}
