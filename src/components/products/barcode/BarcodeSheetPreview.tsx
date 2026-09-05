import React from "react";
import { Product } from "@/lib/types";
import { BarcodeLabelItem } from "./BarcodeLabelItem";

interface BarcodeSheetPreviewProps {
  copies: number;
  orgName: string;
  selectedProduct?: Product;
  includePrice: boolean;
}

export function BarcodeSheetPreview({
  copies,
  orgName,
  selectedProduct,
  includePrice,
}: BarcodeSheetPreviewProps) {
  return (
    <div className="p-8 rounded-3xl border border-border bg-card shadow-sm space-y-4 print:p-0 print:border-none print:shadow-none print:space-y-0">
      <div className="no-print text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Thermal Sticker Sheet Preview (38mm x 25mm Standard)
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 bg-neutral-100 dark:bg-neutral-900 p-6 rounded-2xl print:bg-white print:p-0 print:gap-3 print:grid-cols-3">
        {Array.from({ length: copies }).map((_, idx) => (
          <BarcodeLabelItem
            key={idx}
            orgName={orgName}
            product={selectedProduct}
            includePrice={includePrice}
          />
        ))}
      </div>
    </div>
  );
}
