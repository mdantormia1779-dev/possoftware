import { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { dashboardService } from "@/services/dashboard.service";
import { BRANCH_SALES_DATA } from "./dashboardData";

export function useOwnerDashboard() {
  const { currentOrg, currentBranch } = useTenant();
  const [sales, setSales] = useState(() => storageService.getSales());
  const [products, setProducts] = useState(() => storageService.getProducts());
  const [customers] = useState(() => storageService.getCustomers());
  const [apiStats, setApiStats] = useState<any>(null);

  useEffect(() => {
    dashboardService.getStats(currentBranch?.id, currentOrg?.id).then((res) => {
      if (res.success && res.data) {
        setApiStats(res.data);
        if (res.data.recentSales?.length) setSales(res.data.recentSales);
      }
    });
  }, [currentOrg?.id, currentBranch?.id]);

  const todaySalesTotal = apiStats?.todaySalesAmount ?? sales.reduce((sum, s) => sum + s.grandTotal, 0);
  const totalDueOutstanding = customers.reduce((sum, c) => sum + c.dueBalance, 0);
  const totalStockValuation = products.reduce((sum, p) => sum + p.totalStock * p.purchasePrice, 0);
  const lowStockProducts = apiStats?.lowStockProducts ?? products.filter((p) => p.totalStock <= p.minStockAlert);
  const grossProfitEstimate = todaySalesTotal * 0.42;

  const branches = storageService.getBranches().filter((b) => !b.organizationId || b.organizationId === currentOrg?.id);
  const branchSalesData = branches.length > 0
    ? branches.map((b) => {
        const bSales = sales.filter((s: any) => s.branchId === b.id || s.branchName === b.name);
        const total = bSales.reduce((sum: number, s: any) => sum + s.grandTotal, 0);
        return { branch: b.name.replace(" Flagship", ""), sales: total || (b.isMainBranch ? 84500 : 42000), target: 75000 };
      })
    : BRANCH_SALES_DATA;

  return {
    sales,
    todaySalesTotal,
    grossProfitEstimate,
    totalStockValuation,
    totalDueOutstanding,
    skusCount: apiStats?.totalProducts ?? products.length,
    branchSalesData,
    lowStockProducts,
  };
}
