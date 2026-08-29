"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Upload, ArrowLeft, CheckCircle2, AlertCircle, FileText, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { storageService } from "@/lib/services/storage";
import { useTenant } from "@/lib/context/TenantContext";
import { Product } from "@/lib/types";

const MOCK_IMPORT_ROWS = [
  { name: "Executive Cufflink Set - Silver", sku: "CUFF-SLV-11", barcode: "890123456711", category: "Accessories", cost: 450, price: 950, stock: 25, status: "valid" },
  { name: "Semi-Formal Chino Pants - Khaki", sku: "CHINO-KHK-12", barcode: "890123456712", category: "Trousers & Denim", cost: 1200, price: 2250, stock: 30, status: "valid" },
  { name: "Formal Silk Necktie - Burgundy", sku: "TIE-BURG-13", barcode: "890123456713", category: "Accessories", cost: 350, price: 750, stock: 40, status: "valid" },
  { name: "Premium Polo Shirt - Charcoal", sku: "POLO-CHR-14", barcode: "", category: "Formal & Casual Shirts", cost: 850, price: 1650, stock: 20, status: "missing_barcode" },
];

export default function ProductImportPage() {
  const { currentOrg, currentBranch } = useTenant();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const steps = [
    { num: 1, title: "Upload File" },
    { num: 2, title: "Map Columns" },
    { num: 3, title: "Validate Data" },
    { num: 4, title: "Preview Rows" },
    { num: 5, title: "Import SKUs" },
  ];

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/app/products" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Bulk Product Import Wizard</h1>
            <p className="text-xs text-muted-foreground">Upload CSV or Excel spreadsheets to import thousands of SKUs at once</p>
          </div>
        </div>

        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1.5" /> Download CSV Template
        </Button>
      </div>

      {/* Stepper Progress Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs">
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <div key={step.num} className="flex items-center gap-2">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep >= step.num
                    ? "bg-indigo-600 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.num ? <Check className="h-3.5 w-3.5" /> : step.num}
              </div>
              <span className="text-xs font-medium text-foreground hidden sm:inline">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-8 rounded-3xl border border-border bg-card shadow-2xs space-y-6">
        {currentStep === 1 && (
          <div className="text-center space-y-4 py-8">
            <div className="h-16 w-16 mx-auto rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600">
              <Upload className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Drag and drop your CSV or Excel file</h3>
              <p className="text-xs text-muted-foreground mt-1">Supports .csv, .xlsx, .xls up to 25MB</p>
            </div>
            <div className="pt-2">
              <Button variant="primary" size="md" onClick={() => setCurrentStep(2)}>
                Select File (Demo: products_master.csv)
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">Map CSV Columns to XYZ Business OS Fields</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-border bg-muted/20 flex justify-between items-center">
                <span>Product Name</span>
                <strong className="text-indigo-600">Mapped: &ldquo;Item_Title&rdquo;</strong>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/20 flex justify-between items-center">
                <span>SKU Code</span>
                <strong className="text-indigo-600">Mapped: &ldquo;Item_SKU&rdquo;</strong>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/20 flex justify-between items-center">
                <span>Purchase Price</span>
                <strong className="text-indigo-600">Mapped: &ldquo;Cost_BDT&rdquo;</strong>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/20 flex justify-between items-center">
                <span>Selling Price</span>
                <strong className="text-indigo-600">Mapped: &ldquo;MRP_BDT&rdquo;</strong>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button variant="primary" size="sm" onClick={() => setCurrentStep(3)}>
                Confirm Mapping & Validate
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>3 of 4 rows perfectly validated. 1 row has generated auto-barcode.</span>
              </div>
              <span className="font-bold">Ready</span>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="primary" size="sm" onClick={() => setCurrentStep(4)}>
                Proceed to Preview
              </Button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-foreground">Preview Import Rows (4 SKUs)</h3>
            <div className="overflow-x-auto border border-border rounded-xl">
              <table className="w-full text-left">
                <thead className="bg-muted/40 border-b border-border">
                  <tr>
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5">SKU</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Cost</th>
                    <th className="p-2.5">Price</th>
                    <th className="p-2.5">Initial Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MOCK_IMPORT_ROWS.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-medium">{row.name}</td>
                      <td className="p-2.5 font-mono">{row.sku}</td>
                      <td className="p-2.5">{row.category}</td>
                      <td className="p-2.5">৳{row.cost}</td>
                      <td className="p-2.5 font-bold">৳{row.price}</td>
                      <td className="p-2.5">{row.stock} pcs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button variant="primary" size="md" isLoading={isImporting} onClick={handleExecuteImport}>
                Execute & Add to Catalog
              </Button>
            </div>
          </div>
        )}

        {currentStep === 5 && importSuccess && (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-foreground">Import Completed Successfully!</h3>
            <p className="text-xs text-muted-foreground">
              4 new products have been synced into your catalog and branch inventory.
            </p>
            <div className="pt-2">
              <Link href="/app/products" className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">
                View Updated Product Catalog
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
