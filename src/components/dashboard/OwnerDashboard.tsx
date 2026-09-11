"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { useOwnerDashboard } from "./owner/useOwnerDashboard";
import { OwnerKpis } from "./owner/OwnerKpis";
import { OwnerSalesVelocityChart } from "./owner/OwnerSalesVelocityChart";
import { OwnerPaymentBreakdown } from "./owner/OwnerPaymentBreakdown";
import { OwnerBranchSalesChart } from "./owner/OwnerBranchSalesChart";
import { OwnerCriticalInventoryAndShortcuts } from "./owner/OwnerCriticalInventoryAndShortcuts";
import { OwnerRecentTransactions } from "./owner/OwnerRecentTransactions";
import { DashboardAlertsWidget } from "./DashboardAlertsWidget";

export function OwnerDashboard() {
  const { setActiveReceiptSale } = useTenant();
  const {
    sales,
    todaySalesTotal,
    grossProfitEstimate,
    totalStockValuation,
    totalDueOutstanding,
    skusCount,
    branchSalesData,
    lowStockProducts,
  } = useOwnerDashboard();

  return (
    <div className="space-y-6">
      <OwnerKpis
        todaySalesTotal={todaySalesTotal}
        grossProfitEstimate={grossProfitEstimate}
        totalStockValuation={totalStockValuation}
        totalDueOutstanding={totalDueOutstanding}
        skusCount={skusCount}
      />

      <DashboardAlertsWidget />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <OwnerSalesVelocityChart />
        <OwnerPaymentBreakdown />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <OwnerBranchSalesChart data={branchSalesData} />
        <OwnerCriticalInventoryAndShortcuts lowStockProducts={lowStockProducts} />
      </div>

      <OwnerRecentTransactions
        sales={sales}
        onReceiptClick={(sale) => setActiveReceiptSale(sale)}
      />
    </div>
  );
}
