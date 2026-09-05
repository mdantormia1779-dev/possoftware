import React from "react";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, Receipt, ShoppingCart, CreditCard } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface CashierKpisProps {
  cashInTill: number;
  shiftTotalAmount: number;
  shiftOrdersCount: number;
  avgOrderValue: number;
}

export function CashierKpis({
  cashInTill,
  shiftTotalAmount,
  shiftOrdersCount,
  avgOrderValue,
}: CashierKpisProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Cash in Till Drawer"
        value={formatCurrency(cashInTill)}
        change="Physical Cash"
        isPositive={true}
        icon={DollarSign}
        description="Current drawer cash"
        iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
        iconTextColor="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        title="Today's Shift Sales"
        value={formatCurrency(shiftTotalAmount)}
        change="+16% vs yesterday"
        isPositive={true}
        icon={Receipt}
        description="Total gross rung"
        iconBgColor="bg-indigo-50 dark:bg-indigo-950/60"
        iconTextColor="text-indigo-600 dark:text-indigo-400"
      />

      <StatCard
        title="Invoices Rung"
        value={shiftOrdersCount}
        change="Average 4.2 mins/sale"
        isPositive={true}
        icon={ShoppingCart}
        description="Customer checkouts"
        iconBgColor="bg-blue-50 dark:bg-blue-950/60"
        iconTextColor="text-blue-600 dark:text-blue-400"
      />

      <StatCard
        title="Avg Order Value"
        value={formatCurrency(avgOrderValue)}
        change="Basket size"
        icon={CreditCard}
        description="Per receipt average"
        iconBgColor="bg-purple-50 dark:bg-purple-950/60"
        iconTextColor="text-purple-600 dark:text-purple-400"
      />
    </div>
  );
}
