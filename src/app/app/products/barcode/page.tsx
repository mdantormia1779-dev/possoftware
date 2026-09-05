"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { storageService } from "@/lib/services/storage";
import { useTenant } from "@/lib/context/TenantContext";
import { BarcodeControls } from "@/components/products/barcode/BarcodeControls";
import { BarcodeSheetPreview } from "@/components/products/barcode/BarcodeSheetPreview";

export default function BarcodeGeneratorPage() {
  const { currentOrg } = useTenant();
  const products = storageService.getProducts();
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || "");
  const [copies, setCopies] = useState<number>(12);
  const [includePrice, setIncludePrice] = useState<boolean>(true);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <Link href="/app/products" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Barcode &amp; Price Label Generator</h1>
            <p className="text-xs text-muted-foreground">Generate and print Code128 thermal sticky labels</p>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-1.5" /> Print Label Sheet
        </Button>
      </div>

      <BarcodeControls
        products={products}
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
        copies={copies}
        setCopies={setCopies}
        includePrice={includePrice}
        setIncludePrice={setIncludePrice}
      />

      <BarcodeSheetPreview
        copies={copies}
        orgName={currentOrg.name}
        selectedProduct={selectedProduct}
        includePrice={includePrice}
      />
    </div>
  );
}
