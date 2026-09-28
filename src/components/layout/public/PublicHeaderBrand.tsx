import React from "react";
import Link from "next/link";

export function PublicHeaderBrand(): React.JSX.Element {
  return (
    <Link
      href="/"
      aria-label="XYZ Business OS home"
      className={[
        "group relative flex shrink-0 select-none items-center gap-2.5 rounded-xl",
        "transition-transform duration-300 ease-out active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      ].join(" ")}
    >
      {/* Logo mark */}
      <div className="relative shrink-0">
        {/* Glow behind logo (hover e ashe) */}
        <div
          aria-hidden="true"
          className={[
            "absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400",
            "opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60",
          ].join(" ")}
        />

        {/* Main box */}
        <div
          className={[
            "relative flex size-9 items-center justify-center overflow-hidden rounded-xl sm:size-10",
            "bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400",
            "text-lg font-black text-white sm:text-xl",
            "shadow-md shadow-indigo-500/25 ring-1 ring-white/20",
            "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:-rotate-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-500/40",
            "motion-reduce:transition-none motion-reduce:group-hover:transform-none",
          ].join(" ")}
        >
          {/* Shine sweep */}
          <span
            aria-hidden="true"
            className={[
              "absolute inset-y-0 -left-full w-full skew-x-[-20deg]",
              "bg-gradient-to-r from-transparent via-white/50 to-transparent",
              "transition-transform duration-700 ease-out group-hover:translate-x-[250%]",
            ].join(" ")}
          />
          <span className="relative transition-transform duration-500 group-hover:scale-110">
            X
          </span>
        </div>

        {/* Live / online dot */}
        <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
          <span
            aria-hidden="true"
            className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none"
          />
          <span className="relative inline-flex size-2.5 rounded-full border-2 border-background bg-emerald-500" />
        </span>
      </div>

      {/* Text */}
      <div className="relative">
        <span
          className={[
            "block text-sm font-extrabold leading-tight tracking-tight text-foreground sm:text-base",
            "transition-all duration-300",
            "group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-cyan-400",
            "group-hover:bg-clip-text group-hover:text-transparent",
          ].join(" ")}
        >
          XYZ Business OS
        </span>

        <span
          className={[
            "mt-0.5 hidden text-[10px] font-medium leading-none text-muted-foreground sm:block",
            "transition-all duration-300 group-hover:translate-x-0.5 group-hover:tracking-wider",
          ].join(" ")}
        >
          Offline-First SaaS Platform
        </span>

        {/* Animated underline */}
        <span
          aria-hidden="true"
          className={[
            "absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full",
            "bg-gradient-to-r from-indigo-500 to-cyan-400",
            "transition-transform duration-500 ease-out group-hover:scale-x-100",
          ].join(" ")}
        />
      </div>
    </Link>
  );
}