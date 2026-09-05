import { useMemo } from "react";
import { UserRole } from "@/types";
import { OWNER_NAV } from "./ownerNav";
import { BRANCH_MANAGER_NAV } from "./branchManagerNav";
import { ACCOUNTANT_NAV, CASHIER_NAV, STAFF_NAV } from "./operationsNav";
import { NavSection } from "./nav.types";

export function useAppNavigation(role: UserRole): NavSection[] {
  return useMemo(() => {
    switch (role) {
      case "company_owner":
        return OWNER_NAV;
      case "branch_manager":
        return BRANCH_MANAGER_NAV;
      case "accountant":
        return ACCOUNTANT_NAV;
      case "cashier":
        return CASHIER_NAV;
      case "staff":
        return STAFF_NAV;
      case "super_admin":
        return OWNER_NAV;
      default:
        return OWNER_NAV;
    }
  }, [role]);
}
