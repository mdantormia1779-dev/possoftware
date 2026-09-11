import { apiRequest } from "./apiClient";
import { NotificationItem } from "@/types";

export const notificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    const res = await apiRequest<NotificationItem[]>("/api/notifications");
    return res.data || [];
  },

  async createNotification(data: {
    title: string;
    message: string;
    type?: string;
    link?: string;
    userId?: string;
  }): Promise<NotificationItem | undefined> {
    const res = await apiRequest<NotificationItem>("/api/notifications", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async updateNotification(
    id: string,
    data: Partial<NotificationItem> & { userId?: string; role?: string }
  ): Promise<NotificationItem | undefined> {
    const res = await apiRequest<NotificationItem>(`/api/notifications/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async deleteNotification(id: string, userId?: string, clearOnly?: boolean, role?: string): Promise<{ id: string } | undefined> {
    const q = new URLSearchParams();
    if (userId) q.set("userId", userId);
    if (clearOnly) q.set("clearOnly", "true");
    if (role) q.set("role", role);
    const query = q.toString() ? `?${q.toString()}` : "";
    const res = await apiRequest<{ id: string }>(`/api/notifications/${id}${query}`, { method: "DELETE" });
    return res.data;
  },

  async clearAllNotifications(userId?: string): Promise<{ cleared: boolean } | undefined> {
    const q = userId ? `?action=clear&userId=${encodeURIComponent(userId)}` : "";
    const res = await apiRequest<{ cleared: boolean }>(`/api/notifications${q}`, { method: "DELETE" });
    return res.data;
  },

  async deleteAllNotifications(): Promise<{ deleted: boolean } | undefined> {
    const res = await apiRequest<{ deleted: boolean }>("/api/notifications", { method: "DELETE" });
    return res.data;
  },
};
