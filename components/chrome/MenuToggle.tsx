"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { NavItem, SocialLink } from "@/lib/content";
import { cn } from "@/lib/utils";

interface MenuToggleProps {
  nav: NavItem[];
  social: SocialLink[];
  /** Inverts the closed-state toggle pill to stay visible against a dark header (e.g. /work/[slug]). The overlay itself is unaffected. */
  dark?: boolean;
}

/**
 * yeqq.com.tr pattern: one centered bracket-wrapped capsule toggling a
 * fullscreen overlay, used at every breakpoint — not a separate
 * desktop-inline-links vs. mobile-hamburger split.
 */
export function MenuToggle({ nav, social, dark = false }: MenuToggleProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Closes on ANY route change, not just clicks on the tracked nav links —
  // covers the logo, social links, browser back/forward, and anything else
  // that navigates while the overlay happens to be open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const overlay = (
    <div
      className={cn(
        "fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between overflow-y-auto bg-background px-6 py-10 transition-[opacity,visibility] duration-300 md:px-10",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <nav className="flex flex-col">
        {nav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "group flex items-baseline gap-6 border-b border-border py-6 md:py-8",
              !reducedMotion && "transition-[opacity,transform] duration-300 ease-out",
              !reducedMotion && (open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"),
            )}
            style={
              reducedMotion ? undefined : { transitionDelay: open ? `${i * 40}ms` : "0ms" }
            }
          >
            <span className="text-sm text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-heading text-4xl tracking-tight lowercase transition-colors group-hover:text-cta md:text-6xl">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="flex flex-wrap gap-x-10 gap-y-2 pt-10 text-xs tracking-normal text-muted-foreground lowercase">
        {social.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="transition-colors hover:text-cta"
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className={cn(
          "inline-flex items-center rounded-full px-6 py-2 text-sm lowercase transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/50",
          dark && !open ? "bg-background text-foreground" : "bg-foreground text-background",
        )}
      >
        {open ? "close" : "menu"}
      </button>

      {/* Portaled to <body> — Header's backdrop-blur creates a new CSS
          containing block (same effect as `filter`), which silently breaks
          `position: fixed` for anything nested inside it. Rendering the
          overlay outside that subtree keeps it anchored to the real
          viewport regardless. */}
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}

export default MenuToggle;
