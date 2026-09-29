import React from "react";
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function BlogArticleNotFound() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-24 text-center sm:px-6">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfeafc] dark:bg-blue-950/50">
        <FileQuestion
          className="h-7 w-7 text-[#0a60d9] dark:text-blue-400"
          aria-hidden="true"
        />
      </div>
      <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
        Article Not Found
      </h1>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
        The article you&apos;re looking for may have been moved or is no longer
        available.
      </p>
      <Link
        href="/blog"
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0a60d9] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0648a8]"
      >
        Back to Blog
      </Link>
    </main>
  );
}