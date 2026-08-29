"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  Boxes,
  Truck,
  AlertTriangle,
  Search,
  Plus,
  Minus,
  CheckCircle2,
  Building2,
  ArrowRight,
  TrendingDown,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function InventoryManagementPage() {
  const { currentBranch, branches } = useTenant();
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("all");
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustData, setAdjustData] = useState<{ productId: string; branchId: string; delta: number; reason: string }>({
    productId: products[0]?.id || "",
    branchId: currentBranch.id,
    delta: 0,
    reason: "Damaged during handling",
  });

  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalStockQty = products.reduce((sum, p) => sum + p.totalStock, 0);
  const totalStockValuation = products.reduce((sum, p) => sum + p.totalStock * p.purchasePrice, 0);
  const lowStockCount = products.filter((p) => p.totalStock <= p.minStockAlert).length;

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustData.productId || adjustData.delta === 0) return;
    storageService.adjustStock(adjustData.productId, adjustData.branchId, adjustData.delta);
    setProducts(storageService.getProducts());
    setShowAdjustModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Boxes className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Stock & Warehouse Management</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Multi-branch stock availability, threshold alerts, and inventory adjustments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/inventory/transfers"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
          >
            <Truck className="h-4 w-4" />
            <span>Stock Transfers</span>
          </Link>
          <Button variant="primary" size="sm" onClick={() => setShowAdjustModal(true)}>
            <Plus className="h-4 w-4 mr-1" /> Adjust Stock Quantity
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card shadow-2xs">
          <span className="text-xs text-muted-foreground font-medium">Total In-Stock Items</span>
          <div className="text-2xl font-bold text-foreground mt-1">{totalStockQty} Units</div>
          <span className="text-[11px] text-muted-foreground mt-1 block">Across {branches.length} branches</span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-2xs">
          <span className="text-xs text-muted-foreground font-medium">Total Inventory Asset Valuation</span>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
            {formatCurrency(totalStockValuation)}
          </div>
          <span className="text-[11px] text-muted-foreground mt-1 block">Cost value recorded in Ledger 1060</span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-2xs">
          <span className="text-xs text-muted-foreground font-medium">Low Stock Warning Items</span>
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
            {lowStockCount} Products
          </div>
          <span className="text-[11px] text-muted-foreground mt-1 block">Below safety reorder threshold</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stock by SKU, product name, or color..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Stock Matrix Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">Product</th>
                <th className="p-3.5 font-semibold text-foreground">SKU</th>
                <th className="p-3.5 font-semibold text-foreground">Banani Flagship</th>
                <th className="p-3.5 font-semibold text-foreground">Dhanmondi</th>
                <th className="p-3.5 font-semibold text-foreground">Chittagong GEC</th>
                <th className="p-3.5 font-semibold text-foreground">Total In-Stock</th>
                <th className="p-3.5 font-semibold text-foreground">Stock Value (৳)</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((p) => {
                const b1 = p.branchStocks?.["br-1"] ?? 0;
                const b2 = p.branchStocks?.["br-2"] ?? 0;
                const b3 = p.branchStocks?.["br-3"] ?? 0;
                const isLow = p.totalStock <= p.minStockAlert;

                return (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 font-bold text-foreground">{p.name}</td>
                    <td className="p-3.5 font-mono text-muted-foreground">{p.sku}</td>
                    <td className="p-3.5 font-medium">{b1} {p.unit}</td>
                    <td className="p-3.5 font-medium">{b2} {p.unit}</td>
                    <td className="p-3.5 font-medium">{b3} {p.unit}</td>
                    <td className="p-3.5 font-extrabold text-foreground">{p.totalStock} {p.unit}</td>
                    <td className="p-3.5 font-semibold text-foreground">{formatCurrency(p.totalStock * p.purchasePrice)}</td>
                    <td className="p-3.5 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${isLow ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"}`}>
                        {isLow ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-foreground">Stock Adjustment / Correction</h3>

            <form onSubmit={handleAdjustSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Select Product</label>
                <select
                  value={adjustData.productId}
                  onChange={(e) => setAdjustData({ ...adjustData, productId: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Total: {p.totalStock} {p.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Branch Outlet</label>
                <select
                  value={adjustData.branchId}
                  onChange={(e) => setAdjustData({ ...adjustData, branchId: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Quantity Change (+ to Add, - to Deduct)</label>
                <input
                  type="number"
                  required
                  value={adjustData.delta}
                  onChange={(e) => setAdjustData({ ...adjustData, delta: parseInt(e.target.value) || 0 })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background font-bold text-base"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Adjustment Reason</label>
                <select
                  value={adjustData.reason}
                  onChange={(e) => setAdjustData({ ...adjustData, reason: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                >
                  <option>Damaged during handling</option>
                  <option>Physical inventory count correction</option>
                  <option>Customer returned damaged item</option>
                  <option>Sample / Promotional display write-off</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAdjustModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Stock Adjustment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
