import React from "react";

interface PasswordGuidelinesProps {
  hasMinLength: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export function PasswordGuidelines({
  hasMinLength,
  hasNumber,
  hasSpecial,
}: PasswordGuidelinesProps) {
  return (
    <div className="p-3 rounded-xl bg-muted/50 border border-border space-y-1.5 text-[11px]">
      <p className="font-semibold text-foreground">Password strength guidelines:</p>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className={`h-1.5 w-1.5 rounded-full ${hasMinLength ? "bg-emerald-500" : "bg-muted-foreground"}`} />
        <span className={hasMinLength ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}>
          At least 8 characters
        </span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className={`h-1.5 w-1.5 rounded-full ${hasNumber ? "bg-emerald-500" : "bg-muted-foreground"}`} />
        <span className={hasNumber ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}>
          Contains at least one number
        </span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className={`h-1.5 w-1.5 rounded-full ${hasSpecial ? "bg-emerald-500" : "bg-muted-foreground"}`} />
        <span className={hasSpecial ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}>
          Contains special characters (optional)
        </span>
      </div>
    </div>
  );
}
