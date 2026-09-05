import React, { forwardRef } from "react";
import { Organization, Sale } from "@/types";
import { ReceiptHeader } from "./ReceiptHeader";
import { ReceiptMeta } from "./ReceiptMeta";
import { ReceiptItemsTable } from "./ReceiptItemsTable";
import { ReceiptTotals } from "./ReceiptTotals";
import { ReceiptFooter } from "./ReceiptFooter";

interface ThermalReceiptSheetProps {
  organization: Organization;
  sale: Sale;
}

export const ThermalReceiptSheet = forwardRef<HTMLDivElement, ThermalReceiptSheetProps>(
  ({ organization, sale }, ref) => {
    return (
      <div
        id="thermal-receipt"
        ref={ref}
        className="w-[80mm] max-w-full bg-white text-black p-4 font-mono text-[11px] shadow-md border border-neutral-200 rounded-sm leading-tight select-text"
      >
        <ReceiptHeader organization={organization} />
        <ReceiptMeta sale={sale} />
        <ReceiptItemsTable items={sale.items} />
        <ReceiptTotals sale={sale} />
        <ReceiptFooter organization={organization} sale={sale} />
      </div>
    );
  }
);

ThermalReceiptSheet.displayName = "ThermalReceiptSheet";
