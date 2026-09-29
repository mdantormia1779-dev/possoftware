"use client";

import React from "react";

interface BlogEmptyStateProps {
  onReset: () => void;
}

export function BlogEmptyState({ onReset }: BlogEmptyStateProps): React.JSX.Element {
  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-dashed border-slate-200 p-12 text-center dark:border-slate-800">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <p className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
        No articles found
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Try a different keyword or category.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-xl bg-[#005bd4] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0648a8]"
      >
        Reset Filters
      </button>
    </div>
  );
}