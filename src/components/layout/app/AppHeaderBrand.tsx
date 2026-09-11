import React from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
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
  const orgName = currentOrg?.name || "XYZ Business OS";

  return (
    <Link
      href="/app/dashboard"
      className="flex items-center gap-2 sm:gap-2.5 group select-none shrink-0 min-w-0"
      title={orgName}
    >
      <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0 transition-transform duration-200 group-hover:scale-105">
        <Layers className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-white" />
      </div>

      <div className="flex flex-col min-w-0 max-w-[110px] sm:max-w-[170px] md:max-w-[200px] lg:max-w-[220px]">
        <span className="font-extrabold text-xs sm:text-sm tracking-tight text-foreground whitespace-nowrap truncate leading-tight">
          {orgName}
        </span>
        <span className="hidden sm:block text-[10px] text-muted-foreground font-semibold whitespace-nowrap truncate leading-none mt-0.5">
          XYZ POS &bull; {currentRole === "company_owner" ? "Enterprise OS" : currentBranch?.name || "Branch"}
        </span>
      </div>
    </Link>
  );
}
