import React from "react";

export function BlogHeader() {
  return (
    <div className="text-center space-y-4 max-w-3xl mx-auto">
      <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        Knowledge &amp; Insights
      </span>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
        XYZ Business OS Insights
      </h1>
      <p className="text-base text-muted-foreground">
        Practical strategies, tax compliance playbooks, and modern technology guides for ambitious Bangladeshi business owners.
      </p>
    </div>
  );
}
