import { Coupon, Campaign, NotificationItem, SyncQueueItem } from "@/types";
import { INITIAL_COUPONS, INITIAL_CAMPAIGNS, INITIAL_NOTIFICATIONS } from "@/data/initial-data";
import { offlineDb } from "../../db/dexie-db";
import { STORAGE_KEYS, getItem, setItem, isBrowser } from "./baseStorage";

export class MarketingStorage {
  public getCoupons = (): Coupon[] => getItem(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
  public addCoupon = (c: Coupon) => setItem(STORAGE_KEYS.COUPONS, [c, ...this.getCoupons()]);
  public getCampaigns = (): Campaign[] => getItem(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
  public addCampaign = (c: Campaign) => setItem(STORAGE_KEYS.CAMPAIGNS, [c, ...this.getCampaigns()]);
  public getNotifications = (): NotificationItem[] => getItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  public saveNotifications = (n: NotificationItem[]) => setItem(STORAGE_KEYS.NOTIFICATIONS, n);
  public addNotification = (n: NotificationItem) => setItem(STORAGE_KEYS.NOTIFICATIONS, [n, ...this.getNotifications()]);

  public updateNotification(id: string, updates: Partial<NotificationItem>): void {
    setItem(STORAGE_KEYS.NOTIFICATIONS, this.getNotifications().map((n) => (n.id === id ? { ...n, ...updates } : n)));
  }

  public deleteNotification(id: string): void {
    setItem(STORAGE_KEYS.NOTIFICATIONS, this.getNotifications().filter((n) => n.id !== id));
  }

  public clearNotificationForUser(id: string, userId: string): void {
    const notifs = this.getNotifications().map((n) => {
      if (n.id !== id) return n;
      const list = Array.isArray(n.clearedBy) ? [...n.clearedBy] : [];
      if (!list.includes(userId)) list.push(userId);
      return { ...n, clearedBy: list };
    });
    setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  public clearAllNotificationsForUser(userId: string): void {
    const notifs = this.getNotifications().map((n) => {
      const list = Array.isArray(n.clearedBy) ? [...n.clearedBy] : [];
      if (!list.includes(userId)) list.push(userId);
      return { ...n, clearedBy: list };
    });
    setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  public deleteAllNotifications = () => setItem(STORAGE_KEYS.NOTIFICATIONS, []);
  public markNotificationAsRead(id: string): void {
    setItem(STORAGE_KEYS.NOTIFICATIONS, this.getNotifications().map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }
  public markAllNotificationsAsRead = () => setItem(STORAGE_KEYS.NOTIFICATIONS, this.getNotifications().map((n) => ({ ...n, isRead: true })));

  public getSyncQueue = (): SyncQueueItem[] => getItem(STORAGE_KEYS.SYNC_QUEUE, []);
  public addSyncQueueItem(item: SyncQueueItem): void {
    setItem(STORAGE_KEYS.SYNC_QUEUE, [item, ...this.getSyncQueue()]);
    if (isBrowser() && offlineDb) offlineDb.syncQueue.put(item).catch(() => {});
  }
  public updateSyncQueueItem(id: string, updates: Partial<SyncQueueItem>): void {
    setItem(STORAGE_KEYS.SYNC_QUEUE, this.getSyncQueue().map((i) => (i.id === id ? { ...i, ...updates } : i)));
  }
  public clearCompletedSyncItems = () => setItem(STORAGE_KEYS.SYNC_QUEUE, this.getSyncQueue().filter((i) => i.status !== "completed"));
}

export const marketingStorage = new MarketingStorage();

