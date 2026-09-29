"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "./blogData";

/* -------------------------------- Cover -------------------------------- */

interface BlogCoverProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
}

export function BlogCover({
  src,
  alt,
  category,
  className = "",
}: BlogCoverProps): React.JSX.Element {
  const [failed, setFailed] = useState<boolean>(false);

  if (!src || failed) {
    return (
      <div
        aria-hidden="true"
        className={[
          "flex items-center justify-center bg-gradient-to-br from-blue-100 via-slate-50 to-emerald-100",
          "dark:from-blue-950 dark:via-slate-900 dark:to-emerald-950",
          className,
        ].join(" ")}
      >
        <span className="text-6xl font-extrabold text-blue-600/25 dark:text-blue-400/20">
          {category.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={["object-cover", className].join(" ")}
    />
  );
}

/* --------------------------------- Card -------------------------------- */

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps): React.JSX.Element {
  return (
    <Link
      href={`/blog/${article.id}`}
      className={[
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white",
        "transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      ].join(" ")}
    >
      <div className="overflow-hidden">
        <BlogCover
          src={article.image}
          alt={article.title}
          category={article.category}
          className="h-48 w-full transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {article.category}
        </span>

        <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-snug text-slate-900 dark:text-white">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {article.summary}
        </p>

        <div className="mt-auto pt-5">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {article.author}
            </span>
            <span aria-hidden="true" className="size-1 rounded-full bg-slate-300" />
            <span>{article.date}</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-slate-300" />
            <span>{article.readTime}</span>
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
            Read More
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}