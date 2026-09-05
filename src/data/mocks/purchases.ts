import { PurchaseOrder } from "@/types";

export const INITIAL_PURCHASES: PurchaseOrder[] = [
  {
    id: "po-1",
    organizationId: "org-1",
    supplierId: "supp-1",
    supplierName: "Bengal Textile & Spinning Mills",
    poNumber: "PO-2026-042",
    status: "received",
    items: [
      {
        id: "poi-1",
        productId: "prod-1",
        productName: "Royal Premium Cotton Panjabi - Navy Blue",
        unitCost: 1850,
        quantity: 30,
        receivedQty: 30,
        batchNumber: "BAT-PANJ-092",
        expiryDate: "2029-12-31",
        totalCost: 55500,
      },
    ],
    totalAmount: 55500,
    paidAmount: 55500,
    dueAmount: 0,
    expectedDate: "2026-02-20",
    receivedDate: "2026-02-22",
    notes: "Eid 2026 Collection stock batch 1.",
    createdAt: "2026-02-15T09:00:00Z",
  },
  {
    id: "po-2",
    organizationId: "org-1",
    supplierId: "supp-3",
    supplierName: "Apex Footwear & Leather Supply",
    poNumber: "PO-2026-043",
    status: "ordered",
    items: [
      {
        id: "poi-2",
        productId: "prod-8",
        productName: "Handcrafted Leather Loafers - Cognac Brown",
        unitCost: 2600,
        quantity: 20,
        receivedQty: 0,
        totalCost: 52000,
      },
    ],
    totalAmount: 52000,
    paidAmount: 33500,
    dueAmount: 18500,
    expectedDate: "2026-03-05",
    notes: "Delivery to Banani central hub.",
    createdAt: "2026-02-26T11:00:00Z",
  },
];

