"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STORAGE_KEY = "cookie-notice-dismissed";

/**
 * A small corner card, not a full-screen consent modal — this site's only
 * real cookie is the one Google's translate widget sets, so the copy stays
 * honest about that rather than the usual boilerplate. Persisted via
 * localStorage; shown once per browser, after a short delay so it doesn't
 * compete with the hero intro on first load.
 *
 * Two shapes, because a corner card is a corner card only when there is a
 * corner to sit in. At 390px the 340px card was most of the screen's width
 * and, stacked label-over-body-over-button, a third of its height — it landed
 * squarely over the hero on every route, so the first thing anyone saw on a
 * phone was a cookie notice with the page hidden behind it. On phones it is
 * now a single edge-to-edge bar with the text and the button on one line.
 *
 * Not `role="dialog"`: nothing here is modal, focus is never trapped, and the
 * page stays fully operable behind it. Announcing it as a dialog tells screen
 * reader users they are in something they must dismiss to escape, which is the
 * opposite of true. A labelled `aside` is what it actually is.
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
        <motion.aside
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          aria-label="Cookie notice"
          className="fixed inset-x-3 bottom-3 z-70 flex items-center gap-3 rounded-lg border border-border bg-background p-3 shadow-xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[340px] sm:flex-col sm:items-stretch sm:gap-0 sm:p-5"
        >
          {/* The "cookies" eyebrow is desktop-only. On one line it is a third
              label competing with the sentence that already says the same
              thing, and the bar is short enough not to need naming. */}
          <p className="hidden text-xs tracking-normal text-muted-foreground lowercase sm:block">
            Cookies
          </p>
          <p className="min-w-0 flex-1 text-xs text-foreground/90 sm:mt-2 sm:text-sm">
            This site uses a couple of cookies, mainly to remember your language
            preference. Nothing sold, nothing tracked.
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-cta px-4 text-xs text-cta-foreground lowercase transition-transform duration-150 hover:scale-105 active:scale-95 sm:mt-4 sm:self-start"
          >
            Dismiss
          </button>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

export default CookieNotice;
