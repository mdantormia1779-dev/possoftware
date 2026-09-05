import React from "react";
import Link from "next/link";
import { ShoppingCart, Truck, BookOpen, CreditCard } from "lucide-react";

export function OwnerActionShortcuts() {
  return (
    <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2.5 flex flex-col justify-between shadow-subtle-xs">
      <div className="text-xs font-bold text-foreground">
        Executive Action Shortcuts
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <Link
          href="/app/pos"
          className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 font-medium text-center text-foreground transition-all shadow-subtle-xs hover:shadow-subtle-sm flex flex-col items-center gap-1.5"
        >
          <ShoppingCart className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold">New POS Sale</span>
        </Link>
        <Link
          href="/app/inventory/transfers"
          className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 font-medium text-center text-foreground transition-all shadow-subtle-xs hover:shadow-subtle-sm flex flex-col items-center gap-1.5"
        >
          <Truck className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold">Stock Transfer</span>
        </Link>
        <Link
          href="/app/accounting/journal"
          className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 font-medium text-center text-foreground transition-all shadow-subtle-xs hover:shadow-subtle-sm flex flex-col items-center gap-1.5"
        >
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold">Journals</span>
        </Link>
        <Link
          href="/app/hr/payroll"
          className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 font-medium text-center text-foreground transition-all shadow-subtle-xs hover:shadow-subtle-sm flex flex-col items-center gap-1.5"
        >
          <CreditCard className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold">Run Payroll</span>
        </Link>
      </div>
    </div>
  );
}
