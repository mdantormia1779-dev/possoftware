import { apiRequest } from "./apiClient";

export const customerService = {
  async getCustomers(q?: string, orgId?: string) {
    const qs = q ? `?q=${encodeURIComponent(q)}` : "";
    return apiRequest(`/api/customers${qs}`, { orgId });
  },

  async getCustomerById(id: string, orgId?: string) {
    return apiRequest(`/api/customers/${id}`, { orgId });
  },

  async createCustomer(data: any, orgId?: string) {
    return apiRequest("/api/customers", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
    });
  },

  async updateCustomer(id: string, data: any, orgId?: string) {
    return apiRequest(`/api/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      orgId,
    });
  },

  async deleteCustomer(id: string, orgId?: string) {
    return apiRequest(`/api/customers/${id}`, {
      method: "DELETE",
      orgId,
    });
  },

  async adjustLoyalty(data: { customerId: string; points: number; type: string; notes?: string }) {
    return apiRequest("/api/loyalty", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
