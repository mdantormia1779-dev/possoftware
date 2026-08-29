"use client";

import React, { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Search, X, Package, User, ShoppingBag, Building, ArrowRight } from "lucide-react";
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

  if (!isSearchModalOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase()) ||
          p.barcode.includes(query)
      ).slice(0, 4)
    : [];

  const filteredCustomers = query.trim()
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.phone.includes(query)
      ).slice(0, 3)
    : [];

  const filteredSales = query.trim()
    ? sales.filter(
        (s) =>
          s.invoiceNumber.toLowerCase().includes(query.toLowerCase()) ||
          (s.customerName && s.customerName.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 3)
    : [];

  const hasResults = filteredProducts.length > 0 || filteredCustomers.length > 0 || filteredSales.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Search Bar Input */}
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, SKUs, customers, invoices, or shortcuts... (ESC to close)"
            className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              <p>Type anything to search across XYZ Business OS</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="px-2 py-1 text-xs rounded bg-muted">Panjabi</span>
                <span className="px-2 py-1 text-xs rounded bg-muted">INV-2026</span>
                <span className="px-2 py-1 text-xs rounded bg-muted">01712</span>
              </div>
            </div>
          )}

          {query.trim() && !hasResults && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No results found for &ldquo;<span className="font-semibold text-foreground">{query}</span>&rdquo;
            </div>
          )}

          {/* Products Result */}
          {filteredProducts.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5" /> Products ({filteredProducts.length})
              </div>
              <div className="space-y-1.5">
                {filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    href="/app/products"
                    onClick={() => setIsSearchModalOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        {p.sku.slice(0, 3)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {p.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          SKU: {p.sku} | Barcode: {p.barcode} | Stock: {p.totalStock} {p.unit}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-foreground">{formatCurrency(p.sellingPrice)}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Customers Result */}
          {filteredCustomers.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> Customers ({filteredCustomers.length})
              </div>
              <div className="space-y-1.5">
                {filteredCustomers.map((c) => (
                  <Link
                    key={c.id}
                    href="/app/customers"
                    onClick={() => setIsSearchModalOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.phone} | Points: {c.loyaltyPoints}</div>
                    </div>
                    <div className="text-right text-xs">
                      {c.dueBalance > 0 ? (
                        <span className="text-rose-600 font-semibold">Due: {formatCurrency(c.dueBalance)}</span>
                      ) : (
                        <span className="text-emerald-600">No Due</span>
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
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShoppingBag className="h-3.5 w-3.5" /> Sales Invoices ({filteredSales.length})
              </div>
              <div className="space-y-1.5">
                {filteredSales.map((s) => (
                  <Link
                    key={s.id}
                    href="/app/sales"
                    onClick={() => setIsSearchModalOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">{s.invoiceNumber}</div>
                      <div className="text-xs text-muted-foreground">
                        {s.customerName || "Walk-in Customer"} | {s.branchName}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      {formatCurrency(s.grandTotal)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 bg-muted/30 text-xs text-muted-foreground">
          <span>Navigate with mouse or keyboard</span>
          <span>Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">K</kbd></span>
        </div>
      </div>
    </div>
  );
}
