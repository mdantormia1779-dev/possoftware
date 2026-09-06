import { User, UserRole } from "@/types";

export const DEFAULT_PERSONAS: Record<UserRole, { name: string; email: string }> = {
  company_owner: { name: "Mahfuzur Rahman", email: "owner@rahmanfashion.com.bd" },
  branch_manager: { name: "Tanvir Hasan", email: "manager.banani@rahmanfashion.com.bd" },
  accountant: { name: "Farhan Ahmed, ACA", email: "accountant@rahmanfashion.com.bd" },
  cashier: { name: "Sadia Islam", email: "cashier@rahmanfashion.com.bd" },
  staff: { name: "Kamrul Hassan", email: "staff@rahmanfashion.com.bd" },
  super_admin: { name: "Global Administrator", email: "admin@xyzpos.com.bd" },
};

export function getDefaultUserForRole(role: UserRole): User {
  const p = DEFAULT_PERSONAS[role] || DEFAULT_PERSONAS.company_owner;
  return {
    id: `default-${role}`,
    organizationId: "org-1",
    name: p.name,
    email: p.email,
    role,
    isActive: true,
  };
}
