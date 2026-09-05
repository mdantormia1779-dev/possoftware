"use client";

import React, { useState } from "react";
import { SuperAdminHeader } from "./admin/SuperAdminHeader";
import { SuperAdminSidebar } from "./admin/SuperAdminSidebar";

export function SuperAdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-purple-500/20 selection:text-purple-600">
      <SuperAdminHeader
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen(!mobileOpen)}
      />

      <div className="flex-1 flex overflow-hidden">
        <SuperAdminSidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
