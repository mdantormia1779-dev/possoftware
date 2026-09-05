"use client";

import React from "react";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsFilterBar } from "@/components/products/ProductsFilterBar";
import { ProductsTable } from "@/components/products/ProductsTable";
import { AddProductModal } from "@/components/products/AddProductModal";
import { useProductsState } from "@/components/products/useProductsState";

export default function ProductsPage() {
  const {
    products,
    filteredProducts,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCat,
    setSelectedCat,
    showAddModal,
    setShowAddModal,
    newProd,
    setNewProd,
    handleAddProduct,
  } = useProductsState();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <ProductsHeader onAddClick={() => setShowAddModal(true)} />

      <ProductsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCat={selectedCat}
        onSelectCat={setSelectedCat}
        categories={categories}
        totalCount={products.length}
      />

      <ProductsTable products={filteredProducts} />

      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        formData={newProd}
        setFormData={setNewProd}
        categories={categories}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}
