import React from "react";
import Link from "next/link";
import { Organization, Branch, UserRole } from "@/types";

interface AppHeaderBrandProps {
  currentOrg: Organization;
  currentBranch: Branch;
  currentRole: UserRole;
}

export function AppHeaderBrand({
  currentOrg,
  currentBranch,
  currentRole,
}: AppHeaderBrandProps) {
  return (
    <Link href="/app/dashboard" className="flex items-center gap-2.5 group select-none">
      <div className="h-8.5 w-8.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-black text-base shadow-sm">
        X
      </div>
      <div className="hidden sm:block">
        <span className="font-black text-xs sm:text-sm tracking-tight text-foreground flex items-center gap-1">
          {currentOrg.name}
        </span>
        <span className="text-[10px] text-muted-foreground block leading-none font-medium">
          {currentRole === "company_owner" && "Enterprise OS"}
          {currentRole === "branch_manager" && `${currentBranch.name} Hub`}
          {currentRole === "accountant" && "General Ledger Desk"}
          {currentRole === "cashier" && "POS Counter Till"}
          {currentRole === "staff" && "Floor Station"}
          {currentRole === "super_admin" && "Super Admin"}
        </span>
      </div>
    </Link>
  );
}
