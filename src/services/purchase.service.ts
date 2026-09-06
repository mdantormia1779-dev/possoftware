import { apiRequest } from "./apiClient";

export const purchaseService = {
  async getPurchases(orgId?: string) {
    return apiRequest("/api/purchases", { orgId });
  },

  async getPurchaseById(id: string, orgId?: string) {
    return apiRequest(`/api/purchases/${id}`, { orgId });
  },

  async createPurchase(data: any, orgId?: string, branchId?: string) {
    return apiRequest("/api/purchases", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
      branchId,
    });
  },

  async updatePurchase(id: string, data: any, orgId?: string, branchId?: string) {
    return apiRequest(`/api/purchases/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      orgId,
      branchId,
    });
  },
};
