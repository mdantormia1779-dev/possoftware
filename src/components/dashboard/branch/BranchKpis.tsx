import React from "react";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, Users, AlertTriangle, Truck } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface BranchKpisProps {
  branchSalesTotal: number;
  branchDailyTarget: number;
  targetPercent: number;
  staffOnDutyCount: number;
  totalEmployeesCount: number;
  lowStockCount: number;
  transfersCount: number;
}

export function BranchKpis({
  branchSalesTotal,
  branchDailyTarget,
  targetPercent,
  staffOnDutyCount,
  totalEmployeesCount,
  lowStockCount,
  transfersCount,
}: BranchKpisProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Today's Branch Sales"
        value={formatCurrency(branchSalesTotal)}
        change={`${targetPercent}% of Goal`}
        isPositive={targetPercent >= 70}
        icon={DollarSign}
        description={`Target: ${formatCurrency(branchDailyTarget)}`}
        iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
        iconTextColor="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        title="Staff On Duty"
        value={`${staffOnDutyCount} / ${totalEmployeesCount || 6}`}
        change="All Check-ins Verified"
        isPositive={true}
        icon={Users}
        description="Branch floor &amp; till roster"
        iconBgColor="bg-blue-50 dark:bg-blue-950/60"
        iconTextColor="text-blue-600 dark:text-blue-400"
      />

      <StatCard
        title="Low Stock Alerts"
        value={lowStockCount}
        change="Need Inter-Branch Reorder"
        isPositive={false}
        icon={AlertTriangle}
        description="SKUs below threshold"
        iconBgColor="bg-amber-50 dark:bg-amber-950/60"
        iconTextColor="text-amber-600 dark:text-amber-400"
      />

      <StatCard
        title="Pending Transfers"
        value={transfersCount || 2}
        change="1 Inbound • 1 Outbound"
        icon={Truck}
        description="HQ stock movement"
        iconBgColor="bg-purple-50 dark:bg-purple-950/60"
        iconTextColor="text-purple-600 dark:text-purple-400"
      />
    </div>
  );
}
