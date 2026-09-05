import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function RegisterFooter() {
  return (
    <div className="text-center pt-4 border-t border-border/70 text-xs text-muted-foreground mt-5">
      Already have an account?{" "}
      <Link
        href="/login"
        className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
      >
        <span>Sign In to Business</span>
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
