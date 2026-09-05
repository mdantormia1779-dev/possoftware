export interface ComparisonFeature {
  name: string;
  starter: boolean | string;
  business: boolean | string;
  enterprise: boolean | string;
}

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  { name: "Offline-First POS Terminal", starter: true, business: true, enterprise: true },
  { name: "Barcode Label Generator (Code128)", starter: true, business: true, enterprise: true },
  { name: "Thermal Receipt Printing (80mm)", starter: true, business: true, enterprise: true },
  { name: "Included Outlets / Branches", starter: "1 Branch", business: "3 Branches", enterprise: "Unlimited" },
  { name: "Staff / Cashier Accounts", starter: "5 Users", business: "20 Users", enterprise: "Unlimited" },
  { name: "Product Catalog Capacity", starter: "5,000 SKUs", business: "Unlimited", enterprise: "Unlimited" },
  { name: "Multi-Branch Stock Transfers", starter: false, business: true, enterprise: true },
  { name: "Automated Double-Entry Accounting", starter: false, business: true, enterprise: true },
  { name: "Full Financial Reports (P&L, Balance Sheet)", starter: false, business: true, enterprise: true },
  { name: "HR, Daily Attendance & Leave Approvals", starter: false, business: true, enterprise: true },
  { name: "Automated Payroll & Commission Engine", starter: false, business: true, enterprise: true },
  { name: "Customer Loyalty & Coupons", starter: false, business: true, enterprise: true },
  { name: "SMS & WhatsApp Broadcast Campaigns", starter: false, business: true, enterprise: true },
  { name: "Multi-Company Holdings", starter: false, business: false, enterprise: true },
  { name: "REST API & Webhooks", starter: false, business: false, enterprise: true },
  { name: "Dedicated Account Support", starter: "Standard", business: "Priority", enterprise: "24/7 Dedicated" },
];
