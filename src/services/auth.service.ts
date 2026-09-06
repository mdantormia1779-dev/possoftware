import { apiRequest } from "./apiClient";
import { User, Organization, Branch } from "@/types";

export interface LoginCredentials {
  emailOrPhone: string;
  password: string;
}

export interface RegisterPayload {
  ownerName: string;
  email: string;
  phone: string;
  password: string;
  companyName: string;
  businessType: string;
  branchName: string;
  city: string;
}

export interface AuthResponseData {
  user: User;
  organization: Organization;
  branch: Branch;
  token?: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    return apiRequest<AuthResponseData>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  async register(payload: RegisterPayload) {
    return apiRequest<AuthResponseData>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getProfile() {
    return apiRequest<AuthResponseData>("/api/auth/me", {
      method: "GET",
    });
  },

  async logout() {
    return apiRequest<null>("/api/auth/logout", {
      method: "POST",
    });
  },
};
