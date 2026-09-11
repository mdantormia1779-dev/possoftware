"use client";

import React, { useState } from "react";
import { Bell, Plus } from "lucide-react";
import { useTenant } from "@/lib/context/TenantContext";
import { NotificationItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { NotificationItemRow } from "@/components/ui/NotificationItemRow";
import { CreateNotificationModal } from "@/components/notifications/CreateNotificationModal";
import { EditNotificationModal } from "@/components/notifications/EditNotificationModal";
import { DeleteNotificationModal } from "@/components/notifications/DeleteNotificationModal";

export function DashboardAlertsWidget() {
  const {
    notifications, unreadNotificationCount, currentRole, currentUser, isSuperAdmin,
    markNotificationRead, addNotification, updateNotification, deleteNotification,
  } = useTenant();

  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<NotificationItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const displayList = notifications.slice(0, 3);
  const targetItem = notifications.find((n) => n.id === deleteId);
  const isTargetCreator = targetItem ? (isSuperAdmin || !targetItem.createdBy || targetItem.createdBy === currentUser?.id) : true;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-subtle-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Bell className="h-4 w-4" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight flex items-center gap-2">
            System Alerts &amp; Notifications
            {unreadNotificationCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                {unreadNotificationCount} unread
              </span>
            )}
          </h3>
        </div>

        <Button variant="outline" size="xs" onClick={() => setCreateOpen(true)} className="text-xs font-bold h-8">
          <Plus className="h-3.5 w-3.5 mr-1" /> New Alert
        </Button>
      </div>

      <div className="space-y-2.5">
        {displayList.length === 0 ? (
          <div className="py-6 text-center text-xs text-muted-foreground">No active system alerts for your role.</div>
        ) : (
          displayList.map((n) => (
            <NotificationItemRow
              key={n.id} notification={n} currentUserId={currentUser?.id} isSuperAdmin={isSuperAdmin}
              onMarkRead={markNotificationRead} onEdit={(notif) => setEditItem(notif)} onDelete={(id) => setDeleteId(id)}
            />
          ))
        )}
      </div>

      <CreateNotificationModal isOpen={createOpen} onClose={() => setCreateOpen(false)} onCreate={addNotification} defaultRole={currentRole} />
      <EditNotificationModal isOpen={!!editItem} onClose={() => setEditItem(null)} notification={editItem} onUpdate={updateNotification} />
      <DeleteNotificationModal
        isOpen={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={async () => { if (deleteId) await deleteNotification(deleteId); }}
        title={isTargetCreator ? "Delete Alert" : "Clear Alert"}
        description={isTargetCreator ? "Are you sure you want to permanently delete this alert?" : "This will remove this alert from your view."}
      />
    </div>
  );
}

