"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Barcode, Plus, Check, Zap } from "lucide-react";

export function BarcodeScannerSimulator() {
  const { addToCart } = useTenant();
  const [barcodeInput, setBarcodeInput] = useState("");
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [scanError, setScanError] = useState(false);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    const products = storageService.getProducts();
    const cleanInput = barcodeInput.trim();

    // Match by barcode, SKU, or SKU prefix
    const matchedProduct = products.find(
      (p) =>
        p.barcode === cleanInput ||
        p.sku.toLowerCase() === cleanInput.toLowerCase() ||
        p.name.toLowerCase().includes(cleanInput.toLowerCase())
    );

    if (matchedProduct) {
      addToCart(matchedProduct, 1);
      setLastScanned(matchedProduct.name);
      setScanError(false);
      setBarcodeInput("");

      setTimeout(() => {
        setLastScanned(null);
      }, 2500);
    } else {
      setScanError(true);
      setTimeout(() => {
        setScanError(false);
      }, 2000);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleScanSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 flex items-center pointer-events-none text-muted-foreground">
          <Barcode className="h-4 w-4 text-indigo-500" />
        </div>
        <input
          type="text"
          value={barcodeInput}
          onChange={(e) => setBarcodeInput(e.target.value)}
          placeholder="Scan barcode or SKU (e.g. 890123456701, PANJ-NAVY-01)..."
          className={`w-full h-10 pl-10 pr-20 rounded-xl border bg-card text-xs sm:text-sm font-mono text-foreground placeholder:text-muted-foreground/70 shadow-subtle-xs focus:outline-none focus:ring-2 transition-all ${
            scanError
              ? "border-rose-500 ring-2 ring-rose-500/30"
              : "border-border/80 focus:ring-indigo-500/50 focus:border-indigo-500"
          }`}
        />
        <div className="absolute right-1.5 flex items-center">
          <button
            type="submit"
            className="h-7 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold flex items-center gap-1 transition-all shadow-subtle-xs"
          >
            <Plus className="h-3 w-3" />
            Add
          </button>
        </div>
      </form>

      {/* Visual Scan Toast Alert */}
      {lastScanned && (
        <div className="absolute top-11.5 left-0 right-0 z-20 flex items-center justify-between p-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-subtle-md animate-fade-slide">
          <span className="flex items-center gap-1.5 truncate">
            <Check className="h-3.5 w-3.5 shrink-0" />
            Added &ldquo;{lastScanned}&rdquo; to cart!
          </span>
          <span className="text-[10px] opacity-90 shrink-0 font-mono">1x Added</span>
        </div>
      )}

      {scanError && (
        <div className="absolute top-11.5 left-0 right-0 z-20 p-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold shadow-subtle-md animate-fade-slide">
          No product found with barcode &ldquo;{barcodeInput}&rdquo;.
        </div>
      )}
    </div>
  );
}
