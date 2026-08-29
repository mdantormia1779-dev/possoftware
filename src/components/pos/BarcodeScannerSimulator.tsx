"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Barcode, Search, Plus, Check } from "lucide-react";
import { Button } from "../ui/Button";

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
        <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
          <Barcode className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={barcodeInput}
          onChange={(e) => setBarcodeInput(e.target.value)}
          placeholder="Scan barcode or type SKU (e.g. 890123456701, PANJ-NAVY-01)..."
          className={`w-full h-11 pl-10 pr-24 rounded-xl border bg-card text-sm text-foreground placeholder:text-muted-foreground shadow-xs focus:outline-none focus:ring-2 transition-all ${
            scanError
              ? "border-rose-500 ring-2 ring-rose-500/30"
              : "border-border focus:ring-indigo-500"
          }`}
        />
        <div className="absolute right-1.5 flex items-center gap-1">
          <button
            type="submit"
            className="h-8 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-1 transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </form>

      {/* Visual Scan Toast Alert */}
      {lastScanned && (
        <div className="absolute top-12 left-0 right-0 z-20 flex items-center justify-between p-2.5 rounded-lg bg-emerald-600 text-white text-xs font-medium shadow-lg animate-in slide-in-from-top-2 duration-150">
          <span className="flex items-center gap-1.5 truncate">
            <Check className="h-4 w-4 shrink-0" />
            Added &ldquo;{lastScanned}&rdquo; to cart!
          </span>
          <span className="text-[10px] opacity-80 shrink-0">1x Added</span>
        </div>
      )}

      {scanError && (
        <div className="absolute top-12 left-0 right-0 z-20 p-2.5 rounded-lg bg-rose-600 text-white text-xs font-medium shadow-lg animate-in slide-in-from-top-2 duration-150">
          No product found with barcode &ldquo;{barcodeInput}&rdquo;.
        </div>
      )}
    </div>
  );
}
