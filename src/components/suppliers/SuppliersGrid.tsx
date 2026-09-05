import React from "react";
import { Supplier } from "@/types";
import { SupplierCard } from "./SupplierCard";

interface SuppliersGridProps {
  suppliers: Supplier[];
}

export function SuppliersGrid({ suppliers }: SuppliersGridProps) {
  if (suppliers.length === 0) {
    return (
      <div className="p-12 text-center rounded-xl border border-border bg-card text-muted-foreground text-xs">
        No suppliers found matching search criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {suppliers.map((supp) => (
        <SupplierCard key={supp.id} supp={supp} />
      ))}
    </div>
  );
}
