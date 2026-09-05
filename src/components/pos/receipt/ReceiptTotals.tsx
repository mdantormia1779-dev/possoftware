import React from "react";
import { Sale } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface ReceiptTotalsProps {
  sale: Sale;
}

export const ReceiptTotals: React.FC<ReceiptTotalsProps> = ({ sale }) => {
  return (
    <div className="py-2 border-b border-dashed border-neutral-400 space-y-1 text-[10px] text-neutral-800">
      <div className="flex justify-between">
        <span className="text-neutral-600">Subtotal:</span>
        <span className="font-mono">{formatCurrency(sale.subtotal)}</span>
      </div>
      {sale.discountAmount > 0 && (
        <div className="flex justify-between text-neutral-600">
          <span>Discount:</span>
          <span className="font-mono">-{formatCurrency(sale.discountAmount)}</span>
        </div>
      )}
      {sale.taxAmount > 0 && (
        <div className="flex justify-between">
          <span className="text-neutral-600">VAT / Tax:</span>
          <span className="font-mono">{formatCurrency(sale.taxAmount)}</span>
        </div>
      )}
      <div className="flex justify-between text-xs font-bold pt-1 border-t border-neutral-400 text-black">
        <span>NET PAYABLE:</span>
        <span className="font-mono text-sm">{formatCurrency(sale.grandTotal)}</span>
      </div>
      <div className="flex justify-between pt-0.5">
        <span className="text-neutral-600">Paid ({sale.paymentMethod.toUpperCase()}):</span>
        <span className="font-mono font-bold text-black">{formatCurrency(sale.paidAmount)}</span>
      </div>
      {sale.changeAmount && sale.changeAmount > 0 ? (
        <div className="flex justify-between font-bold text-emerald-800">
          <span>Change Returned:</span>
          <span className="font-mono">{formatCurrency(sale.changeAmount)}</span>
        </div>
      ) : null}
      {sale.dueAmount > 0 && (
        <div className="flex justify-between font-bold text-red-700">
          <span>Due Balance:</span>
          <span className="font-mono">{formatCurrency(sale.dueAmount)}</span>
        </div>
      )}
    </div>
  );
};
