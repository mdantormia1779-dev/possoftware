import React from "react";
import Link from "next/link";
import { Percent, ArrowLeft } from "lucide-react";

export function CommissionsHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link href="/app/hr" className="p-2 rounded-lg border border-border hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Percent className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Sales Staff Commission Dashboard</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Performance incentives automatically linked to POS invoice sales volume
          </p>
        </div>
      </div>
    </div>
  );
}
