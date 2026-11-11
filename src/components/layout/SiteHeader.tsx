"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, CloseIcon, MenuIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { contactNavItem, mainNav, routes, type NavItem } from "@/content/site";
import { cn } from "@/lib/cn";
import { DisplayText } from "@/components/ui/DisplayText";

/**
 * Site header (Figma "navbar" 2227:5316 and mobile "Menu" 2955:*).
 * Specs: DESIGN_SPEC.md §5.3.
 *  - ≥1024 px: white pill bar 64 px tall, 24 px from the top, floating over the hero.
 *  - <1024 px: white pill bar 56 px tall, 16 px from the top; the round orange
 *    button opens a full-screen cream menu.
 * The header is positioned absolutely (it scrolls away with the page, as in Figma).
 */

const productTextColor = {
  "sunorange-500": "text-sunorange-500",
  "sunhoney-500": "text-sunhoney-500",
  "sunyellow-500": "text-sunyellow-500",
} as const;

function Logo() {
  return (
    <Link href={routes.home} aria-label="Pansy — Trang chủ" className="shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element -- static vector logo */}
      <img src="/svg/brand/logo-header.svg" alt="" width={89} height={37} />
    </Link>
  );
}

export function SiteHeader() {
  // The header does not read the current URL: that would make every page
  // dynamic under Cache Components. Menu links close the menu on click instead.
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // While the mobile menu is open: lock page scroll, make the page behind it inert (keyboard
  // focus stays in the header and menu), and close on Escape with focus back on the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const siblings = [...(headerRef.current?.parentElement?.children ?? [])].filter(
      (el): el is HTMLElement =>
        el !== headerRef.current &&
        el instanceof HTMLElement &&
        !el.inert &&
        !["SCRIPT", "NEXT-ROUTE-ANNOUNCER"].includes(el.tagName),
    );
    siblings.forEach((el) => (el.inert = true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      siblings.forEach((el) => (el.inert = false));
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="absolute inset-x-0 top-0 z-50">
      {/* Desktop */}
      <div className="container-site hidden pt-6 lg:block">
        <div className="flex h-16 items-center justify-between rounded-full bg-white px-8">
          <Logo />
          <nav aria-label="Chính" className="flex items-center gap-8">
            {mainNav.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.href} item={item} />
              ) : (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ),
            )}
            <Button href={contactNavItem.href} variant="orange" size="md">
              {contactNavItem.label}
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile and tablet */}
      <div className="px-4 pt-4 lg:hidden">
        <div className="mx-auto flex h-14 max-w-[600px] items-center justify-between rounded-full bg-white pr-2 pl-6">
          <Logo />
          <button
            ref={toggleRef}
            type="button"
            className="flex size-10 items-center justify-center rounded-full bg-sunorange-500 text-white outline-none focus-visible:ring-3 focus-visible:ring-sunorange-400"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative py-[3px] text-body font-bold text-ink outline-none",
        // 1.5 px underline 2 px below the text on hover (Figma "Hover" 2227:5508)
        "after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:bg-ink after:opacity-0 after:transition-opacity",
        "hover:after:opacity-100 focus-visible:after:opacity-100",
      )}
    >
      {children}
    </Link>
  );
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      <div className="flex items-center gap-2">
        <NavLink href={item.href}>
          {item.label}
        </NavLink>
        <button
          type="button"
          className="relative rounded-full p-1 text-ink outline-none after:absolute after:-inset-[5px] after:content-[''] focus-visible:ring-2 focus-visible:ring-green-400"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`Mở danh mục ${item.label}`}
          onClick={() => setOpen((o) => !o)}
        >
          <ChevronDown className={cn("transition-transform", open && "rotate-180")} />
        </button>
      </div>

      {/* Panel: white, 136 px wide, radius 8 (Figma "Hover Sản phẩm" 2122:4722) */}
      <div
        id={menuId}
        hidden={!open}
        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
      >
        <ul className="flex w-max min-w-[136px] flex-col rounded-xs bg-white px-2.5 pt-4 pb-2.5">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className={cn(
                  "block py-1.5 font-display text-[16px] leading-6 decoration-1 underline-offset-4 outline-none",
                  "hover:underline focus-visible:underline",
                  productTextColor[child.color],
                )}
              >
                <DisplayText>{child.label}</DisplayText>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <div
      id="mobile-menu"
      className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-sunorange-bg lg:hidden"
    >
      {/* Figma 2955:36357: right-aligned links, padding 40/16, gap 24 */}
      <nav aria-label="Chính" className="flex flex-col items-end gap-6 px-4 py-10 text-right">
        {mainNav.map((item) =>
          item.children ? (
            <div key={item.href} className="flex flex-col items-end gap-4">
              <div className="flex items-center gap-1">
                <Link href={item.href} onClick={onClose} className="-my-1 py-1 text-body font-bold text-ink">
                  {item.label}
                </Link>
                <button
                  type="button"
                  className="relative rounded-full p-1.5 text-ink after:absolute after:-inset-y-1 after:inset-x-0 after:content-['']"
                  aria-expanded={productsOpen}
                  aria-label={`Mở danh mục ${item.label}`}
                  onClick={() => setProductsOpen((o) => !o)}
                >
                  <ChevronDown className={cn("transition-transform", productsOpen && "rotate-180")} />
                </button>
              </div>
              {productsOpen && (
                <ul className="flex flex-col items-end gap-4">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className={cn("font-display text-[16px] leading-6", productTextColor[child.color])}
                      >
                        <DisplayText>{child.label}</DisplayText>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link key={item.href} href={item.href} onClick={onClose} className="-my-1 py-1 text-body font-bold text-ink">
              {item.label}
            </Link>
          ),
        )}
        <Button href={contactNavItem.href} variant="green" size="md" onClick={onClose}>
          {contactNavItem.label}
        </Button>
      </nav>
    </div>
  );
}
