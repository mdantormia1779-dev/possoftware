export interface MonthlySalesRecord {
  month: string;
  sales: number;
  profit: number;
}

export const MONTHLY_SALES_REPORT: MonthlySalesRecord[] = [
  { month: "Sep", sales: 1240000, profit: 520000 },
  { month: "Oct", sales: 1450000, profit: 610000 },
  { month: "Nov", sales: 1620000, profit: 680000 },
  { month: "Dec", sales: 1980000, profit: 830000 },
  { month: "Jan", sales: 1540000, profit: 645000 },
  { month: "Feb", sales: 1845000, profit: 775000 },
];
