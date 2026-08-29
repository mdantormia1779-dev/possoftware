"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TenantProvider } from "@/lib/context/TenantContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      <TenantProvider>{children}</TenantProvider>
    </NextThemesProvider>
  );
}
