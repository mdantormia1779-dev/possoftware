"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { X, RefreshCw, CheckCircle2, AlertCircle, Clock, Wifi, WifiOff } from "lucide-react";
import { Button } from "./Button";
import { formatDate, formatCurrency } from "@/lib/utils";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isOnline ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60" : "bg-amber-50 text-amber-600 dark:bg-amber-950/60"}`}>
              {isOnline ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base">Offline Sync & Outbox Monitor</h3>
              <p className="text-xs text-muted-foreground">
                {isOnline ? "Device is Online — Auto-syncing active" : "Offline Mode — Sales saved locally in Dexie.js"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSyncModalOpen(false)}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Connectivity & Controls */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/40 border border-border">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Simulate Network State</div>
              <div className="text-sm font-medium text-foreground">
                Current: <span className={isOnline ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>{isOnline ? "Connected (Online)" : "Disconnected (Offline)"}</span>
              </div>
            </div>
            <Button
              variant={isOnline ? "outline" : "success"}
              size="sm"
              onClick={() => setIsOnline(!isOnline)}
            >
              {isOnline ? "Go Offline" : "Go Online"}
            </Button>
          </div>

          {/* Sync Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground">Pending Queue</div>
              <div className="text-xl font-bold text-foreground mt-1">{syncQueue.length}</div>
            </div>
            <div className="p-3 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground">Sync Engine</div>
              <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                {isSyncing ? "Syncing..." : "Ready"}
              </div>
            </div>
            <div className="p-3 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground">Local Store</div>
              <div className="text-sm font-semibold text-foreground mt-1">IndexedDB</div>
            </div>
          </div>

          {/* Queue List */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Pending Outbox Queue</span>
              <span>{syncQueue.length} items</span>
            </div>

            {syncQueue.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground border border-dashed border-border rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto mb-1.5 opacity-80" />
                All local transactions are completely synced with the cloud.
              </div>
            ) : (
              <div className="max-h-48 overflow-y-auto space-y-2">
                {syncQueue.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/20 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {item.type.toUpperCase()}: {item.payload?.invoiceNumber || item.id.slice(0, 8)}
                      </div>
                      <div className="text-muted-foreground">
                        Amount: {formatCurrency(item.payload?.grandTotal)} | Method: {item.payload?.paymentMethod}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-amber-700 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 font-medium">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border p-4 bg-muted/20">
          <Button variant="outline" size="sm" onClick={() => setIsSyncModalOpen(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            isLoading={isSyncing}
            onClick={triggerManualSync}
            disabled={!isOnline || syncQueue.length === 0}
          >
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Sync Now
          </Button>
        </div>
      </div>
    </div>
  );
}
