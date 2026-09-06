import { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { salesService } from "@/services/sales.service";
import { Sale } from "@/types";

export function useSalesHistory() {
  const { currentOrg, currentBranch } = useTenant();
  const [sales, setSales] = useState<Sale[]>(() => storageService.getSales());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState("all");
  const [selectedSaleDetail, setSelectedSaleDetail] = useState<Sale | null>(null);

  useEffect(() => {
    salesService.getSales(selectedBranch === "all" ? undefined : selectedBranch, currentOrg?.id).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setSales(res.data);
      }
    });
  }, [currentOrg?.id, selectedBranch]);

  const filteredSales = sales.filter((s) => {
    const q = searchQuery.toLowerCase();
    const match = s.invoiceNumber.toLowerCase().includes(q) ||
      (s.customerName && s.customerName.toLowerCase().includes(q)) ||
      (s.customerPhone && s.customerPhone.includes(searchQuery));
    const branchMatch = selectedBranch === "all" || s.branchId === selectedBranch;
    const payMatch = selectedPayment === "all" || s.paymentMethod === selectedPayment;
    return match && branchMatch && payMatch;
  });

  const totalSalesRevenue = filteredSales.reduce((sum, s) => sum + s.grandTotal, 0);

  const handleRefund = (saleId: string) => {
    const updated = sales.map((s) => s.id === saleId ? { ...s, status: "returned" as const } : s);
    setSales(updated);
    storageService.saveSales(updated);
    salesService.processReturn({ saleId, totalRefund: selectedSaleDetail?.grandTotal || 0, items: [] }).catch(() => {});
    if (selectedSaleDetail?.id === saleId) {
      setSelectedSaleDetail({ ...selectedSaleDetail, status: "returned" });
    }
  };

  return {
    sales: filteredSales,
    searchQuery,
    setSearchQuery,
    selectedBranch,
    setSelectedBranch,
    selectedPayment,
    setSelectedPayment,
    selectedSaleDetail,
    setSelectedSaleDetail,
    totalSalesRevenue,
    handleRefund,
  };
}
