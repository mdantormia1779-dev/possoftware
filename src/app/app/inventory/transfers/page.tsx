"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { StockTransfer } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import {
  Truck,
  Plus,
  ArrowRight,
  Send,
  X,
  Boxes,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";

export default function StockTransfersPage() {
  const { branches, currentOrg } = useTenant();
  const [transfers, setTransfers] = useState<StockTransfer[]>(() =>
    storageService.getTransfers()
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const products = storageService.getProducts();

  // Create transfer form state
  const [sourceBranchId, setSourceBranchId] = useState(
    branches[0]?.id || "br-1"
  );
  const [destBranchId, setDestBranchId] = useState(branches[1]?.id || "br-2");
  const [selectedProductId, setSelectedProductId] = useState(
    products[0]?.id || ""
  );
  const [transferQty, setTransferQty] = useState(5);
  const [transferNotes, setTransferNotes] = useState("");

  const handleCreateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceBranchId === destBranchId) {
      alert("Source and destination branch cannot be the same!");
      return;
    }

    const prod =
      products.find((p) => p.id === selectedProductId) || products[0];
    const sourceBranch = branches.find((b) => b.id === sourceBranchId);
    const destBranch = branches.find((b) => b.id === destBranchId);

    const newTransfer: StockTransfer = {
      id: `tr-${Date.now()}`,
      organizationId: currentOrg.id,
      transferNumber: `TR-2026-${Math.floor(100 + Math.random() * 900)}`,
      sourceBranchId: sourceBranchId,
      sourceBranchName: sourceBranch?.name || "Source",
      destinationBranchId: destBranchId,
      destinationBranchName: destBranch?.name || "Destination",
      status: "in_transit",
      items: [
        {
          productId: prod.id,
          productName: prod.name,
          sku: prod.sku,
          quantity: transferQty,
        },
      ],
      notes: transferNotes || "Inter-branch stock rebalance",
      dispatchedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    storageService.addTransfer(newTransfer);
    setTransfers(storageService.getTransfers());
    setShowCreateModal(false);
  };

  const handleUpdateStatus = (
    transferId: string,
    newStatus: StockTransfer["status"]
  ) => {
    storageService.updateTransferStatus(transferId, newStatus);
    setTransfers(storageService.getTransfers());
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Truck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Inter-Branch Stock Transfers</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit trail of goods dispatched, in-transit shipments, and received inventory
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowCreateModal(true)}
          className="shadow-sm shadow-indigo-500/25"
        >
          <Plus className="h-4 w-4 mr-1" /> Create Transfer Request
        </Button>
      </div>

      {/* Transfer Pipeline Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs text-xs">
          <span className="text-muted-foreground font-semibold">
            Pending Approval
          </span>
          <div className="text-xl font-black text-foreground mt-1">
            {transfers.filter((t) => t.status === "pending").length} Orders
          </div>
        </div>
        <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs text-xs">
          <span className="text-muted-foreground font-semibold">
            In Transit (Dispatched)
          </span>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {transfers.filter((t) => t.status === "in_transit").length}{" "}
            Shipments
          </div>
        </div>
        <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs text-xs">
          <span className="text-muted-foreground font-semibold">
            Completed (Received)
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {transfers.filter((t) => t.status === "received").length} Shipments
          </div>
        </div>
        <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs text-xs">
          <span className="text-muted-foreground font-semibold">
            Total Transferred
          </span>
          <div className="text-xl font-black text-foreground mt-1">
            {transfers.length} Transfers
          </div>
        </div>
      </div>

      {/* Transfer History Table */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-subtle-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-3.5">Transfer No</th>
                <th className="p-3.5">Source Outlet</th>
                <th className="p-3.5">Destination</th>
                <th className="p-3.5">Items Transferred</th>
                <th className="p-3.5">Created Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {transfers.map((tr) => (
                <tr
                  key={tr.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {tr.transferNumber}
                  </td>
                  <td className="p-3.5 font-semibold text-foreground">
                    {tr.sourceBranchName}
                  </td>
                  <td className="p-3.5 font-semibold text-foreground">
                    <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      {tr.destinationBranchName}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {tr.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="block text-foreground font-medium"
                      >
                        {item.productName} ({item.quantity} pcs)
                      </span>
                    ))}
                  </td>
                  <td className="p-3.5 text-muted-foreground font-mono text-[11px]">
                    {formatDateTime(tr.createdAt)}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={tr.status} />
                  </td>
                  <td className="p-3.5 text-right space-x-1.5">
                    {tr.status === "in_transit" && (
                      <Button
                        size="xs"
                        variant="success"
                        onClick={() => handleUpdateStatus(tr.id, "received")}
                      >
                        Mark Received
                      </Button>
                    )}
                    {tr.status === "pending" && (
                      <Button
                        size="xs"
                        variant="primary"
                        onClick={() => handleUpdateStatus(tr.id, "in_transit")}
                      >
                        Dispatch
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Transfer Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-border/80 bg-card shadow-2xl p-6 space-y-4 animate-fade-slide">
            <div className="flex justify-between items-center pb-3 border-b border-border/80">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Initiate Stock Transfer
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTransfer} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">
                    Source Branch (Dispatched From)
                  </label>
                  <select
                    value={sourceBranchId}
                    onChange={(e) => setSourceBranchId(e.target.value)}
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
                    Destination Branch
                  </label>
                  <select
                    value={destBranchId}
                    onChange={(e) => setDestBranchId(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-1.5">
                  <label className="font-bold text-foreground">
                    Select Product SKU
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (SKU: {p.sku})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">
                    Transfer Quantity
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={transferQty}
                    onChange={(e) =>
                      setTransferQty(parseInt(e.target.value) || 1)
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-bold font-mono text-center text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-foreground">
                  Transfer Reason / Delivery Notes
                </label>
                <textarea
                  rows={2}
                  value={transferNotes}
                  onChange={(e) => setTransferNotes(e.target.value)}
                  placeholder="e.g. Stock replenishing for weekend campaign at Shimanto Square"
                  className="w-full p-2.5 rounded-xl border border-border/80 bg-card text-foreground"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/80">
                <Button
                  variant="outline"
                  size="xs"
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="xs" type="submit">
                  <Send className="h-3.5 w-3.5 mr-1.5" /> Dispatch Shipment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
