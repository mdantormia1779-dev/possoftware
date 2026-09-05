import { useState } from "react";
import { storageService } from "@/lib/services/storage";
import { Sale } from "@/types";

export function useSalesHistory() {
  const [sales, setSales] = useState<Sale[]>(() => storageService.getSales());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState("all");
  const [selectedSaleDetail, setSelectedSaleDetail] = useState<Sale | null>(null);

  const filteredSales = sales.filter((s) => {
    const matchesSearch =
      s.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.customerName && s.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.customerPhone && s.customerPhone.includes(searchQuery));
    const matchesBranch = selectedBranch === "all" || s.branchId === selectedBranch;
    const matchesPayment = selectedPayment === "all" || s.paymentMethod === selectedPayment;
    return matchesSearch && matchesBranch && matchesPayment;
  });

  const totalSalesRevenue = filteredSales.reduce((sum, s) => sum + s.grandTotal, 0);

  const handleRefund = (saleId: string) => {
    const updated = sales.map((s) =>
      s.id === saleId ? { ...s, status: "returned" as const } : s
    );
    setSales(updated);
    storageService.saveSales(updated);
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
