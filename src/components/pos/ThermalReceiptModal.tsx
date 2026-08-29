"use client";

import React, { useRef } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { Sale } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { X, Printer, Download, ShoppingBag, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

export function ThermalReceiptModal() {
  const { activeReceiptSale, setActiveReceiptSale, currentOrg } = useTenant();
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!activeReceiptSale) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    setActiveReceiptSale(null);
  };

  const sale = activeReceiptSale;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="relative w-full max-w-md max-h-[90vh] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Modal Topbar (Not printed) */}
        <div className="no-print flex items-center justify-between border-b border-border p-4 bg-muted/40">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Sale Completed Successfully</h3>
              <p className="text-xs text-muted-foreground">{sale.invoiceNumber}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Thermal Receipt Paper Simulation */}
        <div className="flex-1 overflow-y-auto p-6 flex justify-center bg-muted/20">
          <div
            id="thermal-receipt"
            ref={receiptRef}
            className="w-[80mm] max-w-full bg-white text-black p-4 font-mono text-[11px] shadow-md border border-neutral-200 rounded-sm leading-tight"
          >
            {/* Store Header */}
            <div className="text-center space-y-1 border-b border-dashed border-neutral-400 pb-3">
              <div className="font-bold text-sm uppercase tracking-wide">{currentOrg.name}</div>
              <div className="text-[10px] text-neutral-600">{currentOrg.address}</div>
              <div className="text-[10px] text-neutral-600">Tel: {currentOrg.phone}</div>
              {currentOrg.taxNumber && (
                <div className="text-[10px] font-semibold text-neutral-700">BIN / VAT Reg: {currentOrg.taxNumber}</div>
              )}
              <div className="text-[10px] font-bold mt-1 uppercase">MUSHAK-6.3 / RETAIL INVOICE</div>
            </div>

            {/* Invoice Meta */}
            <div className="py-2 border-b border-dashed border-neutral-400 space-y-0.5 text-[10px]">
              <div className="flex justify-between">
                <span>Invoice No:</span>
                <span className="font-bold">{sale.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span>{formatDateTime(sale.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span>Branch:</span>
                <span>{sale.branchName}</span>
              </div>
              <div className="flex justify-between">
                <span>Cashier:</span>
                <span>{sale.cashierName}</span>
              </div>
              {sale.customerName && (
                <div className="flex justify-between pt-0.5 border-t border-dotted border-neutral-300">
                  <span>Customer:</span>
                  <span className="font-bold">{sale.customerName}</span>
                </div>
              )}
              {sale.customerPhone && (
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span>{sale.customerPhone}</span>
                </div>
              )}
            </div>

            {/* Line Items */}
            <div className="py-2 border-b border-dashed border-neutral-400">
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="border-b border-neutral-400">
                    <th className="py-1">Item</th>
                    <th className="text-center py-1">Qty</th>
                    <th className="text-right py-1">Rate</th>
                    <th className="text-right py-1">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dotted divide-neutral-200">
                  {sale.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-1 max-w-[120px] truncate">{item.productName}</td>
                      <td className="text-center py-1">{item.quantity}</td>
                      <td className="text-right py-1">{formatCurrency(item.unitPrice, false)}</td>
                      <td className="text-right py-1 font-semibold">{formatCurrency(item.quantity * item.unitPrice, false)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculation Totals */}
            <div className="py-2 border-b border-dashed border-neutral-400 space-y-1 text-[10px]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(sale.subtotal)}</span>
              </div>
              {sale.discountAmount > 0 && (
                <div className="flex justify-between text-neutral-600">
                  <span>Discount:</span>
                  <span>-{formatCurrency(sale.discountAmount)}</span>
                </div>
              )}
              {sale.taxAmount > 0 && (
                <div className="flex justify-between">
                  <span>VAT (5% Included):</span>
                  <span>{formatCurrency(sale.taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs font-bold pt-1 border-t border-neutral-400">
                <span>NET TOTAL:</span>
                <span>{formatCurrency(sale.grandTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Paid ({sale.paymentMethod.toUpperCase()}):</span>
                <span className="font-semibold">{formatCurrency(sale.paidAmount)}</span>
              </div>
              {sale.changeAmount && sale.changeAmount > 0 ? (
                <div className="flex justify-between font-bold">
                  <span>Change Given:</span>
                  <span>{formatCurrency(sale.changeAmount)}</span>
                </div>
              ) : null}
              {sale.dueAmount > 0 && (
                <div className="flex justify-between font-bold text-red-600">
                  <span>Due Balance:</span>
                  <span>{formatCurrency(sale.dueAmount)}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center pt-3 text-[10px] space-y-1">
              <div className="font-medium">{currentOrg.receiptFooterMessage || "Thank you for your business!"}</div>
              <div className="text-[8px] text-neutral-500">
                Powered by XYZ Business OS • www.xyzbusiness.os
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions (Not printed) */}
        <div className="no-print flex items-center justify-between border-t border-border p-4 bg-muted/40">
          <Button variant="outline" size="sm" onClick={handleClose}>
            Close
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1.5" />
              Print Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
