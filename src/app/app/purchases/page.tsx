"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { PurchaseOrder } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Boxes,
  Plus,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Search,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";

export default function PurchasesPage() {
  const { currentOrg } = useTenant();
  const [purchases, setPurchases] = useState<PurchaseOrder[]>(() => storageService.getPurchases());
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPurchases = purchases.filter((po) => {
    return (
      po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPurchases = purchases.reduce((sum, p) => sum + p.totalAmount, 0);
  const totalDueToSuppliers = purchases.reduce((sum, p) => sum + p.dueAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Boxes className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Purchase Orders & Receiving (GRN)</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Procure inventory from suppliers, track batch numbers, expiry dates, and supplier payables
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/suppliers"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-card hover:bg-muted text-foreground"
          >
            <Building2 className="h-4 w-4" />
            <span>Supplier Directory</span>
          </Link>
          <Button variant="primary" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Create Purchase Order
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card shadow-2xs text-xs">
          <span className="text-muted-foreground font-medium">Total Procurement Volume</span>
          <div className="text-2xl font-bold text-foreground mt-1">{formatCurrency(totalPurchases)}</div>
          <span className="text-[11px] text-muted-foreground mt-1 block">Lifetime purchase orders</span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-2xs text-xs">
          <span className="text-muted-foreground font-medium">Supplier Payables Outstanding (Ledger 2010)</span>
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
            {formatCurrency(totalDueToSuppliers)}
          </div>
          <span className="text-[11px] text-muted-foreground mt-1 block">Payable within credit terms</span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-2xs text-xs">
          <span className="text-muted-foreground font-medium">Pending Delivery POs</span>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
            {purchases.filter((p) => p.status === "ordered").length} Orders
          </div>
          <span className="text-[11px] text-muted-foreground mt-1 block">Awaiting warehouse receipt</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search PO number (e.g. PO-2026...) or supplier name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">PO Number</th>
                <th className="p-3.5 font-semibold text-foreground">Supplier Name</th>
                <th className="p-3.5 font-semibold text-foreground">Created Date</th>
                <th className="p-3.5 font-semibold text-foreground">Items</th>
                <th className="p-3.5 font-semibold text-foreground">Total Bill</th>
                <th className="p-3.5 font-semibold text-foreground">Paid Amount</th>
                <th className="p-3.5 font-semibold text-foreground">Balance Due</th>
                <th className="p-3.5 font-semibold text-foreground">Status</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPurchases.map((po) => (
                <tr key={po.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {po.poNumber}
                  </td>
                  <td className="p-3.5 font-medium text-foreground">{po.supplierName}</td>
                  <td className="p-3.5 text-muted-foreground">{formatDate(po.createdAt)}</td>
                  <td className="p-3.5 text-muted-foreground">
                    {po.items.map((i) => `${i.productName} (${i.quantity})`).join(", ")}
                  </td>
                  <td className="p-3.5 font-bold text-foreground">{formatCurrency(po.totalAmount)}</td>
                  <td className="p-3.5 text-emerald-600 font-semibold">{formatCurrency(po.paidAmount)}</td>
                  <td className="p-3.5">
                    {po.dueAmount > 0 ? (
                      <span className="text-rose-600 font-bold">{formatCurrency(po.dueAmount)}</span>
                    ) : (
                      <span className="text-emerald-600">Settled</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={po.status} />
                  </td>
                  <td className="p-3.5 text-right">
                    <button className="px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-[11px] font-semibold text-foreground">
                      Details / GRN
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
