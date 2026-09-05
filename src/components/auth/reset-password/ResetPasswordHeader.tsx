import React from "react";
import { Lock } from "lucide-react";

export function ResetPasswordHeader() {
  return (
    <div className="text-center space-y-2">
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-1">
        <Lock className="h-6 w-6" />
      </div>
      <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
        Create New Password
      </h1>
      <p className="text-xs text-muted-foreground">
        Set a secure password for your XYZ Business OS account
      </p>
    </div>
  );
}
