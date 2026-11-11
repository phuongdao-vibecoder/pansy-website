"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { menuCards, menuFeatured, menuIntro, menuPageCount, menuTabs } from "@/content/menu";
import { cn } from "@/lib/cn";
import { RecipeCard } from "./RecipeCard";

/**
 * "Tuyển tập vị ngon từ dưa" (Figma Frame 6781 406:38146; mobile "Menu Expand" 2925:45355).
 * Desktop: tabs → featured card → 3 × 3 grid → pagination (1 2 3 4 … 15).
 * Mobile: tabs (horizontal scroll) → 3 cards → "Xem thêm" reveals the rest.
 * The demo has only sample recipes, so tabs and pagination change their selected state
 * but show the same cards (no backend; see PROJECT_PLAN Phase 8 notes).
 */
export function MenuCollection() {
  const [tab, setTab] = useState(menuTabs[0].key);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const mobileCards = [menuFeatured, ...menuCards];

  return (
    <section aria-labelledby="menu-title" className="mt-[70px] lg:mt-[150px]">
      <Reveal className="container-site flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex max-w-[575px] flex-col gap-5 text-center lg:gap-4">
          <h2 id="menu-title" className="text-h4 font-extrabold text-brand lg:text-h2">
            {menuIntro.title[0]} <br className="lg:hidden" />
            {menuIntro.title[1]}
          </h2>
          <p className="text-body">{menuIntro.text}</p>
        </div>

        <div
          role="group"
          aria-label="Lọc theo dịp"
          className="-mx-[var(--gutter)] flex w-[calc(100%+2*var(--gutter))] gap-3 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] lg:mx-0 lg:w-auto lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {menuTabs.map((t) => {
            const active = t.key === tab;
            return (
              <Button
                key={t.key}
                variant={active ? "green" : "white"}
                size="md"
                aria-pressed={active}
                onClick={() => {
                  setTab(t.key);
                  setPage(1);
                }}
                className={cn("max-lg:min-h-[34px] max-lg:px-4 max-lg:text-subtitle lg:px-5", !active && "border border-grey-300 max-lg:text-eyebrow")}
              >
                {t.label} ({t.count})
              </Button>
            );
          })}
        </div>

        {/* Desktop */}
        <div className="hidden w-full flex-col gap-16 lg:flex">
          <RecipeCard card={menuFeatured} featured />
          <ul className="grid grid-cols-3 gap-x-6 gap-y-12">
            {menuCards.map((c, i) => (
              <li key={i}>
                <RecipeCard card={c} />
              </li>
            ))}
          </ul>
          <Pagination page={page} onChange={setPage} />
        </div>

        {/* Mobile / tablet */}
        <div className="flex w-full flex-col items-center gap-12 lg:hidden">
          <ul className="grid w-full gap-12 md:grid-cols-2 md:gap-x-6">
            {mobileCards.slice(0, expanded ? undefined : 3).map((c, i) => (
              <li key={i}>
                <RecipeCard card={c} />
              </li>
            ))}
          </ul>
          {!expanded && (
            <Button variant="green" size="md" onClick={() => setExpanded(true)}>
              Xem thêm
            </Button>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/** Figma "Frame 6778": orange arrow circles, green current page, pale green others, "…" before the last page. */
function Pagination({ page, onChange }: { page: number; onChange: (p: number) => void }) {
  const pages = [1, 2, 3, 4];
  const item = (p: number) => (
    <li key={p}>
      <button
        type="button"
        onClick={() => onChange(p)}
        aria-current={p === page ? "page" : undefined}
        aria-label={`Trang ${p}`}
        className={cn(
          "flex size-8 items-center justify-center rounded-full text-subtitle font-bold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-green-400",
          p === page ? "bg-green-500 text-white" : "bg-green-500/10 text-eyebrow hover:bg-green-500/20",
        )}
      >
        {p}
      </button>
    </li>
  );
  const arrow = (dir: "prev" | "next") => {
    const disabled = dir === "prev" ? page === 1 : page === menuPageCount;
    return (
      <li>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange(dir === "prev" ? page - 1 : page + 1)}
          aria-label={dir === "prev" ? "Trang trước" : "Trang sau"}
          className="block rounded-full outline-none focus-visible:ring-3 focus-visible:ring-green-400 disabled:opacity-40"
        >
          {/* The Figma "previous" button is the "next" arrow mirrored; the export loses the mirror. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector */}
          <img loading="lazy" src="/svg/generated/menu/page-next.svg" alt="" width={32} height={32} className={dir === "prev" ? "-scale-x-100" : undefined} />
        </button>
      </li>
    );
  };
  // Pages after 4 (other than the last) show next to the ellipsis so the current page is always visible.
  const extra = page > 4 && page < menuPageCount ? [page] : [];
  return (
    <nav aria-label="Phân trang" className="flex justify-center">
      <ul className="flex items-center gap-[7px]">
        {arrow("prev")}
        {pages.map(item)}
        <li aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector */}
          <img loading="lazy" src="/svg/generated/menu/page-more.svg" alt="" width={32} height={32} />
        </li>
        {extra.map(item)}
        {item(menuPageCount)}
        {arrow("next")}
      </ul>
    </nav>
  );
}
