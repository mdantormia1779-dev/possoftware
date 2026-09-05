import { Customer } from "@/types";
import { storageService } from "@/lib/services/storage";

export function createQuickCustomer(orgId: string, name: string, phone: string): Customer {
  const newCust: Customer = {
    id: `cust-${Date.now()}`,
    organizationId: orgId,
    name,
    phone,
    loyaltyPoints: 0,
    dueBalance: 0,
    creditLimit: 20000,
    totalSpent: 0,
    ordersCount: 0,
  };
  storageService.addCustomer(newCust);
  return newCust;
}
