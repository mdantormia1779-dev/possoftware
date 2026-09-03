"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { formatDate } from "@/lib/utils";
import { Calendar, ShoppingCart, Shield, ChevronRight } from "lucide-react";
import { OwnerDashboard } from "@/components/dashboard/OwnerDashboard";
import { BranchManagerDashboard } from "@/components/dashboard/BranchManagerDashboard";
import { AccountantDashboard } from "@/components/dashboard/AccountantDashboard";
import { CashierDashboard } from "@/components/dashboard/CashierDashboard";
import { StaffDashboard } from "@/components/dashboard/StaffDashboard";

export default function DashboardPage() {
  const { currentRole, currentBranch } = useTenant();
  const [dateRange] = useState("Today, " + formatDate(new Date()));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Bar (Clean, without any role switcher) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
              {currentRole === "company_owner" && "Executive Business Dashboard"}
              {currentRole === "branch_manager" && `${currentBranch.name} • Operations Dashboard`}
              {currentRole === "accountant" && "Financial & General Ledger Dashboard"}
              {currentRole === "cashier" && "POS Counter & Till Shift Dashboard"}
              {currentRole === "staff" && "Store Floor Operations Dashboard"}
              {currentRole === "super_admin" && "Platform Administration Overview"}
            </h1>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/60 dark:border-indigo-800/60">
              {currentBranch.name}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {currentRole === "company_owner" && "Enterprise-wide sales telemetry, gross profit & multi-branch intelligence"}
            {currentRole === "branch_manager" && `Daily branch sales target, cashier till balances & staff attendance for ${currentBranch.name}`}
            {currentRole === "accountant" && "Double-entry bookkeeping, NBR 5% VAT tracking & liquid cash accounts"}
            {currentRole === "cashier" && "Counter cash drawer status, shift sales count & fast receipt reprinting"}
            {currentRole === "staff" && "Shift attendance, floor task checklist & customer stock lookup"}
            {currentRole === "super_admin" && "Global multi-tenancy, subscription billing & system health"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Date Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/80 bg-card text-xs font-semibold text-muted-foreground shadow-subtle-xs">
            <Calendar className="h-3.5 w-3.5 text-indigo-500" />
            <span>{dateRange}</span>
          </div>

          {/* POS Terminal Shortcut */}
          <Link
            href="/app/pos"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-transform active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>POS Counter</span>
          </Link>
        </div>
      </div>

      {/* Super Admin Notice if logged in as super_admin */}
      {currentRole === "super_admin" && (
        <div className="p-4 rounded-3xl bg-purple-500/10 border border-purple-200 dark:border-purple-900/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-foreground">Super Admin Mode Active</div>
              <div className="text-xs text-muted-foreground">
                You have global tenant administration privileges.
              </div>
            </div>
          </div>
          <Link
            href="/super-admin"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shrink-0 flex items-center gap-1.5"
          >
            <span>Open Super Admin Console</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Render Exclusively the Logged-in User's Role Dashboard */}
      <div>
        {currentRole === "company_owner" && <OwnerDashboard />}
        {currentRole === "branch_manager" && <BranchManagerDashboard />}
        {currentRole === "accountant" && <AccountantDashboard />}
        {currentRole === "cashier" && <CashierDashboard />}
        {currentRole === "staff" && <StaffDashboard />}
        {currentRole === "super_admin" && <OwnerDashboard />}
      </div>
    </div>
  );
}
