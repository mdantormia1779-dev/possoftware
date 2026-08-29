"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Organization,
  Branch,
  UserRole,
  CartItem,
  Product,
  Customer,
  Sale,
  SyncQueueItem,
  NotificationItem,
} from "../types";
import { storageService } from "../services/storage";
import { offlineDb } from "../db/dexie-db";

interface TenantContextType {
  currentOrg: Organization;
  setCurrentOrg: (org: Organization) => void;
  currentBranch: Branch;
  setCurrentBranch: (branch: Branch) => void;
  branches: Branch[];
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  syncQueue: SyncQueueItem[];
  isSyncing: boolean;
  triggerManualSync: () => Promise<void>;
  cart: CartItem[];
  cartCustomer: Customer | null;
  setCartCustomer: (customer: Customer | null) => void;
  cartDiscount: number;
  setCartDiscount: (discount: number) => void;
  cartTaxRate: number;
  setCartTaxRate: (rate: number) => void;
  addToCart: (product: Product, qty?: number) => void;
  updateCartItemQty: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalTax: number;
  cartGrandTotal: number;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isSyncModalOpen: boolean;
  setIsSyncModalOpen: (open: boolean) => void;
  activeReceiptSale: Sale | null;
  setActiveReceiptSale: (sale: Sale | null) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  refreshData: () => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [orgs, setOrgs] = useState<Organization[]>(() => storageService.getOrganizations());
  const [currentOrg, setCurrentOrg] = useState<Organization>(() => orgs[0]);
  const [branches, setBranches] = useState<Branch[]>(() => storageService.getBranches());
  const [currentBranch, setCurrentBranch] = useState<Branch>(() => branches[0]);
  const [currentRole, setCurrentRole] = useState<UserRole>("company_owner");
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => storageService.getNotifications());

  // POS Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCustomer, setCartCustomer] = useState<Customer | null>(null);
  const [cartDiscount, setCartDiscount] = useState<number>(0);
  const [cartTaxRate, setCartTaxRate] = useState<number>(5); // default 5% VAT in BD

  // UI Modals
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [activeReceiptSale, setActiveReceiptSale] = useState<Sale | null>(null);

  // Initialize offline IndexedDB
  useEffect(() => {
    storageService.initOfflineDatabase();
    setSyncQueue(storageService.getSyncQueue());
  }, []);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      }
    };
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const refreshData = useCallback(() => {
    setOrgs(storageService.getOrganizations());
    setBranches(storageService.getBranches());
    setSyncQueue(storageService.getSyncQueue());
    setNotifications(storageService.getNotifications());
  }, []);

  // Sync outbox queue when coming online or manually triggered
  const triggerManualSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);

    try {
      const queue = storageService.getSyncQueue();
      if (queue.length === 0) {
        setIsSyncing(false);
        return;
      }

      // Simulate network request to sync each item
      for (const item of queue) {
        storageService.updateSyncQueueItem(item.id, { status: "syncing" });
        await new Promise((res) => setTimeout(res, 500)); // small delay simulation
        storageService.updateSyncQueueItem(item.id, { status: "completed" });
      }

      // Clean up Dexie and local storage
      if (offlineDb) {
        await offlineDb.syncQueue.clear();
      }
      storageService.clearCompletedSyncItems();
      setSyncQueue(storageService.getSyncQueue());
      refreshData();
    } catch (e) {
      console.error("Sync error:", e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Cart Management
  const addToCart = (product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => {
          if (item.product.id === product.id) {
            const newQty = item.quantity + qty;
            const itemSubtotal = newQty * item.unitPrice;
            const itemTax = (itemSubtotal * (product.taxRate || 5)) / 100;
            return {
              ...item,
              quantity: newQty,
              taxAmount: itemTax,
              totalPrice: itemSubtotal + itemTax - item.discountAmount,
            };
          }
          return item;
        });
      } else {
        const itemSubtotal = qty * product.sellingPrice;
        const itemTax = (itemSubtotal * (product.taxRate || 5)) / 100;
        return [
          ...prev,
          {
            product,
            quantity: qty,
            unitPrice: product.sellingPrice,
            discountAmount: 0,
            taxAmount: itemTax,
            totalPrice: itemSubtotal + itemTax,
          },
        ];
      }
    });
  };

  const updateCartItemQty = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const itemSubtotal = newQty * item.unitPrice;
            const itemTax = (itemSubtotal * (item.product.taxRate || 5)) / 100;
            return {
              ...item,
              quantity: newQty,
              taxAmount: itemTax,
              totalPrice: itemSubtotal + itemTax - item.discountAmount,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCartCustomer(null);
    setCartDiscount(0);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const cartTotalTax = (Math.max(0, cartSubtotal - cartDiscount) * cartTaxRate) / 100;
  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + cartTotalTax);

  const markNotificationRead = (id: string) => {
    storageService.markNotificationAsRead(id);
    setNotifications(storageService.getNotifications());
  };

  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  return (
    <TenantContext.Provider
      value={{
        currentOrg,
        setCurrentOrg,
        currentBranch,
        setCurrentBranch,
        branches,
        currentRole,
        setCurrentRole,
        isOnline,
        setIsOnline,
        syncQueue,
        isSyncing,
        triggerManualSync,
        cart,
        cartCustomer,
        setCartCustomer,
        cartDiscount,
        setCartDiscount,
        cartTaxRate,
        setCartTaxRate,
        addToCart,
        updateCartItemQty,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTotalTax,
        cartGrandTotal,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isSyncModalOpen,
        setIsSyncModalOpen,
        activeReceiptSale,
        setActiveReceiptSale,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        refreshData,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
