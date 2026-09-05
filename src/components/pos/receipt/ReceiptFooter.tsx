import React from "react";
import { Organization, Sale } from "@/types";

interface ReceiptFooterProps {
  organization: Organization;
  sale: Sale;
}

export const ReceiptFooter: React.FC<ReceiptFooterProps> = ({ organization, sale }) => {
  return (
    <div className="text-center pt-3 text-[10px] space-y-2 text-neutral-800">
      {/* Return Policy */}
      <div className="text-[9px] text-neutral-600 border-t border-dotted border-neutral-300 pt-2 leading-tight">
        Goods once sold can be exchanged within 7 days with original receipt & barcode intact. No cash refund.
      </div>

      {/* Barcode Graphic */}
      <div className="flex flex-col items-center justify-center py-1">
        <div className="flex items-center gap-[2px] h-8 overflow-hidden">
          {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1, 3].map((w, i) => (
            <div
              key={i}
              className="bg-black h-full"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>
        <span className="font-mono text-[9px] tracking-widest text-neutral-700 mt-0.5">
          *{sale.invoiceNumber}*
        </span>
      </div>

      {/* Thank You Note */}
      <div className="font-bold text-[11px] text-black">
        {organization.receiptFooterMessage || "Thank you for shopping with us!"}
      </div>

      <div className="text-[8px] text-neutral-500 font-mono tracking-tight">
        Software by XYZ Business OS • Bangladesh Retail Cloud
      </div>
    </div>
  );
};
