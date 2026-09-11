import { NotificationItem } from "@/types";

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1", title: "Executive Revenue Milestone", type: "success", targetRole: "company_owner",
    message: "Today's gross sales reached ৳124,500 across all branches with 42% margin.",
    createdBy: "default-company_owner", createdByName: "Mahfuzur Rahman", createdByRole: "company_owner",
    clearedBy: [], time: "10 mins ago", isRead: false, link: "/app/dashboard",
  },
  {
    id: "notif-2", title: "Branch Low Stock Alert", type: "low_stock", targetRole: "branch_manager",
    message: "Italian Leather Reversible Belt is below safety threshold (3 left in stock).",
    createdBy: "default-branch_manager", createdByName: "Tanvir Hasan", createdByRole: "branch_manager",
    clearedBy: [], time: "25 mins ago", isRead: false, link: "/app/inventory",
  },
  {
    id: "notif-3", title: "VAT Mushak-6.3 Reconciliation", type: "warning", targetRole: "accountant",
    message: "NBR 5% VAT ledger entries ready for monthly return submission.",
    createdBy: "default-accountant", createdByName: "Farhan Ahmed, ACA", createdByRole: "accountant",
    clearedBy: [], time: "1 hour ago", isRead: false, link: "/app/accounting/reports",
  },
  {
    id: "notif-4", title: "Cash Drawer Limit Reached", type: "warning", targetRole: "cashier",
    message: "Counter 1 till has exceeded ৳50,000 cash. Vault drop recommended.",
    createdBy: "default-cashier", createdByName: "Sadia Islam", createdByRole: "cashier",
    clearedBy: [], time: "15 mins ago", isRead: false, link: "/app/pos",
  },
  {
    id: "notif-5", title: "Floor Restock Task Assigned", type: "info", targetRole: "staff",
    message: "Restock denim jeans sizes 32 & 34 on showroom display rack.",
    createdBy: "default-staff", createdByName: "Kamrul Hassan", createdByRole: "staff",
    clearedBy: [], time: "30 mins ago", isRead: false, link: "/app/dashboard",
  },
  {
    id: "notif-6", title: "Pending Subscription Payment", type: "subscription", targetRole: "super_admin",
    message: "Enterprise plan renewal submitted via bKash awaiting verification.",
    createdBy: "default-super_admin", createdByName: "Global Administrator", createdByRole: "super_admin",
    clearedBy: [], time: "45 mins ago", isRead: false, link: "/super-admin/billing",
  },
  {
    id: "notif-7", title: "Cloud Sync Engine Active", type: "sync_alert", targetRole: "all",
    message: "All offline transactions synced with zero database conflicts.",
    createdBy: "default-company_owner", createdByName: "System Admin", createdByRole: "company_owner",
    clearedBy: [], time: "2 hours ago", isRead: true, link: "/app/pos",
  },
];


