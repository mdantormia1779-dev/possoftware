import { apiRequest } from "./apiClient";

export const productService = {
  async getProducts(params?: { q?: string; categoryId?: string; orgId?: string; branchId?: string }) {
    const query = new URLSearchParams();
    if (params?.q) query.set("q", params.q);
    if (params?.categoryId && params.categoryId !== "all") query.set("categoryId", params.categoryId);

    const qs = query.toString() ? `?${query.toString()}` : "";
    return apiRequest(`/api/products${qs}`, {
      orgId: params?.orgId,
      branchId: params?.branchId,
    });
  },

  async getProductById(id: string, orgId?: string) {
    return apiRequest(`/api/products/${id}`, { orgId });
  },

  async createProduct(data: any, orgId?: string, branchId?: string) {
    return apiRequest("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
      branchId,
    });
  },

  async updateProduct(id: string, data: any, orgId?: string) {
    return apiRequest(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      orgId,
    });
  },

  async deleteProduct(id: string, orgId?: string) {
    return apiRequest(`/api/products/${id}`, {
      method: "DELETE",
      orgId,
    });
  },

  async lookupBarcode(barcode: string, orgId?: string, branchId?: string) {
    return apiRequest(`/api/products/barcode?code=${encodeURIComponent(barcode)}`, {
      orgId,
      branchId,
    });
  },
};
