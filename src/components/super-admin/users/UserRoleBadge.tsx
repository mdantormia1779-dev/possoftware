import React from "react";
import { PlatformUser } from "./userTypes";

interface UserRoleBadgeProps {
  role: PlatformUser["role"];
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  switch (role) {
    case "super_admin":
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
          Super Admin
        </span>
      );
    case "owner":
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          Company Owner
        </span>
      );
    case "manager":
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          Branch Manager
        </span>
      );
    case "cashier":
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Cashier / Staff
        </span>
      );
    case "accountant":
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          Accountant
        </span>
      );
    default:
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-muted text-muted-foreground">
          {role}
        </span>
      );
  }
}
