import React from "react";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, FileText, CreditCard } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface AccountantKpisProps {
  todaySalesTotal: number;
  totalVATCollected: number;
  totalLiquidCash: number;
  totalCustomerDue: number;
  debtorsCount: number;
}

export function AccountantKpis({
  todaySalesTotal,
  totalVATCollected,
  totalLiquidCash,
  totalCustomerDue,
  debtorsCount,
}: AccountantKpisProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Gross Revenue Today"
        value={formatCurrency(todaySalesTotal)}
        change="+12.4% vs avg"
        isPositive={true}
        icon={DollarSign}
        description="Cash &amp; credit invoiced"
        iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
        iconTextColor="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        title="NBR Output VAT (5%)"
        value={formatCurrency(totalVATCollected || todaySalesTotal * 0.05)}
        change="Mushak 6.3 Auto"
        isPositive={true}
        icon={FileText}
        description="Fiscal tax ledger"
        iconBgColor="bg-blue-50 dark:bg-blue-950/60"
        iconTextColor="text-blue-600 dark:text-blue-400"
      />

      <StatCard
        title="Liquid Cash &amp; Bank"
        value={formatCurrency(totalLiquidCash)}
        change="3 Accounts Reconciled"
        isPositive={true}
        icon={CreditCard}
        description="Bank + bKash + Till"
        iconBgColor="bg-purple-50 dark:bg-purple-950/60"
        iconTextColor="text-purple-600 dark:text-purple-400"
      />

      <StatCard
        title="Accounts Receivable"
        value={formatCurrency(totalCustomerDue)}
        change={`${debtorsCount} Debtors`}
        isPositive={false}
        icon={CreditCard}
        description="Customer dues outstanding"
        iconBgColor="bg-rose-50 dark:bg-rose-950/60"
        iconTextColor="text-rose-600 dark:text-rose-400"
      />
    </div>
  );
}
