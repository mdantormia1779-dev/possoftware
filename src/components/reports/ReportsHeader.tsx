import React from "react";
import { BarChart3, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ReportsHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Business Intelligence &amp; Reports Center</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Executive financial audits, stock turnover rates, and branch performance metrics
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="shadow-subtle-xs"
        >
          <Printer className="h-3.5 w-3.5 mr-1.5" /> Print Report
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="shadow-sm shadow-indigo-500/25"
        >
          <Download className="h-3.5 w-3.5 mr-1.5" /> Export PDF / CSV
        </Button>
      </div>
    </div>
  );
}
