export type UserRole =
  | "super_admin"
  | "company_owner"
  | "branch_manager"
  | "accountant"
  | "cashier"
  | "staff";

export type PlanTier = "starter" | "business" | "enterprise";
export type SubscriptionStatus = "trial" | "active" | "past_due" | "cancelled" | "expired";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  businessType: string;
  logoUrl?: string;
  currency: string;
  currencySymbol: string;
  phone: string;
  email: string;
  address: string;
  taxNumber?: string;
  subscriptionPlan: PlanTier;
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt?: string;
  subscriptionEndsAt?: string;
  maxBranches: number;
  maxStaff: number;
  maxProducts: number;
  themePrimaryColor?: string;
  receiptFooterMessage?: string;
  createdAt?: string;
}

export interface User {
  id: string;
  organizationId: string;
  branchId?: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  isActive: boolean;
}
