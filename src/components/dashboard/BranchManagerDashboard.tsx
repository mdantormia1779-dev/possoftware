"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { BranchWelcomeHeader } from "./branch/BranchWelcomeHeader";
import { BranchKpis } from "./branch/BranchKpis";
import { BranchSalesProgress } from "./branch/BranchSalesProgress";
import { BranchRosterSnapshot } from "./branch/BranchRosterSnapshot";
import { BranchRestockAlerts } from "./branch/BranchRestockAlerts";
import { BranchRecentSales } from "./branch/BranchRecentSales";
import { DashboardAlertsWidget } from "./DashboardAlertsWidget";

export function BranchManagerDashboard() {
  const { currentBranch, setActiveReceiptSale } = useTenant();
  const sales = storageService.getSales();
  const products = storageService.getProducts();
  const employees = storageService.getEmployees();
  const transfers = storageService.getTransfers();

  const branchSales = sales.filter((s) => s.branchId === currentBranch.id || s.branchName === currentBranch.name);
  const branchSalesTotal = branchSales.reduce((sum, s) => sum + s.grandTotal, 0);

  const branchDailyTarget = 100000;
  const targetPercent = Math.min(Math.round((branchSalesTotal / branchDailyTarget) * 100), 100);

  const branchEmployees = employees.filter((e) => !e.branchId || e.branchId === currentBranch.id);
  const staffOnDutyCount = Math.max(1, Math.round(branchEmployees.length * 0.8));

  const branchLowStock = products.filter((p) => p.totalStock <= p.minStockAlert);
  const branchTransfers = transfers.filter(
    (t) => t.sourceBranchId === currentBranch.id || t.destinationBranchId === currentBranch.id
  );

  return (
    <div className="space-y-6">
      <BranchWelcomeHeader currentBranch={currentBranch} />

      <BranchKpis
        branchSalesTotal={branchSalesTotal}
        branchDailyTarget={branchDailyTarget}
        targetPercent={targetPercent}
        staffOnDutyCount={staffOnDutyCount}
        totalEmployeesCount={branchEmployees.length}
        lowStockCount={branchLowStock.length}
        transfersCount={branchTransfers.length}
      />

      <DashboardAlertsWidget />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <BranchSalesProgress
          branchName={currentBranch.name}
          branchSalesTotal={branchSalesTotal}
          branchDailyTarget={branchDailyTarget}
          targetPercent={targetPercent}
        />
        <BranchRosterSnapshot />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <BranchRestockAlerts
          branchName={currentBranch.name}
          branchLowStock={branchLowStock}
        />
        <BranchRecentSales
          branchSales={branchSales}
          onReceiptClick={(sale) => setActiveReceiptSale(sale)}
        />
      </div>
    </div>
  );
}
