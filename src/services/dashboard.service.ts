import { apiRequest } from "./apiClient";

export const dashboardService = {
  async getStats(branchId?: string, orgId?: string) {
    const qs = branchId ? `?branchId=${branchId}` : "";
    return apiRequest(`/api/dashboard/stats${qs}`, { orgId, branchId });
  },

  async getReports(days: number = 30, branchId?: string, orgId?: string) {
    const params = new URLSearchParams({ days: String(days) });
    if (branchId) params.set("branchId", branchId);
    return apiRequest(`/api/reports?${params.toString()}`, { orgId, branchId });
  },
};
