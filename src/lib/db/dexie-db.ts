import Dexie, { type Table } from "dexie";
import { Product, Customer, Sale, SyncQueueItem } from "../types";

export interface OfflineSaleRecord extends Sale {
  syncStatus: "pending" | "synced" | "failed";
}

export interface OfflineParkedSale {
  id: string;
  branchId: string;
  customerName?: string;
  customerPhone?: string;
  totalAmount: number;
  items: unknown[];
  notes?: string;
  parkedAt: string;
}

export interface OfflineShiftSession {
  id: string;
  branchId: string;
  openedById: string;
  openingCash: number;
  status: "OPEN" | "CLOSED";
  openedAt: string;
  closedAt?: string;
}

export class XyzOfflineDatabase extends Dexie {
  products!: Table<Product, string>;
  customers!: Table<Customer, string>;
  offlineSales!: Table<OfflineSaleRecord, string>;
  syncQueue!: Table<SyncQueueItem, string>;
  parkedSales!: Table<OfflineParkedSale, string>;
  shifts!: Table<OfflineShiftSession, string>;

  constructor() {
    super("XyzBusinessOsOfflineDb");
    this.version(2).stores({
      products: "id, categoryId, sku, barcode, name",
      customers: "id, phone, name",
      offlineSales: "id, invoiceNumber, syncStatus, createdAt",
      syncQueue: "id, type, status, createdAt",
      parkedSales: "id, branchId, parkedAt",
      shifts: "id, branchId, status, openedAt",
    });
  }
}

export const offlineDb = typeof window !== "undefined" ? new XyzOfflineDatabase() : null!;
