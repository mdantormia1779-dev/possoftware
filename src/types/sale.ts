import { Product, ProductVariant } from "./product";

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
