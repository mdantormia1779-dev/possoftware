import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { OwnerCriticalInventoryBox } from "./OwnerCriticalInventoryBox";
import { OwnerActionShortcuts } from "./OwnerActionShortcuts";

interface OwnerCriticalInventoryAndShortcutsProps {
  lowStockProducts: Product[];
}

export function OwnerCriticalInventoryAndShortcuts({
  lowStockProducts,
}: OwnerCriticalInventoryAndShortcutsProps) {
  return (
    <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 space-y-4 shadow-subtle-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Critical Inventory &amp; Shortcuts
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Urgent restock requirements &amp; executive shortcuts
          </p>
        </div>
        <Link
          href="/app/inventory"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
        >
          View Stock <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <OwnerCriticalInventoryBox lowStockProducts={lowStockProducts} />
        <OwnerActionShortcuts />
      </div>
    </div>
  );
}
