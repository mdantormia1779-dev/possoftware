"use client";

import React from "react";

interface NotificationsDrawerTabsProps {
  activeTab: "all" | "unread";
  onTabChange: (tab: "all" | "unread") => void;
  totalCount: number;
  unreadCount: number;
}

export function NotificationsDrawerTabs({
  activeTab,
  onTabChange,
  totalCount,
  unreadCount,
}: NotificationsDrawerTabsProps) {
  return (
    <div className="flex border-b border-border px-4 pt-1 bg-muted/10 gap-4 text-xs font-bold">
      <button
        onClick={() => onTabChange("all")}
        className={`pb-2 border-b-2 transition-colors ${
          activeTab === "all"
            ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
            : "border-transparent text-muted-foreground hover:text-foreground"
        }`}
      >
        All ({totalCount})
      </button>
      <button
        onClick={() => onTabChange("unread")}
        className={`pb-2 border-b-2 transition-colors ${
          activeTab === "unread"
            ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
            : "border-transparent text-muted-foreground hover:text-foreground"
        }`}
      >
        Unread ({unreadCount})
      </button>
    </div>
  );
}
