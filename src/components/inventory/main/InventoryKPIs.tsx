import React from "react";
import { Layers, Package, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { formatCurrency } from "@/lib/utils";

interface InventoryKPIsProps {
  totalStockQty: number;
  totalStockValuation: number;
  lowStockCount: number;
  branchCount: number;
}

export function InventoryKPIs({
  totalStockQty,
  totalStockValuation,
  lowStockCount,
  branchCount,
}: InventoryKPIsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <StatCard
        title="Total In-Stock Items"
        value={`${totalStockQty} Units`}
        icon={Layers}
        description={`Distributed across ${branchCount} outlets`}
        iconBgColor="bg-blue-50 dark:bg-blue-950/60"
        iconTextColor="text-blue-600 dark:text-blue-400"
      />

      <StatCard
        title="Inventory Valuation"
        value={formatCurrency(totalStockValuation)}
        icon={Package}
        description="Cost value recorded in Ledger 1060"
        iconBgColor="bg-indigo-50 dark:bg-indigo-950/60"
        iconTextColor="text-indigo-600 dark:text-indigo-400"
      />

      <StatCard
        title="Low Stock Reorders"
        value={`${lowStockCount} Products`}
        isPositive={false}
        icon={AlertTriangle}
        description="Below safety threshold limits"
        iconBgColor="bg-rose-50 dark:bg-rose-950/60"
        iconTextColor="text-rose-600 dark:text-rose-400"
      />
    </div>
  );
}
