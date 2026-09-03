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
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-border/80 bg-card/40 backdrop-blur-xs my-4 select-none",
        className
      )}
    >
      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-3.5 border border-border/60 shadow-subtle-xs">
        <Icon className="h-6 w-6 text-foreground/70" />
      </div>
      <h4 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
        {title}
      </h4>
      <p className="mt-1 max-w-sm text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          size="sm"
          className="mt-4.5"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
