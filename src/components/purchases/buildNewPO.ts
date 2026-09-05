import { PurchaseOrder } from "@/types";

interface BuildNewPOParams {
  orgId: string;
  productId: string;
  supplier: string;
  productName: string;
  qty: number;
  unitCost: number;
  paidAmount: number;
  batchNo: string;
}

export function buildNewPO(params: BuildNewPOParams): PurchaseOrder {
  const total = params.qty * params.unitCost;
  const due = Math.max(0, total - params.paidAmount);

  return {
    id: `po-${Date.now()}`,
    organizationId: params.orgId,
    poNumber: `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    supplierId: "sup-01",
    supplierName: params.supplier,
    status: "ordered",
    items: [{
      id: `poi-${Date.now()}`,
      productId: params.productId || "prod-1",
      productName: params.productName,
      quantity: Number(params.qty),
      unitCost: Number(params.unitCost),
      totalCost: total,
      receivedQty: 0,
      batchNumber: params.batchNo,
    }],
    totalAmount: total,
    paidAmount: Number(params.paidAmount),
    dueAmount: due,
    createdAt: new Date().toISOString(),
  };
}
