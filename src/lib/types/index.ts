// Core TypeScript Types for XYZ Business OS

export type UserRole =
  | "super_admin"
  | "company_owner"
  | "branch_manager"
  | "accountant"
  | "cashier"
  | "staff";

export type PlanTier = "starter" | "business" | "enterprise";
export type SubscriptionStatus = "trial" | "active" | "past_due" | "cancelled" | "expired";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  businessType: string;
  logoUrl?: string;
  currency: string;
  currencySymbol: string;
  phone: string;
  email: string;
  address: string;
  taxNumber?: string;
  subscriptionPlan: PlanTier;
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt?: string;
  subscriptionEndsAt?: string;
  maxBranches: number;
  maxStaff: number;
  maxProducts: number;
  themePrimaryColor?: string;
  receiptFooterMessage?: string;
}

export interface User {
  id: string;
  organizationId: string;
  branchId?: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  isActive: boolean;
}

export interface Branch {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  isMainBranch: boolean;
  managerName?: string;
  managerPhone?: string;
  employeeCount: number;
  totalSalesToday?: number;
  totalStockValue?: number;
  isActive: boolean;
}

export interface Category {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  imageUrl?: string;
  itemCount: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  priceAdjustment: number;
  stock: number;
}

export interface Product {
  id: string;
  organizationId: string;
  categoryId: string;
  categoryName?: string;
  name: string;
  nameBn?: string;
  sku: string;
  barcode: string;
  description?: string;
  purchasePrice: number;
  sellingPrice: number;
  taxRate: number; // percentage (e.g. 5%)
  minStockAlert: number;
  unit: string; // pcs, kg, ltr, box, strip
  imageUrl?: string;
  totalStock: number;
  branchStocks?: Record<string, number>; // branchId -> qty
  variants?: ProductVariant[];
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  taxAmount: number;
  totalPrice: number;
}

export type PaymentMethod =
  | "cash"
  | "card"
  | "bkash"
  | "nagad"
  | "rocket"
  | "bank_transfer"
  | "due"
  | "split";

export type SaleStatus = "completed" | "held" | "returned" | "partially_refunded" | "cancelled";

export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  costPrice: number;
  discountAmount: number;
  taxAmount: number;
  totalPrice: number;
}

export interface Sale {
  id: string;
  organizationId: string;
  branchId: string;
  branchName: string;
  cashierId: string;
  cashierName: string;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  invoiceNumber: string;
  items: SaleItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  changeAmount?: number;
  paymentMethod: PaymentMethod;
  paymentBreakdown?: Record<string, number>;
  status: SaleStatus;
  isOfflineSync: boolean;
  localOfflineId?: string;
  notes?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  organizationId: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  loyaltyPoints: number;
  dueBalance: number;
  creditLimit: number;
  totalSpent: number;
  ordersCount: number;
  lastPurchaseDate?: string;
}

export interface Supplier {
  id: string;
  organizationId: string;
  name: string;
  companyName?: string;
  phone: string;
  email?: string;
  address?: string;
  balanceDue: number;
  totalPurchased: number;
}

export type PurchaseStatus = "draft" | "ordered" | "partially_received" | "received" | "cancelled";

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  productName: string;
  unitCost: number;
  quantity: number;
  receivedQty: number;
  batchNumber?: string;
  expiryDate?: string;
  totalCost: number;
}

export interface PurchaseOrder {
  id: string;
  organizationId: string;
  supplierId: string;
  supplierName: string;
  poNumber: string;
  status: PurchaseStatus;
  items: PurchaseOrderItem[];
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  expectedDate?: string;
  receivedDate?: string;
  notes?: string;
  createdAt: string;
}

export type TransferStatus =
  | "draft"
  | "pending"
  | "approved"
  | "in_transit"
  | "received"
  | "cancelled";

export interface StockTransferItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
}

export interface StockTransfer {
  id: string;
  organizationId: string;
  transferNumber: string;
  sourceBranchId: string;
  sourceBranchName: string;
  destinationBranchId: string;
  destinationBranchName: string;
  status: TransferStatus;
  items: StockTransferItem[];
  notes?: string;
  dispatchedAt?: string;
  receivedAt?: string;
  createdAt: string;
}

export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";

export interface ChartOfAccount {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  type: AccountType;
  balance: number;
  isSystem: boolean;
  description?: string;
}

export interface JournalLine {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  debit: number;
  credit: number;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  organizationId: string;
  entryNumber: string;
  date: string;
  referenceType: "SALE" | "PURCHASE" | "PAYROLL" | "EXPENSE" | "MANUAL";
  referenceId?: string;
  description: string;
  createdByName: string;
  lines: JournalLine[];
  totalDebit: number;
  totalCredit: number;
}

export type EmployeeStatus = "active" | "on_leave" | "terminated";

export interface Employee {
  id: string;
  organizationId: string;
  branchId: string;
  branchName: string;
  employeeId: string;
  name: string;
  email?: string;
  phone: string;
  designation: string;
  department: string;
  joiningDate: string;
  baseSalary: number;
  commissionRate: number; // percentage
  status: EmployeeStatus;
  photoUrl?: string;
  bankAccountNo?: string;
}

export type AttendanceStatus = "present" | "late" | "absent" | "half_day" | "on_leave";

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  branchId: string;
  branchName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  notes?: string;
}

export type PayrollStatus = "draft" | "processing" | "approved" | "paid";

export interface PayrollItem {
  id: string;
  employeeId: string;
  employeeName: string;
  designation: string;
  branchName: string;
  baseSalary: number;
  deductions: number;
  commission: number;
  netSalary: number;
  isPaid: boolean;
}

export interface PayrollRun {
  id: string;
  organizationId: string;
  monthYear: string;
  totalAmount: number;
  status: PayrollStatus;
  items: PayrollItem[];
  processedAt?: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  organizationId: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  usageLimit: number;
  timesUsed: number;
  expiresAt?: string;
  isActive: boolean;
}

export interface Campaign {
  id: string;
  organizationId: string;
  title: string;
  channel: "sms" | "whatsapp";
  targetAudience: string;
  message: string;
  recipientCount: number;
  sentCount: number;
  status: "draft" | "scheduled" | "sent" | "failed";
  scheduledAt?: string;
  createdAt: string;
}

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
