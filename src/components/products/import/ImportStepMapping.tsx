import React from "react";
import { Button } from "@/components/ui/Button";

interface ImportStepMappingProps {
  onConfirm: () => void;
}

export function ImportStepMapping({ onConfirm }: ImportStepMappingProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-foreground">
        Map CSV Columns to XYZ Business OS Fields
      </h3>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-lg border border-border bg-muted/20 flex justify-between items-center">
          <span>Product Name</span>
          <strong className="text-indigo-600">Mapped: &ldquo;Item_Title&rdquo;</strong>
        </div>
        <div className="p-3 rounded-lg border border-border bg-muted/20 flex justify-between items-center">
          <span>SKU Code</span>
          <strong className="text-indigo-600">Mapped: &ldquo;Item_SKU&rdquo;</strong>
        </div>
        <div className="p-3 rounded-lg border border-border bg-muted/20 flex justify-between items-center">
          <span>Purchase Price</span>
          <strong className="text-indigo-600">Mapped: &ldquo;Cost_BDT&rdquo;</strong>
        </div>
        <div className="p-3 rounded-lg border border-border bg-muted/20 flex justify-between items-center">
          <span>Selling Price</span>
          <strong className="text-indigo-600">Mapped: &ldquo;MRP_BDT&rdquo;</strong>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4 border-t border-border">
        <Button variant="primary" size="sm" onClick={onConfirm}>
          Confirm Mapping &amp; Validate
        </Button>
      </div>
    </div>
  );
}
