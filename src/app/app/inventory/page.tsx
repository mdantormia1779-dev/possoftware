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
  Search,
  Plus,
  Package,
  AlertTriangle,
  Layers,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";

export default function InventoryManagementPage() {
  const { currentBranch, branches } = useTenant();
  const [products, setProducts] = useState<Product[]>(() =>
    storageService.getProducts()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustData, setAdjustData] = useState<{
    productId: string;
    branchId: string;
    delta: number;
    reason: string;
  }>({
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
  const totalStockValuation = products.reduce(
    (sum, p) => sum + p.totalStock * p.purchasePrice,
    0
  );
  const lowStockCount = products.filter(
    (p) => p.totalStock <= p.minStockAlert
  ).length;

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustData.productId || adjustData.delta === 0) return;
    storageService.adjustStock(
      adjustData.productId,
      adjustData.branchId,
      adjustData.delta
    );
    setProducts(storageService.getProducts());
    setShowAdjustModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Boxes className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Stock &amp; Warehouse Control</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Multi-branch live stock levels, threshold alerts, and inventory ledger adjustments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/inventory/transfers"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-subtle-xs hover:bg-indigo-100 transition-colors"
          >
            <Truck className="h-3.5 w-3.5" />
            <span>Stock Transfers</span>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAdjustModal(true)}
            className="shadow-sm shadow-indigo-500/25"
          >
            <Plus className="h-4 w-4 mr-1" /> Adjust Stock Qty
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <StatCard
          title="Total In-Stock Items"
          value={`${totalStockQty} Units`}
          icon={Layers}
          description={`Distributed across ${branches.length} outlets`}
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />

        <StatCard
          title="Inventory Valuation"
          value={formatCurrency(totalStockValuation)}
          icon={Package}
          description="Cost value recorded in Ledger 1060"
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/60"
          iconTextColor="text-indigo-600 dark:text-indigo-400"
        />

        <StatCard
          title="Low Stock Reorders"
          value={`${lowStockCount} Products`}
          isPositive={false}
          icon={AlertTriangle}
          description="Below safety threshold limits"
          iconBgColor="bg-rose-50 dark:bg-rose-950/60"
          iconTextColor="text-rose-600 dark:text-rose-400"
        />
      </div>

      {/* Search Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search stock by SKU, product name, or barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9.5 pr-3 rounded-xl border border-border/80 bg-card text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs"
          />
        </div>
      </div>

      {/* Stock Matrix Table */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-subtle-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-3.5">Product</th>
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Banani Flagship</th>
                <th className="p-3.5">Dhanmondi</th>
                <th className="p-3.5">Chittagong GEC</th>
                <th className="p-3.5">Total In-Stock</th>
                <th className="p-3.5">Stock Value</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {filteredProducts.map((p) => {
                const b1 = p.branchStocks?.["br-1"] ?? 0;
                const b2 = p.branchStocks?.["br-2"] ?? 0;
                const b3 = p.branchStocks?.["br-3"] ?? 0;
                const isLow = p.totalStock <= p.minStockAlert;

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-3.5 font-bold text-foreground">{p.name}</td>
                    <td className="p-3.5 font-mono text-muted-foreground font-semibold">
                      {p.sku}
                    </td>
                    <td className="p-3.5 font-medium font-mono text-[11px]">
                      {b1} {p.unit}
                    </td>
                    <td className="p-3.5 font-medium font-mono text-[11px]">
                      {b2} {p.unit}
                    </td>
                    <td className="p-3.5 font-medium font-mono text-[11px]">
                      {b3} {p.unit}
                    </td>
                    <td className="p-3.5 font-black text-foreground font-mono">
                      {p.totalStock} {p.unit}
                    </td>
                    <td className="p-3.5 font-bold text-foreground font-mono">
                      {formatCurrency(p.totalStock * p.purchasePrice)}
                    </td>
                    <td className="p-3.5 text-right">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                          isLow
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        }`}
                      >
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card shadow-2xl p-6 space-y-4 animate-fade-slide">
            <div className="flex items-center justify-between pb-3 border-b border-border/80">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Stock Adjustment / Correction
              </h3>
              <button
                onClick={() => setShowAdjustModal(false)}
                className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Select Product</label>
                <select
                  value={adjustData.productId}
                  onChange={(e) =>
                    setAdjustData({ ...adjustData, productId: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Total: {p.totalStock} {p.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Branch Outlet</label>
                <select
                  value={adjustData.branchId}
                  onChange={(e) =>
                    setAdjustData({ ...adjustData, branchId: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-foreground">
                  Quantity Change (+ to Add, - to Deduct)
                </label>
                <input
                  type="number"
                  required
                  value={adjustData.delta}
                  onChange={(e) =>
                    setAdjustData({
                      ...adjustData,
                      delta: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-mono font-bold text-sm text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-foreground">
                  Adjustment Reason
                </label>
                <select
                  value={adjustData.reason}
                  onChange={(e) =>
                    setAdjustData({ ...adjustData, reason: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                >
                  <option>Damaged during handling</option>
                  <option>Physical inventory count correction</option>
                  <option>Customer returned damaged item</option>
                  <option>Sample / Promotional display write-off</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/80">
                <Button
                  variant="outline"
                  size="xs"
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="xs" type="submit">
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
