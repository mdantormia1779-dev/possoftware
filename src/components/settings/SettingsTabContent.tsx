import React from "react";
import { SettingsTab } from "./settings.types";
import { CompanySettingsTab } from "./tabs/CompanySettingsTab";
import { BrandingSettingsTab } from "./tabs/BrandingSettingsTab";
import { BranchesSettingsTab } from "./tabs/BranchesSettingsTab";
import { RbacSettingsTab } from "./tabs/RbacSettingsTab";
import { SubscriptionSettingsTab } from "./tabs/SubscriptionSettingsTab";
import { OperationalSettingsTabs } from "./OperationalSettingsTabs";
import { Branch } from "@/types";

interface SettingsTabContentProps {
  activeTab: SettingsTab;
  branches: Branch[];
  formOrg: any;
  setFormOrg: (val: any) => void;
  vatRate: string;
  setVatRate: (val: string) => void;
  taxInclusive: boolean;
  setTaxInclusive: (val: boolean) => void;
  mushakEnabled: boolean;
  setMushakEnabled: (val: boolean) => void;
  receiptWidth: "80mm" | "58mm";
  setReceiptWidth: (val: "80mm" | "58mm") => void;
  offlineSyncInterval: string;
  setOfflineSyncInterval: (val: string) => void;
  autoDrawerKick: boolean;
  setAutoDrawerKick: (val: boolean) => void;
  soundEffects: boolean;
  setSoundEffects: (val: boolean) => void;
  smsSenderId: string;
  setSmsSenderId: (val: string) => void;
  smsProvider: string;
  setSmsProvider: (val: string) => void;
  sendSaleSms: boolean;
  setSendSaleSms: (val: boolean) => void;
  sendDueSms: boolean;
  setSendDueSms: (val: boolean) => void;
  permissions: any;
  setPermissions: (val: any) => void;
}

export function SettingsTabContent(props: SettingsTabContentProps) {
  const { activeTab } = props;

  if (activeTab === "company") {
    return <CompanySettingsTab formOrg={props.formOrg} setFormOrg={props.setFormOrg} />;
  }
  if (activeTab === "branding") {
    return <BrandingSettingsTab formOrg={props.formOrg} setFormOrg={props.setFormOrg} />;
  }
  if (activeTab === "branches") {
    return <BranchesSettingsTab branches={props.branches} />;
  }
  if (activeTab === "users_rbac") {
    return <RbacSettingsTab permissions={props.permissions} setPermissions={props.setPermissions} />;
  }
  if (activeTab === "subscription") {
    return <SubscriptionSettingsTab />;
  }

  return <OperationalSettingsTabs {...props} />;
}
