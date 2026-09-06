import { apiRequest } from "./apiClient";

export const accountingService = {
  async getAccounts(orgId?: string) {
    return apiRequest("/api/accounting/accounts", { orgId });
  },

  async createAccount(data: any, orgId?: string) {
    return apiRequest("/api/accounting/accounts", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
    });
  },

  async getBanks(orgId?: string) {
    return apiRequest("/api/accounting/banks", { orgId });
  },

  async createBank(data: any, orgId?: string) {
    return apiRequest("/api/accounting/banks", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
    });
  },

  async getTransactions(bankAccountId?: string, orgId?: string) {
    const qs = bankAccountId ? `?bankAccountId=${bankAccountId}` : "";
    return apiRequest(`/api/accounting/transactions${qs}`, { orgId });
  },

  async recordTransaction(data: any) {
    return apiRequest("/api/accounting/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getJournals(orgId?: string) {
    return apiRequest("/api/accounting/journals", { orgId });
  },

  async postJournal(data: any, orgId?: string, userId?: string) {
    return apiRequest("/api/accounting/journals", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
      userId,
    });
  },
};
