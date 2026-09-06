import { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { inventoryService } from "@/services/inventory.service";
import { StockTransfer } from "@/types";

export function useStockTransfers() {
  const { branches, currentOrg } = useTenant();
  const [transfers, setTransfers] = useState<StockTransfer[]>(() => storageService.getTransfers());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const products = storageService.getProducts();

  useEffect(() => {
    inventoryService.getTransfers(currentOrg?.id).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setTransfers(res.data);
      }
    });
  }, [currentOrg?.id]);

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
      organizationId: currentOrg?.id || "org-1",
      transferNumber: `TR-2026-${Math.floor(100 + Math.random() * 900)}`,
      sourceBranchId: data.sourceBranchId,
      sourceBranchName: sourceBranch?.name || "Source",
      destinationBranchId: data.destBranchId,
      destinationBranchName: destBranch?.name || "Destination",
      status: "in_transit",
      items: [{ productId: prod.id, productName: prod.name, sku: prod.sku, quantity: data.transferQty }],
      notes: data.transferNotes || "Inter-branch stock rebalance",
      dispatchedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    storageService.addTransfer(newTransfer);
    setTransfers((prev) => [newTransfer, ...prev]);
    inventoryService.createTransfer({
      sourceBranchId: data.sourceBranchId,
      destinationBranchId: data.destBranchId,
      notes: data.transferNotes,
      items: [{ productId: prod.id, quantity: data.transferQty }],
    }, currentOrg?.id).catch(() => {});
    setShowCreateModal(false);
  };

  const handleUpdateStatus = (transferId: string, newStatus: StockTransfer["status"]) => {
    storageService.updateTransferStatus(transferId, newStatus);
    inventoryService.updateTransferStatus(transferId, newStatus.toUpperCase()).catch(() => {});
    setTransfers(storageService.getTransfers());
  };

  return {
    transfers,
    showCreateModal,
    setShowCreateModal,
    branches,
    products,
    handleCreateTransfer,
    handleUpdateStatus,
  };
}
