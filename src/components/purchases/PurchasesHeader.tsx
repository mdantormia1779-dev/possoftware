import React from "react";
import Link from "next/link";
import { Boxes, Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PurchasesHeaderProps {
  onCreateClick: () => void;
}

export function PurchasesHeader({ onCreateClick }: PurchasesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Boxes className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Purchase Orders & Goods Receiving (GRN)</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Procure inventory from suppliers, track batch numbers, expiry dates, and supplier payables
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/app/suppliers"
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors shadow-subtle-xs"
        >
          <Building2 className="h-4 w-4" />
          <span>Supplier Directory</span>
        </Link>
        <Button
          onClick={onCreateClick}
          variant="primary"
          size="sm"
          className="font-bold shadow-xs"
        >
          <Plus className="h-4 w-4 mr-1" /> Create Purchase Order
        </Button>
      </div>
    </div>
  );
}
