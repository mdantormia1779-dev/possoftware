import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Article } from "./blogData";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:shadow-lg transition-all hover:border-indigo-300 dark:hover:border-indigo-700 flex flex-col justify-between">
      <div className="space-y-3">
        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-muted text-foreground">
          {article.category}
        </span>
        <h4 className="text-base font-bold text-foreground line-clamp-2 hover:text-indigo-600 transition-colors">
          {article.title}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
          {article.summary}
        </p>
      </div>

      <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {article.date}
        </span>
        <span className="flex items-center gap-1 font-medium">
          <Clock className="h-3 w-3" /> {article.readTime}
        </span>
      </div>
    </div>
  );
}
