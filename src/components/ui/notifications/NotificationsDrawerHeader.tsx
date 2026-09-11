"use client";

import React from "react";
import { X, Bell, CheckCheck, Trash2, Plus } from "lucide-react";
import { Button } from "../Button";

interface NotificationsDrawerHeaderProps {
  unreadCount: number;
  totalCount: number;
  onOpenCreate: () => void;
  onMarkAllRead: () => void;
  onOpenClearAll: () => void;
  onClose: () => void;
}

export function NotificationsDrawerHeader({
  unreadCount,
  totalCount,
  onOpenCreate,
  onMarkAllRead,
  onOpenClearAll,
  onClose,
}: NotificationsDrawerHeaderProps) {
  return (
    <div className="p-4 border-b border-border/80 bg-muted/20 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Bell className="h-4 w-4" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              {unreadCount} new
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-1.5 pt-1 text-xs">
        <Button
          variant="outline"
          size="xs"
          onClick={onOpenCreate}
          className="text-[11px] font-bold h-7"
        >
          <Plus className="h-3 w-3 mr-1" /> New Alert
        </Button>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={onMarkAllRead}
              className="text-[11px] h-7"
            >
              <CheckCheck className="h-3 w-3 mr-1" /> Read All
            </Button>
          )}
          {totalCount > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={onOpenClearAll}
              className="text-[11px] h-7 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Trash2 className="h-3 w-3 mr-1" /> Clear All
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
