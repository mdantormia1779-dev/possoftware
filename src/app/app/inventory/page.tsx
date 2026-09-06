"use client";

import React from "react";
import { useInventoryState } from "@/components/inventory/main/useInventoryState";
import { InventoryHeader } from "@/components/inventory/main/InventoryHeader";
import { InventoryKPIs } from "@/components/inventory/main/InventoryKPIs";
import { InventoryMatrixTable } from "@/components/inventory/main/InventoryMatrixTable";
import { AdjustStockModal } from "@/components/inventory/main/AdjustStockModal";

export default function InventoryManagementPage() {
  const {
    products,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    showAdjustModal,
    setShowAdjustModal,
    totalStockQty,
    totalStockValuation,
    lowStockCount,
    branches,
    currentBranch,
    handleAdjustSubmit,
  } = useInventoryState();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <InventoryHeader onAdjustClick={() => setShowAdjustModal(true)} />

      <InventoryKPIs
        totalStockQty={totalStockQty}
        totalStockValuation={totalStockValuation}
        lowStockCount={lowStockCount}
        branchCount={branches.length}
      />

      <InventoryMatrixTable
        products={filteredProducts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <AdjustStockModal
        isOpen={showAdjustModal}
        onClose={() => setShowAdjustModal(false)}
        products={products}
        branches={branches}
        currentBranchId={currentBranch.id}
        onAdjust={handleAdjustSubmit}
      />
    </div>
  );
}
