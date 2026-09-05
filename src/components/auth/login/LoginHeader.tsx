import React from "react";

export function LoginHeader() {
  return (
    <div className="text-center space-y-2">
      <div className="h-11 w-11 mx-auto rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-subtle-sm">
        X
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
        Sign In to XYZ Business OS
      </h1>
      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
        Access your POS terminal, inventory, double-entry accounting, and multi-branch network
      </p>
    </div>
  );
}
