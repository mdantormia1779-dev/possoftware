"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import { GlobalSearchModal } from "../ui/GlobalSearchModal";
import { SyncStatusModal } from "../ui/SyncStatusModal";
import { NotificationsDrawer } from "../ui/NotificationsDrawer";
import { ThermalReceiptModal } from "../pos/ThermalReceiptModal";
import { SuperAdminBanner } from "./app/SuperAdminBanner";
import { AppHeader } from "./app/AppHeader";
import { AppSidebar } from "./app/AppSidebar";
import { useAppNavigation } from "./app/nav/useAppNavigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    currentOrg,
    currentBranch,
    setCurrentBranch,
    branches,
    currentRole,
    isOnline,
    syncQueue,
    setIsSearchModalOpen,
    setIsSyncModalOpen,
    unreadNotificationCount,
  } = useTenant();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSuperAdminTakeover, setIsSuperAdminTakeover] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const controlling = localStorage.getItem("super_admin_controlling");
      setIsSuperAdminTakeover(!!controlling);
    }
  }, []);

  const navSections = useAppNavigation(currentRole);
  const isPosPage = pathname === "/app/pos";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-indigo-500/20 selection:text-indigo-600">
      <GlobalSearchModal />
      <SyncStatusModal />
      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
      <ThermalReceiptModal />

      {isSuperAdminTakeover && <SuperAdminBanner orgName={currentOrg.name} />}

      <AppHeader
        currentOrg={currentOrg}
        currentBranch={currentBranch}
        branches={branches}
        currentRole={currentRole}
        isOnline={isOnline}
        syncQueueLength={syncQueue.length}
        unreadNotificationCount={unreadNotificationCount}
        isPosPage={isPosPage}
        mobileMenuOpen={mobileMenuOpen}
        sidebarCollapsed={sidebarCollapsed}
        onToggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSelectBranch={setCurrentBranch}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden print:overflow-visible print:block">
        <AppSidebar
          currentOrg={currentOrg}
          currentBranch={currentBranch}
          currentRole={currentRole}
          navSections={navSections}
          pathname={pathname}
          mobileMenuOpen={mobileMenuOpen}
          sidebarCollapsed={sidebarCollapsed}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8 print:p-0 print:overflow-visible print:bg-white">
          <div className="max-w-7xl mx-auto print:max-w-none print:w-full print:p-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
