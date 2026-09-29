"use client";

import React, { useEffect, useMemo, useState } from "react";

interface ArticleContentProps {
  content: string;
  children?: React.ReactNode;
}

type Block =
  | { type: "heading"; id: string; text: string; index: number }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string };

type HeadingBlock = Extract<Block, { type: "heading" }>;
type Mode = "p" | "ul" | "ol" | "q" | null;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseContent(content: string): Block[] {
  const blocks: Block[] = [];
  let mode: Mode = null;
  let buf: string[] = [];
  let headings = 0;

  const flush = () => {
    if (buf.length) {
      if (mode === "p") {
        blocks.push({ type: "paragraph", text: buf.join(" ") });
      } else if (mode === "ul" || mode === "ol") {
        blocks.push({ type: "list", ordered: mode === "ol", items: buf });
      } else if (mode === "q") {
        const [text, cite] = buf.join(" ").split(/\s+[—–]\s+/);
        blocks.push({ type: "quote", text, cite });
      }
    }
    buf = [];
    mode = null;
  };

  for (const raw of content.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }

    const heading = line.match(/^#{1,3}\s+(.*)$/);
    if (heading) {
      flush();
      headings += 1;
      blocks.push({
        type: "heading",
        id: `${headings}-${slugify(heading[1])}`,
        text: heading[1],
        index: headings,
      });
      continue;
    }

    const ul = line.match(/^[-*•]\s+(.*)$/);
    const ol = line.match(/^\d+[.)]\s+(.*)$/);
    const q = line.match(/^>\s?(.*)$/);

    let next: Mode = "p";
    let text = line;
    if (ul) {
      next = "ul";
      text = ul[1];
    } else if (ol) {
      next = "ol";
      text = ol[1];
    } else if (q) {
      next = "q";
      text = q[1];
    }

    if (next !== mode) {
      flush();
      mode = next;
    }
    buf.push(text);
  }
  flush();

  return blocks;
}

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-[#0c1831] dark:text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export function ArticleContent({ content, children }: ArticleContentProps) {
  const blocks = useMemo(() => parseContent(content), [content]);
  const headings = useMemo(
    () => blocks.filter((b): b is HeadingBlock => b.type === "heading"),
    [blocks]
  );
  const hasToc = headings.length >= 2;
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (!hasToc) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActive(headings[i].id);
          return;
        }
      }
      if (headings[0]) setActive(headings[0].id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings, hasToc]);

  const goTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActive(id);
    }
  };

  return (
    <div
      className={
        hasToc
          ? "grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14"
          : "mx-auto max-w-[780px]"
      }
    >
      {/* বাম পাশের মেইন আর্টিকেল কন্টেন্ট */}
      <div className="min-w-0">
        <article className="text-slate-600 dark:text-slate-300">
          {blocks.map((block, i) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2
                    key={i}
                    id={block.id}
                    className="mb-5 mt-12 scroll-mt-28 font-[family-name:var(--font-jakarta)] text-2xl font-bold tracking-tight text-[#0c1831] first:mt-0 sm:text-[26px] dark:text-white"
                  >
                    {block.text}
                  </h2>
                );

              case "paragraph":
                return (
                  <p
                    key={i}
                    className="mb-6 text-[16px] leading-[1.75] text-[#475569] dark:text-slate-300"
                  >
                    {inline(block.text)}
                  </p>
                );

              case "list":
                return block.ordered ? (
                  <ol key={i} className="mb-6 space-y-3.5">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f1fd] text-xs font-semibold text-[#0a60d9] dark:bg-blue-950 dark:text-blue-300">
                          {j + 1}
                        </span>
                        <span className="text-[15.5px] leading-relaxed text-[#334155] dark:text-slate-300">
                          {inline(item)}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul key={i} className="mb-6 space-y-3">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a60d9]" />
                        <span className="text-[15.5px] leading-relaxed text-[#334155] dark:text-slate-300">
                          {inline(item)}
                        </span>
                      </li>
                    ))}
                  </ul>
                );

              case "quote":
                return (
                  <blockquote
                    key={i}
                    className="my-7 rounded-2xl border-l-[3.5px] border-[#0a60d9] bg-[#f8fafd] p-6 sm:p-7 dark:border-blue-500 dark:bg-slate-900/40"
                  >
                    <p className="font-[family-name:var(--font-jakarta)] text-lg font-medium leading-relaxed text-[#0c1831] dark:text-white">
                      {block.text}
                    </p>
                    {block.cite && (
                      <cite className="mt-3 block text-sm not-italic font-normal text-slate-500 dark:text-slate-400">
                        {block.cite}
                      </cite>
                    )}
                  </blockquote>
                );
            }
          })}
        </article>

        {children && <div className="mt-10 space-y-6">{children}</div>}
      </div>

      {/* ডান পাশের স্টিকি Table of Contents */}
      {hasToc && (
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <nav
            aria-label="Table of contents"
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-slate-900/60"
          >
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              TABLE OF CONTENTS
            </p>
            <ul className="space-y-1">
              {headings.map((h) => {
                const isActive = active === h.id;
                return (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => goTo(e, h.id)}
                      className={`group flex items-start gap-2.5 rounded-lg py-2 pl-3 pr-2.5 text-[13.5px] leading-snug transition-all duration-150 ${
                        isActive
                          ? "rounded-l-none border-l-[3px] border-[#0a60d9] bg-[#eff6ff] font-medium text-[#0a60d9] dark:bg-blue-950/60 dark:text-blue-300"
                          : "border-l-[3px] border-transparent text-[#475569] hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
                      }`}
                    >
                      <span
                        className={`mt-0.5 text-xs font-semibold tabular-nums shrink-0 ${
                          isActive
                            ? "text-[#0a60d9] dark:text-blue-300"
                            : "text-slate-400 group-hover:text-slate-500"
                        }`}
                      >
                        {String(h.index).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{h.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
}