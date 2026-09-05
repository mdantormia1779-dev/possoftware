export interface Customer {
  id: string;
  organizationId: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  loyaltyPoints: number;
  dueBalance: number;
  creditLimit: number;
  totalSpent: number;
  ordersCount: number;
  lastPurchaseDate?: string;
}
