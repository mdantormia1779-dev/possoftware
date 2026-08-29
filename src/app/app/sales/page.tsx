"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import {
  Receipt,
  Search,
  Filter,
  Download,
  Printer,
  RotateCcw,
  Eye,
  Calendar,
  Building,
  CreditCard,
  CheckCircle2,
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
  const [selectedSaleDetail, setSelectedSaleDetail] = useState<Sale | null>(null);

  const filteredSales = sales.filter((s) => {
    const matchesSearch =
      s.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.customerName && s.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.customerPhone && s.customerPhone.includes(searchQuery));
    const matchesBranch = selectedBranch === "all" || s.branchId === selectedBranch;
    const matchesPayment = selectedPayment === "all" || s.paymentMethod === selectedPayment;
    return matchesSearch && matchesBranch && matchesPayment;
  });

  const totalSalesRevenue = filteredSales.reduce((sum, s) => sum + s.grandTotal, 0);

  const handleRefund = (saleId: string) => {
    const updated = sales.map((s) => (s.id === saleId ? { ...s, status: "returned" as const } : s));
    setSales(updated);
    if (selectedSaleDetail?.id === saleId) {
      setSelectedSaleDetail({ ...selectedSaleDetail, status: "returned" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Receipt className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Sales Invoices & Transactions</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit history of all POS and counter invoices with refund capability
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1.5" /> Export CSV
          </Button>
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
            Total Revenue: {formatCurrency(totalSalesRevenue)}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search invoice number (e.g. INV-2026...), customer name, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Branch Filter */}
        <div>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">Invoice No</th>
                <th className="p-3.5 font-semibold text-foreground">Date & Time</th>
                <th className="p-3.5 font-semibold text-foreground">Customer</th>
                <th className="p-3.5 font-semibold text-foreground">Branch</th>
                <th className="p-3.5 font-semibold text-foreground">Cashier</th>
                <th className="p-3.5 font-semibold text-foreground">Items</th>
                <th className="p-3.5 font-semibold text-foreground">Total</th>
                <th className="p-3.5 font-semibold text-foreground">Method</th>
                <th className="p-3.5 font-semibold text-foreground">Status</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {sale.invoiceNumber}
                  </td>
                  <td className="p-3.5 text-muted-foreground whitespace-nowrap">
                    {formatDateTime(sale.createdAt)}
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-foreground">{sale.customerName || "Walk-in"}</span>
                    {sale.customerPhone && <span className="text-[10px] text-muted-foreground block">{sale.customerPhone}</span>}
                  </td>
                  <td className="p-3.5 text-muted-foreground">{sale.branchName}</td>
                  <td className="p-3.5 text-muted-foreground">{sale.cashierName}</td>
                  <td className="p-3.5 text-muted-foreground">{sale.items.length} items</td>
                  <td className="p-3.5 font-bold text-foreground">{formatCurrency(sale.grandTotal)}</td>
                  <td className="p-3.5 uppercase font-medium text-[10px] text-muted-foreground">{sale.paymentMethod}</td>
                  <td className="p-3.5">
                    <StatusBadge status={sale.status} />
                  </td>
                  <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedSaleDetail(sale)}
                      className="px-2.5 py-1 rounded-md bg-muted hover:bg-muted/80 text-[11px] font-semibold text-foreground border border-border"
                      title="View Details"
                    >
                      <Eye className="h-3.5 w-3.5 inline mr-1" /> View
                    </button>
                    <button
                      onClick={() => setActiveReceiptSale(sale)}
                      className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-[11px] font-semibold"
                      title="Print Thermal Receipt"
                    >
                      <Printer className="h-3.5 w-3.5 inline mr-1" /> Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sale Detail Drawer / Modal */}
      {selectedSaleDetail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-card border-l border-border p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <h3 className="text-base font-bold text-foreground">Invoice #{selectedSaleDetail.invoiceNumber}</h3>
                  <p className="text-xs text-muted-foreground">{formatDateTime(selectedSaleDetail.createdAt)}</p>
                </div>
                <button
                  onClick={() => setSelectedSaleDetail(null)}
                  className="text-xs font-semibold px-2 py-1 rounded bg-muted hover:bg-muted/80"
                >
                  Close
                </button>
              </div>

              {/* Status & Branch */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-muted/20 border border-border text-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px]">Outlet Branch</span>
                  <strong className="text-foreground">{selectedSaleDetail.branchName}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Payment Status</span>
                  <StatusBadge status={selectedSaleDetail.status} />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Line Items</h4>
                <div className="divide-y divide-border border border-border rounded-xl p-3 bg-card space-y-2">
                  {selectedSaleDetail.items.map((item, idx) => (
                    <div key={idx} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-semibold text-foreground">{item.productName}</div>
                        <div className="text-[10px] text-muted-foreground">
                          {item.quantity} x {formatCurrency(item.unitPrice)} (SKU: {item.sku})
                        </div>
                      </div>
                      <span className="font-bold text-foreground">{formatCurrency(item.quantity * item.unitPrice)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span className="text-foreground">{formatCurrency(selectedSaleDetail.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>VAT:</span>
                  <span className="text-foreground">{formatCurrency(selectedSaleDetail.taxAmount)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Discount:</span>
                  <span className="text-foreground">-{formatCurrency(selectedSaleDetail.discountAmount)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-foreground pt-2 border-t border-border">
                  <span>Net Total:</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{formatCurrency(selectedSaleDetail.grandTotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground pt-1">
                  <span>Payment Method:</span>
                  <span className="uppercase font-semibold text-foreground">{selectedSaleDetail.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-border flex items-center justify-between gap-3">
              {selectedSaleDetail.status !== "returned" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRefund(selectedSaleDetail.id)}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Refund Sale
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
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
