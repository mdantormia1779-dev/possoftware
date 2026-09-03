import {
  Organization,
  Branch,
  Category,
  Product,
  Customer,
  Supplier,
  Sale,
  PurchaseOrder,
  StockTransfer,
  ChartOfAccount,
  JournalEntry,
  JournalLine,
  Employee,
  AttendanceRecord,
  PayrollRun,
  Coupon,
  Campaign,
  NotificationItem,
  SyncQueueItem,
} from "../types";
import {
  INITIAL_ORGANIZATIONS,
  INITIAL_BRANCHES,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_CUSTOMERS,
  INITIAL_SUPPLIERS,
  INITIAL_SALES,
  INITIAL_PURCHASES,
  INITIAL_TRANSFERS,
  INITIAL_ACCOUNTS,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_EMPLOYEES,
  INITIAL_ATTENDANCE,
  INITIAL_PAYROLL_RUNS,
  INITIAL_COUPONS,
  INITIAL_CAMPAIGNS,
  INITIAL_NOTIFICATIONS,
} from "../mock/initial-data";
import { offlineDb } from "../db/dexie-db";
import { generateInvoiceNumber, generateUUID } from "../utils";

const STORAGE_KEYS = {
  ORGANIZATIONS: "xyz_organizations",
  CURRENT_ORG_ID: "xyz_current_org_id",
  BRANCHES: "xyz_branches",
  CATEGORIES: "xyz_categories",
  PRODUCTS: "xyz_products",
  CUSTOMERS: "xyz_customers",
  SUPPLIERS: "xyz_suppliers",
  SALES: "xyz_sales",
  PURCHASES: "xyz_purchases",
  TRANSFERS: "xyz_transfers",
  ACCOUNTS: "xyz_accounts",
  JOURNALS: "xyz_journals",
  EMPLOYEES: "xyz_employees",
  ATTENDANCE: "xyz_attendance",
  PAYROLL: "xyz_payroll",
  COUPONS: "xyz_coupons",
  CAMPAIGNS: "xyz_campaigns",
  NOTIFICATIONS: "xyz_notifications",
  SYNC_QUEUE: "xyz_sync_queue",
};

