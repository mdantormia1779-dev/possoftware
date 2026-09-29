import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "./blogData";
import { BlogCover } from "./ArticleCard";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({
  article,
}: FeaturedArticleProps): React.JSX.Element {
  return (
    <Link
      href={`/blog/${article.id}`}
      className={[
        "group grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-2",
        "transition duration-300 hover:shadow-xl hover:shadow-slate-200/70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none",
      ].join(" ")}
    >
      <div className="overflow-hidden">
        <BlogCover
          src={article.image}
          alt={article.title}
          category={article.category}
          className="h-64 min-h-[16rem] w-full transition-transform duration-500 group-hover:scale-105 md:h-full motion-reduce:transition-none"
        />
      </div>

      <div className="flex flex-col justify-center p-8 md:p-10">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-500/20 dark:text-blue-300">
            Featured
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {article.category}
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {article.title}
        </h2>

        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {article.summary}
        </p>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium text-slate-800 dark:text-slate-200">
            {article.author}
          </span>
          <span aria-hidden="true" className="size-1 rounded-full bg-slate-300" />
          <span>{article.date}</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-slate-300" />
          <span>{article.readTime}</span>
        </p>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
          Read More
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}