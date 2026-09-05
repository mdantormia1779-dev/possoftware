import React from "react";
import { Building2, Store, BarChart3, ShoppingCart, Users, Shield } from "lucide-react";
import { Branch, UserRole } from "@/types";

interface AppSidebarIdentityProps {
  currentRole: UserRole;
  currentBranch: Branch;
  sidebarCollapsed: boolean;
}

export function AppSidebarIdentity({
  currentRole,
  currentBranch,
  sidebarCollapsed,
}: AppSidebarIdentityProps) {
  if (sidebarCollapsed) return null;

  return (
    <div className="p-2.5 rounded-2xl bg-muted/40 border border-border/70 flex items-center gap-2.5 shadow-subtle-xs mb-2">
      <div
        className={`h-7 w-7 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
          currentRole === "company_owner"
            ? "bg-indigo-600 shadow-xs shadow-indigo-500/25"
            : currentRole === "branch_manager"
            ? "bg-amber-600 shadow-xs shadow-amber-500/25"
            : currentRole === "accountant"
            ? "bg-blue-600 shadow-xs shadow-blue-500/25"
            : currentRole === "cashier"
            ? "bg-emerald-600 shadow-xs shadow-emerald-500/25"
            : "bg-purple-600 shadow-xs shadow-purple-500/25"
        }`}
      >
        {currentRole === "company_owner" && <Building2 className="h-3.5 w-3.5" />}
        {currentRole === "branch_manager" && <Store className="h-3.5 w-3.5" />}
        {currentRole === "accountant" && <BarChart3 className="h-3.5 w-3.5" />}
        {currentRole === "cashier" && <ShoppingCart className="h-3.5 w-3.5" />}
        {currentRole === "staff" && <Users className="h-3.5 w-3.5" />}
        {currentRole === "super_admin" && <Shield className="h-3.5 w-3.5" />}
      </div>
      <div className="truncate leading-tight">
        <div className="text-[11px] font-black text-foreground capitalize truncate">
          {currentRole === "company_owner" && "Owner Console"}
          {currentRole === "branch_manager" && "Manager Console"}
          {currentRole === "accountant" && "Fiscal Accountant"}
          {currentRole === "cashier" && "Counter Till POS"}
          {currentRole === "staff" && "Store Floor Staff"}
          {currentRole === "super_admin" && "Super Admin"}
        </div>
        <div className="text-[9px] text-muted-foreground truncate">
          {currentRole === "branch_manager"
            ? currentBranch.name
            : currentRole === "cashier"
            ? `Till #1 • ${currentBranch.name}`
            : "Role-Specific Navigation"}
        </div>
      </div>
    </div>
  );
}
