import React from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface SyncQueueItem {
  id: string;
  type: string;
  payload: any;
  status: string;
}

interface SyncQueueListProps {
  queue: SyncQueueItem[];
}

export function SyncQueueList({ queue }: SyncQueueListProps) {
  return (
    <div>
      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center justify-between px-1">
        <span>Pending Outbox Queue</span>
        <span className="font-mono">{queue.length} items</span>
      </div>

      {queue.length === 0 ? (
        <div className="py-7 text-center text-xs text-muted-foreground border border-dashed border-border/80 rounded-2xl bg-card/40">
          <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto mb-1.5 opacity-90" />
          All transactions are fully synchronized with the server.
        </div>
      ) : (
        <div className="max-h-48 overflow-y-auto space-y-2">
          {queue.map((item) => (
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
  );
}
