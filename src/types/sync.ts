export type NotificationType =
  | "low_stock"
  | "sale_completed"
  | "sync_alert"
  | "payroll"
  | "subscription"
  | "info"
  | "warning"
  | "success"
  | "error"
  | string;

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  targetRole?: string; // all, company_owner, branch_manager, accountant, cashier, staff, super_admin
  createdBy?: string;
  createdByName?: string;
  createdByRole?: string;
  clearedBy?: string[];
  time?: string;
  createdAt?: string;
  isRead: boolean;
  link?: string;
  organizationId?: string;
  userId?: string;
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
