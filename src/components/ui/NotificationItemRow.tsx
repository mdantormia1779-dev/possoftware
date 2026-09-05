import React from "react";
import Link from "next/link";
import { AlertTriangle, DollarSign, RefreshCw, CheckCircle2, ChevronRight } from "lucide-react";

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  link?: string;
}

interface NotificationItemRowProps {
  notification: NotificationItem;
  onMarkRead: (id: string) => void;
  onClose: () => void;
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "low_stock":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case "sale_completed":
      return <DollarSign className="h-4 w-4 text-emerald-500" />;
    case "sync_alert":
      return <RefreshCw className="h-4 w-4 text-indigo-500" />;
    default:
      return <CheckCircle2 className="h-4 w-4 text-indigo-500" />;
  }
}

export function NotificationItemRow({
  notification: n,
  onMarkRead,
  onClose,
}: NotificationItemRowProps) {
  return (
    <div
      onClick={() => onMarkRead(n.id)}
      className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
        n.isRead
          ? "border-border/60 bg-card/40 opacity-75 hover:opacity-100"
          : "border-indigo-200/80 bg-indigo-50/40 dark:border-indigo-900/60 dark:bg-indigo-950/20 shadow-subtle-xs"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-background border border-border/60 mt-0.5 shrink-0 shadow-subtle-xs">
          {getNotificationIcon(n.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="text-xs font-bold text-foreground truncate">{n.title}</h4>
            <span className="text-[10px] text-muted-foreground shrink-0 font-mono">{n.time}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{n.message}</p>
          {n.link && (
            <Link
              href={n.link}
              onClick={onClose}
              className="mt-2 inline-flex items-center text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View Details <ChevronRight className="h-3 w-3 ml-0.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
