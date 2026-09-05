import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LoginFooter() {
  return (
    <div className="text-center pt-3 border-t border-border text-xs text-muted-foreground">
      Don&apos;t have an account?{" "}
      <Link
        href="/register"
        className="font-bold text-primary hover:underline inline-flex items-center gap-0.5 ml-1"
      >
        <span>Start Free Trial</span>
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
