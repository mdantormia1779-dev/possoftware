import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ResetPasswordSuccess() {
  return (
    <div className="text-center py-6 space-y-4">
      <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-foreground">Password Reset Successfully</h3>
      <p className="text-xs text-muted-foreground max-w-xs mx-auto">
        Your new password has been securely updated. You can now log into your business workspace.
      </p>
      <div className="pt-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          <span>Proceed to Sign In</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
