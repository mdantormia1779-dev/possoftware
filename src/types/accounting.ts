export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";

export interface ChartOfAccount {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  type: AccountType;
  balance: number;
  isSystem: boolean;
  description?: string;
}

export interface JournalLine {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  debit: number;
  credit: number;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  organizationId: string;
  entryNumber: string;
  date: string;
  referenceType: "SALE" | "PURCHASE" | "PAYROLL" | "EXPENSE" | "MANUAL";
  referenceId?: string;
  description: string;
  createdByName: string;
  lines: JournalLine[];
  totalDebit: number;
  totalCredit: number;
}
