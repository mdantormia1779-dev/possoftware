import { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { productService } from "@/services/product.service";
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

  useEffect(() => {
    productService.getProducts({ orgId: currentOrg?.id, branchId: currentBranch?.id }).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setProducts(res.data);
      }
    });
  }, [currentOrg?.id, currentBranch?.id]);

  const categories = storageService.getCategories();

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    const match = p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || (p.barcode && p.barcode.includes(searchQuery));
    return match && (selectedCat === "all" || p.categoryId === selectedCat);
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.sku) return;

    const barcode = newProd.barcode || `${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    const created: Product = {
      id: `prod-${Date.now()}`,
      organizationId: currentOrg?.id || "org-1",
      categoryId: newProd.categoryId || "cat-1",
      categoryName: categories.find((c) => c.id === newProd.categoryId)?.name || "General",
      name: newProd.name,
      nameBn: newProd.nameBn,
      sku: newProd.sku,
      barcode,
      purchasePrice: Number(newProd.purchasePrice) || 0,
      sellingPrice: Number(newProd.sellingPrice) || 0,
      taxRate: 5,
      minStockAlert: Number(newProd.minStockAlert) || 5,
      unit: newProd.unit || "pcs",
      totalStock: Number(newProd.totalStock) || 0,
      branchStocks: { [currentBranch?.id || "br-1"]: Number(newProd.totalStock) || 0 },
      isActive: true,
      imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&auto=format&fit=crop&q=80",
    };

    storageService.addProduct(created);
    setProducts((prev) => [created, ...prev]);
    productService.createProduct(created, currentOrg?.id, currentBranch?.id).catch(() => {});
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
