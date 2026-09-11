"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiShieldStarFill, RiCopperCoinLine, RiBuilding4Line, RiLogoutBoxRLine, RiUserStarFill } from "react-icons/ri";
import { useTenant } from "@/lib/context/TenantContext";
import { authService } from "@/services/auth.service";

export function SuperAdminHeader() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useTenant();
  const adminName = currentUser?.name || "Global Administrator";
  const adminEmail = currentUser?.email || "superadmin@xyzpos.com";

  const handleSignOut = async () => {
    try { await authService.logout(); } catch {}
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
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-2 border-b border-border/70">
      <div className="flex items-center gap-2.5">
        <div className="h-10 w-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black shadow-md shadow-purple-500/25 shrink-0">
          <RiShieldStarFill className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
              SaaS Platform Control Center
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              ROOT SUPER ADMIN
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-0.5">
            <span className="flex items-center gap-1 font-bold text-foreground">
              <RiUserStarFill className="h-3.5 w-3.5 text-purple-600" />
              {adminName}
            </span>
            <span>&bull;</span>
            <span className="text-muted-foreground font-medium">{adminEmail}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-start lg:justify-end">
        <Link
          href="/super-admin/plans"
          className="px-3 py-2 rounded-xl bg-muted/80 hover:bg-muted border border-border text-foreground text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
        >
          <RiCopperCoinLine className="h-4 w-4 text-purple-600" />
          <span>Plans &amp; Pricing</span>
        </Link>
        <Link
          href="/super-admin/organizations"
          className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
        >
          <RiBuilding4Line className="h-4 w-4" />
          <span>Companies</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          title="Sign out from Super Admin"
        >
          <RiLogoutBoxRLine className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
