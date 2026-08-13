"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** The fixed header is `h-16` (64px) and every page's `<main>` carries a
 * matching `pt-16` to clear it — so at rest, any element's true visible top
 * already sits 64px below the viewport's y:0. A trigger of "top top" only
 * fires once the user has scrolled that 64px away, which reads as a dead
 * zone before the arrest does anything — most noticeable when the arrest is
 * the very first thing on a page. Offsetting the default start by the same
 * 64px makes the trigger live from the very first pixel of scroll instead. */
const HEADER_OFFSET_PX = 64;

interface ScrollArrestAnimateParams {
  timeline: gsap.core.Timeline;
  root: HTMLDivElement;
}

interface ScrollArrestProps {
  children: ReactNode;
  className?: string;
  /** Extra scroll distance the pin lasts for, in viewport heights. */
  duration?: number;
  /** 1 = tightly tied to scroll position; a number adds a touch of lag/easing. */
  scrub?: boolean | number;
  start?: string;
  markers?: boolean;
  /** Builds the scrubbed timeline. Called inside useGSAP's tracked scope. */
  animate: (params: ScrollArrestAnimateParams) => void;
  /** Fires true on entering the pin (forward or backward scroll) and false
   * on leaving it either edge — lets a caller sync outside state (e.g. the
   * header's theme) to "is this section currently pinned". */
  onToggleActive?: (active: boolean) => void;
  /** Extends the pinned box up over the fixed header instead of leaving
   * room for it — for full-bleed "takeover" moments where the header should
   * disappear behind the section (pair with a z-index above the header's,
   * e.g. `z-55`). Cancels `<main>`'s `pt-16` via negative margin so the
   * box's natural top lands flush with the true viewport top, and switches
   * the default `start` to match (no header-height offset needed once the
   * box already starts there). */
  coverHeader?: boolean;
  /** GSAP ScrollTrigger's native `snap` config — settles the scrub to the
   * nearest point after scrolling stops instead of leaving it wherever
   * input happened to end. Always a function of `root`, called once at
   * setup — snap points here depend on rendered layout (e.g. "the progress
   * at which each item is centered"), so there's no useful static-value
   * form to also support, and a bare value would collide with GSAP's own
   * `SnapFunc` shape in the union and make the call site's type ambiguous. */
  snap?: (root: HTMLDivElement) => ScrollTrigger.Vars["snap"];
}

/**
 * Pins `children` in place and scrubs a caller-built GSAP timeline over the
 * pinned scroll distance, then releases. Reduced-motion users never get a
 * ScrollTrigger/pin constructed at all — content renders in normal static
 * flow — mirroring how SmoothScrollProvider skips constructing Lenis rather
 * than constructing-then-disabling it. The two branches are force-remounted
 * via `key` rather than patched in place, so GSAP's pin-spacer DOM surgery
 * can never race React reconciliation if the OS setting flips mid-session.
 */
export function ScrollArrest({
  children,
  className,
  duration = 1,
  scrub = 1,
  start,
  markers = false,
  animate,
  onToggleActive,
  coverHeader = false,
  snap,
}: ScrollArrestProps) {
  const resolvedStart = start ?? (coverHeader ? "top top" : `top top+=${HEADER_OFFSET_PX}`);
  const reducedMotion = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      const timeline = gsap.timeline({ paused: true });
      animate({ timeline, root: root.current });

      const resolvedSnap = snap?.(root.current);

      ScrollTrigger.create({
        trigger: root.current,
        start: resolvedStart,
        end: () => `+=${window.innerHeight * duration}`,
        pin: true,
        scrub,
        snap: resolvedSnap,
        animation: timeline,
        invalidateOnRefresh: true,
        markers,
        onEnter: () => onToggleActive?.(true),
        onEnterBack: () => onToggleActive?.(true),
        onLeave: () => onToggleActive?.(false),
        onLeaveBack: () => onToggleActive?.(false),
      });

      // Covers unmount (e.g. route change mid-pin) — useGSAP's automatic
      // revert kills the ScrollTrigger itself, but never calls the leave
      // callback, so without this the outside state it flipped could stay
      // stuck "active" after this section is gone.
      return () => onToggleActive?.(false);
    },
    { scope: root, dependencies: [], revertOnUpdate: false },
  );

  if (reducedMotion) {
    return (
      <div key="static" className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={root} key="arrest" className={cn(coverHeader && "-mt-16", className)}>
      {children}
    </div>
  );
}

export default ScrollArrest;
