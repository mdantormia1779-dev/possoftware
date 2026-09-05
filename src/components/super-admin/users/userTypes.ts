export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "super_admin" | "owner" | "manager" | "cashier" | "accountant";
  organization: string;
  organizationId: string;
  status: "active" | "suspended" | "pending";
  lastLogin: string;
  twoFactorEnabled: boolean;
}
