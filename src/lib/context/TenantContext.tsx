"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Organization, Branch, UserRole, Sale, NotificationItem } from "../types";
import { storageService } from "../services/storage";
import { TenantContextType } from "./TenantContext.types";
import { usePOSCart } from "./usePOSCart";
import { useSyncState } from "./useSyncState";
import { useSearchShortcut } from "./useSearchShortcut";

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [orgs, setOrgs] = useState<Organization[]>(() => storageService.getOrganizations());
  const [currentOrg, setCurrentOrg] = useState<Organization>(() => orgs[0]);
  const [branches, setBranches] = useState<Branch[]>(() => storageService.getBranches());
  const [currentBranch, setCurrentBranch] = useState<Branch>(() => branches[0]);
  const [currentRole, setCurrentRoleState] = useState<UserRole>("company_owner");
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => storageService.getNotifications());

  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [activeReceiptSale, setActiveReceiptSale] = useState<Sale | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("xyz_user_role") as UserRole;
      if (saved && ["company_owner", "branch_manager", "accountant", "cashier", "staff", "super_admin"].includes(saved)) {
        setCurrentRoleState(saved);
      }
    }
  }, []);

  const setCurrentRole = useCallback((role: UserRole) => {
    setCurrentRoleState(role);
    if (typeof window !== "undefined") {
      localStorage.setItem("xyz_user_role", role);
    }
  }, []);

  const refreshData = useCallback(() => {
    setOrgs(storageService.getOrganizations());
    setBranches(storageService.getBranches());
    setNotifications(storageService.getNotifications());
  }, []);

  const syncState = useSyncState(refreshData);
  const cartState = usePOSCart();

  const toggleSearch = useCallback(() => setIsSearchModalOpen((prev) => !prev), []);
  useSearchShortcut(toggleSearch);

  const markNotificationRead = (id: string) => {
    storageService.markNotificationAsRead(id);
    setNotifications(storageService.getNotifications());
  };

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
        ...syncState,
        ...cartState,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isSyncModalOpen,
        setIsSyncModalOpen,
        activeReceiptSale,
        setActiveReceiptSale,
        notifications,
        unreadNotificationCount: notifications.filter((n) => !n.isRead).length,
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
