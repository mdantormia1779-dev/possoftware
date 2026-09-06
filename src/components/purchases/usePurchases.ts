import { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { purchaseService } from "@/services/purchase.service";
import { PurchaseOrder } from "@/types";
import { buildNewPO } from "./buildNewPO";

export function usePurchases() {
  const { currentOrg, branches } = useTenant();
  const products = storageService.getProducts();
  const [purchases, setPurchases] = useState<PurchaseOrder[]>(() => storageService.getPurchases());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    purchaseService.getPurchases(currentOrg?.id).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setPurchases(res.data);
      }
    });
  }, [currentOrg?.id]);

  const filteredPurchases = purchases.filter((po) =>
    po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    po.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPurchases = purchases.reduce((sum, p) => sum + p.totalAmount, 0);
  const totalDueToSuppliers = purchases.reduce((sum, p) => sum + p.dueAmount, 0);
  const pendingCount = purchases.filter((p) => p.status === "ordered" || p.status === "draft").length;

  const handleCreatePO = (data: {
    supplier: string;
    branchId: string;
    productName: string;
    qty: number;
    unitCost: number;
    paidAmount: number;
    batchNo: string;
  }) => {
    const newPO = buildNewPO({
      orgId: currentOrg.id,
      productId: products[0]?.id || "prod-1",
      ...data,
    });

    const updated = [newPO, ...purchases];
    setPurchases(updated);
    storageService.savePurchases(updated);
    purchaseService.createPurchase({
      supplierId: data.supplier,
      items: [{ productId: products[0]?.id || "prod-1", unitCost: data.unitCost, quantity: data.qty, batchNumber: data.batchNo }],
      paidAmount: data.paidAmount,
    }, currentOrg?.id, data.branchId).catch(() => {});
    setShowCreateModal(false);
  };

  const handleMarkReceived = (po: PurchaseOrder) => {
    const updated = purchases.map((p) => {
      if (p.id === po.id) {
        return {
          ...p,
          status: "received" as const,
          receivedDate: new Date().toISOString(),
          items: p.items.map((item) => ({ ...item, receivedQty: item.quantity })),
        };
      }
      return p;
    });

    setPurchases(updated);
    storageService.savePurchases(updated);
    purchaseService.updatePurchase(po.id, { status: "RECEIVED" }, currentOrg?.id).catch(() => {});
    if (selectedPO?.id === po.id) {
      setSelectedPO({
        ...po,
        status: "received",
        receivedDate: new Date().toISOString(),
        items: po.items.map((i) => ({ ...i, receivedQty: i.quantity })),
      });
    }
  };

  return {
    branches,
    products,
    purchases: filteredPurchases,
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
  };
}
