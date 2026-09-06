import { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { productService } from "@/services/product.service";
import { inventoryService } from "@/services/inventory.service";
import { Product } from "@/types";

export function useInventoryState() {
  const { currentOrg, currentBranch, branches } = useTenant();
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  useEffect(() => {
    productService.getProducts({ orgId: currentOrg?.id, branchId: currentBranch?.id }).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setProducts(res.data);
      }
    });
  }, [currentOrg?.id, currentBranch?.id]);

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
  });

  const totalStockQty = products.reduce((sum, p) => sum + (p.totalStock || 0), 0);
  const totalStockValuation = products.reduce((sum, p) => sum + (p.totalStock || 0) * (p.purchasePrice || 0), 0);
  const lowStockCount = products.filter((p) => (p.totalStock || 0) <= (p.minStockAlert || 5)).length;

  const handleAdjustSubmit = (data: { productId: string; branchId: string; delta: number; reason: string }) => {
    storageService.adjustStock(data.productId, data.branchId, data.delta);
    inventoryService.adjustStock(data.productId, data.delta, undefined, data.branchId).catch(() => {});
    setProducts(storageService.getProducts());
    setShowAdjustModal(false);
  };

  return {
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
  };
}
