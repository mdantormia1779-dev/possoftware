"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import {
  X,
  Bell,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  RefreshCw,
  ChevronRight,
  CheckCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({
  isOpen,
  onClose,
}: NotificationsDrawerProps) {
  const { notifications, markNotificationRead, unreadNotificationCount } =
    useTenant();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "low_stock":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "sale_completed":
        return <DollarSign className="h-4 w-4 text-emerald-500" />;
      case "sync_alert":
        return <RefreshCw className="h-4 w-4 text-indigo-500" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-indigo-500" />;
    }
  };

  const markAllRead = () => {
    notifications.forEach((n) => markNotificationRead(n.id));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm h-full bg-card border-l border-border/80 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4.5 border-b border-border/80 bg-muted/20">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Bell className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-foreground text-sm">Notifications</h3>
            {unreadNotificationCount > 0 && (
              <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                {unreadNotificationCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadNotificationCount > 0 && (
              <Button
                variant="ghost"
                size="xs"
                onClick={markAllRead}
                title="Mark all as read"
                className="text-[11px]"
              >
                <CheckCheck className="h-3.5 w-3.5 mr-1" /> All Read
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground text-xs space-y-2">
              <Bell className="h-8 w-8 mx-auto opacity-30" />
              <p>No notifications at the moment</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                  n.isRead
                    ? "border-border/60 bg-card/40 opacity-75 hover:opacity-100"
                    : "border-indigo-200/80 bg-indigo-50/40 dark:border-indigo-900/60 dark:bg-indigo-950/20 shadow-subtle-xs"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-background border border-border/60 mt-0.5 shrink-0 shadow-subtle-xs">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-foreground truncate">
                        {n.title}
                      </h4>
                      <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                      {n.message}
                    </p>
                    {n.link && (
                      <Link
                        href={n.link}
                        onClick={onClose}
                        className="mt-2 inline-flex items-center text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        View Details <ChevronRight className="h-3 w-3 ml-0.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
