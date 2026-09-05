"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { SalesHeader } from "@/components/sales/SalesHeader";
import { SalesFilterBar } from "@/components/sales/SalesFilterBar";
import { SalesTable } from "@/components/sales/SalesTable";
import { SalesDetailModal } from "@/components/sales/SalesDetailModal";
import { useSalesHistory } from "@/components/sales/useSalesHistory";

export default function SalesHistoryPage() {
  const { setActiveReceiptSale, branches } = useTenant();
  const {
    sales,
    searchQuery,
    setSearchQuery,
    selectedBranch,
    setSelectedBranch,
    selectedPayment,
    setSelectedPayment,
    selectedSaleDetail,
    setSelectedSaleDetail,
    totalSalesRevenue,
    handleRefund,
  } = useSalesHistory();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <SalesHeader totalSalesRevenue={totalSalesRevenue} />
      <SalesFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedBranch={selectedBranch}
        onBranchChange={setSelectedBranch}
        selectedPayment={selectedPayment}
        onPaymentChange={setSelectedPayment}
        branches={branches}
      />
      <SalesTable
        sales={sales}
        onViewDetails={setSelectedSaleDetail}
        onPrintReceipt={setActiveReceiptSale}
      />
      <SalesDetailModal
        sale={selectedSaleDetail}
        onClose={() => setSelectedSaleDetail(null)}
        onRefund={handleRefund}
        onPrintReceipt={(s) => {
          setActiveReceiptSale(s);
          setSelectedSaleDetail(null);
        }}
      />
    </div>
  );
}
