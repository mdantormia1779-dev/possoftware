"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { storageService } from "@/lib/services/storage";
import { useTenant } from "@/lib/context/TenantContext";
import { Product } from "@/lib/types";
import { MOCK_IMPORT_ROWS } from "@/components/products/import/importData";
import { ImportStepper } from "@/components/products/import/ImportStepper";
import { ImportStepUpload } from "@/components/products/import/ImportStepUpload";
import { ImportStepMapping } from "@/components/products/import/ImportStepMapping";
import { ImportStepPreview } from "@/components/products/import/ImportStepPreview";

export default function ProductImportPage() {
  const { currentOrg, currentBranch } = useTenant();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleExecuteImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      MOCK_IMPORT_ROWS.forEach((row) => {
        const prod: Product = {
          id: `prod-${Date.now()}-${Math.random()}`,
          organizationId: currentOrg.id,
          categoryId: "cat-6",
          categoryName: row.category,
          name: row.name,
          sku: row.sku,
          barcode: row.barcode || `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
          purchasePrice: row.cost,
          sellingPrice: row.price,
          taxRate: 5,
          minStockAlert: 5,
          unit: "pcs",
          totalStock: row.stock,
          branchStocks: { [currentBranch.id]: row.stock },
          isActive: true,
        };
        storageService.addProduct(prod);
      });
      setIsImporting(false);
      setImportSuccess(true);
      setCurrentStep(5);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/app/products" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Bulk Product Import Wizard</h1>
            <p className="text-xs text-muted-foreground">
              Upload CSV or Excel spreadsheets to import thousands of SKUs at once
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1.5" /> Download CSV Template
        </Button>
      </div>

      <ImportStepper currentStep={currentStep} />

      <div className="p-8 rounded-3xl border border-border bg-card shadow-2xs space-y-6">
        {currentStep === 1 && (
          <ImportStepUpload onSelectFile={() => setCurrentStep(2)} />
        )}
        {currentStep === 2 && (
          <ImportStepMapping onConfirm={() => setCurrentStep(3)} />
        )}
        {currentStep >= 3 && (
          <ImportStepPreview
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            importRows={MOCK_IMPORT_ROWS}
            isImporting={isImporting}
            importSuccess={importSuccess}
            onExecuteImport={handleExecuteImport}
          />
        )}
      </div>
    </div>
  );
}
