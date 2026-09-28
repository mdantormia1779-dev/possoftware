import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/components/public/blog/blogData";
import { BlogNewsletter } from "@/components/public/blog/BlogNewsletter";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleCover } from "./ArticleCover";
import { ArticleContent } from "./ArticleContent";
import { AuthorBox } from "./AuthorBox";
import { RelatedArticles } from "./RelatedArticles";

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.id }));
}

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.id === slug);
  if (!article) return { title: "Article Not Found" };

  const cover = (article as { image?: string }).image;

  return {
    title: `${article.title} | XYZ Business OS`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      ...(cover ? { images: [{ url: cover }] } : {}),
    },
  };
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.id === slug);
  if (!article) notFound();

  // Prefer same-category articles; if none exist, fall back to
  // other recent articles so "Related" is never empty.
  const sameCategory = ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id
  );
  const related =
    sameCategory.length > 0
      ? sameCategory.slice(0, 3)
      : ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  const authorName = article.author.split(",")[0]?.trim() ?? article.author;
  const authorRole = article.author.split(",")[1]?.trim() ?? "Author";
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const coverImage = (article as { image?: string }).image;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: { "@type": "Person", name: authorName },
    datePublished: article.date,
    ...(coverImage ? { image: [coverImage] } : {}),
  };

  return (
    <div className="bg-background min-h-screen text-foreground antialiased selection:bg-indigo-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleHeader
        title={article.title}
        summary={article.summary}
        category={article.category}
        date={article.date}
        readTime={article.readTime}
        authorName={authorName}
        authorRole={authorRole}
        initials={initials}
      />

      <ArticleCover src={coverImage} alt={article.title} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <ArticleContent content={article.content} />
        <AuthorBox authorName={authorName} authorRole={authorRole} initials={initials} />
      </main>

      <RelatedArticles articles={related} />

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <BlogNewsletter />
      </footer>
    </div>
  );
}