"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Next's App Router swaps page content without a full reload, but Lenis
 * caches the document's scroll height at init and never re-measures it on
 * its own. Land on a route change from a shorter page to a taller one and
 * the cached limit is still the old (smaller) height — wheel input stops
 * producing scroll past that stale limit even though real content continues
 * below it, which reads as the scroll just "hanging". Re-measuring after
 * every route change keeps the limit in sync with whatever actually
 * rendered.
 *
 * ScrollTrigger.refresh() has the same staleness problem for any pinned
 * sections' pin distances, and must run AFTER lenis.resize() so it sees the
 * fresh scroll-height limit — hence both live in the same effect rather
 * than two components racing each other on route change.
 */
export function LenisResizeSync() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    const raf = requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, [lenis, pathname]);

  return null;
}

export default LenisResizeSync;
