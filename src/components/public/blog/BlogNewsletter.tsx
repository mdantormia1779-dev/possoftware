import React from "react";

export function BlogNewsletter() {
  return (
    <div className="p-8 sm:p-10 rounded-3xl border border-border bg-muted/40 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="space-y-2">
        <h4 className="text-lg font-bold text-foreground">
          Get Weekly Business Management Tips For Bangladesh
        </h4>
        <p className="text-xs text-muted-foreground">
          Join 4,200+ entrepreneurs receiving insights on inventory optimization, retail automation, and tax compliance.
        </p>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          className="px-4 py-2.5 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
        />
        <button
          type="button"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 transition-colors"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
