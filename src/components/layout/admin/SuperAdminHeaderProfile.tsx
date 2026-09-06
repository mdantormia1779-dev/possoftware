"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { useTenant } from "@/lib/context/TenantContext";
import { authService } from "@/services/auth.service";

export function SuperAdminHeaderProfile() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useTenant();

  const adminName = currentUser?.name || "Global Administrator";
  const adminEmail = currentUser?.email || "superadmin@xyzpos.com";

  const handleSignOut = async () => {
    try {
      await authService.logout();
    } catch {}
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:flex items-center gap-2 pl-2.5 pr-3 py-1 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40">
        <div className="h-7 w-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
          <User className="h-3.5 w-3.5" />
        </div>
        <div className="text-left">
          <div className="text-[11px] font-bold text-foreground leading-tight truncate max-w-[130px]">
            {adminName}
          </div>
          <div className="text-[10px] text-muted-foreground leading-none truncate max-w-[130px]">
            {adminEmail}
          </div>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl text-rose-600 hover:text-rose-700 bg-rose-50/80 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/70 border border-rose-200/60 dark:border-rose-900/40 transition-colors shadow-subtle-xs"
        title="Logout"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}
