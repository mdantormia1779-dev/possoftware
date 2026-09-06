import { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { accountingService } from "@/services/accounting.service";
import { ChartOfAccount } from "@/lib/types";
import { NewAccountData } from "./AddAccountModal";

export function useChartOfAccounts() {
  const { currentOrg } = useTenant();
  const [accounts, setAccounts] = useState<ChartOfAccount[]>(() => storageService.getAccounts());
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newAcc, setNewAcc] = useState<NewAccountData>({
    code: "",
    name: "",
    type: "asset",
    balance: 0,
    description: "",
  });

  useEffect(() => {
    accountingService.getAccounts(currentOrg?.id).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setAccounts(res.data);
      }
    });
  }, [currentOrg?.id]);

  const filteredAccounts = accounts.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.code.includes(searchQuery);
    const matchesType = selectedType === "all" || a.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAcc.code || !newAcc.name) return;

    const created: ChartOfAccount = {
      id: `acc-${Date.now()}`,
      organizationId: currentOrg?.id || "org-1",
      code: newAcc.code,
      name: newAcc.name,
      type: newAcc.type,
      balance: Number(newAcc.balance) || 0,
      isSystem: false,
      description: newAcc.description,
    };

    storageService.addAccount(created);
    setAccounts((prev) => [...prev, created]);
    accountingService.createAccount(created, currentOrg?.id).catch(() => {});
    setShowAddModal(false);
  };

  return {
    accounts: filteredAccounts,
    selectedType,
    setSelectedType,
    searchQuery,
    setSearchQuery,
    showAddModal,
    setShowAddModal,
    newAcc,
    setNewAcc,
    handleAddAccount,
  };
}
