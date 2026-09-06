import { apiRequest } from "./apiClient";

export const posService = {
  async getShifts(branchId?: string, orgId?: string) {
    return apiRequest("/api/pos/shifts", { orgId, branchId });
  },

  async openShift(openingCash: number, branchId?: string, orgId?: string) {
    return apiRequest("/api/pos/shifts", {
      method: "POST",
      body: JSON.stringify({ openingCash }),
      orgId,
      branchId,
    });
  },

  async closeShift(shiftId: string, closingCash: number, cashVariance?: number, notes?: string) {
    return apiRequest("/api/pos/shifts", {
      method: "POST",
      body: JSON.stringify({ action: "CLOSE", shiftId, closingCash, cashVariance, notes }),
    });
  },

  async getParkedSales(branchId?: string, orgId?: string) {
    return apiRequest("/api/pos/parked", { orgId, branchId });
  },

  async parkSale(data: any, branchId?: string, orgId?: string) {
    return apiRequest("/api/pos/parked", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
      branchId,
    });
  },

  async deleteParkedSale(id: string, orgId?: string) {
    return apiRequest(`/api/pos/parked?id=${id}`, {
      method: "DELETE",
      orgId,
    });
  },
};
