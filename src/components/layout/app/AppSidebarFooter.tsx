"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Branch, Organization, UserRole } from "@/types";
import { useTenant } from "@/lib/context/TenantContext";
import { authService } from "@/services/auth.service";

interface AppSidebarFooterProps {
  currentRole: UserRole;
  currentOrg: Organization;
  currentBranch: Branch;
  sidebarCollapsed: boolean;
}

export function AppSidebarFooter({
  currentRole,
  sidebarCollapsed,
}: AppSidebarFooterProps) {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useTenant();

  const userName = currentUser?.name || "Administrator";
  const userEmail = currentUser?.email || "admin@xyzpos.com";

  const handleSignOut = async () => {
    try {
      await authService.logout();
    } catch {}
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <div className="p-3 border-t border-border/80 bg-muted/20 space-y-2.5">
      {!sidebarCollapsed && (
        <div className="p-2.5 rounded-2xl bg-card border border-border/80 shadow-subtle-xs space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8.5 w-8.5 rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 flex items-center justify-center font-black text-xs shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-foreground truncate">{userName}</div>
              <div className="text-[11px] text-muted-foreground truncate">{userEmail}</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t border-border/60 text-[10px]">
            <span className="font-semibold text-muted-foreground capitalize truncate max-w-[120px]">
              {currentRole.replace("_", " ")}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase shrink-0">
              Active
            </span>
          </div>
        </div>
      )}

      <button
        onClick={handleSignOut}
        className={`w-full flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50/60 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 rounded-xl transition-colors shadow-2xs ${
          sidebarCollapsed ? "justify-center" : ""
        }`}
        title={`Sign out (${userEmail})`}
      >
        <LogOut className="h-4 w-4 shrink-0" />
        {!sidebarCollapsed && <span>Sign Out</span>}
      </button>
    </div>
  );
}
