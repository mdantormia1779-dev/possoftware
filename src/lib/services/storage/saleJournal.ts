import { Sale, JournalEntry, JournalLine } from "@/types";
import { generateUUID } from "@/lib/utils";
import { STORAGE_KEYS, getItem, setItem } from "./baseStorage";

const PAYMENT_ACCOUNTS: Record<string, { id: string; code: string; name: string }> = {
  cash: { id: "acc-101", code: "1010", name: "Cash in Hand (POS Till)" },
  bkash: { id: "acc-102", code: "1020", name: "bKash Merchant Account" },
  nagad: { id: "acc-103", code: "1030", name: "Nagad / Rocket Merchant" },
  rocket: { id: "acc-103", code: "1030", name: "Nagad / Rocket Merchant" },
  card: { id: "acc-104", code: "1040", name: "City Bank Current Account" },
  bank_transfer: { id: "acc-104", code: "1040", name: "City Bank Current Account" },
  due: { id: "acc-105", code: "1050", name: "Accounts Receivable (Customer Due)" },
};

export function postSaleJournalEntry(sale: Sale): void {
  const totalCost = sale.items.reduce((sum, item) => sum + item.costPrice * item.quantity, 0);
  const acc = PAYMENT_ACCOUNTS[sale.paymentMethod] || PAYMENT_ACCOUNTS.cash;

  const lines: JournalLine[] = [
    {
      id: `jl-${generateUUID()}`,
      accountId: acc.id,
      accountCode: acc.code,
      accountName: acc.name,
      accountType: "asset",
      debit: sale.paidAmount > 0 ? sale.paidAmount : sale.grandTotal,
      credit: 0,
    },
    {
      id: `jl-${generateUUID()}`,
      accountId: "acc-401",
      accountCode: "4010",
      accountName: "Sales Revenue (Gross)",
      accountType: "revenue",
      debit: 0,
      credit: sale.subtotal,
    },
  ];

  if (sale.taxAmount > 0) {
    lines.push({
      id: `jl-${generateUUID()}`,
      accountId: "acc-202",
      accountCode: "2020",
      accountName: "VAT / Tax Payable to NBR",
      accountType: "liability",
      debit: 0,
      credit: sale.taxAmount,
    });
  }

  if (totalCost > 0) {
    lines.push({
      id: `jl-${generateUUID()}`,
      accountId: "acc-501",
      accountCode: "5010",
      accountName: "Cost of Goods Sold (COGS)",
      accountType: "expense",
      debit: totalCost,
      credit: 0,
    });
    lines.push({
      id: `jl-${generateUUID()}`,
      accountId: "acc-106",
      accountCode: "1060",
      accountName: "Merchandise Inventory Asset",
      accountType: "asset",
      debit: 0,
      credit: totalCost,
    });
  }

  const journalEntry: JournalEntry = {
    id: `je-${generateUUID()}`,
    organizationId: sale.organizationId,
    entryNumber: `JE-${sale.invoiceNumber.replace("INV-", "")}`,
    date: sale.createdAt.split("T")[0],
    referenceType: "SALE",
    referenceId: sale.invoiceNumber,
    description: `Automated journal entry for POS invoice ${sale.invoiceNumber}`,
    createdByName: "POS Auto-Journal Engine",
    lines,
    totalDebit: lines.reduce((a, l) => a + l.debit, 0),
    totalCredit: lines.reduce((a, l) => a + l.credit, 0),
  };

  const allJournals = [journalEntry, ...getItem<JournalEntry[]>(STORAGE_KEYS.JOURNALS, [])];
  setItem(STORAGE_KEYS.JOURNALS, allJournals);
}
