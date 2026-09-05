import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function ImportSuccessState() {
  return (
    <div className="text-center py-8 space-y-4">
      <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
      <h3 className="text-lg font-bold text-foreground">Import Completed Successfully!</h3>
      <p className="text-xs text-muted-foreground">
        4 new products have been synced into your catalog and branch inventory.
      </p>
      <div className="pt-2">
        <Link
          href="/app/products"
          className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
        >
          View Updated Product Catalog
        </Link>
      </div>
    </div>
  );
}
