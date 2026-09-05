import { Coupon, Campaign, NotificationItem, SyncQueueItem } from "@/types";
import { INITIAL_COUPONS, INITIAL_CAMPAIGNS, INITIAL_NOTIFICATIONS } from "@/data/initial-data";
import { offlineDb } from "../../db/dexie-db";
import { STORAGE_KEYS, getItem, setItem, isBrowser } from "./baseStorage";

export class MarketingStorage {
  public getCoupons(): Coupon[] {
    return getItem(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
  }

  public addCoupon(coupon: Coupon): void {
    const all = [coupon, ...this.getCoupons()];
    setItem(STORAGE_KEYS.COUPONS, all);
  }

  public getCampaigns(): Campaign[] {
    return getItem(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
  }

  public addCampaign(campaign: Campaign): void {
    const all = [campaign, ...this.getCampaigns()];
    setItem(STORAGE_KEYS.CAMPAIGNS, all);
  }

  public getNotifications(): NotificationItem[] {
    return getItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  public markNotificationAsRead(id: string): void {
    const notifs = this.getNotifications().map((n) => (n.id === id ? { ...n, isRead: true } : n));
    setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  public getSyncQueue(): SyncQueueItem[] {
    return getItem(STORAGE_KEYS.SYNC_QUEUE, []);
  }

  public addSyncQueueItem(item: SyncQueueItem): void {
    const queue = [item, ...this.getSyncQueue()];
    setItem(STORAGE_KEYS.SYNC_QUEUE, queue);
    if (isBrowser() && offlineDb) {
      offlineDb.syncQueue.put(item).catch(() => {});
    }
  }

  public updateSyncQueueItem(id: string, updates: Partial<SyncQueueItem>): void {
    const queue = this.getSyncQueue().map((item) => (item.id === id ? { ...item, ...updates } : item));
    setItem(STORAGE_KEYS.SYNC_QUEUE, queue);
  }

  public clearCompletedSyncItems(): void {
    const queue = this.getSyncQueue().filter((item) => item.status !== "completed");
    setItem(STORAGE_KEYS.SYNC_QUEUE, queue);
  }
}

export const marketingStorage = new MarketingStorage();
