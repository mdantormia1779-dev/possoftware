"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV_LINKS } from "./PublicNavLinks";

/* -------------------------------- Types -------------------------------- */

interface Edges {
  left: number; // nav er bam side theke dooratto
  right: number; // nav er daan side theke dooratto
}

interface Box {
  left: number;
  width: number;
}

/* ------------------------------ Constants ------------------------------ */

const LINK_PADDING_X = 12; // px-3
const SPRING = "cubic-bezier(0.34,1.56,0.64,1)"; // halka overshoot
const SMOOTH = "cubic-bezier(0.22,1,0.36,1)";
const FAST_MS = 220;
const SLOW_MS = 520;

/* ------------------------------- Component ------------------------------ */

export function PublicHeaderNav(): React.JSX.Element {
  const pathname = usePathname();

  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const prevLeft = useRef<number | null>(null);

  const [mounted, setMounted] = useState<boolean>(false);
  const [hoverBox, setHoverBox] = useState<Box | null>(null);
  const [activeEdges, setActiveEdges] = useState<Edges | null>(null);
  const [movingRight, setMovingRight] = useState<boolean>(true);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const getBox = useCallback((href: string): Box | null => {
    const el = itemRefs.current[href];
    if (!el) return null;
    return { left: el.offsetLeft, width: el.offsetWidth };
  }, []);

  // Active underline position (route change, resize, font load)
  useEffect(() => {
    const update = (): void => {
      const nav = navRef.current;
      const box = getBox(pathname);
      if (!nav || !box) {
        setActiveEdges(null);
        prevLeft.current = null;
        return;
      }

      if (prevLeft.current !== null) {
        setMovingRight(box.left > prevLeft.current);
      }
      prevLeft.current = box.left;

      setActiveEdges({
        left: box.left,
        right: nav.offsetWidth - box.left - box.width,
      });
    };

    update();
    window.addEventListener("resize", update);
    document.fonts?.ready.then(update);
    return () => window.removeEventListener("resize", update);
  }, [pathname, getBox]);

  // Cursor spotlight pill er bhitor
  const handleMouseMove = (e: MouseEvent<HTMLElement>): void => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill || !hoverBox) return;
    const x = e.clientX - nav.getBoundingClientRect().left - hoverBox.left;
    pill.style.setProperty("--sx", `${x}px`);
  };

  // Liquid stretch: jei dike jachhe oi edge age chole, arekta pichone thake
  const leftMs = movingRight ? SLOW_MS : FAST_MS;
  const rightMs = movingRight ? FAST_MS : SLOW_MS;

  return (
    <nav
      ref={navRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverBox(null)}
      className="relative hidden items-center gap-1 lg:flex xl:gap-2"
    >
      {/* Sliding hover pill + cursor spotlight */}
      <span
        ref={pillRef}
        aria-hidden="true"
        style={{
          left: hoverBox?.left ?? 0,
          width: hoverBox?.width ?? 0,
          backgroundImage:
            "radial-gradient(90px circle at var(--sx, 50%) 50%, rgba(99,102,241,0.28), rgba(34,211,238,0.10) 55%, transparent 100%)",
        }}
        className={[
          "pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-xl",
          "bg-indigo-500/5 ring-1 ring-indigo-500/15 backdrop-blur-sm",
          "transition-[left,width,opacity,transform] duration-500",
          hoverBox ? "scale-100 opacity-100" : "scale-90 opacity-0",
          "motion-reduce:!transition-none",
        ].join(" ")}
      />

      {/* Liquid active underline */}
      {activeEdges && (
        <span
          aria-hidden="true"
          style={{
            left: activeEdges.left + LINK_PADDING_X,
            right: activeEdges.right + LINK_PADDING_X,
            transition: `left ${leftMs}ms ${SMOOTH}, right ${rightMs}ms ${SMOOTH}, opacity 400ms`,
          }}
          className={[
            "pointer-events-none absolute -bottom-1 h-[3px] rounded-full",
            "bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400",
            "shadow-[0_0_12px_rgba(99,102,241,0.7)]",
            "motion-reduce:!transition-none",
            mounted ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      )}

      {PUBLIC_NAV_LINKS.map((link, i) => {
        const isActive = pathname === link.href;

        return (
          // Wrapper sudhu entrance stagger er jonno
          <span
            key={link.href}
            style={{
              transitionDelay: mounted ? `${i * 70}ms` : "0ms",
              transitionTimingFunction: SPRING,
            }}
            className={[
              "inline-block transition-all duration-700 motion-reduce:!transition-none",
              mounted
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "-translate-y-3 scale-90 opacity-0 blur-sm",
            ].join(" ")}
          >
            <Link
              href={link.href}
              ref={(el) => {
                itemRefs.current[link.href] = el;
              }}
              aria-current={isActive ? "page" : undefined}
              onMouseEnter={() => setHoverBox(getBox(link.href))}
              onFocus={() => setHoverBox(getBox(link.href))}
              onBlur={() => setHoverBox(null)}
              className={[
                "group relative z-10 block rounded-xl px-3 py-2 text-sm font-medium",
                "transition-transform duration-300 active:scale-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
                isActive
                  ? "font-semibold text-indigo-600 dark:text-indigo-400"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {/* Text roll: uporer text ber hoy, niche theke gradient text ashe */}
              <span className="relative block h-[1.25em] overflow-hidden leading-[1.25em]">
                <span
                  className="block transition-transform duration-500 group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none"
                  style={{ transitionTimingFunction: SMOOTH }}
                >
                  {link.label}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-full block bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent transition-transform duration-500 group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none"
                  style={{ transitionTimingFunction: SMOOTH }}
                >
                  {link.label}
                </span>
              </span>

              {/* Active dot with ping ring */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute -right-0.5 top-1 flex size-1.5"
                >
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                </span>
              )}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}