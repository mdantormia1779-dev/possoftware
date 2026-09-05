"use client";

import React from "react";
import { PlatformUser } from "./userTypes";

interface UserKpisProps {
  users: PlatformUser[];
}

export function UserKpis({ users }: UserKpisProps) {
  const total = users.length;
  const owners = users.filter((u) => u.role === "owner").length;
  const staff = users.filter((u) => u.role === "cashier" || u.role === "manager").length;
  const twoFaPct = total > 0 ? Math.round((users.filter((u) => u.twoFactorEnabled).length / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="p-4 rounded-2xl border border-border bg-card shadow-subtle-xs space-y-1">
        <span className="text-xs font-semibold text-muted-foreground">Total Users</span>
        <p className="text-2xl font-black text-foreground">{total}</p>
        <span className="text-[11px] text-emerald-600 font-medium">Across all tenants</span>
      </div>

      <div className="p-4 rounded-2xl border border-border bg-card shadow-subtle-xs space-y-1">
        <span className="text-xs font-semibold text-muted-foreground">Company Owners</span>
        <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{owners}</p>
        <span className="text-[11px] text-muted-foreground">Primary billing contacts</span>
      </div>

      <div className="p-4 rounded-2xl border border-border bg-card shadow-subtle-xs space-y-1">
        <span className="text-xs font-semibold text-muted-foreground">Branch Staff &amp; Cashiers</span>
        <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{staff}</p>
        <span className="text-[11px] text-muted-foreground">Store operations</span>
      </div>

      <div className="p-4 rounded-2xl border border-border bg-card shadow-subtle-xs space-y-1">
        <span className="text-xs font-semibold text-muted-foreground">2FA Adoption</span>
        <p className="text-2xl font-black text-purple-600 dark:text-purple-400">{twoFaPct}%</p>
        <span className="text-[11px] text-emerald-600 font-medium">High security posture</span>
      </div>
    </div>
  );
}
