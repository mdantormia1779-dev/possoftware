"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Product } from "@/types";
import { InventoryHeader } from "@/components/inventory/main/InventoryHeader";
import { InventoryKPIs } from "@/components/inventory/main/InventoryKPIs";
import { InventoryMatrixTable } from "@/components/inventory/main/InventoryMatrixTable";
import { AdjustStockModal } from "@/components/inventory/main/AdjustStockModal";

export default function InventoryManagementPage() {
  const { currentBranch, branches } = useTenant();
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
  });

  const totalStockQty = products.reduce((sum, p) => sum + p.totalStock, 0);
  const totalStockValuation = products.reduce(
    (sum, p) => sum + p.totalStock * p.purchasePrice,
    0
  );
  const lowStockCount = products.filter((p) => p.totalStock <= p.minStockAlert).length;

  const handleAdjustSubmit = (data: {
    productId: string;
    branchId: string;
    delta: number;
    reason: string;
  }) => {
    storageService.adjustStock(data.productId, data.branchId, data.delta);
    setProducts(storageService.getProducts());
    setShowAdjustModal(false);
  };

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
