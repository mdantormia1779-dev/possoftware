import { NotificationItem } from "@/types";

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Low Stock Alert",
    message: "Italian Leather Reversible Belt is below minimum threshold (3 left across all branches).",
    type: "low_stock",
    time: "10 mins ago",
    isRead: false,
    link: "/app/inventory",
  },
  {
    id: "notif-2",
    title: "POS Sale Completed",
    message: "Invoice INV-202602-8812 for ৳5,460 successfully processed via bKash.",
    type: "sale_completed",
    time: "45 mins ago",
    isRead: false,
    link: "/app/sales",
  },
  {
    id: "notif-3",
    title: "Offline Sync Succeeded",
    message: "2 pending offline transactions have been synchronized to cloud.",
    type: "sync_alert",
    time: "2 hours ago",
    isRead: true,
    link: "/app/pos",
  },
  {
    id: "notif-4",
    title: "Payroll Disbursed",
    message: "February 2026 Payroll approved and journal entries posted.",
    type: "payroll",
    time: "Yesterday",
    isRead: true,
    link: "/app/payroll",
  },
];

