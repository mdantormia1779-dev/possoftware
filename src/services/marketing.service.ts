import { apiRequest } from "./apiClient";

export const marketingService = {
  async getCoupons(orgId?: string) {
    return apiRequest("/api/marketing/coupons", { orgId });
  },

  async createCoupon(data: any, orgId?: string) {
    return apiRequest("/api/marketing/coupons", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
    });
  },

  async deleteCoupon(id: string, orgId?: string) {
    return apiRequest(`/api/marketing/coupons?id=${id}`, {
      method: "DELETE",
      orgId,
    });
  },

  async getCampaigns(orgId?: string) {
    return apiRequest("/api/marketing/campaigns", { orgId });
  },

  async createCampaign(data: any, orgId?: string) {
    return apiRequest("/api/marketing/campaigns", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
    });
  },
};
