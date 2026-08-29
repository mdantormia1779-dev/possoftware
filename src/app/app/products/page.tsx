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
  Filter,
  Edit2,
  Trash2,
  Boxes,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProductsPage() {
  const { currentOrg, currentBranch } = useTenant();
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Product Master Catalog</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage SKUs, barcodes, variants, cost prices, and outlet stock limits
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/app/products/import"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-card hover:bg-muted text-foreground"
          >
            <Upload className="h-4 w-4" />
            <span>CSV / Excel Import</span>
          </Link>

          <Link
            href="/app/products/barcode"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-card hover:bg-muted text-foreground"
          >
            <Barcode className="h-4 w-4" />
            <span>Barcode Labels</span>
          </Link>

          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add New Product
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by product name, SKU, or scan barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">Product</th>
                <th className="p-3.5 font-semibold text-foreground">SKU / Barcode</th>
                <th className="p-3.5 font-semibold text-foreground">Category</th>
                <th className="p-3.5 font-semibold text-foreground">Purchase Cost</th>
                <th className="p-3.5 font-semibold text-foreground">Selling Price</th>
                <th className="p-3.5 font-semibold text-foreground">Margin</th>
                <th className="p-3.5 font-semibold text-foreground">Total Stock</th>
                <th className="p-3.5 font-semibold text-foreground">Alert Level</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((p) => {
                const margin = p.sellingPrice > 0 ? (((p.sellingPrice - p.purchasePrice) / p.sellingPrice) * 100).toFixed(1) : 0;
                const isLow = p.totalStock <= p.minStockAlert;

                return (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        {p.imageUrl && (
                          <img src={p.imageUrl} alt={p.name} className="h-10 w-10 rounded-lg object-cover border border-border shrink-0" />
                        )}
                        <div>
                          <div className="font-bold text-foreground">{p.name}</div>
                          {p.nameBn && <div className="text-[10px] text-muted-foreground">{p.nameBn}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-muted-foreground">
                      <div className="font-semibold text-foreground">{p.sku}</div>
                      <div className="text-[10px] text-muted-foreground">{p.barcode}</div>
                    </td>
                    <td className="p-3.5 text-muted-foreground">{p.categoryName || "General"}</td>
                    <td className="p-3.5 text-muted-foreground">{formatCurrency(p.purchasePrice)}</td>
                    <td className="p-3.5 font-bold text-foreground">{formatCurrency(p.sellingPrice)}</td>
                    <td className="p-3.5 text-emerald-600 font-semibold">{margin}%</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isLow ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"}`}>
                        {p.totalStock} {p.unit}
                      </span>
                    </td>
                    <td className="p-3.5 text-muted-foreground">{p.minStockAlert} {p.unit}</td>
                    <td className="p-3.5 text-right space-x-1">
                      <button className="p-1.5 rounded bg-muted hover:bg-muted/80 text-foreground" title="Edit Product">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Add New Product SKU</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Product Name (English)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Slim Fit Formal Shirt"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Name (Bengali)</label>
                  <input
                    type="text"
                    placeholder="e.g. ফরমাল শার্ট"
                    value={newProd.nameBn}
                    onChange={(e) => setNewProd({ ...newProd, nameBn: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">SKU Code</label>
                  <input
                    type="text"
                    required
                    placeholder="SHIRT-SLIM-01"
                    value={newProd.sku}
                    onChange={(e) => setNewProd({ ...newProd, sku: e.target.value.toUpperCase() })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Barcode (Code128)</label>
                  <input
                    type="text"
                    placeholder="890123456789"
                    value={newProd.barcode}
                    onChange={(e) => setNewProd({ ...newProd, barcode: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Category</label>
                  <select
                    value={newProd.categoryId}
                    onChange={(e) => setNewProd({ ...newProd, categoryId: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
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
                  <label className="font-semibold text-foreground">Cost Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={newProd.purchasePrice}
                    onChange={(e) => setNewProd({ ...newProd, purchasePrice: parseFloat(e.target.value) })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Selling Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={newProd.sellingPrice}
                    onChange={(e) => setNewProd({ ...newProd, sellingPrice: parseFloat(e.target.value) })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background font-bold text-indigo-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Initial Stock</label>
                  <input
                    type="number"
                    value={newProd.totalStock}
                    onChange={(e) => setNewProd({ ...newProd, totalStock: parseInt(e.target.value) })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Min Alert</label>
                  <input
                    type="number"
                    value={newProd.minStockAlert}
                    onChange={(e) => setNewProd({ ...newProd, minStockAlert: parseInt(e.target.value) })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
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
