"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, ShieldAlert } from "lucide-react";
import { useTenant } from "@/lib/context/TenantContext";
import { authService } from "@/services/auth.service";

export function SuperAdminUserFooter() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useTenant();

  const adminName = currentUser?.name || "Global Administrator";
  const adminEmail = currentUser?.email || "superadmin@xyzpos.com";

  const handleSignOut = async () => {
    try {
      await authService.logout();
    } catch {}
    setCurrentUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("xyz_user");
      localStorage.removeItem("xyz_auth_token");
      localStorage.removeItem("super_admin_controlling");
      localStorage.removeItem("super_admin_controlling_name");
    }
    router.push("/login");
  };

  return (
    <div className="p-3 border-t border-border/80 bg-muted/20 space-y-2.5">
      <div className="p-2.5 rounded-2xl bg-card border border-border/80 shadow-subtle-xs flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-xl bg-purple-600/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300 flex items-center justify-center font-bold text-xs shrink-0">
          <ShieldAlert className="h-4.5 w-4.5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-foreground truncate">{adminName}</span>
            <span className="px-1 py-0.2 rounded text-[9px] font-extrabold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
              ROOT
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground truncate">{adminEmail}</p>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 rounded-xl transition-colors shadow-2xs"
        title="Sign Out"
      >
        <LogOut className="h-3.5 w-3.5 shrink-0" />
        <span>Logout Session</span>
      </button>
    </div>
  );
}
