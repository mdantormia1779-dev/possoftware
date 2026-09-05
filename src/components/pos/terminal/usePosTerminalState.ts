import { useState, useMemo } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { HeldSaleItem } from "./PosHeldDrawer";

export function usePosTerminalState() {
  const tenant = useTenant();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [heldSales, setHeldSales] = useState<HeldSaleItem[]>([]);
  const [showHeldDrawer, setShowHeldDrawer] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

  const categories = storageService.getCategories();
  const products = storageService.getProducts();

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCat = selectedCategory === "all" || p.categoryId === selectedCategory;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.barcode.includes(searchQuery.trim());
      return matchesCat && matchesQuery;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleHoldSale = () => {
    if (tenant.cart.length === 0) return;
    const newHold: HeldSaleItem = {
      id: `hold-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      itemsCount: tenant.cart.reduce((sum, item) => sum + item.quantity, 0),
      total: tenant.cartGrandTotal,
      cartData: {
        cart: tenant.cart,
        cartCustomer: tenant.cartCustomer,
        cartDiscount: tenant.cartDiscount,
      },
    };
    setHeldSales([newHold, ...heldSales]);
    tenant.clearCart();
  };

  const handleRestoreHold = (hold: HeldSaleItem) => {
    tenant.clearCart();
    hold.cartData.cart.forEach((item: any) => {
      tenant.addToCart(item.product, item.quantity);
    });
    if (hold.cartData.cartCustomer) {
      tenant.setCartCustomer(hold.cartData.cartCustomer);
    }
    if (hold.cartData.cartDiscount) {
      tenant.setCartDiscount(hold.cartData.cartDiscount);
    }
    setHeldSales(heldSales.filter((h) => h.id !== hold.id));
    setShowHeldDrawer(false);
  };

  return {
    categories,
    products,
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    isPaymentOpen,
    setIsPaymentOpen,
    heldSales,
    showHeldDrawer,
    setShowHeldDrawer,
    viewMode,
    setViewMode,
    handleHoldSale,
    handleRestoreHold,
  };
}
