"use client";

import React from "react";
import { SuppliersHeader } from "@/components/suppliers/SuppliersHeader";
import { SuppliersSearch } from "@/components/suppliers/SuppliersSearch";
import { SuppliersGrid } from "@/components/suppliers/SuppliersGrid";
import { AddSupplierModal } from "@/components/suppliers/AddSupplierModal";
import { useSuppliers } from "@/components/suppliers/useSuppliers";

export default function SuppliersPage() {
  const {
    suppliers,
    searchQuery,
    setSearchQuery,
    showAddModal,
    setShowAddModal,
    handleAddSupplier,
  } = useSuppliers();

  return (
    <div className="space-y-6">
      <SuppliersHeader onAddClick={() => setShowAddModal(true)} />
      <SuppliersSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <SuppliersGrid suppliers={suppliers} />
      <AddSupplierModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSupplier}
      />
    </div>
  );
}
