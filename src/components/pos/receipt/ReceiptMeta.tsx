import React from "react";
import { Sale } from "@/types";
import { formatDateTime } from "@/lib/utils";

interface ReceiptMetaProps {
  sale: Sale;
}

export const ReceiptMeta: React.FC<ReceiptMetaProps> = ({ sale }) => {
  return (
    <div className="py-2 border-b border-dashed border-neutral-400 space-y-0.5 text-[10px] text-neutral-800">
      <div className="flex justify-between">
        <span className="text-neutral-600">Invoice No:</span>
        <span className="font-bold font-mono text-black">{sale.invoiceNumber}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-neutral-600">Date & Time:</span>
        <span>{formatDateTime(sale.createdAt)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-neutral-600">Branch:</span>
        <span>{sale.branchName}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-neutral-600">Cashier:</span>
        <span>{sale.cashierName}</span>
      </div>
      {sale.customerName && (
        <div className="flex justify-between pt-1 border-t border-dotted border-neutral-300">
          <span className="text-neutral-600">Customer:</span>
          <span className="font-bold text-black">{sale.customerName}</span>
        </div>
      )}
      {sale.customerPhone && (
        <div className="flex justify-between font-mono">
          <span className="text-neutral-600">Phone:</span>
          <span>{sale.customerPhone}</span>
        </div>
      )}
    </div>
  );
};
