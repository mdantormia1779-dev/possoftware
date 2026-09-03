"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  Package,
  Plus,
  Upload,
  Barcode,
  Search,
  Edit2,
  X,
  Boxes,
  Sparkles,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProductsPage() {
  const { currentOrg, currentBranch } = useTenant();
  const [products, setProducts] = useState<Product[]>(() =>
    storageService.getProducts()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState<Partial<Product>>({
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
  });

  const categories = storageService.getCategories();

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      categoryName:
        categories.find((c) => c.id === newProd.categoryId)?.name || "General",
      name: newProd.name,
      nameBn: newProd.nameBn,
      sku: newProd.sku,
      barcode:
        newProd.barcode ||
        `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      purchasePrice: Number(newProd.purchasePrice) || 0,
      sellingPrice: Number(newProd.sellingPrice) || 0,
      taxRate: 5,
      minStockAlert: Number(newProd.minStockAlert) || 5,
      unit: newProd.unit || "pcs",
      totalStock: Number(newProd.totalStock) || 0,
      branchStocks: { [currentBranch.id]: Number(newProd.totalStock) || 0 },
      isActive: true,
      imageUrl:
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&auto=format&fit=crop&q=80",
    };

    storageService.addProduct(created);
    setProducts(storageService.getProducts());
    setShowAddModal(false);
    setNewProd({
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
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Product Master Catalog</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage SKUs, barcodes, cost prices, gross margins, and outlet stock limits
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/app/products/import"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground shadow-subtle-xs transition-colors"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>CSV Import</span>
          </Link>

          <Link
            href="/app/products/barcode"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground shadow-subtle-xs transition-colors"
          >
            <Barcode className="h-3.5 w-3.5" />
            <span>Barcode Labels</span>
          </Link>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="shadow-sm shadow-indigo-500/25"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Product SKU
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search by product name, SKU, or scan barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9.5 pr-3 rounded-xl border border-border/80 bg-card text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs"
          />
        </div>

        <div>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs font-medium cursor-pointer"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-subtle-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-3.5">Product Details</th>
                <th className="p-3.5">SKU / Barcode</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Purchase Cost</th>
                <th className="p-3.5">Selling Price</th>
                <th className="p-3.5">Margin</th>
                <th className="p-3.5">Total Stock</th>
                <th className="p-3.5">Alert Level</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {filteredProducts.map((p) => {
                const margin =
                  p.sellingPrice > 0
                    ? (
                        ((p.sellingPrice - p.purchasePrice) / p.sellingPrice) *
                        100
                      ).toFixed(1)
                    : 0;
                const isLow = p.totalStock <= p.minStockAlert;

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        {p.imageUrl && (
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="h-10 w-10 rounded-xl object-cover border border-border/60 shrink-0 shadow-subtle-xs"
                          />
                        )}
                        <div>
                          <div className="font-bold text-foreground text-xs sm:text-sm">
                            {p.name}
                          </div>
                          {p.nameBn && (
                            <div className="text-[10px] text-muted-foreground">
                              {p.nameBn}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-muted-foreground">
                      <div className="font-bold text-foreground">{p.sku}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">
                        {p.barcode}
                      </div>
                    </td>
                    <td className="p-3.5 text-muted-foreground">
                      {p.categoryName || "General"}
                    </td>
                    <td className="p-3.5 text-muted-foreground font-mono">
                      {formatCurrency(p.purchasePrice)}
                    </td>
                    <td className="p-3.5 font-black text-foreground font-mono">
                      {formatCurrency(p.sellingPrice)}
                    </td>
                    <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                      {margin}%
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono ${
                          isLow
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        }`}
                      >
                        {p.totalStock} {p.unit}
                      </span>
                    </td>
                    <td className="p-3.5 text-muted-foreground font-mono text-[11px]">
                      {p.minStockAlert} {p.unit}
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl border border-border/80 bg-card shadow-2xl p-6 space-y-4 animate-fade-slide">
            <div className="flex justify-between items-center pb-3 border-b border-border/80">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Add New Product SKU
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-foreground">
                    Product Name (English)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Slim Fit Formal Shirt"
                    value={newProd.name}
                    onChange={(e) =>
                      setNewProd({ ...newProd, name: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-foreground">
                    Secondary Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Formal Oxford Shirt"
                    value={newProd.nameBn}
                    onChange={(e) =>
                      setNewProd({ ...newProd, nameBn: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-foreground">SKU Code</label>
                  <input
                    type="text"
                    required
                    placeholder="SHIRT-SLIM-01"
                    value={newProd.sku}
                    onChange={(e) =>
                      setNewProd({
                        ...newProd,
                        sku: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-mono text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-foreground">
                    Barcode (Code128)
                  </label>
                  <input
                    type="text"
                    placeholder="890123456789"
                    value={newProd.barcode}
                    onChange={(e) =>
                      setNewProd({ ...newProd, barcode: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-mono text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-foreground">Category</label>
                  <select
                    value={newProd.categoryId}
                    onChange={(e) =>
                      setNewProd({ ...newProd, categoryId: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-foreground">Cost Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={newProd.purchasePrice}
                    onChange={(e) =>
                      setNewProd({
                        ...newProd,
                        purchasePrice: parseFloat(e.target.value),
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-mono text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-foreground">
                    Selling Price (৳)
                  </label>
                  <input
                    type="number"
                    required
                    value={newProd.sellingPrice}
                    onChange={(e) =>
                      setNewProd({
                        ...newProd,
                        sellingPrice: parseFloat(e.target.value),
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-bold font-mono text-indigo-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-foreground">Initial Stock</label>
                  <input
                    type="number"
                    value={newProd.totalStock}
                    onChange={(e) =>
                      setNewProd({
                        ...newProd,
                        totalStock: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-mono text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-foreground">Min Alert</label>
                  <input
                    type="number"
                    value={newProd.minStockAlert}
                    onChange={(e) =>
                      setNewProd({
                        ...newProd,
                        minStockAlert: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-mono text-foreground"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/80">
                <Button
                  variant="outline"
                  size="xs"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="xs" type="submit">
                  Save Product to Catalog
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
