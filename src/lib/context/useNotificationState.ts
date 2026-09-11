"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { NotificationItem, UserRole, User } from "../types";
import { storageService } from "../services/storage";
import { notificationService } from "@/services/notification.service";

export function useNotificationState(currentRole: UserRole = "company_owner", currentUser?: User | null) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => storageService.getNotifications());
  const myId = currentUser?.id || `default-${currentRole}`;

  const refreshNotifications = useCallback(() => setNotifications(storageService.getNotifications()), []);

  useEffect(() => {
    notificationService.getNotifications().then((serverNotifs) => {
      if (!Array.isArray(serverNotifs) || serverNotifs.length === 0) return;
      const local = storageService.getNotifications();
      const localIds = new Set(local.map((l) => l.id));
      const fresh = serverNotifs.filter((s) => !localIds.has(s.id));
      if (fresh.length > 0) {
        const merged = [...fresh, ...local];
        storageService.saveNotifications(merged);
        setNotifications(merged);
      }
    }).catch(() => {});
  }, []);

  const roleNotifications = useMemo(() => {
    return notifications.filter((n) => {
      if (Array.isArray(n.clearedBy) && n.clearedBy.includes(myId)) return false;
      if (n.createdBy === myId) return true;
      if (!n.targetRole || n.targetRole === "all") return true;
      if (currentRole === "super_admin" || currentRole === "company_owner") return true;
      return n.targetRole === currentRole;
    });
  }, [notifications, currentRole, myId]);

  const markNotificationRead = useCallback((id: string) => {
    storageService.markNotificationAsRead(id);
    setNotifications(storageService.getNotifications());
    notificationService.updateNotification(id, { isRead: true }).catch(() => {});
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    storageService.markAllNotificationsAsRead();
    setNotifications(storageService.getNotifications());
  }, []);

  const addNotification = useCallback(async (item: Partial<NotificationItem>) => {
    const newNotif: NotificationItem = {
      id: item.id || `notif-${Date.now()}`, title: item.title || "Alert",
      message: item.message || "", type: item.type || "info", targetRole: item.targetRole || "all",
      createdBy: myId, createdByName: currentUser?.name || "Admin", createdByRole: currentRole,
      clearedBy: [], time: item.time || "Just now", isRead: false, link: item.link,
    };
    storageService.addNotification(newNotif);
    setNotifications(storageService.getNotifications());
    notificationService.createNotification(newNotif).catch(() => {});
  }, [myId, currentUser?.name, currentRole]);

  const isSuperAdmin = currentRole === "super_admin" || currentUser?.role === "super_admin";

  const updateNotification = useCallback(async (id: string, updates: Partial<NotificationItem>) => {
    const existing = notifications.find((n) => n.id === id);
    if (!isSuperAdmin && existing?.createdBy && existing.createdBy !== myId) return;
    storageService.updateNotification(id, updates);
    setNotifications(storageService.getNotifications());
    notificationService.updateNotification(id, { ...updates, userId: myId, role: currentRole }).catch(() => {});
  }, [notifications, myId, isSuperAdmin, currentRole]);

  const deleteNotification = useCallback(async (id: string) => {
    const existing = notifications.find((n) => n.id === id);
    if (!isSuperAdmin && existing?.createdBy && existing.createdBy !== myId) {
      storageService.clearNotificationForUser(id, myId);
      setNotifications(storageService.getNotifications());
      notificationService.deleteNotification(id, myId, true, currentRole).catch(() => {});
      return;
    }
    storageService.deleteNotification(id);
    setNotifications(storageService.getNotifications());
    notificationService.deleteNotification(id, myId, false, currentRole).catch(() => {});
  }, [notifications, myId, isSuperAdmin, currentRole]);

  const deleteAllNotifications = useCallback(async () => {
    storageService.clearAllNotificationsForUser(myId);
    setNotifications(storageService.getNotifications());
    notificationService.clearAllNotifications(myId).catch(() => {});
  }, [myId]);

  return {
    notifications: roleNotifications, allNotifications: notifications,
    unreadNotificationCount: roleNotifications.filter((n) => !n.isRead).length,
    isSuperAdmin,
    markNotificationRead, markAllNotificationsRead, addNotification,
    updateNotification, deleteNotification, deleteAllNotifications, refreshNotifications,
  };
}
