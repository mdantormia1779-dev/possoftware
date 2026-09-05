"use client";

import React from "react";
import { CustomersHeader } from "@/components/customers/CustomersHeader";
import { CustomersSearch } from "@/components/customers/CustomersSearch";
import { CustomersTable } from "@/components/customers/CustomersTable";
import { CustomerDetailDrawer } from "@/components/customers/CustomerDetailDrawer";
import { AddCustomerModal } from "@/components/customers/AddCustomerModal";
import { useCustomers } from "@/components/customers/useCustomers";

export default function CustomersPage() {
  const {
    customers,
    searchQuery,
    setSearchQuery,
    showAddModal,
    setShowAddModal,
    selectedCustDetail,
    setSelectedCustDetail,
    handleAddCustomer,
  } = useCustomers();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <CustomersHeader onAddClick={() => setShowAddModal(true)} />
      <CustomersSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CustomersTable
        customers={customers}
        onSelectDetail={setSelectedCustDetail}
      />
      <CustomerDetailDrawer
        customer={selectedCustDetail}
        onClose={() => setSelectedCustDetail(null)}
      />
      <AddCustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCustomer}
      />
    </div>
  );
}
