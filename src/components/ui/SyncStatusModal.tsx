"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import {
  X,
  RefreshCw,
  CheckCircle2,
  Clock,
  Wifi,
  WifiOff,
  Database,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "./Button";
import { formatCurrency } from "@/lib/utils";

export function SyncStatusModal() {
  const {
    isSyncModalOpen,
    setIsSyncModalOpen,
    isOnline,
    setIsOnline,
    syncQueue,
    isSyncing,
    triggerManualSync,
  } = useTenant();

  if (!isSyncModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-border/80 bg-card shadow-2xl overflow-hidden animate-fade-slide">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 p-5 bg-muted/20">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-2xl border ${
                isOnline
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200/60 dark:bg-emerald-950/60 dark:border-emerald-800/60"
                  : "bg-amber-50 text-amber-600 border-amber-200/60 dark:bg-amber-950/60 dark:border-amber-800/60"
              }`}
            >
              {isOnline ? (
                <Wifi className="h-5 w-5" />
              ) : (
                <WifiOff className="h-5 w-5" />
              )}
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
            onClick={() => setIsSyncModalOpen(false)}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Connectivity & Controls */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/80 shadow-subtle-xs">
            <div className="space-y-0.5">
              <div className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider">
                Simulate Network State
              </div>
              <div className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                <span>Current:</span>
                <span
                  className={
                    isOnline
                      ? "text-emerald-600 font-bold"
                      : "text-amber-600 font-bold"
                  }
                >
                  {isOnline ? "Connected (Online)" : "Disconnected (Offline)"}
                </span>
              </div>
            </div>
            <Button
              variant={isOnline ? "outline" : "subtle-emerald"}
              size="xs"
              onClick={() => setIsOnline(!isOnline)}
            >
              {isOnline ? "Switch to Offline" : "Switch to Online"}
            </Button>
          </div>

          {/* Sync Stats 3-Grid */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3.5 rounded-2xl border border-border/70 bg-card shadow-subtle-xs">
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Pending Queue
              </div>
              <div className="text-xl font-black text-foreground mt-1 font-mono">
                {syncQueue.length}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl border border-border/70 bg-card shadow-subtle-xs">
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Sync Engine
              </div>
              <div className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1 flex items-center justify-center gap-1">
                {isSyncing ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Syncing...
                  </>
                ) : (
                  "Ready"
                )}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl border border-border/70 bg-card shadow-subtle-xs">
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Local Store
              </div>
              <div className="text-xs sm:text-sm font-bold text-foreground mt-1 flex items-center justify-center gap-1">
                <Database className="h-3.5 w-3.5 text-indigo-500" /> Dexie.js
              </div>
            </div>
          </div>

          {/* Queue List */}
          <div>
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center justify-between px-1">
              <span>Pending Outbox Queue</span>
              <span className="font-mono">{syncQueue.length} items</span>
            </div>

            {syncQueue.length === 0 ? (
              <div className="py-7 text-center text-xs text-muted-foreground border border-dashed border-border/80 rounded-2xl bg-card/40">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto mb-1.5 opacity-90" />
                All transactions are fully synchronized with the server.
              </div>
            ) : (
              <div className="max-h-48 overflow-y-auto space-y-2">
                {syncQueue.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-muted/20 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-foreground flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {item.type.toUpperCase()}:{" "}
                        <span className="font-mono">
                          {item.payload?.invoiceNumber || item.id.slice(0, 8)}
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground font-mono">
                        Amount: {formatCurrency(item.payload?.grandTotal)} | Method:{" "}
                        {item.payload?.paymentMethod}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold text-amber-700 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/80 p-4 bg-muted/30">
          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsSyncModalOpen(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            size="xs"
            isLoading={isSyncing}
            onClick={triggerManualSync}
            disabled={!isOnline || syncQueue.length === 0}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Force Sync Now
          </Button>
        </div>
      </div>
    </div>
  );
}
