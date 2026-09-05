import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImportRow } from "./importData";
import { ImportSuccessState } from "./ImportSuccessState";

interface ImportStepPreviewProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  importRows: ImportRow[];
  isImporting: boolean;
  importSuccess: boolean;
  onExecuteImport: () => void;
}

export function ImportStepPreview({
  currentStep,
  setCurrentStep,
  importRows,
  isImporting,
  importSuccess,
  onExecuteImport,
}: ImportStepPreviewProps) {
  if (currentStep === 3) {
    return (
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
    );
  }

  if (currentStep === 4) {
    return (
      <div className="space-y-4 text-xs">
        <h3 className="text-sm font-bold text-foreground">
          Preview Import Rows ({importRows.length} SKUs)
        </h3>
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
              {importRows.map((row, idx) => (
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
          <Button
            variant="primary"
            size="md"
            isLoading={isImporting}
            onClick={onExecuteImport}
          >
            Execute &amp; Add to Catalog
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 5 && importSuccess) {
    return <ImportSuccessState />;
  }

  return null;
}
