export interface PlanData {
  id?: string;
  name: string;
  tier: "TRIAL" | "STARTER" | "BUSINESS" | "ENTERPRISE";
  monthlyPrice: number;
  yearlyPrice?: number;
  maxBranches: number;
  maxStaff: number;
  maxProducts?: number;
  features: string[] | string;
  isPopular?: boolean;
}
