"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import {
  Receipt,
  Search,
  Download,
  Printer,
  RotateCcw,
  Eye,
  X,
  CreditCard,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { Sale } from "@/lib/types";

export default function SalesHistoryPage() {
  const { setActiveReceiptSale, branches } = useTenant();
  const [sales, setSales] = useState<Sale[]>(() => storageService.getSales());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState("all");
  const [selectedSaleDetail, setSelectedSaleDetail] =
    useState<Sale | null>(null);

  const filteredSales = sales.filter((s) => {
    const matchesSearch =
      s.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.customerName &&
        s.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.customerPhone && s.customerPhone.includes(searchQuery));
    const matchesBranch =
      selectedBranch === "all" || s.branchId === selectedBranch;
    const matchesPayment =
      selectedPayment === "all" || s.paymentMethod === selectedPayment;
    return matchesSearch && matchesBranch && matchesPayment;
  });

  const totalSalesRevenue = filteredSales.reduce(
    (sum, s) => sum + s.grandTotal,
    0
  );

  const handleRefund = (saleId: string) => {
    const updated = sales.map((s) =>
      s.id === saleId ? { ...s, status: "returned" as const } : s
    );
    setSales(updated);
    if (selectedSaleDetail?.id === saleId) {
      setSelectedSaleDetail({ ...selectedSaleDetail, status: "returned" });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Receipt className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Sales Invoices &amp; Ledger</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit trail of all POS transactions with 80mm reprint &amp; refund controls
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="shadow-subtle-xs">
            <Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV
          </Button>
          <div className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-black font-mono text-xs border border-indigo-200/60 dark:border-indigo-800/60 shadow-subtle-xs">
            Revenue: {formatCurrency(totalSalesRevenue)}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search invoice (INV-2026...), customer name, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9.5 pr-3 rounded-xl border border-border/80 bg-card text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs"
          />
        </div>

        {/* Branch Filter */}
        <div>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs cursor-pointer"
          >
            <option value="all">All Outlets / Branches</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Method Filter */}
        <div>
          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs cursor-pointer"
          >
            <option value="all">All Payment Methods</option>
            <option value="cash">Cash in Till</option>
            <option value="bkash">bKash Merchant</option>
            <option value="nagad">Nagad / Rocket</option>
            <option value="card">Card (POS)</option>
            <option value="due">Customer Due / Credit</option>
          </select>
        </div>
      </div>

      {/* Sales Invoices Table */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-subtle-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-3.5">Invoice No</th>
                <th className="p-3.5">Date &amp; Time</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Branch</th>
                <th className="p-3.5">Cashier</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Total</th>
                <th className="p-3.5">Method</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {filteredSales.map((sale) => (
                <tr
                  key={sale.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {sale.invoiceNumber}
                  </td>
                  <td className="p-3.5 text-muted-foreground whitespace-nowrap font-mono text-[11px]">
                    {formatDateTime(sale.createdAt)}
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-foreground">
                      {sale.customerName || "Walk-in"}
                    </span>
                    {sale.customerPhone && (
                      <span className="text-[10px] text-muted-foreground block font-mono">
                        {sale.customerPhone}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-muted-foreground">
                    {sale.branchName}
                  </td>
                  <td className="p-3.5 text-muted-foreground">
                    {sale.cashierName}
                  </td>
                  <td className="p-3.5 text-muted-foreground font-mono">
                    {sale.items.length} items
                  </td>
                  <td className="p-3.5 font-black text-foreground font-mono">
                    {formatCurrency(sale.grandTotal)}
                  </td>
                  <td className="p-3.5 uppercase font-bold text-[10px] text-muted-foreground">
                    {sale.paymentMethod}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={sale.status} />
                  </td>
                  <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => setSelectedSaleDetail(sale)}
                      className="text-[11px]"
                      title="View Details"
                    >
                      <Eye className="h-3 w-3 mr-1" /> View
                    </Button>
                    <Button
                      size="xs"
                      variant="subtle-indigo"
                      onClick={() => setActiveReceiptSale(sale)}
                      className="text-[11px]"
                      title="Print Thermal Receipt"
                    >
                      <Printer className="h-3 w-3 mr-1" /> Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sale Detail Drawer / Modal */}
      {selectedSaleDetail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-card border-l border-border/80 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border/80">
                <div>
                  <h3 className="text-base font-bold text-foreground font-mono">
                    Invoice #{selectedSaleDetail.invoiceNumber}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    {formatDateTime(selectedSaleDetail.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSaleDetail(null)}
                  className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status & Branch */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-muted/20 border border-border/70 text-xs shadow-subtle-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider">
                    Outlet Branch
                  </span>
                  <strong className="text-foreground">
                    {selectedSaleDetail.branchName}
                  </strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider">
                    Payment Status
                  </span>
                  <StatusBadge status={selectedSaleDetail.status} />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-1">
                  Line Items
                </h4>
                <div className="divide-y divide-border/60 border border-border/80 rounded-2xl p-3.5 bg-card space-y-2 shadow-subtle-xs">
                  {selectedSaleDetail.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="pt-2 first:pt-0 flex justify-between items-center text-xs"
                    >
                      <div>
                        <div className="font-bold text-foreground">
                          {item.productName}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          {item.quantity} x {formatCurrency(item.unitPrice)}{" "}
                          (SKU: {item.sku})
                        </div>
                      </div>
                      <span className="font-black text-foreground font-mono">
                        {formatCurrency(item.quantity * item.unitPrice)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/80 space-y-1.5 text-xs font-mono shadow-subtle-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span className="font-sans">Subtotal:</span>
                  <span className="text-foreground font-bold">
                    {formatCurrency(selectedSaleDetail.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="font-sans">VAT:</span>
                  <span className="text-foreground font-bold">
                    {formatCurrency(selectedSaleDetail.taxAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="font-sans">Discount:</span>
                  <span className="text-foreground font-bold">
                    -{formatCurrency(selectedSaleDetail.discountAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-foreground pt-2 border-t border-border/80">
                  <span className="font-sans text-sm font-bold">Net Total:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg">
                    {formatCurrency(selectedSaleDetail.grandTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground pt-1">
                  <span className="font-sans">Payment Method:</span>
                  <span className="uppercase font-bold text-foreground">
                    {selectedSaleDetail.paymentMethod}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-border/80 flex items-center justify-between gap-3">
              {selectedSaleDetail.status !== "returned" && (
                <Button
                  variant="destructive"
                  size="xs"
                  onClick={() => handleRefund(selectedSaleDetail.id)}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Refund Sale
                </Button>
              )}
              <Button
                variant="primary"
                size="xs"
                onClick={() => {
                  setActiveReceiptSale(selectedSaleDetail);
                  setSelectedSaleDetail(null);
                }}
              >
                <Printer className="h-3.5 w-3.5 mr-1.5" /> Print Thermal Receipt
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
