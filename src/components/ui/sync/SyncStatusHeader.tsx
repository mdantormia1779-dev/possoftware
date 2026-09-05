import React from "react";
import { X, Wifi, WifiOff } from "lucide-react";
import { Button } from "../Button";

interface SyncStatusHeaderProps {
  isOnline: boolean;
  onToggleOnline: () => void;
  onClose: () => void;
}

export function SyncStatusHeader({
  isOnline,
  onToggleOnline,
  onClose,
}: SyncStatusHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-border/80 p-5 bg-muted/20">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-2xl border ${
              isOnline
                ? "bg-emerald-50 text-emerald-600 border-emerald-200/60 dark:bg-emerald-950/60 dark:border-emerald-800/60"
                : "bg-amber-50 text-amber-600 border-amber-200/60 dark:bg-amber-950/60 dark:border-amber-800/60"
            }`}
          >
            {isOnline ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
          </div>
          <div>
            <h3 className="font-bold text-foreground text-sm sm:text-base tracking-tight">
              Offline Sync & Outbox Engine
            </h3>
            <p className="text-xs text-muted-foreground">
              {isOnline
                ? "Device Online — Dexie.js auto-sync active"
                : "Offline Active — Transactions saved to IndexedDB"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/80 shadow-subtle-xs">
        <div className="space-y-0.5">
          <div className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider">
            Simulate Network State
          </div>
          <div className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
            <span>Current:</span>
            <span className={isOnline ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
              {isOnline ? "Connected (Online)" : "Disconnected (Offline)"}
            </span>
          </div>
        </div>
        <Button
          variant={isOnline ? "outline" : "subtle-emerald"}
          size="xs"
          onClick={onToggleOnline}
        >
          {isOnline ? "Switch to Offline" : "Switch to Online"}
        </Button>
      </div>
    </>
  );
}