class StorageService {
  private isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  private getItem<T>(key: string, defaultValue: T): T {
    if (!this.isBrowser()) return defaultValue;
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
      // Initialize with default
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving to localStorage ${key}:`, e);
    }
  }

  // Initialize and populate Dexie DB if empty
  public async initOfflineDatabase(): Promise<void> {
    if (!this.isBrowser() || !offlineDb) return;
    try {
      const prodCount = await offlineDb.products.count();
      if (prodCount === 0) {
        const products = this.getProducts();
        await offlineDb.products.bulkPut(products);
      }
      const custCount = await offlineDb.customers.count();
      if (custCount === 0) {
        const customers = this.getCustomers();
        await offlineDb.customers.bulkPut(customers);
      }
    } catch (err) {
      console.warn("IndexedDB init warning:", err);
    }
  }

  // Organizations
  public getOrganizations(): Organization[] {
    return this.getItem(STORAGE_KEYS.ORGANIZATIONS, INITIAL_ORGANIZATIONS);
  }

  public getOrganizationById(id: string): Organization | undefined {
    return this.getOrganizations().find((o) => o.id === id);
  }

  public addOrganization(org: Organization): void {
    const orgs = [org, ...this.getOrganizations()];
    this.setItem(STORAGE_KEYS.ORGANIZATIONS, orgs);
  }

  public updateOrganization(org: Organization): void {
    const orgs = this.getOrganizations().map((o) => (o.id === org.id ? org : o));
    this.setItem(STORAGE_KEYS.ORGANIZATIONS, orgs);
  }

  public deleteOrganization(id: string): void {
    const orgs = this.getOrganizations().filter((o) => o.id !== id);
    this.setItem(STORAGE_KEYS.ORGANIZATIONS, orgs);
    // Purge associated tenant data
    const branches = this.getBranches().filter((b) => b.organizationId !== id);
    this.setItem(STORAGE_KEYS.BRANCHES, branches);
    const products = this.getProducts().filter((p) => p.organizationId !== id);
    this.setItem(STORAGE_KEYS.PRODUCTS, products);
    const sales = this.getSales().filter((s) => s.organizationId !== id);
    this.setItem(STORAGE_KEYS.SALES, sales);
    const customers = this.getCustomers().filter((c) => c.organizationId !== id);
    this.setItem(STORAGE_KEYS.CUSTOMERS, customers);
    const employees = this.getEmployees().filter((e) => e.organizationId !== id);
    this.setItem(STORAGE_KEYS.EMPLOYEES, employees);
  }

  public purgeOrganizationData(id: string): void {
    const sales = this.getSales().filter((s) => s.organizationId !== id);
    this.setItem(STORAGE_KEYS.SALES, sales);
    const customers = this.getCustomers().map((c) => (c.organizationId === id ? { ...c, dueBalance: 0 } : c));
    this.setItem(STORAGE_KEYS.CUSTOMERS, customers);
  }

  // Branches
  public getBranches(): Branch[] {
    return this.getItem(STORAGE_KEYS.BRANCHES, INITIAL_BRANCHES);
  }

  public addBranch(branch: Branch): void {
    const branches = [branch, ...this.getBranches()];
    this.setItem(STORAGE_KEYS.BRANCHES, branches);
  }

  // Categories
  public getCategories(): Category[] {
    return this.getItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  public addCategory(cat: Category): void {
    const cats = [...this.getCategories(), cat];
    this.setItem(STORAGE_KEYS.CATEGORIES, cats);
  }

  // Products
  public getProducts(): Product[] {
    return this.getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }

  public addProduct(product: Product): void {
    const prods = [product, ...this.getProducts()];
    this.setItem(STORAGE_KEYS.PRODUCTS, prods);
    if (this.isBrowser() && offlineDb) {
      offlineDb.products.put(product).catch(() => {});
    }
  }

  public updateProduct(product: Product): void {
    const prods = this.getProducts().map((p) => (p.id === product.id ? product : p));
    this.setItem(STORAGE_KEYS.PRODUCTS, prods);
    if (this.isBrowser() && offlineDb) {
      offlineDb.products.put(product).catch(() => {});
    }
  }

  public adjustStock(productId: string, branchId: string, deltaQty: number): void {
    const products = this.getProducts();
    const product = products.find((p) => p.id === productId);
    if (product) {
      product.totalStock = Math.max(0, product.totalStock + deltaQty);
      if (product.branchStocks) {
        product.branchStocks[branchId] = Math.max(0, (product.branchStocks[branchId] || 0) + deltaQty);
      }
      this.updateProduct(product);
    }
  }

  // Customers
  public getCustomers(): Customer[] {
    return this.getItem(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  }

  public addCustomer(customer: Customer): void {
    const custs = [customer, ...this.getCustomers()];
    this.setItem(STORAGE_KEYS.CUSTOMERS, custs);
    if (this.isBrowser() && offlineDb) {
      offlineDb.customers.put(customer).catch(() => {});
    }
  }

  public updateCustomer(customer: Customer): void {
    const custs = this.getCustomers().map((c) => (c.id === customer.id ? customer : c));
    this.setItem(STORAGE_KEYS.CUSTOMERS, custs);
    if (this.isBrowser() && offlineDb) {
      offlineDb.customers.put(customer).catch(() => {});
    }
  }

  // Suppliers
  public getSuppliers(): Supplier[] {
    return this.getItem(STORAGE_KEYS.SUPPLIERS, INITIAL_SUPPLIERS);
  }

  public addSupplier(supplier: Supplier): void {
    const supps = [supplier, ...this.getSuppliers()];
    this.setItem(STORAGE_KEYS.SUPPLIERS, supps);
  }

  // Sales & POS Engine
  public getSales(): Sale[] {
    return this.getItem(STORAGE_KEYS.SALES, INITIAL_SALES);
  }

  public createSale(saleData: Omit<Sale, "id" | "invoiceNumber" | "createdAt">, isOffline = false): Sale {
    const newSale: Sale = {
      ...saleData,
      id: `sale-${generateUUID()}`,
      invoiceNumber: generateInvoiceNumber("INV"),
      createdAt: new Date().toISOString(),
      isOfflineSync: isOffline,
    };

    // Save to sales history
    const allSales = [newSale, ...this.getSales()];
    this.setItem(STORAGE_KEYS.SALES, allSales);

    // Deduct stock for sold items
    newSale.items.forEach((item) => {
      this.adjustStock(item.productId, newSale.branchId, -item.quantity);
    });

    // Update customer loyalty points & due if customer exists
    if (newSale.customerId) {
      const customers = this.getCustomers();
      const customer = customers.find((c) => c.id === newSale.customerId);
      if (customer) {
        const earnedPoints = Math.floor(newSale.grandTotal / 100);
        customer.loyaltyPoints += earnedPoints;
        customer.totalSpent += newSale.grandTotal;
        customer.ordersCount += 1;
        customer.lastPurchaseDate = new Date().toISOString().split("T")[0];
        if (newSale.dueAmount > 0) {
          customer.dueBalance += newSale.dueAmount;
        }
        this.updateCustomer(customer);
      }
    }

    // Auto-generate Accounting Journal Entry
    this.postSaleJournalEntry(newSale);

    // If offline, add to offline sales & sync queue
    if (isOffline && this.isBrowser() && offlineDb) {
      offlineDb.offlineSales.add({
        ...newSale,
        syncStatus: "pending",
      }).catch(() => {});

      const queueItem: SyncQueueItem = {
        id: generateUUID(),
        type: "sale",
        payload: newSale,
        createdAt: new Date().toISOString(),
        status: "pending",
        retryCount: 0,
      };
      this.addSyncQueueItem(queueItem);
    }

    return newSale;
  }

  // Auto-Journal for Sales
  private postSaleJournalEntry(sale: Sale): void {
    const totalCost = sale.items.reduce((sum, item) => sum + (item.costPrice * item.quantity), 0);
    
    // Choose appropriate asset account for payment method
    let paymentAccId = "acc-101"; // Cash
    let paymentAccCode = "1010";
    let paymentAccName = "Cash in Hand (POS Till)";

    if (sale.paymentMethod === "bkash") {
      paymentAccId = "acc-102";
      paymentAccCode = "1020";
      paymentAccName = "bKash Merchant Account";
    } else if (sale.paymentMethod === "card" || sale.paymentMethod === "bank_transfer") {
      paymentAccId = "acc-104";
      paymentAccCode = "1040";
      paymentAccName = "City Bank Current Account";
    } else if (sale.paymentMethod === "nagad" || sale.paymentMethod === "rocket") {
      paymentAccId = "acc-103";
      paymentAccCode = "1030";
      paymentAccName = "Nagad / Rocket Merchant";
    } else if (sale.paymentMethod === "due") {
      paymentAccId = "acc-105";
      paymentAccCode = "1050";
      paymentAccName = "Accounts Receivable (Customer Due)";
    }

    const journalLines: JournalLine[] = [
      // 1. Debit Cash/Bank/Due
      {
        id: `jl-${generateUUID()}`,
        accountId: paymentAccId,
        accountCode: paymentAccCode,
        accountName: paymentAccName,
        accountType: "asset" as const,
        debit: sale.paidAmount > 0 ? sale.paidAmount : sale.grandTotal,
        credit: 0,
      },
      // 2. Credit Sales Revenue
      {
        id: `jl-${generateUUID()}`,
        accountId: "acc-401",
        accountCode: "4010",
        accountName: "Sales Revenue (Gross)",
        accountType: "revenue" as const,
        debit: 0,
        credit: sale.subtotal,
      },
    ];

    // 3. Tax / VAT credit if applicable
    if (sale.taxAmount > 0) {
      journalLines.push({
        id: `jl-${generateUUID()}`,
        accountId: "acc-202",
        accountCode: "2020",
        accountName: "VAT / Tax Payable to NBR",
        accountType: "liability" as const,
        debit: 0,
        credit: sale.taxAmount,
      });
    }

    // 4. Discount debit if applicable
    if (sale.discountAmount > 0) {
      journalLines.push({
        id: `jl-${generateUUID()}`,
        accountId: "acc-402",
        accountCode: "4020",
        accountName: "Discounts & Allowances",
        accountType: "revenue" as const,
        debit: sale.discountAmount,
        credit: 0,
      });
    }

    // 5. Cost of Goods Sold (COGS) & Inventory Asset
    if (totalCost > 0) {
      journalLines.push({
        id: `jl-${generateUUID()}`,
        accountId: "acc-501",
        accountCode: "5010",
        accountName: "Cost of Goods Sold (COGS)",
        accountType: "expense" as const,
        debit: totalCost,
        credit: 0,
      });
      journalLines.push({
        id: `jl-${generateUUID()}`,
        accountId: "acc-106",
        accountCode: "1060",
        accountName: "Merchandise Inventory Asset",
        accountType: "asset" as const,
        debit: 0,
        credit: totalCost,
      });
    }

    const totalDebit = journalLines.reduce((acc, l) => acc + l.debit, 0);
    const totalCredit = journalLines.reduce((acc, l) => acc + l.credit, 0);

    const journalEntry: JournalEntry = {
      id: `je-${generateUUID()}`,
      organizationId: sale.organizationId,
      entryNumber: `JE-${sale.invoiceNumber.replace("INV-", "")}`,
      date: sale.createdAt.split("T")[0],
      referenceType: "SALE",
      referenceId: sale.invoiceNumber,
      description: `Automated journal entry for POS invoice ${sale.invoiceNumber}`,
      createdByName: "POS Auto-Journal Engine",
      lines: journalLines,
      totalDebit,
      totalCredit,
    };

    const allJournals = [journalEntry, ...this.getJournalEntries()];
    this.setItem(STORAGE_KEYS.JOURNALS, allJournals);
  }

  // Purchases
  public getPurchases(): PurchaseOrder[] {
    return this.getItem(STORAGE_KEYS.PURCHASES, INITIAL_PURCHASES);
  }

  public addPurchase(po: PurchaseOrder): void {
    const all = [po, ...this.getPurchases()];
    this.setItem(STORAGE_KEYS.PURCHASES, all);
  }

  // Stock Transfers
  public getTransfers(): StockTransfer[] {
    return this.getItem(STORAGE_KEYS.TRANSFERS, INITIAL_TRANSFERS);
  }

  public addTransfer(transfer: StockTransfer): void {
    const all = [transfer, ...this.getTransfers()];
    this.setItem(STORAGE_KEYS.TRANSFERS, all);
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
    this.setItem(STORAGE_KEYS.TRANSFERS, transfers);
  }

  // Accounting
  public getAccounts(): ChartOfAccount[] {
    return this.getItem(STORAGE_KEYS.ACCOUNTS, INITIAL_ACCOUNTS);
  }

  public addAccount(account: ChartOfAccount): void {
    const all = [...this.getAccounts(), account];
    this.setItem(STORAGE_KEYS.ACCOUNTS, all);
  }

  public getJournalEntries(): JournalEntry[] {
    return this.getItem(STORAGE_KEYS.JOURNALS, INITIAL_JOURNAL_ENTRIES);
  }

  public addJournalEntry(entry: JournalEntry): void {
    const all = [entry, ...this.getJournalEntries()];
    this.setItem(STORAGE_KEYS.JOURNALS, all);
  }

  // HR & Employees
  public getEmployees(): Employee[] {
    return this.getItem(STORAGE_KEYS.EMPLOYEES, INITIAL_EMPLOYEES);
  }

  public addEmployee(emp: Employee): void {
    const all = [emp, ...this.getEmployees()];
    this.setItem(STORAGE_KEYS.EMPLOYEES, all);
  }

  // Attendance
  public getAttendance(): AttendanceRecord[] {
    return this.getItem(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  }

  public recordAttendance(record: AttendanceRecord): void {
    const all = [record, ...this.getAttendance()];
    this.setItem(STORAGE_KEYS.ATTENDANCE, all);
  }

  // Payroll
  public getPayrollRuns(): PayrollRun[] {
    return this.getItem(STORAGE_KEYS.PAYROLL, INITIAL_PAYROLL_RUNS);
  }

  public addPayrollRun(run: PayrollRun): void {
    const all = [run, ...this.getPayrollRuns()];
    this.setItem(STORAGE_KEYS.PAYROLL, all);
  }

  // Coupons
  public getCoupons(): Coupon[] {
    return this.getItem(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
  }

  public addCoupon(coupon: Coupon): void {
    const all = [coupon, ...this.getCoupons()];
    this.setItem(STORAGE_KEYS.COUPONS, all);
  }

  // Campaigns
  public getCampaigns(): Campaign[] {
    return this.getItem(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
  }

  public addCampaign(campaign: Campaign): void {
    const all = [campaign, ...this.getCampaigns()];
    this.setItem(STORAGE_KEYS.CAMPAIGNS, all);
  }

  // Notifications
  public getNotifications(): NotificationItem[] {
    return this.getItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  public markNotificationAsRead(id: string): void {
    const notifs = this.getNotifications().map((n) => (n.id === id ? { ...n, isRead: true } : n));
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  // Sync Queue
  public getSyncQueue(): SyncQueueItem[] {
    return this.getItem(STORAGE_KEYS.SYNC_QUEUE, []);
  }

  public addSyncQueueItem(item: SyncQueueItem): void {
    const queue = [item, ...this.getSyncQueue()];
    this.setItem(STORAGE_KEYS.SYNC_QUEUE, queue);
    if (this.isBrowser() && offlineDb) {
      offlineDb.syncQueue.put(item).catch(() => {});
    }
  }

  public updateSyncQueueItem(id: string, updates: Partial<SyncQueueItem>): void {
    const queue = this.getSyncQueue().map((item) => (item.id === id ? { ...item, ...updates } : item));
    this.setItem(STORAGE_KEYS.SYNC_QUEUE, queue);
  }

  public clearCompletedSyncItems(): void {
    const queue = this.getSyncQueue().filter((item) => item.status !== "completed");
    this.setItem(STORAGE_KEYS.SYNC_QUEUE, queue);
  }
}

export const storageService = new StorageService();
