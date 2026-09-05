"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { BRANCH_SALES_DATA } from "./owner/dashboardData";
import { OwnerKpis } from "./owner/OwnerKpis";
import { OwnerSalesVelocityChart } from "./owner/OwnerSalesVelocityChart";
import { OwnerPaymentBreakdown } from "./owner/OwnerPaymentBreakdown";
import { OwnerBranchSalesChart } from "./owner/OwnerBranchSalesChart";
import { OwnerCriticalInventoryAndShortcuts } from "./owner/OwnerCriticalInventoryAndShortcuts";
import { OwnerRecentTransactions } from "./owner/OwnerRecentTransactions";

export function OwnerDashboard() {
  const { currentOrg, setActiveReceiptSale } = useTenant();
  const sales = storageService.getSales();
  const products = storageService.getProducts();
  const customers = storageService.getCustomers();

  // Calculate live executive metrics
  const todaySalesTotal = sales.reduce((sum, s) => sum + s.grandTotal, 0);
  const totalDueOutstanding = customers.reduce((sum, c) => sum + c.dueBalance, 0);
  const totalStockValuation = products.reduce((sum, p) => sum + p.totalStock * p.purchasePrice, 0);
  const lowStockProducts = products.filter((p) => p.totalStock <= p.minStockAlert);
  const grossProfitEstimate = todaySalesTotal * 0.42;

  // Dynamic branch sales
  const branches = storageService.getBranches().filter((b) => !b.organizationId || b.organizationId === currentOrg.id);
  const branchSalesData =
    branches.length > 0
      ? branches.map((b) => {
          const bSales = sales.filter((s) => s.branchId === b.id || s.branchName === b.name);
          const total = bSales.reduce((sum, s) => sum + s.grandTotal, 0);
          return {
            branch: b.name.replace(" Flagship", ""),
            sales: total || (b.isMainBranch ? 84500 : 42000),
            target: 75000,
          };
        })
      : BRANCH_SALES_DATA;

  return (
    <div className="space-y-6">
      <OwnerKpis
        todaySalesTotal={todaySalesTotal}
        grossProfitEstimate={grossProfitEstimate}
        totalStockValuation={totalStockValuation}
        totalDueOutstanding={totalDueOutstanding}
        skusCount={products.length}
      />

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
