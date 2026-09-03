"use client";

import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
  { code: "ja", label: "日本語" },
  { code: "yo", label: "Yorùbá" },
  { code: "ig", label: "Igbo" },
];

/** Reads the `googtrans` cookie Google's widget itself sets (format `/en/<code>`). */
function readActiveLanguage(): string {
  const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
  return match ? match[1] : "en";
}

/** Drives the widget's hidden <select> — the standard technique for a custom-styled trigger. Returns whether the select was found. */
function applyLanguage(code: string): boolean {
  const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (!combo) return false;
  combo.value = code;
  combo.dispatchEvent(new Event("change"));
  return true;
}

/** The widget mounts its <select> asynchronously — retry briefly rather than assuming it's ready. */
function applyLanguageWithRetry(code: string, attemptsLeft = 10) {
  if (applyLanguage(code)) return;
  if (attemptsLeft <= 0) return;
  setTimeout(() => applyLanguageWithRetry(code, attemptsLeft - 1), 300);
}

interface LanguageSwitcherProps {
  dark?: boolean;
}

export function LanguageSwitcher({ dark = false }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("en");
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(readActiveLanguage());
  }, []);

  // Google's widget translates whatever DOM exists when it runs. Next's
  // client-side route transitions swap in new page content without a full
  // reload, and whether the widget's own observer re-translates that new
  // DOM on its own is inconsistent — so if a translation is active, nudge
  // it again after each route change. Known rough edge of the "instant
  // widget" trade-off, not fully airtight the way a maintained locale
  // system would be.
  useEffect(() => {
    const code = readActiveLanguage();
    if (code !== "en") applyLanguageWithRetry(code);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  function handleSelect(code: string) {
    setActive(code);
    setOpen(false);
    applyLanguageWithRetry(code);
  }

  return (
    // Google's own widget translates whatever DOM exists, including this
    // switcher's own text — a stray "en"/"fr" in it reads as ordinary page
    // content to the translator, so it gets rewritten mid-render (that's
    // the bug: switch back to English, the cookie updates correctly, but
    // the button's own text node gets re-translated back to the old
    // language right after React sets it). `notranslate` (both the class
    // Google's widget checks and the standard `translate="no"` attribute)
    // excludes this whole control from that pass — language *names* should
    // never be translated in the first place anyway.
    <div ref={rootRef} className="notranslate relative" translate="no">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Change language"
        className={cn(
          "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-xs tracking-normal lowercase transition-[color,border-color,transform] duration-150 hover:border-cta hover:text-cta active:scale-[0.97]",
          dark
            ? "border-background/25 text-background/70"
            : "border-border text-muted-foreground",
        )}
      >
        <Globe className="size-3.5" />
        {active}
      </button>

      {open ? (
        <div
          className={cn(
            "absolute top-full right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border shadow-lg",
            dark ? "border-background/15 bg-foreground" : "border-border bg-background",
          )}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2.5 text-left text-xs tracking-normal transition-colors",
                dark ? "text-background/80 hover:bg-background/10" : "text-foreground hover:bg-muted",
                active === lang.code && "text-cta",
              )}
            >
              {lang.label}
              <span className="opacity-50">{lang.code}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default LanguageSwitcher;
