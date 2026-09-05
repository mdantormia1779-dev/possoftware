import { ChartOfAccount, JournalEntry } from "@/types";

export const INITIAL_ACCOUNTS: ChartOfAccount[] = [
  // Assets (1000 - 1999)
  { id: "acc-101", organizationId: "org-1", code: "1010", name: "Cash in Hand (POS Till)", type: "asset", balance: 64200, isSystem: true, description: "Daily retail register cash balances" },
  { id: "acc-102", organizationId: "org-1", code: "1020", name: "bKash Merchant Account", type: "asset", balance: 142800, isSystem: true, description: "bKash corporate wallet (01700-000000)" },
  { id: "acc-103", organizationId: "org-1", code: "1030", name: "Nagad / Rocket Merchant", type: "asset", balance: 58500, isSystem: true, description: "Mobile banking merchant balances" },
  { id: "acc-104", organizationId: "org-1", code: "1040", name: "City Bank Current Account (A/C: 110293847)", type: "asset", balance: 845000, isSystem: false, description: "Primary corporate banking account" },
  { id: "acc-105", organizationId: "org-1", code: "1050", name: "Accounts Receivable (Customer Due)", type: "asset", balance: 74500, isSystem: true, description: "Customer credit balances" },
  { id: "acc-106", organizationId: "org-1", code: "1060", name: "Merchandise Inventory Asset", type: "asset", balance: 2960000, isSystem: true, description: "Valuation of current in-stock goods" },
  
  // Liabilities (2000 - 2999)
  { id: "acc-201", organizationId: "org-1", code: "2010", name: "Accounts Payable (Supplier Due)", type: "liability", balance: 63500, isSystem: true, description: "Outstanding payments to suppliers" },
  { id: "acc-202", organizationId: "org-1", code: "2020", name: "VAT / Tax Payable to NBR", type: "liability", balance: 24800, isSystem: true, description: "Collected sales VAT liability" },
  { id: "acc-203", organizationId: "org-1", code: "2030", name: "Accrued Salaries & Commissions", type: "liability", balance: 165000, isSystem: true, description: "Unpaid month-end payroll liability" },

  // Equity (3000 - 3999)
  { id: "acc-301", organizationId: "org-1", code: "3010", name: "Owner Capital & Equity", type: "equity", balance: 3500000, isSystem: true, description: "Initial and retained business equity" },
  { id: "acc-302", organizationId: "org-1", code: "3020", name: "Retained Earnings", type: "equity", balance: 551700, isSystem: true, description: "Cumulative net operating profits" },

  // Revenue (4000 - 4999)
  { id: "acc-401", organizationId: "org-1", code: "4010", name: "Sales Revenue (Gross)", type: "revenue", balance: 1845000, isSystem: true, description: "All retail & POS merchandise sales" },
  { id: "acc-402", organizationId: "org-1", code: "4020", name: "Discounts & Allowances", type: "revenue", balance: -38500, isSystem: true, description: "Promotional customer discounts" },

  // Expenses (5000 - 5999)
  { id: "acc-501", organizationId: "org-1", code: "5010", name: "Cost of Goods Sold (COGS)", type: "expense", balance: 980000, isSystem: true, description: "Purchase cost of merchandise sold" },
  { id: "acc-502", organizationId: "org-1", code: "5020", name: "Staff Salaries & Allowances", type: "expense", balance: 310000, isSystem: false, description: "Employee fixed base compensation" },
  { id: "acc-503", organizationId: "org-1", code: "5030", name: "Sales Staff Commission", type: "expense", balance: 42500, isSystem: false, description: "Performance sales commissions" },
  { id: "acc-504", organizationId: "org-1", code: "5040", name: "Outlet Rent & Service Charges", type: "expense", balance: 180000, isSystem: false, description: "Banani, Dhanmondi, GEC lease rent" },
  { id: "acc-505", organizationId: "org-1", code: "5050", name: "Electricity & Generator Utilities", type: "expense", balance: 35000, isSystem: false, description: "DESCO / DPDC / Generator bills" },
  { id: "acc-506", organizationId: "org-1", code: "5060", name: "SMS & Marketing Campaigns", type: "expense", balance: 12500, isSystem: false, description: "Promotional broadcasts & ads" },
];


export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "je-1",
    organizationId: "org-1",
    entryNumber: "JE-202602-0089",
    date: "2026-02-28",
    referenceType: "SALE",
    referenceId: "INV-202602-8812",
    description: "Automated entry for POS Sale INV-202602-8812 via bKash",
    createdByName: "System (POS Auto-Engine)",
    lines: [
      { id: "jl-1", accountId: "acc-102", accountCode: "1020", accountName: "bKash Merchant Account", accountType: "asset", debit: 5460, credit: 0 },
      { id: "jl-2", accountId: "acc-401", accountCode: "4010", accountName: "Sales Revenue (Gross)", accountType: "revenue", debit: 0, credit: 5300 },
      { id: "jl-3", accountId: "acc-202", accountCode: "2020", accountName: "VAT / Tax Payable to NBR", accountType: "liability", debit: 0, credit: 260 },
      { id: "jl-4", accountId: "acc-402", accountCode: "4020", accountName: "Discounts & Allowances", accountType: "revenue", debit: 100, credit: 0 },
      // Inventory & COGS
      { id: "jl-5", accountId: "acc-501", accountCode: "5010", accountName: "Cost of Goods Sold (COGS)", accountType: "expense", debit: 2750, credit: 0 },
      { id: "jl-6", accountId: "acc-106", accountCode: "1060", accountName: "Merchandise Inventory Asset", accountType: "asset", debit: 0, credit: 2750 },
    ],
    totalDebit: 8310,
    totalCredit: 8310,
  },
  {
    id: "je-2",
    organizationId: "org-1",
    entryNumber: "JE-202602-0088",
    date: "2026-02-27",
    referenceType: "PAYROLL",
    referenceId: "PAY-2026-JAN",
    description: "January 2026 Employee Payroll Disbursed via City Bank",
    createdByName: "Accounts Manager",
    lines: [
      { id: "jl-7", accountId: "acc-502", accountCode: "5020", accountName: "Staff Salaries & Allowances", accountType: "expense", debit: 165000, credit: 0 },
      { id: "jl-8", accountId: "acc-104", accountCode: "1040", accountName: "City Bank Current Account", accountType: "asset", debit: 0, credit: 165000 },
    ],
    totalDebit: 165000,
    totalCredit: 165000,
  },
];

