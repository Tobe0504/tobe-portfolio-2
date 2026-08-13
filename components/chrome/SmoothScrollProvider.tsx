"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { GsapScrollTriggerBridge } from "./GsapScrollTriggerBridge";
import { LenisResizeSync } from "./LenisResizeSync";

/**
 * `root` mounts Lenis against `window`/`document.documentElement` (native
 * scroll mode) — no wrapper/content divs, so `position: sticky` elsewhere on
 * the site keeps working. The legacy wrapper mode would silently break that.
 *
 * `autoRaf: false` because GsapScrollTriggerBridge drives Lenis from GSAP's
 * ticker instead — one rAF loop total, not two competing ones.
 *
 * Reduced-motion users never get a Lenis instance constructed at all, not a
 * constructed-then-disabled one — no smooth-scroll RAF loop runs for them.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.12, wheelMultiplier: 1, autoRaf: false }}>
      <GsapScrollTriggerBridge />
      <LenisResizeSync />
      {children}
    </ReactLenis>
  );
}
