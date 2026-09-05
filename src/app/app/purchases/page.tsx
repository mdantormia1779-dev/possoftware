"use client";

import React from "react";
import { PurchasesHeader } from "@/components/purchases/PurchasesHeader";
import { PurchasesStatsCards } from "@/components/purchases/PurchasesStatsCards";
import { PurchasesTable } from "@/components/purchases/PurchasesTable";
import { CreatePOModal } from "@/components/purchases/CreatePOModal";
import { PurchaseDetailModal } from "@/components/purchases/PurchaseDetailModal";
import { usePurchases } from "@/components/purchases/usePurchases";

export default function PurchasesPage() {
  const {
    branches,
    products,
    purchases,
    searchQuery,
    setSearchQuery,
    selectedPO,
    setSelectedPO,
    showCreateModal,
    setShowCreateModal,
    totalPurchases,
    totalDueToSuppliers,
    pendingCount,
    handleCreatePO,
    handleMarkReceived,
  } = usePurchases();

  return (
    <div className="space-y-6">
      <PurchasesHeader onCreateClick={() => setShowCreateModal(true)} />
      <PurchasesStatsCards
        totalPurchases={totalPurchases}
        totalDueToSuppliers={totalDueToSuppliers}
        pendingDeliveryCount={pendingCount}
      />
      <PurchasesTable
        purchases={purchases}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectDetails={setSelectedPO}
      />
      <CreatePOModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        branches={branches}
        products={products}
        onCreate={handleCreatePO}
      />
      <PurchaseDetailModal
        po={selectedPO}
        onClose={() => setSelectedPO(null)}
        onMarkReceived={handleMarkReceived}
      />
    </div>
  );
}
