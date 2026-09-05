import React from "react";
import { Badge } from "./Badge";

const SUCCESS_STATUSES = ["active", "completed", "received", "approved", "paid", "present", "online", "in_stock"];
const WARNING_STATUSES = ["pending", "ordered", "draft", "late", "processing", "trial", "partially_received", "low_stock", "refunded", "returned"];
const DESTRUCTIVE_STATUSES = ["failed", "absent", "expired", "past_due", "terminated", "out_of_stock"];
const INFO_STATUSES = ["in_transit", "reserved", "dispatched"];
const INDIGO_STATUSES = ["held", "on_leave", "half_day"];

export function StatusBadge({ status, withDot = true }: { status: string; withDot?: boolean }) {
  const normalized = status.toLowerCase().replace(/_/g, " ");
  const lower = status.toLowerCase();

  let variant: "success" | "warning" | "destructive" | "info" | "indigo" | "secondary" = "secondary";

  if (SUCCESS_STATUSES.includes(lower)) variant = "success";
  else if (WARNING_STATUSES.includes(lower)) variant = "warning";
  else if (DESTRUCTIVE_STATUSES.includes(lower)) variant = "destructive";
  else if (INFO_STATUSES.includes(lower)) variant = "info";
  else if (INDIGO_STATUSES.includes(lower)) variant = "indigo";

  return (
    <Badge variant={variant} withDot={withDot} className="capitalize">
      {normalized}
    </Badge>
  );
}
