import React from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImportStepUploadProps {
  onSelectFile: () => void;
}

export function ImportStepUpload({ onSelectFile }: ImportStepUploadProps) {
  return (
    <div className="text-center space-y-4 py-8">
      <div className="h-16 w-16 mx-auto rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600">
        <Upload className="h-8 w-8" />
      </div>
      <div>
        <h3 className="text-base font-bold text-foreground">Drag and drop your CSV or Excel file</h3>
        <p className="text-xs text-muted-foreground mt-1">Supports .csv, .xlsx, .xls up to 25MB</p>
      </div>
      <div className="pt-2">
        <Button variant="primary" size="md" onClick={onSelectFile}>
          Select File (Demo: products_master.csv)
        </Button>
      </div>
    </div>
  );
}
