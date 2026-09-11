"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { NotificationItem } from "@/types";
import { NotificationsDrawerHeader } from "./notifications/NotificationsDrawerHeader";
import { NotificationsDrawerTabs } from "./notifications/NotificationsDrawerTabs";
import { NotificationsDrawerList } from "./notifications/NotificationsDrawerList";
import { CreateNotificationModal } from "../notifications/CreateNotificationModal";
import { EditNotificationModal } from "../notifications/EditNotificationModal";
import { DeleteNotificationModal } from "../notifications/DeleteNotificationModal";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const {
    notifications, unreadNotificationCount, isSuperAdmin, markNotificationRead, markAllNotificationsRead,
    addNotification, updateNotification, deleteNotification, deleteAllNotifications, currentUser,
  } = useTenant();

  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<NotificationItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [clearAllOpen, setClearAllOpen] = useState(false);

  if (!isOpen) return null;

  const filtered = activeTab === "unread" ? notifications.filter((n) => !n.isRead) : notifications;
  const targetItem = notifications.find((n) => n.id === deleteTargetId);
  const isTargetCreator = targetItem ? (isSuperAdmin || !targetItem.createdBy || targetItem.createdBy === currentUser?.id) : true;

  return (
    <>
      <div className="no-print fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="relative w-full max-w-sm h-full bg-card border-l border-border/80 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          <NotificationsDrawerHeader
            unreadCount={unreadNotificationCount} totalCount={notifications.length}
            onOpenCreate={() => setCreateOpen(true)} onMarkAllRead={markAllNotificationsRead}
            onOpenClearAll={() => setClearAllOpen(true)} onClose={onClose}
          />
          <NotificationsDrawerTabs
            activeTab={activeTab} onTabChange={setActiveTab}
            totalCount={notifications.length} unreadCount={unreadNotificationCount}
          />
          <div className="flex-1 overflow-y-auto p-4">
            <NotificationsDrawerList
              notifications={filtered} currentUserId={currentUser?.id} isSuperAdmin={isSuperAdmin}
              onMarkRead={markNotificationRead} onClose={onClose}
              onEdit={(n) => setEditItem(n)} onDelete={(id) => setDeleteTargetId(id)}
            />
          </div>
        </div>
      </div>

      <CreateNotificationModal isOpen={createOpen} onClose={() => setCreateOpen(false)} onCreate={addNotification} />
      <EditNotificationModal isOpen={!!editItem} onClose={() => setEditItem(null)} notification={editItem} onUpdate={updateNotification} />
      <DeleteNotificationModal
        isOpen={!!deleteTargetId} onClose={() => setDeleteTargetId(null)}
        onConfirm={async () => { if (deleteTargetId) await deleteNotification(deleteTargetId); }}
        title={isTargetCreator ? "Delete Alert" : "Clear Alert"}
        description={isTargetCreator ? "Are you sure you want to permanently delete this alert?" : "This will remove this alert from your notifications."}
      />
      <DeleteNotificationModal
        isOpen={clearAllOpen} onClose={() => setClearAllOpen(false)} onConfirm={deleteAllNotifications}
        title="Clear My Notifications"
        description="Are you sure you want to clear your notifications? These alerts will be removed from your view only."
      />
    </>
  );
}

