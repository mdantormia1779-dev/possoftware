import { PurchaseOrder, StockTransfer } from "@/types";
import { INITIAL_PURCHASES, INITIAL_TRANSFERS } from "@/data/initial-data";
import { STORAGE_KEYS, getItem, setItem } from "./baseStorage";

export class OperationsStorage {
  public getPurchases(): PurchaseOrder[] {
    return getItem(STORAGE_KEYS.PURCHASES, INITIAL_PURCHASES);
  }

  public savePurchases(purchases: PurchaseOrder[]): void {
    setItem(STORAGE_KEYS.PURCHASES, purchases);
  }

  public addPurchase(po: PurchaseOrder): void {
    const all = [po, ...this.getPurchases()];
    setItem(STORAGE_KEYS.PURCHASES, all);
  }

  public getTransfers(): StockTransfer[] {
    return getItem(STORAGE_KEYS.TRANSFERS, INITIAL_TRANSFERS);
  }

  public addTransfer(transfer: StockTransfer): void {
    const all = [transfer, ...this.getTransfers()];
    setItem(STORAGE_KEYS.TRANSFERS, all);
  }

  public updateTransferStatus(transferId: string, newStatus: StockTransfer["status"]): void {
    const transfers = this.getTransfers().map((t) => {
      if (t.id === transferId) {
        const updated = { ...t, status: newStatus };
        if (newStatus === "in_transit") updated.dispatchedAt = new Date().toISOString();
        if (newStatus === "received") updated.receivedAt = new Date().toISOString();
        return updated;
      }
      return t;
    });
    setItem(STORAGE_KEYS.TRANSFERS, transfers);
  }
}

export const operationsStorage = new OperationsStorage();
