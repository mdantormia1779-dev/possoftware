import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "XYZ Business OS — Multi-Tenant SaaS Business Management Platform",
  description:
    "একটা Login, পুরো Business Control — Online ও Offline, দুই অবস্থায়ই। POS, Inventory, Accounting, HR, Payroll ও CRM for Bangladeshi SMBs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
