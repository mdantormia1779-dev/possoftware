"use client";

import React from "react";
import { Bell } from "lucide-react";
import { NotificationItem } from "@/types";
import { NotificationItemRow } from "../NotificationItemRow";

interface NotificationsDrawerListProps {
  notifications: NotificationItem[];
  currentUserId?: string;
  isSuperAdmin?: boolean;
  onMarkRead: (id: string) => void;
  onClose: () => void;
  onEdit: (notification: NotificationItem) => void;
  onDelete: (id: string) => void;
}

export function NotificationsDrawerList({
  notifications,
  currentUserId,
  isSuperAdmin,
  onMarkRead,
  onClose,
  onEdit,
  onDelete,
}: NotificationsDrawerListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground text-xs space-y-2">
        <Bell className="h-8 w-8 mx-auto opacity-30" />
        <p>No notifications to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {notifications.map((n) => (
        <NotificationItemRow
          key={n.id}
          notification={n}
          currentUserId={currentUserId}
          isSuperAdmin={isSuperAdmin}
          onMarkRead={onMarkRead}
          onClose={onClose}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
