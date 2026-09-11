import { offlineDb } from "../db/dexie-db";
import { isBrowser } from "./storage/baseStorage";
import { tenantStorage } from "./storage/tenantStorage";
import { productStorage } from "./storage/productStorage";
import { customerStorage } from "./storage/customerStorage";
import { saleStorage } from "./storage/saleStorage";
import { operationsStorage } from "./storage/operationsStorage";
import { accountingStorage } from "./storage/accountingStorage";
import { hrStorage } from "./storage/hrStorage";
import { marketingStorage } from "./storage/marketingStorage";

class StorageService {
  public async initOfflineDatabase(): Promise<void> {
    if (!isBrowser() || !offlineDb) return;
    try {
      if ((await offlineDb.products.count()) === 0) {
        await offlineDb.products.bulkPut(productStorage.getProducts());
      }
      if ((await offlineDb.customers.count()) === 0) {
        await offlineDb.customers.bulkPut(customerStorage.getCustomers());
      }
    } catch (err) {
      console.warn("IndexedDB init warning:", err);
    }
  }

  // Tenant & Branches
  getOrganizations = () => tenantStorage.getOrganizations();
  getOrganizationById = (id: string) => tenantStorage.getOrganizationById(id);
  addOrganization = (org: any) => tenantStorage.addOrganization(org);
  updateOrganization = (org: any) => tenantStorage.updateOrganization(org);
  deleteOrganization = (id: string) => tenantStorage.deleteOrganization(id);
  purgeOrganizationData = (id: string) => tenantStorage.purgeOrganizationData(id);
  getBranches = () => tenantStorage.getBranches();
  addBranch = (branch: any) => tenantStorage.addBranch(branch);

  // Products, Categories, Stock
  getCategories = () => productStorage.getCategories();
  addCategory = (cat: any) => productStorage.addCategory(cat);
  getProducts = () => productStorage.getProducts();
  addProduct = (p: any) => productStorage.addProduct(p);
  updateProduct = (p: any) => productStorage.updateProduct(p);
  adjustStock = (pId: string, bId: string, delta: number) => productStorage.adjustStock(pId, bId, delta);

  // Customers & Suppliers
  getCustomers = () => customerStorage.getCustomers();
  addCustomer = (c: any) => customerStorage.addCustomer(c);
  updateCustomer = (c: any) => customerStorage.updateCustomer(c);
  getSuppliers = () => customerStorage.getSuppliers();
  addSupplier = (s: any) => customerStorage.addSupplier(s);

  // Sales, Purchases & Transfers
  getSales = () => saleStorage.getSales();
  saveSales = (s: any[]) => saleStorage.saveSales(s);
  createSale = (data: any, isOffline = false) => saleStorage.createSale(data, isOffline);
  getPurchases = () => operationsStorage.getPurchases();
  savePurchases = (p: any[]) => operationsStorage.savePurchases(p);
  addPurchase = (po: any) => operationsStorage.addPurchase(po);
  getTransfers = () => operationsStorage.getTransfers();
  addTransfer = (t: any) => operationsStorage.addTransfer(t);
  updateTransferStatus = (id: string, s: any) => operationsStorage.updateTransferStatus(id, s);

  // Accounting, HR & Payroll
  getAccounts = () => accountingStorage.getAccounts();
  addAccount = (a: any) => accountingStorage.addAccount(a);
  getJournalEntries = () => accountingStorage.getJournalEntries();
  addJournalEntry = (e: any) => accountingStorage.addJournalEntry(e);
  getEmployees = () => hrStorage.getEmployees();
  addEmployee = (e: any) => hrStorage.addEmployee(e);
  getAttendance = () => hrStorage.getAttendance();
  recordAttendance = (r: any) => hrStorage.recordAttendance(r);
  getPayrollRuns = () => hrStorage.getPayrollRuns();
  addPayrollRun = (r: any) => hrStorage.addPayrollRun(r);

  // Marketing, Sync, Notifications CRUD
  getCoupons = () => marketingStorage.getCoupons();
  addCoupon = (c: any) => marketingStorage.addCoupon(c);
  getCampaigns = () => marketingStorage.getCampaigns();
  addCampaign = (c: any) => marketingStorage.addCampaign(c);
  getNotifications = () => marketingStorage.getNotifications();
  saveNotifications = (n: any[]) => marketingStorage.saveNotifications(n);
  addNotification = (n: any) => marketingStorage.addNotification(n);
  updateNotification = (id: string, u: any) => marketingStorage.updateNotification(id, u);
  deleteNotification = (id: string) => marketingStorage.deleteNotification(id);
  clearNotificationForUser = (id: string, uId: string) => marketingStorage.clearNotificationForUser(id, uId);
  clearAllNotificationsForUser = (uId: string) => marketingStorage.clearAllNotificationsForUser(uId);
  deleteAllNotifications = () => marketingStorage.deleteAllNotifications();
  markNotificationAsRead = (id: string) => marketingStorage.markNotificationAsRead(id);
  markAllNotificationsAsRead = () => marketingStorage.markAllNotificationsAsRead();
  getSyncQueue = () => marketingStorage.getSyncQueue();
  addSyncQueueItem = (i: any) => marketingStorage.addSyncQueueItem(i);
  updateSyncQueueItem = (id: string, u: any) => marketingStorage.updateSyncQueueItem(id, u);
  clearCompletedSyncItems = () => marketingStorage.clearCompletedSyncItems();
}

export const storageService = new StorageService();
