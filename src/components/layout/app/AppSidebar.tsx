import React from "react";
import { X } from "lucide-react";
import { AppSidebarIdentity } from "./AppSidebarIdentity";
import { AppSidebarNavList } from "./AppSidebarNavList";
import { AppSidebarFooter } from "./AppSidebarFooter";
import { NavSection } from "./nav/nav.types";
import { Branch, Organization, UserRole } from "@/types";

interface AppSidebarProps {
  currentOrg: Organization;
  currentBranch: Branch;
  currentRole: UserRole;
  navSections: NavSection[];
  pathname: string;
  mobileMenuOpen: boolean;
  sidebarCollapsed: boolean;
  onCloseMobile: () => void;
}

export function AppSidebar({
  currentOrg,
  currentBranch,
  currentRole,
  navSections,
  pathname,
  mobileMenuOpen,
  sidebarCollapsed,
  onCloseMobile,
}: AppSidebarProps) {
  return (
    <aside
      className={`no-print border-r border-border/80 bg-card shrink-0 flex flex-col justify-between overflow-y-auto transition-all duration-200 md:flex ${
        sidebarCollapsed ? "w-18" : "w-64"
      } ${
        mobileMenuOpen
          ? "fixed inset-y-0 left-0 z-50 w-72 shadow-2xl flex bg-card"
          : "hidden md:flex"
      }`}
    >
      <div className="p-3.5 space-y-4">
        {mobileMenuOpen && (
          <div className="flex items-center justify-between pb-3 border-b border-border/80">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                X
              </div>
              <span className="font-bold text-sm text-foreground">
                {currentOrg.name}
              </span>
            </div>
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <AppSidebarIdentity
          currentRole={currentRole}
          currentBranch={currentBranch}
          sidebarCollapsed={sidebarCollapsed}
        />

        <AppSidebarNavList
          navSections={navSections}
          pathname={pathname}
          sidebarCollapsed={sidebarCollapsed}
          onItemClick={onCloseMobile}
        />
      </div>

      <AppSidebarFooter
        currentRole={currentRole}
        currentOrg={currentOrg}
        currentBranch={currentBranch}
        sidebarCollapsed={sidebarCollapsed}
      />
    </aside>
  );
}
