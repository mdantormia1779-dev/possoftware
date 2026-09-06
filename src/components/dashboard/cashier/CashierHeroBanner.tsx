"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, ArrowRight, User } from "lucide-react";
import { useTenant } from "@/lib/context/TenantContext";

interface CashierHeroBannerProps {
  branchName: string;
}

export function CashierHeroBanner({ branchName }: CashierHeroBannerProps) {
  const { currentUser } = useTenant();
  const cashierName = currentUser?.name || "Sadia Islam";
  const cashierEmail = currentUser?.email || "cashier@rahmanfashion.com.bd";

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-primary via-indigo-600 to-blue-600 text-white shadow-subtle-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-semibold backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>Register Active • {branchName}</span>
          <span className="opacity-60">•</span>
          <span className="flex items-center gap-1 font-bold">
            <User className="h-3 w-3" />
            {cashierName} ({cashierEmail})
          </span>
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
        className="px-5 py-3 rounded-xl bg-white text-primary hover:bg-slate-50 font-black text-xs tracking-wide shadow-subtle-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 shrink-0"
      >
        <ShoppingCart className="h-4 w-4 text-primary" />
        <span>OPEN POS TERMINAL</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
