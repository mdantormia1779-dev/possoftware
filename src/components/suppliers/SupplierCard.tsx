import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Supplier } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface SupplierCardProps {
  supp: Supplier;
}

export function SupplierCard({ supp }: SupplierCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-subtle-xs hover:border-primary/40 transition-all flex flex-col justify-between">
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-foreground">{supp.name}</h3>
          {supp.companyName && (
            <span className="text-xs text-primary font-medium block mt-0.5">
              {supp.companyName}
            </span>
          )}
        </div>

        <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-mono">{supp.phone}</span>
          </div>
          {supp.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{supp.email}</span>
            </div>
          )}
          {supp.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{supp.address}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border text-xs">
          <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
            <span className="text-[10px] text-muted-foreground block font-sans">Total Purchased</span>
            <strong className="text-foreground font-mono font-bold">
              {formatCurrency(supp.totalPurchased)}
            </strong>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
            <span className="text-[10px] text-muted-foreground block font-sans">Current Due</span>
            <strong
              className={`font-mono font-bold ${
                supp.balanceDue > 0
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {formatCurrency(supp.balanceDue)}
            </strong>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Link
          href="/app/purchases"
          className="inline-flex items-center justify-center w-full py-2 rounded-lg text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-colors shadow-2xs"
        >
          View Purchase Orders
        </Link>
      </div>
    </div>
  );
}
