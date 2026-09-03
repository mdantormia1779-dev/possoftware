import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "XYZ Business OS — Multi-Tenant SaaS Enterprise Management Platform",
  description:
    "Unified Business Operating System — Online & Offline POS, Multi-Branch Inventory, Automated Double-Entry Accounting, HR, Payroll, and CRM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
