import React from "react";

interface NotificationsSettingsTabProps {
  smsProvider: string;
  onSmsProviderChange: (val: string) => void;
  smsSenderId: string;
  onSmsSenderIdChange: (val: string) => void;
  sendSaleSms: boolean;
  onSendSaleSmsChange: (val: boolean) => void;
  sendDueSms: boolean;
  onSendDueSmsChange: (val: boolean) => void;
}

export function NotificationsSettingsTab({
  smsProvider,
  onSmsProviderChange,
  smsSenderId,
  onSmsSenderIdChange,
  sendSaleSms,
  onSendSaleSmsChange,
  sendDueSms,
  onSendDueSmsChange,
}: NotificationsSettingsTabProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-subtle-xs space-y-6">
      <div className="border-b border-border pb-3">
        <h3 className="text-base font-extrabold text-foreground">
          SMS Gateway &amp; Automated Alerts
        </h3>
        <p className="text-xs text-muted-foreground">
          Direct SMS connection via Greenweb, SMS4BD, or Infobip
        </p>
      </div>

      <div className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">SMS Gateway Provider</label>
            <select
              value={smsProvider}
              onChange={(e) => onSmsProviderChange(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-border bg-background"
            >
              <option value="greenweb">Greenweb Bangladesh (Masking / Non-Masking)</option>
              <option value="sms4bd">SMS4BD Gateway</option>
              <option value="reve">REVE SMS Gateway</option>
              <option value="twilio">Twilio Global</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Masking Sender ID / Header</label>
            <input
              type="text"
              value={smsSenderId}
              onChange={(e) => onSmsSenderIdChange(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-border bg-background font-mono"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30 cursor-pointer">
            <input
              type="checkbox"
              checked={sendSaleSms}
              onChange={(e) => onSendSaleSmsChange(e.target.checked)}
              className="rounded border-border text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <p className="font-bold text-foreground">Send Instant E-Receipt SMS to Customer</p>
              <p className="text-[11px] text-muted-foreground">
                e.g. &ldquo;Dear Customer, thanks for shopping at Rahman Fashion. Bill: ৳2,450.&rdquo;
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30 cursor-pointer">
            <input
              type="checkbox"
              checked={sendDueSms}
              onChange={(e) => onSendDueSmsChange(e.target.checked)}
              className="rounded border-border text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <p className="font-bold text-foreground">Send Due Reminder SMS Automatically</p>
              <p className="text-[11px] text-muted-foreground">
                Dispatched 2 days before payment promised date with bKash merchant pay link
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
