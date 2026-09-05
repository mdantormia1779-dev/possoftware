import { StockTransfer } from "@/types";

export const INITIAL_TRANSFERS: StockTransfer[] = [
  {
    id: "tr-1",
    organizationId: "org-1",
    transferNumber: "TR-2026-008",
    sourceBranchId: "br-1",
    sourceBranchName: "Banani Flagship Outlet",
    destinationBranchId: "br-2",
    destinationBranchName: "Dhanmondi Branch",
    status: "in_transit",
    items: [
      {
        productId: "prod-1",
        productName: "Royal Premium Cotton Panjabi - Navy Blue",
        sku: "PANJ-NAVY-01",
        quantity: 5,
      },
      {
        productId: "prod-3",
        productName: "Handloom Pure Jamdani Sharee - Crimson Gold",
        sku: "JAM-CRIM-03",
        quantity: 2,
      },
    ],
    notes: "Transfer for weekend promotion at Shimanto Square.",
    dispatchedAt: "2026-02-28T09:30:00Z",
    createdAt: "2026-02-27T16:00:00Z",
  },
  {
    id: "tr-2",
    organizationId: "org-1",
    transferNumber: "TR-2026-007",
    sourceBranchId: "br-1",
    sourceBranchName: "Banani Flagship Outlet",
    destinationBranchId: "br-3",
    destinationBranchName: "Chittagong GEC Branch",
    status: "received",
    items: [
      {
        productId: "prod-5",
        productName: "Executive Easy-Iron Formal Shirt - White",
        sku: "SHIRT-WHT-05",
        quantity: 10,
      },
    ],
    notes: "Chittagong restock completed.",
    dispatchedAt: "2026-02-23T10:00:00Z",
    receivedAt: "2026-02-24T18:00:00Z",
    createdAt: "2026-02-22T14:00:00Z",
  },
];

