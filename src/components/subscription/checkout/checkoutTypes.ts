export interface PlanDetails {
  tier: "STARTER" | "BUSINESS" | "ENTERPRISE";
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxBranches: number;
  maxStaff: number;
  maxProducts: number;
  features: string[];
}

export const PLAN_CATALOG: Record<string, PlanDetails> = {
  STARTER: {
    tier: "STARTER",
    name: "Starter",
    monthlyPrice: 2999,
    yearlyPrice: 29990,
    maxBranches: 1,
    maxStaff: 5,
    maxProducts: 5000,
    features: ["1 Branch Outlet", "5 Staff Logins", "5,000 Products", "Offline-First POS", "Standard Reports"],
  },
  BUSINESS: {
    tier: "BUSINESS",
    name: "Business",
    monthlyPrice: 6999,
    yearlyPrice: 69990,
    maxBranches: 3,
    maxStaff: 20,
    maxProducts: 20000,
    features: ["3 Branch Outlets", "20 Staff Accounts", "20,000 Products", "Multi-Branch Transfers", "Automated Accounting"],
  },
  ENTERPRISE: {
    tier: "ENTERPRISE",
    name: "Enterprise",
    monthlyPrice: 14999,
    yearlyPrice: 149990,
    maxBranches: 10,
    maxStaff: 100,
    maxProducts: 100000,
    features: ["10 Branches / Warehouses", "100 Staff Accounts", "100,000 Products", "Dedicated Priority Support", "Custom Domain & API"],
  },
};
