import { apiRequest } from "./apiClient";

export const inventoryService = {
  async getStockLevels(branchId?: string, orgId?: string) {
    const qs = branchId ? `?branchId=${branchId}` : "";
    return apiRequest(`/api/inventory/stock${qs}`, { orgId, branchId });
  },

  async adjustStock(productId: string, quantity: number, damagedQty?: number, branchId?: string) {
    return apiRequest("/api/inventory/stock", {
      method: "POST",
      body: JSON.stringify({ productId, quantity, damagedQty, branchId }),
    });
  },

  async getTransfers(orgId?: string) {
    return apiRequest("/api/inventory/transfers", { orgId });
  },

  async getTransferById(id: string, orgId?: string) {
    return apiRequest(`/api/inventory/transfers/${id}`, { orgId });
  },

  async createTransfer(data: { sourceBranchId: string; destinationBranchId: string; items: any[]; notes?: string }, orgId?: string) {
    return apiRequest("/api/inventory/transfers", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
    });
  },

  async updateTransferStatus(id: string, status: string, notes?: string) {
    return apiRequest(`/api/inventory/transfers/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status, notes }),
    });
  },
};
