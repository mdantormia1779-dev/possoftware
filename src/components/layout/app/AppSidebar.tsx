import React from "react";
import { X, Layers } from "lucide-react";
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
  currentOrg, currentBranch, currentRole, navSections,
  pathname, mobileMenuOpen, sidebarCollapsed, onCloseMobile,
}: AppSidebarProps) {
  return (
    <>
      {mobileMenuOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`no-print border-r border-border/80 bg-card shrink-0 flex flex-col h-full overflow-hidden transition-all duration-200 md:flex ${
          sidebarCollapsed ? "w-18" : "w-64"
        } ${
          mobileMenuOpen
            ? "fixed inset-y-0 left-0 z-50 w-72 shadow-2xl flex bg-card"
            : "hidden md:flex"
        }`}
      >
        <div className="p-3.5 pb-2 shrink-0 space-y-3">
          {mobileMenuOpen && (
            <div className="flex items-center justify-between pb-3 border-b border-border/80">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Layers className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-bold text-sm text-foreground truncate">{currentOrg.name}</span>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
                aria-label="Close navigation menu"
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
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 px-3.5 py-1.5 overscroll-contain">
          <AppSidebarNavList
            navSections={navSections}
            pathname={pathname}
            sidebarCollapsed={sidebarCollapsed}
            onItemClick={onCloseMobile}
          />
        </div>

        <div className="shrink-0">
          <AppSidebarFooter
            currentRole={currentRole}
            currentOrg={currentOrg}
            currentBranch={currentBranch}
            sidebarCollapsed={sidebarCollapsed}
          />
        </div>
      </aside>
    </>
  );
}
