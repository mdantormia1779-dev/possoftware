import React from "react";

export function SolutionsHeader() {
  return (
    <div className="text-center space-y-4 max-w-3xl mx-auto">
      <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        Industry Tailored Solutions
      </span>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
        Engineered For Your Specific Business Type
      </h1>
      <p className="text-base text-muted-foreground">
        Whether you run a fast-paced supermarket, a multi-branch fashion boutique, or an electronics store, XYZ Business OS adapts to your exact workflow.
      </p>
    </div>
  );
}
