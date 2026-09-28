import React from "react";
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function BlogArticleNotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center space-y-6">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
        <FileQuestion className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
        Article Not Found
      </h1>
      <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        The article you&apos;re looking for may have been moved or is no longer available.
      </p>
      <Link
        href="/blog"
        className="inline-flex min-h-[44px] px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors items-center justify-center"
      >
        Back to Blog
      </Link>
    </main>
  );
}