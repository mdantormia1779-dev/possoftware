import { Sale, SyncQueueItem } from "@/types";
import { INITIAL_SALES } from "@/data/initial-data";
import { offlineDb } from "../../db/dexie-db";
import { generateInvoiceNumber, generateUUID } from "../../utils";
import { STORAGE_KEYS, getItem, setItem, isBrowser } from "./baseStorage";
import { productStorage } from "./productStorage";
import { customerStorage } from "./customerStorage";
import { postSaleJournalEntry } from "./saleJournal";

export class SaleStorage {
  public getSales(): Sale[] {
    return getItem(STORAGE_KEYS.SALES, INITIAL_SALES);
  }

  public createSale(
    saleData: Omit<Sale, "id" | "invoiceNumber" | "createdAt">,
    isOffline = false
  ): Sale {
    const newSale: Sale = {
      ...saleData,
      id: `sale-${generateUUID()}`,
      invoiceNumber: generateInvoiceNumber("INV"),
      createdAt: new Date().toISOString(),
      isOfflineSync: isOffline,
    };

    const allSales = [newSale, ...this.getSales()];
    setItem(STORAGE_KEYS.SALES, allSales);

    newSale.items.forEach((item) => {
      productStorage.adjustStock(item.productId, newSale.branchId, -item.quantity);
    });

    if (newSale.customerId) {
      const customers = customerStorage.getCustomers();
      const customer = customers.find((c) => c.id === newSale.customerId);
      if (customer) {
        customer.loyaltyPoints += Math.floor(newSale.grandTotal / 100);
        customer.totalSpent += newSale.grandTotal;
        customer.ordersCount += 1;
        customer.lastPurchaseDate = new Date().toISOString().split("T")[0];
        if (newSale.dueAmount > 0) {
          customer.dueBalance += newSale.dueAmount;
        }
        customerStorage.updateCustomer(customer);
      }
    }

    postSaleJournalEntry(newSale);

    if (isOffline && isBrowser() && offlineDb) {
      offlineDb.offlineSales.add({ ...newSale, syncStatus: "pending" }).catch(() => {});
      const queueItem: SyncQueueItem = {
        id: generateUUID(),
        type: "sale",
        payload: newSale,
        createdAt: new Date().toISOString(),
        status: "pending",
        retryCount: 0,
      };
      const queue = [queueItem, ...getItem<SyncQueueItem[]>(STORAGE_KEYS.SYNC_QUEUE, [])];
      setItem(STORAGE_KEYS.SYNC_QUEUE, queue);
    }

    return newSale;
  }

  public saveSales(sales: Sale[]): void {
    setItem(STORAGE_KEYS.SALES, sales);
  }
}

export const saleStorage = new SaleStorage();
