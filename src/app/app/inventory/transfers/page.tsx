"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { StockTransfer } from "@/types";
import { TransfersHeader } from "@/components/inventory/transfers/TransfersHeader";
import { TransfersStatsCards } from "@/components/inventory/transfers/TransfersStatsCards";
import { TransfersTable } from "@/components/inventory/transfers/TransfersTable";
import { CreateTransferModal } from "@/components/inventory/transfers/CreateTransferModal";

export default function StockTransfersPage() {
  const { branches, currentOrg } = useTenant();
  const [transfers, setTransfers] = useState<StockTransfer[]>(() =>
    storageService.getTransfers()
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const products = storageService.getProducts();

  const handleCreateTransfer = (data: {
    sourceBranchId: string;
    destBranchId: string;
    selectedProductId: string;
    transferQty: number;
    transferNotes: string;
  }) => {
    const prod = products.find((p) => p.id === data.selectedProductId) || products[0];
    const sourceBranch = branches.find((b) => b.id === data.sourceBranchId);
    const destBranch = branches.find((b) => b.id === data.destBranchId);

    const newTransfer: StockTransfer = {
      id: `tr-${Date.now()}`,
      organizationId: currentOrg.id,
      transferNumber: `TR-2026-${Math.floor(100 + Math.random() * 900)}`,
      sourceBranchId: data.sourceBranchId,
      sourceBranchName: sourceBranch?.name || "Source",
      destinationBranchId: data.destBranchId,
      destinationBranchName: destBranch?.name || "Destination",
      status: "in_transit",
      items: [
        {
          productId: prod.id,
          productName: prod.name,
          sku: prod.sku,
          quantity: data.transferQty,
        },
      ],
      notes: data.transferNotes || "Inter-branch stock rebalance",
      dispatchedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    storageService.addTransfer(newTransfer);
    setTransfers(storageService.getTransfers());
    setShowCreateModal(false);
  };

  const handleUpdateStatus = (
    transferId: string,
    newStatus: StockTransfer["status"]
  ) => {
    storageService.updateTransferStatus(transferId, newStatus);
    setTransfers(storageService.getTransfers());
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <TransfersHeader onCreateClick={() => setShowCreateModal(true)} />
      <TransfersStatsCards transfers={transfers} />
      <TransfersTable transfers={transfers} onUpdateStatus={handleUpdateStatus} />
      <CreateTransferModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        branches={branches}
        products={products}
        onCreate={handleCreateTransfer}
      />
    </div>
  );
}
