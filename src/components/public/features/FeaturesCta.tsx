import Link from "next/link";
import { Sparkles } from "lucide-react";
import { CTA } from "./features-content";

export function FeaturesCta() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-blue-700 px-6 py-16 text-center">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-blue-400/30 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white">
              <Sparkles className="h-3.5 w-3.5" />
              {CTA.badge}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {CTA.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-blue-100 sm:text-base">
              {CTA.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={CTA.primary.href}
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-800 transition-colors hover:bg-blue-50"
              >
                {CTA.primary.label}
              </Link>
              <Link
                href={CTA.secondary.href}
                className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {CTA.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}