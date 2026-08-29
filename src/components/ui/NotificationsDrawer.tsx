"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { X, Bell, AlertTriangle, CheckCircle2, DollarSign, RefreshCw, ChevronRight } from "lucide-react";
import Link from "next/link";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const { notifications, markNotificationRead } = useTenant();

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
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-sm h-full bg-card border-l border-border shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-foreground" />
            <h3 className="font-semibold text-foreground text-base">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No new notifications
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  n.isRead
                    ? "border-border bg-card/60 opacity-80"
                    : "border-indigo-200 bg-indigo-50/40 dark:border-indigo-900 dark:bg-indigo-950/20"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-md bg-background border border-border mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-foreground">{n.title}</h4>
                      <span className="text-[10px] text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.message}</p>
                    {n.link && (
                      <Link
                        href={n.link}
                        onClick={onClose}
                        className="mt-2 inline-flex items-center text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
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
