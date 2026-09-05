import React from "react";
import { Search } from "lucide-react";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface StaffPriceCheckerProps {
  productQuery: string;
  setProductQuery: (val: string) => void;
  searchResults: Product[];
}

export function StaffPriceChecker({
  productQuery,
  setProductQuery,
  searchResults,
}: StaffPriceCheckerProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
      <div>
        <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
          Instant Stock &amp; Price Checker
        </h3>
        <p className="text-xs text-muted-foreground">
          Quickly check price and stock availability across branches for shoppers
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by product name, SKU or barcode..."
          value={productQuery}
          onChange={(e) => setProductQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-3 rounded-xl border border-border/80 bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
      </div>

      {searchResults.length > 0 ? (
        <div className="space-y-2">
          {searchResults.map((p) => (
            <div
              key={p.id}
              className="p-3 rounded-2xl bg-muted/20 border border-border/60 flex items-center justify-between"
            >
              <div className="truncate pr-2">
                <div className="font-bold text-foreground text-xs truncate">{p.name}</div>
                <div className="text-[10px] text-muted-foreground font-mono">
                  SKU: {p.sku} • Barcode: {p.barcode || "N/A"}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono font-black text-sm text-foreground">
                  {formatCurrency(p.sellingPrice)}
                </div>
                <span
                  className={`text-[10px] font-bold ${
                    p.totalStock > 5 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600"
                  }`}
                >
                  {p.totalStock} in stock
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-muted/20 border border-border/60 text-center space-y-1">
          <span className="text-base">📦</span>
          <p className="text-xs text-muted-foreground">
            Type product name to answer customer queries instantly
          </p>
        </div>
      )}
    </div>
  );
}
