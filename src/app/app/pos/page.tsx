"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { PaymentModal } from "@/components/pos/PaymentModal";
import { PosBanner } from "@/components/pos/terminal/PosBanner";
import { PosLeftCatalogPanel } from "@/components/pos/terminal/PosLeftCatalogPanel";
import { PosRightCartPanel } from "@/components/pos/terminal/PosRightCartPanel";
import { PosHeldDrawer } from "@/components/pos/terminal/PosHeldDrawer";
import { usePosTerminalState } from "@/components/pos/terminal/usePosTerminalState";

export default function PosTerminalPage() {
  const tenant = useTenant();
  const state = usePosTerminalState();

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col -m-4 sm:-m-6 lg:-m-8 overflow-hidden bg-background select-none">
      <PosBanner
        isOnline={tenant.isOnline}
        syncQueueLength={tenant.syncQueue.length}
        onOpenSync={() => tenant.setIsSyncModalOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        <PosLeftCatalogPanel
          searchQuery={state.searchQuery}
          onSearchChange={state.setSearchQuery}
          selectedCategory={state.selectedCategory}
          onSelectCategory={state.setSelectedCategory}
          categories={state.categories}
          totalProductsCount={state.products.length}
          viewMode={state.viewMode}
          onToggleViewMode={() => state.setViewMode(state.viewMode === "grid" ? "compact" : "grid")}
          filteredProducts={state.filteredProducts}
          branchId={tenant.currentBranch.id}
          onAddToCart={(p) => tenant.addToCart(p, 1)}
        />

        <PosRightCartPanel
          cart={tenant.cart}
          cartCustomer={tenant.cartCustomer}
          heldCount={state.heldSales.length}
          subtotal={tenant.cartSubtotal}
          discount={tenant.cartDiscount}
          taxRate={tenant.cartTaxRate}
          totalTax={tenant.cartTotalTax}
          grandTotal={tenant.cartGrandTotal}
          onOpenHeld={() => state.setShowHeldDrawer(true)}
          onClearCart={tenant.clearCart}
          onClearCustomer={() => tenant.setCartCustomer(null)}
          onUpdateQty={tenant.updateCartItemQty}
          onRemoveItem={tenant.removeFromCart}
          onHoldSale={state.handleHoldSale}
          onOpenPayment={() => state.setIsPaymentOpen(true)}
        />
      </div>

      <PosHeldDrawer
        isOpen={state.showHeldDrawer}
        heldSales={state.heldSales}
        onClose={() => state.setShowHeldDrawer(false)}
        onRestoreHold={state.handleRestoreHold}
      />

      <PaymentModal
        isOpen={state.isPaymentOpen}
        onClose={() => state.setIsPaymentOpen(false)}
        onSaleComplete={tenant.refreshData}
      />
    </div>
  );
}
