import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Sale } from "@/types";

interface SearchSaleResultsProps {
  sales: Sale[];
  onSelect: () => void;
}

export function SearchSaleResults({ sales, onSelect }: SearchSaleResultsProps) {
  if (sales.length === 0) return null;

  return (
    <div>
      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5 px-1">
        <ShoppingBag className="h-3.5 w-3.5" /> Sales Invoices ({sales.length})
      </div>
      <div className="space-y-1.5">
        {sales.map((s) => (
          <Link
            key={s.id}
            href="/app/sales"
            onClick={onSelect}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all group"
          >
            <div>
              <div className="text-xs sm:text-sm font-semibold text-foreground font-mono">
                {s.invoiceNumber}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {s.customerName || "Walk-in Customer"} | {s.branchName}
              </div>
            </div>
            <div className="text-xs sm:text-sm font-black text-foreground font-mono">
              {formatCurrency(s.grandTotal)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
