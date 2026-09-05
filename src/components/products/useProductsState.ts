import { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Product } from "@/types";

const INITIAL_PROD: Partial<Product> = {
  name: "",
  nameBn: "",
  sku: "",
  barcode: "",
  categoryId: "cat-1",
  purchasePrice: 0,
  sellingPrice: 0,
  totalStock: 10,
  unit: "pcs",
  minStockAlert: 5,
};

export function useProductsState() {
  const { currentOrg, currentBranch } = useTenant();
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProd, setNewProd] = useState<Partial<Product>>(INITIAL_PROD);

  const categories = storageService.getCategories();

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.barcode.includes(searchQuery);
    const matchesCat = selectedCat === "all" || p.categoryId === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.sku) return;

    const created: Product = {
      id: `prod-${Date.now()}`,
      organizationId: currentOrg.id,
      categoryId: newProd.categoryId || "cat-1",
      categoryName: categories.find((c) => c.id === newProd.categoryId)?.name || "General",
      name: newProd.name,
      nameBn: newProd.nameBn,
      sku: newProd.sku,
      barcode: newProd.barcode || `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      purchasePrice: Number(newProd.purchasePrice) || 0,
      sellingPrice: Number(newProd.sellingPrice) || 0,
      taxRate: 5,
      minStockAlert: Number(newProd.minStockAlert) || 5,
      unit: newProd.unit || "pcs",
      totalStock: Number(newProd.totalStock) || 0,
      branchStocks: { [currentBranch.id]: Number(newProd.totalStock) || 0 },
      isActive: true,
      imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&auto=format&fit=crop&q=80",
    };

    storageService.addProduct(created);
    setProducts(storageService.getProducts());
    setShowAddModal(false);
    setNewProd(INITIAL_PROD);
  };

  return {
    products,
    filteredProducts,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCat,
    setSelectedCat,
    showAddModal,
    setShowAddModal,
    newProd,
    setNewProd,
    handleAddProduct,
  };
}
