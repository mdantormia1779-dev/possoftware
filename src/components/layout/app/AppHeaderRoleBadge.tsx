import React from "react";
import {
  Building2,
  Store,
  BarChart3,
  ShoppingCart,
  Users,
  Shield,
} from "lucide-react";
import { UserRole } from "@/types";

interface AppHeaderRoleBadgeProps {
  currentRole: UserRole;
}

export function AppHeaderRoleBadge({ currentRole }: AppHeaderRoleBadgeProps) {
  return (
    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl border shadow-subtle-xs bg-muted/40 border-border/70 text-foreground">
      {currentRole === "company_owner" && <Building2 className="h-3.5 w-3.5" />}
      {currentRole === "branch_manager" && <Store className="h-3.5 w-3.5" />}
      {currentRole === "accountant" && <BarChart3 className="h-3.5 w-3.5" />}
      {currentRole === "cashier" && <ShoppingCart className="h-3.5 w-3.5" />}
      {currentRole === "staff" && <Users className="h-3.5 w-3.5" />}
      {currentRole === "super_admin" && <Shield className="h-3.5 w-3.5" />}
      <span className="capitalize">{currentRole.replace("_", " ")}</span>
    </div>
  );
}
