"use client";

import { useEffect, useState } from "react";

/** True once the page has scrolled past `threshold` — for chrome (the
 * header) that wants to sit fully transparent over a hero at the very top
 * and only pick up its backing blur/tint once there's real content
 * scrolling underneath it. A plain `window.scroll` listener works even
 * with Lenis mounted: it's in native scroll mode, so real `window.scrollY`
 * stays authoritative and keeps firing native scroll events. */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
