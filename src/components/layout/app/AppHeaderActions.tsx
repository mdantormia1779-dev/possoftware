import React from "react";
import Link from "next/link";
import { ShoppingCart, WifiOff, Bell } from "lucide-react";
import { UserRole } from "@/types";
import { AppHeaderRoleBadge } from "./AppHeaderRoleBadge";
import { AppHeaderThemeToggle } from "./AppHeaderThemeToggle";

interface AppHeaderActionsProps {
  currentRole: UserRole;
  isOnline: boolean;
  syncQueueLength: number;
  unreadNotificationCount: number;
  isPosPage: boolean;
  onOpenSync: () => void;
  onOpenNotifications: () => void;
}

export function AppHeaderActions({
  currentRole,
  isOnline,
  syncQueueLength,
  unreadNotificationCount,
  isPosPage,
  onOpenSync,
  onOpenNotifications,
}: AppHeaderActionsProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <AppHeaderRoleBadge currentRole={currentRole} />

      <button
        onClick={onOpenSync}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl border transition-all shadow-subtle-xs ${
          isOnline
            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60 hover:bg-emerald-100"
            : "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60 hover:bg-amber-100"
        }`}
        title="Click to view offline queue & sync status"
      >
        {isOnline ? (
          <>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="hidden sm:inline">Online</span>
          </>
        ) : (
          <>
            <WifiOff className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Offline ({syncQueueLength})</span>
          </>
        )}
      </button>

      {!isPosPage && (currentRole === "cashier" || currentRole === "company_owner" || currentRole === "branch_manager") && (
        <Link
          href="/app/pos"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/25 transition-transform active:scale-95"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          <span className="hidden xs:inline">POS Terminal</span>
        </Link>
      )}

      <button
        onClick={onOpenNotifications}
        className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
        aria-label="View Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadNotificationCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-card animate-pulse" />
        )}
      </button>

      <AppHeaderThemeToggle />

      {currentRole === "super_admin" && (
        <Link
          href="/super-admin"
          className="px-2.5 py-1 text-xs font-bold rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-300 dark:border-purple-800 hover:bg-purple-200 transition-colors"
        >
          Super Admin
        </Link>
      )}
    </div>
  );
}
