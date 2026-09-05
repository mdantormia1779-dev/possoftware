export interface Branch {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  isMainBranch: boolean;
  managerName?: string;
  managerPhone?: string;
  employeeCount: number;
  totalSalesToday?: number;
  totalStockValue?: number;
  isActive: boolean;
}
