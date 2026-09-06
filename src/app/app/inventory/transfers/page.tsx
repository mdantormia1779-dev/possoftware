"use client";

import React from "react";
import { useStockTransfers } from "@/components/inventory/transfers/useStockTransfers";
import { TransfersHeader } from "@/components/inventory/transfers/TransfersHeader";
import { TransfersStatsCards } from "@/components/inventory/transfers/TransfersStatsCards";
import { TransfersTable } from "@/components/inventory/transfers/TransfersTable";
import { CreateTransferModal } from "@/components/inventory/transfers/CreateTransferModal";

export default function StockTransfersPage() {
  const {
    transfers,
    showCreateModal,
    setShowCreateModal,
    branches,
    products,
    handleCreateTransfer,
    handleUpdateStatus,
  } = useStockTransfers();

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
