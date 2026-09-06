import { apiRequest } from "./apiClient";

export const salesService = {
  async getSales(branchId?: string, orgId?: string) {
    const qs = branchId ? `?branchId=${branchId}` : "";
    return apiRequest(`/api/sales${qs}`, { orgId, branchId });
  },

  async getSaleById(id: string, orgId?: string) {
    return apiRequest(`/api/sales/${id}`, { orgId });
  },

  async createSale(saleData: any, orgId?: string, branchId?: string) {
    return apiRequest("/api/sales", {
      method: "POST",
      body: JSON.stringify(saleData),
      orgId,
      branchId,
    });
  },

  async getReturns(orgId?: string) {
    return apiRequest("/api/sales/returns", { orgId });
  },

  async processReturn(returnData: any, orgId?: string) {
    return apiRequest("/api/sales/returns", {
      method: "POST",
      body: JSON.stringify(returnData),
      orgId,
    });
  },
};
