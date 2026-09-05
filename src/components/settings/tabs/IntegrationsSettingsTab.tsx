import React from "react";
import { IntegrationCard } from "./IntegrationCard";

export function IntegrationsSettingsTab() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-subtle-xs space-y-6">
      <div className="border-b border-border pb-3">
        <h3 className="text-base font-extrabold text-foreground">
          Payment Gateways &amp; Courier APIs
        </h3>
        <p className="text-xs text-muted-foreground">
          Connect local Bangladeshi financial and logistics infrastructure
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <IntegrationCard
          initials="bK"
          avatarBg="bg-pink-600"
          title="bKash Merchant API"
          description="Dynamic counter QR codes"
          status="Connected"
          buttonText="Configure Merchant Secret"
        />
        <IntegrationCard
          initials="NG"
          avatarBg="bg-orange-600"
          title="Nagad Direct Pay"
          description="Fast wallet checkout"
          status="Connected"
          buttonText="Configure Public Key"
        />
        <IntegrationCard
          initials="SF"
          avatarBg="bg-emerald-600"
          title="Steadfast Courier"
          description="Automated parcel consignment"
          status="Active"
          buttonText="API Webhook Settings"
        />
        <IntegrationCard
          initials="PT"
          avatarBg="bg-red-600"
          title="Pathao Courier"
          description="Same-day Dhaka delivery"
          status="Not Linked"
          buttonText="Connect Pathao Store ID"
        />
      </div>
    </div>
  );
}
