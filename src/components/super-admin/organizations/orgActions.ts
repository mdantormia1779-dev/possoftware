import { Organization, SubscriptionStatus } from "@/lib/types";
import { storageService } from "@/lib/services/storage";
import { generateUUID } from "@/lib/utils";
import { OrgFormData } from "./OrgFormFields";

export function filterOrgs(
  orgs: Organization[],
  query: string,
  plan: string,
  status: string
): Organization[] {
  const q = query.toLowerCase();
  return orgs.filter((o) => {
    const matchSearch =
      o.name.toLowerCase().includes(q) ||
      o.businessType.toLowerCase().includes(q) ||
      (o.email && o.email.toLowerCase().includes(q)) ||
      (o.phone && o.phone.includes(query));
    const matchPlan = plan === "all" || o.subscriptionPlan === plan;
    const matchStatus = status === "all" || o.subscriptionStatus === status;
    return matchSearch && matchPlan && matchStatus;
  });
}

export function buildNewOrg(data: OrgFormData): Organization {
  return {
    id: generateUUID(),
    name: data.name,
    slug: data.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    businessType: data.type,
    email: data.email,
    phone: data.phone,
    address: data.city + ", Bangladesh",
    currency: "BDT",
    currencySymbol: "৳",
    taxNumber: "BIN-" + Math.floor(100000000 + Math.random() * 900000000),
    subscriptionPlan: data.plan,
    subscriptionStatus: data.status,
    subscriptionEndsAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    maxBranches: Number(data.maxBranches),
    maxStaff: Number(data.maxStaff),
    maxProducts: 5000,
    createdAt: new Date().toISOString(),
  };
}

export function buildMainBranch(orgId: string, data: OrgFormData) {
  return {
    id: generateUUID(),
    organizationId: orgId,
    name: `${data.name} Main Branch`,
    code: "MAIN",
    phone: data.phone || "01700-000000",
    email: data.email || "branch@pos.com",
    city: data.city || "Dhaka",
    address: "Commercial Outlet, " + (data.city || "Dhaka"),
    isMainBranch: true,
    employeeCount: 3,
    isActive: true,
  };
}

export function takeControlTenant(
  org: Organization,
  setCurrentOrg: (o: Organization) => void,
  setCurrentBranch: (b: any) => void,
  setCurrentRole: (r: any) => void,
  router: any
) {
  setCurrentOrg(org);
  const branches = storageService.getBranches().filter((b) => b.organizationId === org.id);
  if (branches.length > 0) setCurrentBranch(branches[0]);
  setCurrentRole("company_owner");
  if (typeof window !== "undefined") {
    localStorage.setItem("xyz_user_role", "company_owner");
    localStorage.setItem("super_admin_controlling", org.id);
    localStorage.setItem("super_admin_controlling_name", org.name);
  }
  router.push("/app/dashboard");
}

export function purgeOrgData(org: Organization) {
  if (confirm(`Are you sure you want to wipe all transactions for "${org.name}"? This cannot be undone.`)) {
    storageService.purgeOrganizationData(org.id);
    alert(`Transactions data purged successfully for ${org.name}`);
  }
}
