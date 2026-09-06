"use client";

import React from "react";
import Link from "next/link";
import { Store, Truck, ShoppingCart } from "lucide-react";
import { Branch } from "@/types";
import { useTenant } from "@/lib/context/TenantContext";

interface BranchWelcomeHeaderProps {
  currentBranch: Branch;
}

export function BranchWelcomeHeader({ currentBranch }: BranchWelcomeHeaderProps) {
  const { currentUser } = useTenant();
  const managerName = currentUser?.name || currentBranch.managerName || "Store Manager";
  const managerEmail = currentUser?.email || "manager@rahmanfashion.com.bd";

  return (
    <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/80 dark:border-amber-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300">
            <Store className="h-4 w-4" />
          </span>
          <h2 className="text-base sm:text-lg font-black text-foreground">
            {currentBranch.name} • Operational Hub
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
            Branch Active
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Manager: <span className="font-semibold text-foreground">{managerName}</span> ({managerEmail}) • City: {currentBranch.city}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/app/inventory/transfers"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border/80 hover:border-amber-400 text-xs font-bold text-foreground transition-all shadow-subtle-xs active:scale-95"
        >
          <Truck className="h-3.5 w-3.5 text-amber-600" />
          <span>Request Stock</span>
        </Link>

        <Link
          href="/app/pos"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all active:scale-95"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          <span>Open Branch POS</span>
        </Link>
      </div>
    </div>
  );
}
