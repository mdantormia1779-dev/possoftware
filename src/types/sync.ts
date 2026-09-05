export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "low_stock" | "sale_completed" | "sync_alert" | "payroll" | "subscription";
  time: string;
  isRead: boolean;
  link?: string;
}

export interface SyncQueueItem {
  id: string;
  type: "sale" | "customer" | "inventory_adjustment";
  payload: any;
  createdAt: string;
  status: "pending" | "syncing" | "failed" | "completed";
  error?: string;
  retryCount: number;
}
