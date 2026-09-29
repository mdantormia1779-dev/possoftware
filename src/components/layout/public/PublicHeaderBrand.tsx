import React from "react";
import Link from "next/link";
import { Store } from "lucide-react";

export function PublicHeaderBrand(): React.JSX.Element {
  return (
    <Link
      href="/"
      aria-label="XYZ Business OS home"
      className={[
        "group flex shrink-0 select-none items-center gap-3 rounded-xl",
        "transition-transform duration-200 ease-out active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      ].join(" ")}
    >
      {/* Logo mark */}
      <div
        className={[
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          "bg-blue-600 text-white",
          "transition-colors duration-200 group-hover:bg-blue-500",
        ].join(" ")}
      >
        <Store className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center">
        <span className="block text-[15px] font-bold leading-tight tracking-tight text-foreground">
          XYZ Business OS
        </span>

        <span className="mt-0.5 hidden text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-muted-foreground sm:block">
          Offline-First SaaS Platform
        </span>
      </div>
    </Link>
  );
}