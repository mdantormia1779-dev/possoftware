import { apiRequest } from "./apiClient";

export const categoryService = {
  async getCategories(orgId?: string) {
    return apiRequest("/api/categories", { orgId });
  },

  async getCategoryById(id: string, orgId?: string) {
    return apiRequest(`/api/categories/${id}`, { orgId });
  },

  async createCategory(data: { name: string; imageUrl?: string }, orgId?: string) {
    return apiRequest("/api/categories", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
    });
  },

  async updateCategory(id: string, data: { name?: string; imageUrl?: string }, orgId?: string) {
    return apiRequest(`/api/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      orgId,
    });
  },

  async deleteCategory(id: string, orgId?: string) {
    return apiRequest(`/api/categories/${id}`, {
      method: "DELETE",
      orgId,
    });
  },
};
