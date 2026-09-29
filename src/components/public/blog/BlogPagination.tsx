"use client";

import React from "react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps): React.JSX.Element | null {
  if (totalPages <= 1) return null;

  const handlePageSelect = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <div className="mt-14 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => handlePageSelect(Math.max(currentPage - 1, 1))}
        className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-800 dark:text-slate-400"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => handlePageSelect(page)}
            className={`h-9 w-9 rounded-lg text-xs font-semibold transition ${
              isActive
                ? "bg-[#005bd4] text-white shadow-sm"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageSelect(Math.min(currentPage + 1, totalPages))}
        className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-800 dark:text-slate-400"
      >
        Next
      </button>
    </div>
  );
}