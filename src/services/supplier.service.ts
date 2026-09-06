import { apiRequest } from "./apiClient";

export const supplierService = {
  async getSuppliers(orgId?: string) {
    return apiRequest("/api/suppliers", { orgId });
  },

  async getSupplierById(id: string, orgId?: string) {
    return apiRequest(`/api/suppliers/${id}`, { orgId });
  },

  async createSupplier(data: any, orgId?: string) {
    return apiRequest("/api/suppliers", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
    });
  },

  async updateSupplier(id: string, data: any, orgId?: string) {
    return apiRequest(`/api/suppliers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      orgId,
    });
  },

  async deleteSupplier(id: string, orgId?: string) {
    return apiRequest(`/api/suppliers/${id}`, {
      method: "DELETE",
      orgId,
    });
  },
};
