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
