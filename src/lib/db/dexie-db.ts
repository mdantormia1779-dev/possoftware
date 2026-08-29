import Dexie, { type Table } from "dexie";
import { Product, Customer, Sale, SyncQueueItem } from "../types";

export interface OfflineSaleRecord extends Sale {
  syncStatus: "pending" | "synced" | "failed";
}

export class XyzOfflineDatabase extends Dexie {
  products!: Table<Product, string>;
  customers!: Table<Customer, string>;
  offlineSales!: Table<OfflineSaleRecord, string>;
  syncQueue!: Table<SyncQueueItem, string>;

  constructor() {
    super("XyzBusinessOsOfflineDb");
    this.version(1).stores({
      products: "id, categoryId, sku, barcode, name",
      customers: "id, phone, name",
      offlineSales: "id, invoiceNumber, syncStatus, createdAt",
      syncQueue: "id, type, status, createdAt",
    });
  }
}

export const offlineDb = typeof window !== "undefined" ? new XyzOfflineDatabase() : null!;
