"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STORAGE_KEY = "cookie-notice-dismissed";

/**
 * A small corner card, not a full-screen consent modal — this site's only
 * real cookie is the one Google's translate widget sets, so the copy stays
 * honest about that rather than the usual boilerplate. Persisted via
 * localStorage; shown once per browser, after a short delay so it doesn't
 * compete with the preloader/hero on first load.
 */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          role="dialog"
          aria-label="Cookie notice"
          className="fixed right-6 bottom-6 z-70 w-[min(340px,calc(100vw-3rem))] rounded-lg border border-border bg-background p-5 shadow-xl"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs tracking-normal text-muted-foreground lowercase">
              Cookies
            </p>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-cta"
            >
              <X className="size-3.5" />
            </button>
          </div>
          <p className="mt-2 text-sm text-foreground/90">
            This site uses a couple of cookies, mainly to remember your language
            preference. Nothing sold, nothing tracked.
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="mt-4 inline-flex items-center rounded-full bg-cta px-4 py-2 text-xs text-cta-foreground lowercase transition-transform duration-150 hover:scale-105 active:scale-95"
          >
            Got it
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default CookieNotice;
