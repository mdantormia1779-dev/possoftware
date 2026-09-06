"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, UserCheck, Building2, Store } from "lucide-react";
import { useTenant } from "@/lib/context/TenantContext";
import { authService } from "@/services/auth.service";

export function DashboardUserBar() {
  const router = useRouter();
  const { currentUser, setCurrentUser, currentRole, currentOrg, currentBranch } = useTenant();

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
    <div className="p-3.5 sm:p-4 rounded-2xl bg-card border border-border/80 shadow-subtle-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 flex items-center justify-center font-black text-sm shrink-0 border border-indigo-200/50 dark:border-indigo-800/40">
          <UserCheck className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-sm text-foreground truncate">
              {userName}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 capitalize">
              {currentRole.replace("_", " ")}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Session
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5 flex-wrap">
            <span className="truncate">{userEmail}</span>
            <span className="hidden xs:inline text-border">•</span>
            <span className="hidden xs:flex items-center gap-1 truncate">
              <Building2 className="h-3 w-3 text-muted-foreground/70" />
              {currentOrg.name}
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="hidden sm:flex items-center gap-1 truncate">
              <Store className="h-3 w-3 text-muted-foreground/70" />
              {currentBranch.name}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 border border-rose-200/80 dark:border-rose-900/50 transition-all shadow-2xs shrink-0 active:scale-95"
        title="Sign Out of session"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span>Logout Session</span>
      </button>
    </div>
  );
}
