"use client";

import React from "react";
import { useChartOfAccounts } from "@/components/accounting/useChartOfAccounts";
import { CoaHeader } from "@/components/accounting/CoaHeader";
import { CoaFilterBar } from "@/components/accounting/CoaFilterBar";
import { CoaAccountTable } from "@/components/accounting/CoaAccountTable";
import { AddAccountModal } from "@/components/accounting/AddAccountModal";

export default function ChartOfAccountsPage() {
  const {
    accounts,
    selectedType,
    setSelectedType,
    searchQuery,
    setSearchQuery,
    showAddModal,
    setShowAddModal,
    newAcc,
    setNewAcc,
    handleAddAccount,
  } = useChartOfAccounts();

  return (
    <div className="space-y-6">
      <CoaHeader onAddClick={() => setShowAddModal(true)} />

      <CoaFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <CoaAccountTable accounts={accounts} />

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
