"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Organization, Branch, Sale } from "../types";
import { storageService } from "../services/storage";
import { TenantContextType } from "./TenantContext.types";
import { usePOSCart } from "./usePOSCart";
import { useSyncState } from "./useSyncState";
import { useSearchShortcut } from "./useSearchShortcut";
import { useTenantSession } from "./useTenantSession";
import { useNotificationState } from "./useNotificationState";

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const session = useTenantSession();
  const [orgs, setOrgs] = useState<Organization[]>(() => storageService.getOrganizations());
  const [currentOrg, setCurrentOrg] = useState<Organization>(() => orgs[0]);
  const [branches, setBranches] = useState<Branch[]>(() => storageService.getBranches());
  const [currentBranch, setCurrentBranch] = useState<Branch>(() => branches[0]);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [activeReceiptSale, setActiveReceiptSale] = useState<Sale | null>(null);

  const notifState = useNotificationState(session.currentRole, session.currentUser);
  const { refreshNotifications } = notifState;

  const refreshData = useCallback(() => {
    setOrgs(storageService.getOrganizations());
    setBranches(storageService.getBranches());
    refreshNotifications();
  }, [refreshNotifications]);

  const syncState = useSyncState(refreshData);
  const cartState = usePOSCart();
  const toggleSearch = useCallback(() => setIsSearchModalOpen((prev) => !prev), []);
  useSearchShortcut(toggleSearch);

  return (
    <TenantContext.Provider
      value={{
        ...session,
        currentOrg,
        setCurrentOrg,
        currentBranch,
        setCurrentBranch,
        branches,
        ...syncState,
        ...cartState,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isSyncModalOpen,
        setIsSyncModalOpen,
        activeReceiptSale,
        setActiveReceiptSale,
        ...notifState,
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
