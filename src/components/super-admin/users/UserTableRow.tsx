"use client";

import React from "react";
import { Building, ShieldCheck, ShieldAlert, Ban, LogIn } from "lucide-react";
import { PlatformUser } from "./userTypes";
import { UserRoleBadge } from "./UserRoleBadge";

interface UserTableRowProps {
  user: PlatformUser;
  onToggleStatus: (id: string) => void;
  onImpersonate: (user: PlatformUser) => void;
}

export function UserTableRow({ user, onToggleStatus, onImpersonate }: UserTableRowProps) {
  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="p-3.5">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center text-xs">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-foreground">{user.name}</p>
            <p className="text-[11px] text-muted-foreground">{user.email}</p>
            <p className="text-[10px] text-muted-foreground/80">{user.phone}</p>
          </div>
        </div>
      </td>

      <td className="p-3.5">
        <UserRoleBadge role={user.role} />
      </td>

      <td className="p-3.5">
        <div className="flex items-center gap-1.5 font-medium text-foreground">
          <Building className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{user.organization}</span>
        </div>
      </td>

      <td className="p-3.5 text-muted-foreground">{user.lastLogin}</td>

      <td className="p-3.5">
        {user.twoFactorEnabled ? (
          <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" /> Enabled
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-500" /> Off
          </span>
        )}
      </td>

      <td className="p-3.5">
        {user.status === "active" ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Suspended
          </span>
        )}
      </td>

      <td className="p-3.5 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            title={user.status === "active" ? "Suspend Account" : "Reactivate Account"}
            onClick={() => onToggleStatus(user.id)}
            className={`p-1.5 rounded-lg border border-border hover:bg-muted text-xs transition-colors ${
              user.status === "active" ? "text-rose-500 hover:text-rose-600" : "text-emerald-600"
            }`}
          >
            <Ban className="h-3.5 w-3.5" />
          </button>
          <button
            title="Impersonate / Log in as user"
            onClick={() => onImpersonate(user)}
            className="p-1.5 rounded-lg border border-border hover:bg-purple-50 dark:hover:bg-purple-950/30 text-purple-600 dark:text-purple-400 transition-colors"
          >
            <LogIn className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
