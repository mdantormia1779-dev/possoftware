"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { CashierHeroBanner } from "./cashier/CashierHeroBanner";
import { CashierKpis } from "./cashier/CashierKpis";
import { CashierTillCollections } from "./cashier/CashierTillCollections";
import { CashierCustomerDueLookup } from "./cashier/CashierCustomerDueLookup";
import { CashierRecentReceipts } from "./cashier/CashierRecentReceipts";
import { DashboardAlertsWidget } from "./DashboardAlertsWidget";

export function CashierDashboard() {
  const { currentBranch, setActiveReceiptSale } = useTenant();
  const sales = storageService.getSales();
  const customers = storageService.getCustomers();
  const [customerSearch, setCustomerSearch] = useState("");

  const branchSales = sales.filter((s) => s.branchId === currentBranch.id || s.branchName === currentBranch.name);
  const shiftOrdersCount = branchSales.length || 28;
  const shiftTotalAmount = branchSales.reduce((sum, s) => sum + s.grandTotal, 0) || 54200;
  const cashInTill = Math.round(shiftTotalAmount * 0.48);
  const avgOrderValue = Math.round(shiftTotalAmount / Math.max(1, shiftOrdersCount));

  const filteredCustomer = customerSearch.trim()
    ? customers.find(
        (c) =>
          c.phone.includes(customerSearch.trim()) ||
          c.name.toLowerCase().includes(customerSearch.toLowerCase().trim())
      )
    : null;

  return (
    <div className="space-y-6">
      <CashierHeroBanner branchName={currentBranch.name} />

      <CashierKpis
        cashInTill={cashInTill}
        shiftTotalAmount={shiftTotalAmount}
        shiftOrdersCount={shiftOrdersCount}
        avgOrderValue={avgOrderValue}
      />

      <DashboardAlertsWidget />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <CashierTillCollections
          cashInTill={cashInTill}
          shiftTotalAmount={shiftTotalAmount}
        />
        <CashierCustomerDueLookup
          customerSearch={customerSearch}
          setCustomerSearch={setCustomerSearch}
          filteredCustomer={filteredCustomer}
        />
      </div>

      <CashierRecentReceipts
        branchSales={branchSales}
        onReprintReceipt={(sale) => setActiveReceiptSale(sale)}
      />
    </div>
  );
}
