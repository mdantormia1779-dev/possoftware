import React from "react";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface BarcodeLabelItemProps {
  orgName: string;
  product?: Product;
  includePrice: boolean;
  includeStoreName?: boolean;
}

const BAR_WIDTHS = [3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 3, 1, 4, 1, 2, 3, 2];

export function BarcodeLabelItem({
  orgName,
  product,
  includePrice,
  includeStoreName = true,
}: BarcodeLabelItemProps) {
  return (
    <div
      className="bg-white text-black p-2.5 rounded border border-neutral-300 shadow-xs flex flex-col items-center justify-between text-center font-mono select-none print:shadow-none print:border-neutral-800 print:break-inside-avoid"
      style={{ minHeight: "100px" }}
    >
      {includeStoreName && (
        <div className="text-[9px] font-bold uppercase truncate max-w-[130px]">
          {orgName}
        </div>
      )}
      <div className="text-[10px] font-bold truncate max-w-[130px] leading-tight">
        {product?.name}
      </div>

      {/* Barcode Lines Simulator */}
      <div className="py-1">
        <div className="flex items-end justify-center h-7 gap-[2px]">
          {BAR_WIDTHS.map((w, i) => (
            <span
              key={i}
              className="bg-black"
              style={{ width: `${w}px`, height: "100%" }}
            />
          ))}
        </div>
        <div className="text-[8px] font-bold mt-0.5 tracking-widest">{product?.barcode}</div>
      </div>

      {includePrice && (
        <div className="text-[11px] font-extrabold border-t border-black w-full pt-0.5">
          MRP: {formatCurrency(product?.sellingPrice)}
        </div>
      )}
    </div>
  );
}
