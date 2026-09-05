"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { ChartOfAccount, AccountType } from "@/lib/types";
import { CoaHeader } from "@/components/accounting/CoaHeader";
import { CoaFilterBar } from "@/components/accounting/CoaFilterBar";
import { CoaAccountTable } from "@/components/accounting/CoaAccountTable";
import { AddAccountModal, NewAccountData } from "@/components/accounting/AddAccountModal";

export default function ChartOfAccountsPage() {
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

  const filteredAccounts = accounts.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.code.includes(searchQuery);
    const matchesType = selectedType === "all" || a.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAcc.code || !newAcc.name) return;

    const created: ChartOfAccount = {
      id: `acc-${Date.now()}`,
      organizationId: currentOrg.id,
      code: newAcc.code,
      name: newAcc.name,
      type: newAcc.type,
      balance: Number(newAcc.balance) || 0,
      isSystem: false,
      description: newAcc.description,
    };

    storageService.addAccount(created);
    setAccounts(storageService.getAccounts());
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <CoaHeader onAddClick={() => setShowAddModal(true)} />

      <CoaFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <CoaAccountTable accounts={filteredAccounts} />

      <AddAccountModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        newAcc={newAcc}
        setNewAcc={setNewAcc}
        onSubmit={handleAddAccount}
      />
    </div>
  );
}
