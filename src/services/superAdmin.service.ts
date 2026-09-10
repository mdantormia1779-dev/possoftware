import { apiRequest } from "./apiClient";

export interface SuperAdminAnalytics {
  totalOrganizations: number;
  activeSubscriptions: number;
  totalUsers: number;
  totalSystemRevenue: number;
  totalSystemSalesCount: number;
  monthlyRecurringRevenue: number;
  planDistribution: Array<{ name: string; value: number; color: string }>;
  mrrGrowth: Array<{ month: string; mrr: number; salesCount: number }>;
}

export const superAdminService = {
  async getAnalytics() {
    return apiRequest<SuperAdminAnalytics>("/api/super-admin/analytics");
  },

  async getOrganizations() {
    return apiRequest<any[]>("/api/super-admin/organizations");
  },

  async updateOrganization(data: {
    id: string;
    subscriptionStatus?: string;
    subscriptionPlan?: string;
    maxBranches?: number;
    maxStaff?: number;
  }) {
    return apiRequest("/api/super-admin/organizations", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async getPlans() {
    return apiRequest<any[]>("/api/super-admin/plans");
  },

  async getUsers() {
    return apiRequest<any[]>("/api/super-admin/users");
  },

  async updateUserStatus(id: string, isActive: boolean) {
    return apiRequest("/api/super-admin/users", {
      method: "PUT",
      body: JSON.stringify({ id, isActive }),
    });
  },
};
