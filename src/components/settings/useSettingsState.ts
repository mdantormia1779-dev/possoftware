import { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { SettingsTab } from "./settings.types";

export function useSettingsState() {
  const { currentOrg, setCurrentOrg, branches } = useTenant();
  const [activeTab, setActiveTab] = useState<SettingsTab>("company");
  const [savedToast, setSavedToast] = useState(false);

  const [formOrg, setFormOrg] = useState({
    name: currentOrg.name,
    businessType: currentOrg.businessType,
    phone: currentOrg.phone,
    email: currentOrg.email,
    address: currentOrg.address,
    taxNumber: currentOrg.taxNumber || "BIN-002938475-0101",
    receiptFooterMessage:
      currentOrg.receiptFooterMessage || "ধন্যবাদ! আবার আসবেন। Change/Exchange within 7 days with bill.",
    themePrimaryColor: currentOrg.themePrimaryColor || "#4f46e5",
  });

  const [vatRate, setVatRate] = useState("7.5");
  const [taxInclusive, setTaxInclusive] = useState(true);
  const [mushakEnabled, setMushakEnabled] = useState(true);

  const [receiptWidth, setReceiptWidth] = useState<"80mm" | "58mm">("80mm");
  const [autoDrawerKick, setAutoDrawerKick] = useState(true);
  const [offlineSyncInterval, setOfflineSyncInterval] = useState("2");
  const [soundEffects, setSoundEffects] = useState(true);

  const [smsSenderId, setSmsSenderId] = useState("XYZ-POS");
  const [smsProvider, setSmsProvider] = useState("greenweb");
  const [sendSaleSms, setSendSaleSms] = useState(true);
  const [sendDueSms, setSendDueSms] = useState(true);

  const [permissions, setPermissions] = useState({
    cashierDiscount: true,
    cashierPriceOverride: false,
    cashierViewProfit: false,
    cashierVoidBill: false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...currentOrg,
      ...formOrg,
    };
    storageService.updateOrganization(updated);
    setCurrentOrg(updated);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return {
    branches,
    activeTab,
    setActiveTab,
    savedToast,
    formOrg,
    setFormOrg,
    vatRate,
    setVatRate,
    taxInclusive,
    setTaxInclusive,
    mushakEnabled,
    setMushakEnabled,
    receiptWidth,
    setReceiptWidth,
    autoDrawerKick,
    setAutoDrawerKick,
    offlineSyncInterval,
    setOfflineSyncInterval,
    soundEffects,
    setSoundEffects,
    smsSenderId,
    setSmsSenderId,
    smsProvider,
    setSmsProvider,
    sendSaleSms,
    setSendSaleSms,
    sendDueSms,
    setSendDueSms,
    permissions,
    setPermissions,
    handleSave,
  };
}
