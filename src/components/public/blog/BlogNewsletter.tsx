import React from "react";
import Link from "next/link";

export function BlogNewsletter(): React.JSX.Element {
  return (
    <section
      aria-labelledby="blog-cta-heading"
      className="relative isolate overflow-hidden rounded-3xl bg-[#005bd3] px-6 py-16 text-center text-white sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 -z-10 size-72 rounded-full bg-cyan-400/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 -z-10 size-80 rounded-full bg-blue-300/30 blur-3xl"
      />

      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold">
          14-day free trial · No credit card required
        </span>

        <h2
          id="blog-cta-heading"
          className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Get insights delivered to your inbox.
        </h2>

        <p className="mt-3 text-base text-blue-100">
          Product updates, growth tips and industry news, once a month, no spam.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/register"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#005bd3]"
          >
            Start Free Trial
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#005bd3]"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}