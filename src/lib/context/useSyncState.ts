import { useState, useEffect } from "react";
import { SyncQueueItem } from "../types";
import { storageService } from "../services/storage";
import { offlineDb } from "../db/dexie-db";

export function useSyncState(onSyncComplete?: () => void) {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    storageService.initOfflineDatabase();
    setSyncQueue(storageService.getSyncQueue());
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      }
    };
  }, []);

  const triggerManualSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);

    try {
      const queue = storageService.getSyncQueue();
      if (queue.length === 0) {
        setIsSyncing(false);
        return;
      }

      for (const item of queue) {
        storageService.updateSyncQueueItem(item.id, { status: "syncing" });
        await new Promise((res) => setTimeout(res, 500));
        storageService.updateSyncQueueItem(item.id, { status: "completed" });
      }

      if (offlineDb) {
        await offlineDb.syncQueue.clear();
      }
      storageService.clearCompletedSyncItems();
      setSyncQueue(storageService.getSyncQueue());
      onSyncComplete?.();
    } catch (e) {
      console.error("Sync error:", e);
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    isOnline,
    setIsOnline,
    syncQueue,
    setSyncQueue,
    isSyncing,
    triggerManualSync,
  };
}
