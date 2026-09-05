import React from "react";
import Link from "next/link";
import { Sparkles, Tag, Calendar, Clock, ArrowRight } from "lucide-react";
import { Article } from "./blogData";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <div className="p-8 sm:p-12 rounded-3xl border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50/70 via-card to-cyan-50/30 dark:from-indigo-950/30 dark:via-card dark:to-cyan-950/20 shadow-lg space-y-6">
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white flex items-center gap-1.5 shadow-xs">
          <Sparkles className="h-3.5 w-3.5" /> Featured Guide
        </span>
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
          <Tag className="h-3 w-3" /> {article.category}
        </span>
      </div>

      <div className="space-y-3 max-w-4xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
          {article.title}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {article.summary}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/80">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{article.author}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {article.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {article.readTime}
          </span>
        </div>

        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
        >
          <span>Read Case Study &amp; Try System</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
