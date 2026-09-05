import React from "react";
import Link from "next/link";
import { Package, Plus, Upload, Barcode } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductsHeaderProps {
  onAddClick: () => void;
}

export function ProductsHeader({ onAddClick }: ProductsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Product Master Catalog</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage SKUs, barcodes, cost prices, gross margins, and outlet stock limits
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/app/products/import"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground shadow-subtle-xs transition-colors"
        >
          <Upload className="h-3.5 w-3.5" />
          <span>CSV Import</span>
        </Link>

        <Link
          href="/app/products/barcode"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground shadow-subtle-xs transition-colors"
        >
          <Barcode className="h-3.5 w-3.5" />
          <span>Barcode Labels</span>
        </Link>

        <Button
          variant="primary"
          size="sm"
          onClick={onAddClick}
          className="shadow-sm shadow-indigo-500/25"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Product SKU
        </Button>
      </div>
    </div>
  );
}
