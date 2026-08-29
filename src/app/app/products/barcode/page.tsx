"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Barcode as BarcodeIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { storageService } from "@/lib/services/storage";
import { useTenant } from "@/lib/context/TenantContext";
import { formatCurrency } from "@/lib/utils";

export default function BarcodeGeneratorPage() {
  const { currentOrg } = useTenant();
  const products = storageService.getProducts();
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || "");
  const [copies, setCopies] = useState<number>(12);
  const [includePrice, setIncludePrice] = useState<boolean>(true);
  const [includeStoreName, setIncludeStoreName] = useState<boolean>(true);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <Link href="/app/products" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Barcode & Price Label Generator</h1>
            <p className="text-xs text-muted-foreground">Generate and print Code128 thermal sticky labels</p>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-1.5" /> Print Label Sheet
        </Button>
      </div>

      {/* Settings Grid (No print) */}
      <div className="p-5 rounded-2xl border border-border bg-card shadow-2xs grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs no-print">
        <div className="sm:col-span-2 space-y-1.5">
          <label className="font-semibold text-foreground">Select Product SKU</label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-foreground"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (SKU: {p.sku} | {formatCurrency(p.sellingPrice)})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Number of Labels</label>
          <input
            type="number"
            min={1}
            max={100}
            value={copies}
            onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background"
          />
        </div>

        <div className="space-y-2 pt-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includePrice}
              onChange={(e) => setIncludePrice(e.target.checked)}
              className="h-3.5 w-3.5 rounded text-indigo-600"
            />
            <span>Show MRP Price (৳)</span>
          </label>
        </div>
      </div>

      {/* Label Sheet Preview */}
      <div className="p-8 rounded-3xl border border-border bg-card shadow-sm space-y-4">
        <div className="no-print text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Thermal Sticker Sheet Preview (38mm x 25mm Standard)
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 bg-neutral-100 dark:bg-neutral-900 p-6 rounded-2xl">
          {Array.from({ length: copies }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white text-black p-2.5 rounded border border-neutral-300 shadow-xs flex flex-col items-center justify-between text-center font-mono select-none"
              style={{ minHeight: "100px" }}
            >
              {includeStoreName && (
                <div className="text-[9px] font-bold uppercase truncate max-w-[130px]">
                  {currentOrg.name}
                </div>
              )}
              <div className="text-[10px] font-bold truncate max-w-[130px] leading-tight">
                {selectedProduct?.name}
              </div>

              {/* Barcode Lines Simulator */}
              <div className="py-1">
                <div className="flex items-end justify-center h-7 gap-[2px]">
                  {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 3, 1, 4, 1, 2, 3, 2].map((w, i) => (
                    <span
                      key={i}
                      className="bg-black"
                      style={{ width: `${w}px`, height: "100%" }}
                    />
                  ))}
                </div>
                <div className="text-[8px] font-bold mt-0.5 tracking-widest">{selectedProduct?.barcode}</div>
              </div>

              {includePrice && (
                <div className="text-[11px] font-extrabold border-t border-black w-full pt-0.5">
                  MRP: {formatCurrency(selectedProduct?.sellingPrice)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
