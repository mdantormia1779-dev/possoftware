"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      window.location.href = "/blog";
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="group inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
    >
      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
      <span>Back to Articles</span>
    </button>
  );
}