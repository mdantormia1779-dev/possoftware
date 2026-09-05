import React from "react";
import { WifiOff } from "lucide-react";

interface PosBannerProps {
  isOnline: boolean;
  syncQueueLength: number;
  onOpenSync: () => void;
}

export function PosBanner({ isOnline, syncQueueLength, onOpenSync }: PosBannerProps) {
  if (isOnline) return null;

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between shadow-subtle-xs">
      <div className="flex items-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span>
          Offline POS Active — Sales are saving locally to Dexie.js (IndexedDB). Zero disruption to checkout.
        </span>
      </div>
      <button
        onClick={onOpenSync}
        className="underline text-xs font-extrabold hover:text-black cursor-pointer"
      >
        View Outbox Queue ({syncQueueLength})
      </button>
    </div>
  );
}
