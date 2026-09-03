"use client";

import React, { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import {
  Search,
  X,
  Package,
  User,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Command,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export function GlobalSearchModal() {
  const { isSearchModalOpen, setIsSearchModalOpen } = useTenant();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState(storageService.getProducts());
  const [customers, setCustomers] = useState(storageService.getCustomers());
  const [sales, setSales] = useState(storageService.getSales());

  useEffect(() => {
    if (isSearchModalOpen) {
      setProducts(storageService.getProducts());
      setCustomers(storageService.getCustomers());
      setSales(storageService.getSales());
      setQuery("");
    }
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

  const filteredProducts = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.sku.toLowerCase().includes(query.toLowerCase()) ||
            p.barcode.includes(query)
        )
        .slice(0, 4)
    : [];

  const filteredCustomers = query.trim()
    ? customers
        .filter(
          (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.phone.includes(query)
        )
        .slice(0, 3)
    : [];

  const filteredSales = query.trim()
    ? sales
        .filter(
          (s) =>
            s.invoiceNumber.toLowerCase().includes(query.toLowerCase()) ||
            (s.customerName &&
              s.customerName.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 3)
    : [];

  const hasResults =
    filteredProducts.length > 0 ||
    filteredCustomers.length > 0 ||
    filteredSales.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl animate-fade-slide">
        {/* Search Bar Input */}
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
            onClick={() => setIsSearchModalOpen(false)}
            className="sm:hidden p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted ml-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="py-8 text-center text-xs sm:text-sm text-muted-foreground space-y-3">
              <div className="flex justify-center">
                <div className="p-3 rounded-2xl bg-muted/60 text-muted-foreground border border-border/40">
                  <Command className="h-6 w-6" />
                </div>
              </div>
              <p className="font-medium text-foreground">
                Type anything to search across XYZ Business OS
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 text-xs rounded-lg bg-muted border border-border/60 font-mono">
                  Panjabi
                </span>
                <span className="px-2.5 py-1 text-xs rounded-lg bg-muted border border-border/60 font-mono">
                  INV-2026
                </span>
                <span className="px-2.5 py-1 text-xs rounded-lg bg-muted border border-border/60 font-mono">
                  01711
                </span>
              </div>
            </div>
          )}

          {query.trim() && !hasResults && (
            <div className="py-10 text-center text-xs sm:text-sm text-muted-foreground">
              No results found for &ldquo;
              <span className="font-bold text-foreground">{query}</span>&rdquo;
            </div>
          )}

          {/* Products Result */}
          {filteredProducts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5 px-1">
                <Package className="h-3.5 w-3.5" /> Products ({filteredProducts.length})
              </div>
              <div className="space-y-1.5">
                {filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    href="/app/products"
                    onClick={() => setIsSearchModalOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all group"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs shrink-0 border border-indigo-200/40 dark:border-indigo-800/40">
                        {p.sku.slice(0, 3)}
                      </div>
                      <div className="truncate">
                        <div className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono">
                          SKU: {p.sku} | Barcode: {p.barcode} | Stock: {p.totalStock} {p.unit}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <span className="text-xs sm:text-sm font-bold text-foreground block font-mono">
                        {formatCurrency(p.sellingPrice)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Customers Result */}
          {filteredCustomers.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5 px-1">
                <User className="h-3.5 w-3.5" /> Customers ({filteredCustomers.length})
              </div>
              <div className="space-y-1.5">
                {filteredCustomers.map((c) => (
                  <Link
                    key={c.id}
                    href="/app/customers"
                    onClick={() => setIsSearchModalOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all group"
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-foreground">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {c.phone} | Points: {c.loyaltyPoints}
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      {c.dueBalance > 0 ? (
                        <span className="text-rose-600 font-bold font-mono">
                          Due: {formatCurrency(c.dueBalance)}
                        </span>
                      ) : (
                        <span className="text-emerald-600 font-semibold">No Due</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Invoices Result */}
          {filteredSales.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5 px-1">
                <ShoppingBag className="h-3.5 w-3.5" /> Sales Invoices ({filteredSales.length})
              </div>
              <div className="space-y-1.5">
                {filteredSales.map((s) => (
                  <Link
                    key={s.id}
                    href="/app/sales"
                    onClick={() => setIsSearchModalOpen(false)}
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
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-border/80 px-4.5 py-3 bg-muted/40 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Spotlight Command Search
          </span>
          <span className="font-mono text-[11px]">
            <kbd className="px-1.5 py-0.5 rounded bg-card border border-border/80">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-card border border-border/80">K</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
