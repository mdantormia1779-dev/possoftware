import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-border bg-card/50 my-4",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/80 text-muted-foreground mb-4">
        <Icon className="h-7 w-7" />
      </div>
      <h4 className="text-base font-semibold text-foreground">{title}</h4>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="sm" className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
