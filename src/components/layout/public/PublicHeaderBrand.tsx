import React from "react";
import Link from "next/link";

export function PublicHeaderBrand() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 select-none">
      <div className="h-8.5 w-8.5 sm:h-9 sm: px-2  rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-md shadow-indigo-500/20 shrink-0">
        X
      </div>
      <div>
        <span className="font-extrabold text-sm sm:text-base tracking-tight text-foreground block leading-tight">
          XYZ Business OS
        </span>
        <span className="hidden sm:block text-[10px] text-muted-foreground font-medium leading-none mt-0.5">
          Offline-First SaaS Platform
        </span>
      </div>
    </Link>
  );
}
