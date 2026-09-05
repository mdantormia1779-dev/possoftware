import { ChartOfAccount, JournalEntry } from "@/types";
import { INITIAL_ACCOUNTS, INITIAL_JOURNAL_ENTRIES } from "@/data/initial-data";
import { STORAGE_KEYS, getItem, setItem } from "./baseStorage";

export class AccountingStorage {
  public getAccounts(): ChartOfAccount[] {
    return getItem(STORAGE_KEYS.ACCOUNTS, INITIAL_ACCOUNTS);
  }

  public addAccount(account: ChartOfAccount): void {
    const all = [...this.getAccounts(), account];
    setItem(STORAGE_KEYS.ACCOUNTS, all);
  }

  public getJournalEntries(): JournalEntry[] {
    return getItem(STORAGE_KEYS.JOURNALS, INITIAL_JOURNAL_ENTRIES);
  }

  public addJournalEntry(entry: JournalEntry): void {
    const all = [entry, ...this.getJournalEntries()];
    setItem(STORAGE_KEYS.JOURNALS, all);
  }
}

export const accountingStorage = new AccountingStorage();
