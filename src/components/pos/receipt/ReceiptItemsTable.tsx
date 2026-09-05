import React from "react";
import { SaleItem } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface ReceiptItemsTableProps {
  items: SaleItem[];
}

export const ReceiptItemsTable: React.FC<ReceiptItemsTableProps> = ({ items }) => {
  return (
    <div className="py-2 border-b border-dashed border-neutral-400">
      <table className="w-full text-left text-[10px]">
        <thead>
          <tr className="border-b border-neutral-400 font-bold text-black">
            <th className="py-1 text-left">Item Description</th>
            <th className="py-1 text-center w-10">Qty</th>
            <th className="py-1 text-right w-14">Rate</th>
            <th className="py-1 text-right w-16">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dotted divide-neutral-200 text-neutral-800">
          {items.map((item, idx) => (
            <tr key={idx} className="align-top">
              <td className="py-1 pr-1 break-words leading-tight">
                <span className="font-semibold text-black">{item.productName}</span>
                {item.sku && (
                  <span className="block text-[8px] text-neutral-500 font-mono">
                    SKU: {item.sku}
                  </span>
                )}
              </td>
              <td className="py-1 text-center font-mono">{item.quantity}</td>
              <td className="py-1 text-right font-mono">
                {formatCurrency(item.unitPrice, false)}
              </td>
              <td className="py-1 text-right font-mono font-bold text-black">
                {formatCurrency(item.quantity * item.unitPrice, false)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
