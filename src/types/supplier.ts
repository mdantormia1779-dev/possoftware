export interface Supplier {
  id: string;
  organizationId: string;
  name: string;
  companyName?: string;
  phone: string;
  email?: string;
  address?: string;
  balanceDue: number;
  totalPurchased: number;
}
