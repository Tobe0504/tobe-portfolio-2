"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Enter-only, deliberately — no `AnimatePresence`/`mode="wait"` exit
 * tracking. That combination was tried first and reproduced a real bug:
 * the mobile nav overlay closes on its own 300ms CSS fade (independent of
 * this component), and AnimatePresence's exit meant the OLD page was
 * *also* fading out for ~350ms at the same time — two uncoordinated
 * animations overlapping, so for a third of a second you'd see the closing
 * nav list ghosted over the incoming page. Keying this div on `pathname`
 * without an exit gets the same "page announces itself" feel — new content
 * fades in from 0 — while React just swaps the old content out instantly,
 * so there's never a second thing animating for anything else to collide
 * with.
 *
 * Opacity-only, deliberately no `y`/`x` transform: a `transform` on this
 * wrapper (an ancestor of every page's content, including any pinned
 * ScrollArrest section) becomes the containing block for its
 * `position: fixed` descendants per the CSS spec — which is exactly what
 * GSAP's pin relies on to track the true viewport, and exactly what a
 * pinned section's z-index needs to be compared against the header's
 * outside any local stacking context. `opacity: 1` at rest creates neither
 * problem; only `opacity < 1`, mid-transition, does — and now that window
 * is instant-swap-then-fade-in rather than a held exit.
 *
 * Reduced-motion users get an instant swap: no `initial` state, no
 * transition, matching `useReducedMotion`'s treatment everywhere else in
 * this codebase (skip construction of the animation, not construct-then-
 * disable it).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
