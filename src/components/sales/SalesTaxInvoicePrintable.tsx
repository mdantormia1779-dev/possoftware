import React, { forwardRef } from "react";
import { Sale, Organization } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";

interface SalesTaxInvoicePrintableProps {
  sale: Sale;
  organization: Organization;
}

export const SalesTaxInvoicePrintable = forwardRef<HTMLDivElement, SalesTaxInvoicePrintableProps>(
  ({ sale, organization }, ref) => {
    return (
      <div ref={ref} className="p-6 bg-white text-slate-900 space-y-5 text-xs font-sans">
        <div className="text-center border-b pb-3 border-slate-300">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            National Board of Revenue | Tax Invoice (Mushak-6.3)
          </span>
          <h2 className="text-lg font-black uppercase text-slate-900 mt-1">{organization.name}</h2>
          <p className="text-slate-600 text-[11px]">{organization.address} | Tel: {organization.phone}</p>
          <p className="text-slate-600 font-mono text-[10px]">BIN/VAT Reg: {organization.taxNumber || "182940294-0101"}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pb-2 border-b border-slate-200 text-[11px]">
          <div>
            <p><span className="text-slate-500">Invoice No:</span> <strong className="font-mono">{sale.invoiceNumber}</strong></p>
            <p><span className="text-slate-500">Date & Time:</span> {formatDateTime(sale.createdAt)}</p>
            <p><span className="text-slate-500">Branch Outlet:</span> {sale.branchName}</p>
          </div>
          <div className="text-right">
            <p><span className="text-slate-500">Customer:</span> <strong>{sale.customerName || "Walk-in Retail Customer"}</strong></p>
            <p><span className="text-slate-500">Payment:</span> <span className="uppercase font-semibold">{sale.paymentMethod}</span></p>
            <p><span className="text-slate-500">Status:</span> <span className="uppercase text-emerald-700 font-bold">{sale.status}</span></p>
          </div>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-800 text-[11px] font-bold text-slate-700">
              <th className="py-2">#</th>
              <th className="py-2">Item Description</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sale.items.map((it, idx) => (
              <tr key={idx}>
                <td className="py-2 text-slate-400 font-mono">{idx + 1}</td>
                <td className="py-2 font-medium">{it.productName}</td>
                <td className="py-2 text-right font-mono">{formatCurrency(it.unitPrice)}</td>
                <td className="py-2 text-center font-mono">{it.quantity}</td>
                <td className="py-2 text-right font-mono font-bold">{formatCurrency(it.totalPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t-2 border-slate-800 pt-3 flex justify-end">
          <div className="w-64 space-y-1.5 text-[11px]">
            <div className="flex justify-between"><span>Subtotal:</span><span className="font-mono">{formatCurrency(sale.subtotal)}</span></div>
            {sale.discountAmount > 0 && <div className="flex justify-between text-rose-600"><span>Discount:</span><span className="font-mono">-{formatCurrency(sale.discountAmount)}</span></div>}
            <div className="flex justify-between"><span>VAT / Tax (Included):</span><span className="font-mono">{formatCurrency(sale.taxAmount)}</span></div>
            <div className="flex justify-between text-sm font-black border-t border-slate-400 pt-1.5 text-slate-900">
              <span>Grand Total:</span><span className="font-mono">{formatCurrency(sale.grandTotal)}</span>
            </div>
          </div>
        </div>

        <div className="pt-10 grid grid-cols-2 gap-8 text-center text-[10px] text-slate-500">
          <div><div className="border-t border-dashed border-slate-400 pt-1 font-semibold">Customer Signature</div></div>
          <div><div className="border-t border-dashed border-slate-400 pt-1 font-semibold">Authorized Store Signatory</div></div>
        </div>
      </div>
    );
  }
);

SalesTaxInvoicePrintable.displayName = "SalesTaxInvoicePrintable";
