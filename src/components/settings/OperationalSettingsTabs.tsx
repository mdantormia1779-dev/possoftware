import React from "react";
import { SettingsTab } from "./settings.types";
import { TaxSettingsTab } from "./tabs/TaxSettingsTab";
import { HardwareSettingsTab } from "./tabs/HardwareSettingsTab";
import { NotificationsSettingsTab } from "./tabs/NotificationsSettingsTab";
import { IntegrationsSettingsTab } from "./tabs/IntegrationsSettingsTab";

interface OperationalSettingsTabsProps {
  activeTab: SettingsTab;
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
}

export function OperationalSettingsTabs(props: OperationalSettingsTabsProps) {
  const { activeTab } = props;

  if (activeTab === "tax_nbr") {
    return (
      <TaxSettingsTab
        taxNumber={props.formOrg.taxNumber}
        onTaxNumberChange={(v) => props.setFormOrg({ ...props.formOrg, taxNumber: v })}
        vatRate={props.vatRate}
        onVatRateChange={props.setVatRate}
        taxInclusive={props.taxInclusive}
        onTaxInclusiveChange={props.setTaxInclusive}
        mushakEnabled={props.mushakEnabled}
        onMushakEnabledChange={props.setMushakEnabled}
      />
    );
  }
  if (activeTab === "pos_hardware") {
    return (
      <HardwareSettingsTab
        receiptWidth={props.receiptWidth}
        onReceiptWidthChange={props.setReceiptWidth}
        offlineSyncInterval={props.offlineSyncInterval}
        onOfflineSyncIntervalChange={props.setOfflineSyncInterval}
        autoDrawerKick={props.autoDrawerKick}
        onAutoDrawerKickChange={props.setAutoDrawerKick}
        soundEffects={props.soundEffects}
        onSoundEffectsChange={props.setSoundEffects}
      />
    );
  }
  if (activeTab === "notifications") {
    return (
      <NotificationsSettingsTab
        smsProvider={props.smsProvider}
        onSmsProviderChange={props.setSmsProvider}
        smsSenderId={props.smsSenderId}
        onSmsSenderIdChange={props.setSmsSenderId}
        sendSaleSms={props.sendSaleSms}
        onSendSaleSmsChange={props.setSendSaleSms}
        sendDueSms={props.sendDueSms}
        onSendDueSmsChange={props.setSendDueSms}
      />
    );
  }
  if (activeTab === "integrations") {
    return <IntegrationsSettingsTab />;
  }
  return null;
}
