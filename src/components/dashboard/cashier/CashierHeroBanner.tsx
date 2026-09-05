import React from "react";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";

interface CashierHeroBannerProps {
  branchName: string;
}

export function CashierHeroBanner({ branchName }: CashierHeroBannerProps) {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-blue-600 text-white shadow-subtle-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-white text-[11px] font-medium backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Counter Register Active • {branchName}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Ready to Ring Up Customers?
        </h2>
        <p className="text-xs text-white/80 max-w-md">
          Barcode scanning, thermal receipt printing, bKash QR payments &amp; 100% offline sync capability.
        </p>
      </div>

      <Link
        href="/app/pos"
        className="px-5 py-3 rounded-lg bg-white text-primary hover:bg-slate-50 font-bold text-xs tracking-wide shadow-subtle-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 shrink-0"
      >
        <ShoppingCart className="h-4 w-4 text-primary" />
        <span>OPEN POS TERMINAL</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
