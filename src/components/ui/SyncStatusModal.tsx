"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { RefreshCw } from "lucide-react";
import { Button } from "./Button";
import { SyncStatusHeader } from "./sync/SyncStatusHeader";
import { SyncStatusStats } from "./sync/SyncStatusStats";
import { SyncQueueList } from "./sync/SyncQueueList";

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
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-border/80 bg-card shadow-2xl overflow-hidden animate-fade-slide">
        <SyncStatusHeader
          isOnline={isOnline}
          onToggleOnline={() => setIsOnline(!isOnline)}
          onClose={() => setIsSyncModalOpen(false)}
        />

        <div className="p-5 pt-0 space-y-4">
          <SyncStatusStats queueCount={syncQueue.length} isSyncing={isSyncing} />
          <SyncQueueList queue={syncQueue} />
        </div>

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
