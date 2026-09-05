export const STORAGE_KEYS = {
  ORGANIZATIONS: "xyz_organizations",
  CURRENT_ORG_ID: "xyz_current_org_id",
  BRANCHES: "xyz_branches",
  CATEGORIES: "xyz_categories",
  PRODUCTS: "xyz_products",
  CUSTOMERS: "xyz_customers",
  SUPPLIERS: "xyz_suppliers",
  SALES: "xyz_sales",
  PURCHASES: "xyz_purchases",
  TRANSFERS: "xyz_transfers",
  ACCOUNTS: "xyz_accounts",
  JOURNALS: "xyz_journals",
  EMPLOYEES: "xyz_employees",
  ATTENDANCE: "xyz_attendance",
  PAYROLL: "xyz_payroll",
  COUPONS: "xyz_coupons",
  CAMPAIGNS: "xyz_campaigns",
  NOTIFICATIONS: "xyz_notifications",
  SYNC_QUEUE: "xyz_sync_queue",
};

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getItem<T>(key: string, defaultValue: T): T {
  if (!isBrowser()) return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving to localStorage ${key}:`, e);
  }
}
