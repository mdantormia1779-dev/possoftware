import React from "react";
import Link from "next/link";
import { ARTICLES } from "@/components/public/blog/blogData";
import { ArticleCard } from "@/components/public/blog/ArticleCard";

export const metadata = {
  title: "Blog | XYZ Business OS",
  description: "Read our latest articles",
};

export default function BlogListPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-8 text-foreground">Blog Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}