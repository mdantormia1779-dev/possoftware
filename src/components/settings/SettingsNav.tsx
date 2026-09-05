import React from "react";
import {
  Building,
  Palette,
  Store,
  Shield,
  Percent,
  Cpu,
  Bell,
  Smartphone,
  CreditCard,
} from "lucide-react";
import { SettingsTab, SettingsTabItem } from "./settings.types";

const NAV_TABS: SettingsTabItem[] = [
  { id: "company", label: "Business Profile", icon: Building },
  { id: "branding", label: "Branding & Print", icon: Palette },
  { id: "branches", label: "Branches", icon: Store },
  { id: "users_rbac", label: "Roles & Permissions", icon: Shield },
  { id: "tax_nbr", label: "NBR VAT & Tax", icon: Percent },
  { id: "pos_hardware", label: "POS & Hardware", icon: Cpu },
  { id: "notifications", label: "SMS & Alerts", icon: Bell },
  { id: "integrations", label: "Courier & Payments", icon: Smartphone },
  { id: "subscription", label: "Plan & Billing", icon: CreditCard },
];

interface SettingsNavProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export function SettingsNav({ activeTab, onTabChange }: SettingsNavProps) {
  return (
    <div className="md:col-span-3 rounded-2xl border border-border bg-card p-2 space-y-1 shadow-subtle-xs">
      {NAV_TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
              isActive
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
