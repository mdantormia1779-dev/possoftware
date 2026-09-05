import { LucideIcon } from "lucide-react";

export type SettingsTab =
  | "company"
  | "branding"
  | "branches"
  | "users_rbac"
  | "tax_nbr"
  | "pos_hardware"
  | "notifications"
  | "integrations"
  | "subscription";

export interface SettingsTabItem {
  id: SettingsTab;
  label: string;
  icon: LucideIcon;
}
