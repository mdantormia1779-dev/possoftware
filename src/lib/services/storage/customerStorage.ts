import { Customer, Supplier } from "@/types";
import { INITIAL_CUSTOMERS, INITIAL_SUPPLIERS } from "@/data/initial-data";
import { offlineDb } from "../../db/dexie-db";
import { STORAGE_KEYS, getItem, setItem, isBrowser } from "./baseStorage";

export class CustomerStorage {
  public getCustomers(): Customer[] {
    return getItem(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  }

  public addCustomer(customer: Customer): void {
    const custs = [customer, ...this.getCustomers()];
    setItem(STORAGE_KEYS.CUSTOMERS, custs);
    if (isBrowser() && offlineDb) {
      offlineDb.customers.put(customer).catch(() => {});
    }
  }

  public updateCustomer(customer: Customer): void {
    const custs = this.getCustomers().map((c) => (c.id === customer.id ? customer : c));
    setItem(STORAGE_KEYS.CUSTOMERS, custs);
    if (isBrowser() && offlineDb) {
      offlineDb.customers.put(customer).catch(() => {});
    }
  }

  public getSuppliers(): Supplier[] {
    return getItem(STORAGE_KEYS.SUPPLIERS, INITIAL_SUPPLIERS);
  }

  public addSupplier(supplier: Supplier): void {
    const supps = [supplier, ...this.getSuppliers()];
    setItem(STORAGE_KEYS.SUPPLIERS, supps);
  }
}

export const customerStorage = new CustomerStorage();
