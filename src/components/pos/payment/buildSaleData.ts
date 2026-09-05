import { CartItem, Customer, Branch, Organization, PaymentMethod, SaleItem } from "@/types";

interface BuildSaleParams {
  cart: CartItem[];
  customer: Customer | null;
  org: Organization;
  branch: Branch;
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  changeAmount: number;
  paymentMethod: PaymentMethod;
  isOnline: boolean;
  trxId: string;
}

export function buildSaleData({
  cart,
  customer,
  org,
  branch,
  subtotal,
  discount,
  tax,
  grandTotal,
  paidAmount,
  dueAmount,
  changeAmount,
  paymentMethod,
  isOnline,
  trxId,
}: BuildSaleParams) {
  const items: SaleItem[] = cart.map((item) => ({
    id: `si-${Date.now()}-${item.product.id}`,
    productId: item.product.id,
    productName: item.product.name,
    sku: item.product.sku,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    costPrice: item.product.purchasePrice || 0,
    discountAmount: item.discountAmount,
    taxAmount: item.taxAmount,
    totalPrice: item.totalPrice,
  }));

  return {
    organizationId: org.id,
    branchId: branch.id,
    branchName: branch.name,
    cashierId: "emp-2",
    cashierName: "Md. Sajid Hasan",
    customerId: customer?.id,
    customerName: customer?.name,
    customerPhone: customer?.phone,
    items,
    subtotal,
    discountAmount: discount,
    taxAmount: tax,
    grandTotal,
    paidAmount,
    dueAmount,
    changeAmount,
    paymentMethod,
    status: "completed" as const,
    isOfflineSync: !isOnline,
    notes: trxId ? `TrxID / Ref: ${trxId}` : undefined,
  };
}
