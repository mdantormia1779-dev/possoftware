"use client";

import React, { useState } from "react";
import { SuperAdminHeader } from "./admin/SuperAdminHeader";
import { SuperAdminSidebar } from "./admin/SuperAdminSidebar";

export function SuperAdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-background text-foreground flex flex-col antialiased selection:bg-purple-500/20 selection:text-purple-600 print:h-auto print:max-h-none print:overflow-visible">
      <SuperAdminHeader
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen(!mobileOpen)}
      />

      <div className="flex-1 flex overflow-hidden min-h-0 print:overflow-visible print:block">
        <SuperAdminSidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <main className="flex-1 min-h-0 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8 print:p-0 print:overflow-visible">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
