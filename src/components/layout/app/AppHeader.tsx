import React from "react";
import { Menu, X, PanelLeft, PanelLeftClose } from "lucide-react";
import { AppHeaderBrand } from "./AppHeaderBrand";
import { AppHeaderBranchControl } from "./AppHeaderBranchControl";
import { AppHeaderSearchButton } from "./AppHeaderSearchButton";
import { AppHeaderActions } from "./AppHeaderActions";
import { Branch, Organization, UserRole } from "@/types";

interface AppHeaderProps {
  currentOrg: Organization;
  currentBranch: Branch;
  branches: Branch[];
  currentRole: UserRole;
  isOnline: boolean;
  syncQueueLength: number;
  unreadNotificationCount: number;
  isPosPage: boolean;
  mobileMenuOpen: boolean;
  sidebarCollapsed: boolean;
  onToggleMobile: () => void;
  onToggleSidebar: () => void;
  onSelectBranch: (branch: Branch) => void;
  onOpenSearch: () => void;
  onOpenSync: () => void;
  onOpenNotifications: () => void;
}

export function AppHeader({
  currentOrg,
  currentBranch,
  branches,
  currentRole,
  isOnline,
  syncQueueLength,
  unreadNotificationCount,
  isPosPage,
  mobileMenuOpen,
  sidebarCollapsed,
  onToggleMobile,
  onToggleSidebar,
  onSelectBranch,
  onOpenSearch,
  onOpenSync,
  onOpenNotifications,
}: AppHeaderProps) {
  return (
    <header className="no-print sticky top-0 z-40 h-16 border-b border-[#E2E8F0] dark:border-[#1E293B] bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md px-3 sm:px-5 flex items-center justify-between shadow-subtle-xs transition-colors">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={onToggleMobile}
          className="md:hidden p-2 rounded-lg text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <AppHeaderBrand
          currentOrg={currentOrg}
          currentBranch={currentBranch}
          currentRole={currentRole}
        />

        <button
          onClick={onToggleSidebar}
          className="hidden md:flex p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors ml-1"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>

        <div className="hidden lg:flex items-center ml-2 pl-3 border-l border-border/80">
          <AppHeaderBranchControl
            currentRole={currentRole}
            currentBranch={currentBranch}
            branches={branches}
            onSelectBranch={onSelectBranch}
          />
        </div>
      </div>

      <AppHeaderSearchButton onClick={onOpenSearch} />

      <AppHeaderActions
        currentRole={currentRole}
        isOnline={isOnline}
        syncQueueLength={syncQueueLength}
        unreadNotificationCount={unreadNotificationCount}
        isPosPage={isPosPage}
        onOpenSync={onOpenSync}
        onOpenNotifications={onOpenNotifications}
      />
    </header>
  );
}
