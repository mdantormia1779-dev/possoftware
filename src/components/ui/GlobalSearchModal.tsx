"use client";

import React, { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { Search, X, Sparkles } from "lucide-react";
import { useGlobalSearch } from "./search/useGlobalSearch";
import { SearchEmptyState } from "./search/SearchEmptyState";
import { SearchProductResults } from "./search/SearchProductResults";
import { SearchCustomerResults } from "./search/SearchCustomerResults";
import { SearchSaleResults } from "./search/SearchSaleResults";

export function GlobalSearchModal() {
  const { isSearchModalOpen, setIsSearchModalOpen } = useTenant();
  const [query, setQuery] = useState("");
  const { filteredProducts, filteredCustomers, filteredSales } = useGlobalSearch(
    query,
    isSearchModalOpen
  );

  useEffect(() => {
    if (isSearchModalOpen) setQuery("");
  }, [isSearchModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen(!isSearchModalOpen);
      }
      if (e.key === "Escape" && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const close = () => setIsSearchModalOpen(false);
  const hasResults =
    filteredProducts.length > 0 ||
    filteredCustomers.length > 0 ||
    filteredSales.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl animate-fade-slide">
        <div className="flex items-center border-b border-border/80 px-4.5 py-3.5 bg-muted/20">
          <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, SKUs, customers, invoices, or shortcuts..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-muted rounded-md border border-border/60">
            ESC
          </kbd>
          <button
            onClick={close}
            className="sm:hidden p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted ml-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() && <SearchEmptyState />}
          {query.trim() && !hasResults && (
            <div className="py-10 text-center text-xs sm:text-sm text-muted-foreground">
              No results found for &ldquo;<span className="font-bold text-foreground">{query}</span>&rdquo;
            </div>
          )}
          <SearchProductResults products={filteredProducts} onSelect={close} />
          <SearchCustomerResults customers={filteredCustomers} onSelect={close} />
          <SearchSaleResults sales={filteredSales} onSelect={close} />
        </div>

        <div className="flex items-center justify-between border-t border-border/80 px-4.5 py-3 bg-muted/40 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Spotlight Command Search
          </span>
          <span className="font-mono text-[11px]">
            <kbd className="px-1.5 py-0.5 rounded bg-card border border-border/80">Ctrl</kbd> +{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-card border border-border/80">K</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
