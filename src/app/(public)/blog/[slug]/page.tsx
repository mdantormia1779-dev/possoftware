import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Tag } from "lucide-react";
import { ARTICLES } from "@/components/public/blog/blogData";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleCover } from "./ArticleCover";
import { ArticleContent } from "./ArticleContent";
import { AuthorBox } from "./AuthorBox";
import { RelatedArticles } from "./RelatedArticles";
import { ShareButton } from "./ShareButton";
import { inter, jakarta } from "./fonts";

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.id === slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | XYZ Business OS`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      images: article.image ? [{ url: article.image }] : [],
    },
  };
}

function ArticleCta() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-20 pt-6 sm:px-8">
      <div
        className="rounded-3xl px-6 py-20 text-center text-white"
        style={{
          backgroundColor: "#005bd4",
          backgroundImage:
            "radial-gradient(60% 75% at 0% 0%, rgba(0,165,205,0.45), transparent 60%), radial-gradient(45% 60% at 100% 100%, rgba(90,145,255,0.4), transparent 65%)",
        }}
      >
        <div className="mx-auto flex max-w-[640px] flex-col items-center">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold">
            14-day free trial · No credit card required
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-jakarta)] text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-[2.375rem]">
            Ready to Simplify Your Business?
          </h2>
          <p className="mt-3.5 text-base leading-relaxed text-white/90">
            Manage sales, inventory, accounting, employees and customers from one
            powerful platform.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-[52px] items-center gap-2 rounded-md bg-white px-7 text-[15px] font-semibold text-[#0648a8] transition-colors hover:bg-blue-50"
            >
              Start Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-[52px] items-center rounded-md border border-white/40 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.id === slug);
  if (!article) notFound();

  const sameCategory = ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id
  );
  const related = (
    sameCategory.length > 0
      ? sameCategory
      : ARTICLES.filter((a) => a.id !== article.id)
  ).slice(0, 3);

  const authorName = article.author;
  const authorRole = article.authorRole ?? "Contributor";
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const tags = article.tags ?? [article.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: { "@type": "Person", name: authorName },
    datePublished: article.date,
    ...(article.image ? { image: [article.image] } : {}),
  };

  return (
    <div
      className={`${inter.variable} ${jakarta.variable} min-h-screen bg-background font-[family-name:var(--font-inter)] text-foreground antialiased selection:bg-[#0a60d9] selection:text-white`}
    >
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
      />

      <ArticleCover
        src={article.image}
        alt={article.title}
        category={article.category}
        caption={`${article.category} · ${article.readTime}`}
      />

      <main className="mx-auto max-w-[1200px] px-4 pb-20 pt-12 sm:px-8">
        <ArticleContent content={article.content}>
          {/* Tags Section */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0a60d9] dark:text-blue-400">
              <Tag className="h-3.5 w-3.5" /> TAGS
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Social Share & Author Card */}
          <ShareButton title={article.title} />
          <AuthorBox
            authorName={authorName}
            authorRole={authorRole}
            initials={initials}
          />
        </ArticleContent>
      </main>

      <RelatedArticles articles={related} />
      <ArticleCta />
    </div>
  );
}