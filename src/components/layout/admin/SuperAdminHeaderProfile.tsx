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
    if (typeof window !== "undefined") {
      localStorage.removeItem("xyz_user");
      localStorage.removeItem("xyz_auth_token");
      localStorage.removeItem("super_admin_controlling");
      localStorage.removeItem("super_admin_controlling_name");
    }
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div className="flex items-center gap-2 pl-2 sm:pl-2.5 pr-2.5 sm:pr-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/70 dark:border-purple-800/50">
        <div className="h-7 w-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
          <User className="h-3.5 w-3.5" />
        </div>
        <div className="text-left leading-tight">
          <div className="text-[11px] font-extrabold text-foreground truncate max-w-[100px] sm:max-w-[160px]">
            {adminName}
          </div>
          <div className="text-[10px] text-muted-foreground truncate max-w-[100px] sm:max-w-[160px]">
            {adminEmail}
          </div>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/70 border border-rose-200/80 dark:border-rose-900/60 transition-all shadow-subtle-xs cursor-pointer active:scale-95"
        title="Logout from Super Admin"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="inline font-bold">Logout</span>
      </button>
    </div>
  );
}
