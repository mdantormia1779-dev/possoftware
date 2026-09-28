interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none text-base sm:text-lg leading-[1.8] text-foreground/90">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="mb-6 last:mb-0">
          {paragraph}
        </p>
      ))}
    </article>
  );
}