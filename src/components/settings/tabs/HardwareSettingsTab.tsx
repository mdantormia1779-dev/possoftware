import React from "react";

interface HardwareSettingsTabProps {
  receiptWidth: "80mm" | "58mm";
  onReceiptWidthChange: (val: "80mm" | "58mm") => void;
  offlineSyncInterval: string;
  onOfflineSyncIntervalChange: (val: string) => void;
  autoDrawerKick: boolean;
  onAutoDrawerKickChange: (val: boolean) => void;
  soundEffects: boolean;
  onSoundEffectsChange: (val: boolean) => void;
}

export function HardwareSettingsTab({
  receiptWidth,
  onReceiptWidthChange,
  offlineSyncInterval,
  onOfflineSyncIntervalChange,
  autoDrawerKick,
  onAutoDrawerKickChange,
  soundEffects,
  onSoundEffectsChange,
}: HardwareSettingsTabProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-subtle-xs space-y-6">
      <div className="border-b border-border pb-3">
        <h3 className="text-base font-extrabold text-foreground">
          POS Terminal &amp; Hardware Integration
        </h3>
        <p className="text-xs text-muted-foreground">
          ESC/POS thermal printers, barcode scanners, and cash drawers
        </p>
      </div>

      <div className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Thermal Receipt Paper Width</label>
            <select
              value={receiptWidth}
              onChange={(e) => onReceiptWidthChange(e.target.value as any)}
              className="w-full h-9 px-3 rounded-xl border border-border bg-background"
            >
              <option value="80mm">80mm (Standard Desktop Thermal Printer)</option>
              <option value="58mm">58mm (Compact / Mobile Bluetooth Printer)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Offline Sync Frequency</label>
            <select
              value={offlineSyncInterval}
              onChange={(e) => onOfflineSyncIntervalChange(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-border bg-background"
            >
              <option value="1">Every 1 Minute (Fast broadband)</option>
              <option value="2">Every 2 Minutes (Recommended)</option>
              <option value="5">Every 5 Minutes (Mobile 4G data saver)</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30 cursor-pointer">
            <input
              type="checkbox"
              checked={autoDrawerKick}
              onChange={(e) => onAutoDrawerKickChange(e.target.checked)}
              className="rounded border-border text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <p className="font-bold text-foreground">Kick Electronic Cash Drawer on Cash Sale</p>
              <p className="text-[11px] text-muted-foreground">
                Sends standard RJ11 pulse 27,112,0,50 to cash drawer upon printing receipt
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30 cursor-pointer">
            <input
              type="checkbox"
              checked={soundEffects}
              onChange={(e) => onSoundEffectsChange(e.target.checked)}
              className="rounded border-border text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <p className="font-bold text-foreground">Play Audio Chime on Barcode Scan</p>
              <p className="text-[11px] text-muted-foreground">
                Audible positive feedback prevents scanning double items unintentionally
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
