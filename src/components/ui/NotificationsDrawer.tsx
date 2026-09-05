"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { X, Bell, CheckCheck } from "lucide-react";
import { Button } from "./Button";
import { NotificationItemRow } from "./NotificationItemRow";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const { notifications, markNotificationRead, unreadNotificationCount } = useTenant();

  if (!isOpen) return null;

  const markAllRead = () => {
    notifications.forEach((n) => markNotificationRead(n.id));
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm h-full bg-card border-l border-border/80 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
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

        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground text-xs space-y-2">
              <Bell className="h-8 w-8 mx-auto opacity-30" />
              <p>No notifications at the moment</p>
            </div>
          ) : (
            notifications.map((n) => (
              <NotificationItemRow
                key={n.id}
                notification={n}
                onMarkRead={markNotificationRead}
                onClose={onClose}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
