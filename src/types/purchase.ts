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
