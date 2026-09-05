import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Branch, Organization, UserRole } from "@/types";

interface AppSidebarFooterProps {
  currentRole: UserRole;
  currentOrg: Organization;
  currentBranch: Branch;
  sidebarCollapsed: boolean;
}

export function AppSidebarFooter({
  currentRole,
  currentOrg,
  currentBranch,
  sidebarCollapsed,
}: AppSidebarFooterProps) {
  return (
    <div className="p-3 border-t border-border/80 bg-muted/20 space-y-2.5">
      {!sidebarCollapsed && (
        <div className="p-3 rounded-2xl bg-card border border-border/80 shadow-subtle-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground capitalize flex items-center gap-1">
              {currentRole === "company_owner" && "👑 Business Owner"}
              {currentRole === "branch_manager" && "👔 Branch Manager"}
              {currentRole === "accountant" && "📊 Fiscal Accountant"}
              {currentRole === "cashier" && "🛒 POS Cashier"}
              {currentRole === "staff" && "👥 Floor Associate"}
              {currentRole === "super_admin" && "🛡️ Super Admin"}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold uppercase">Active</span>
          </div>
          <p className="text-[11px] text-muted-foreground truncate">
            {currentRole === "branch_manager"
              ? `${currentBranch.name} Outlet`
              : currentRole === "cashier"
              ? `Counter #1 • ${currentBranch.name}`
              : `${currentOrg.name}`}
          </p>
        </div>
      )}

      <Link
        href="/login"
        className={`flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors ${
          sidebarCollapsed ? "justify-center" : ""
        }`}
        title="Sign Out"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        {!sidebarCollapsed && <span>Sign Out</span>}
      </Link>
    </div>
  );
}
