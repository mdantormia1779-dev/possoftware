import React from "react";
import Link from "next/link";
import { AlertTriangle, DollarSign, RefreshCw, CheckCircle2, ChevronRight, Pencil, Trash2, X } from "lucide-react";
import { NotificationItem } from "@/types";

interface NotificationItemRowProps {
  notification: NotificationItem;
  currentUserId?: string;
  onMarkRead: (id: string) => void;
  onClose?: () => void;
  onEdit?: (notification: NotificationItem) => void;
  onDelete?: (id: string) => void;
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "low_stock": return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case "sale_completed": return <DollarSign className="h-4 w-4 text-emerald-500" />;
    case "sync_alert": return <RefreshCw className="h-4 w-4 text-indigo-500" />;
    default: return <CheckCircle2 className="h-4 w-4 text-indigo-500" />;
  }
}

export function NotificationItemRow({
  notification: n, currentUserId, onMarkRead, onClose, onEdit, onDelete,
}: NotificationItemRowProps) {
  const isCreator = !n.createdBy || !currentUserId || n.createdBy === currentUserId;

  return (
    <div
      onClick={() => onMarkRead(n.id)}
      className={`group p-3 rounded-2xl border transition-all cursor-pointer select-none relative ${
        n.isRead ? "border-border/60 bg-card/40 opacity-75 hover:opacity-100"
          : "border-indigo-200/80 bg-indigo-50/40 dark:border-indigo-900/60 dark:bg-indigo-950/20 shadow-subtle-xs"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div className="p-2 rounded-xl bg-background border border-border/60 mt-0.5 shrink-0 shadow-subtle-xs">
          {getNotificationIcon(n.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5 truncate">
              <h4 className="text-xs font-bold text-foreground truncate">{n.title}</h4>
              {n.targetRole && n.targetRole !== "all" && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-muted text-muted-foreground uppercase shrink-0">
                  {n.targetRole.replace("_", " ")}
                </span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground shrink-0 font-mono">{n.time || "Recent"}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{n.message}</p>
          <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/40">
            <div className="flex items-center gap-2">
              {n.link && (
                <Link href={n.link} onClick={onClose} className="inline-flex items-center text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Details <ChevronRight className="h-3 w-3 ml-0.5" />
                </Link>
              )}
              {n.createdByName && !isCreator && (
                <span className="text-[9px] text-muted-foreground italic">By {n.createdByName}</span>
              )}
            </div>
            <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
              {isCreator && onEdit && (
                <button type="button" title="Edit Notification" onClick={(e) => { e.stopPropagation(); onEdit(n); }}
                  className="p-1 rounded-md text-muted-foreground hover:text-indigo-600 hover:bg-muted">
                  <Pencil className="h-3 w-3" />
                </button>
              )}
              {onDelete && (
                <button type="button" title={isCreator ? "Delete Alert" : "Clear for me"} onClick={(e) => { e.stopPropagation(); onDelete(n.id); }}
                  className="p-1 rounded-md text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40">
                  {isCreator ? <Trash2 className="h-3 w-3" /> : <X className="h-3 w-3" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

