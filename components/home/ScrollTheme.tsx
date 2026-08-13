"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useDarkSection } from "@/components/chrome/DarkSectionProvider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Light matches --background exactly. Dark is pure black, not
// --foreground's warm near-black (#0c0a09) — StatsReveal/SignatureSequence
// are transparent (see those files) so this only has to read as "dark
// mode" on its own, and a warm tint there read as brown, not black.
const BG_LIGHT = "#ffffff";
const BG_DARK = "#000000";
// Text color runs the opposite direction of the background: dark ink on
// the light background, light on the black one. Matches --foreground's
// actual ink tone rather than pure black, same as normal body copy.
const FG_LIGHT = "#0c0a09";
const FG_DARK = "#ffffff";

interface Stops {
  input: number[];
  bg: string[];
  fg: string[];
  dark: number[];
}

interface BoundaryRefs {
  /** Bottom edge of the last normal-flow section that needs a light
   * background for its own dark text (SelectedWork) — the transition to
   * dark must never start before this, or that text goes dark-on-dark. */
  lightEndRef: RefObject<HTMLDivElement | null>;
  /** Top edge of the first pinned dark section (StatsReveal). */
  darkStartRef: RefObject<HTMLDivElement | null>;
  /** Bottom edge of the last pinned dark section (SignatureSequence). */
  darkEndRef: RefObject<HTMLDivElement | null>;
  /** Top edge of the section that needs light back (Moodboard). */
  lightStartRef: RefObject<HTMLDivElement | null>;
}

/**
 * StatsReveal/SignatureSequence are `min-h-screen` sections that scroll up
 * from below in normal flow for a full viewport-height *before* their pin
 * ever engages — so "start the dark transition when StatsReveal's pin
 * engages" (its literal top) leaves the entire approach, where its content
 * is already visibly on screen, stuck on the old light background. The fix
 * is a viewport-height of run-up on each side: dark starts one viewport
 * before StatsReveal's top (as it's first entering from the bottom) and
 * finishes exactly at its top (pin engage); light starts at
 * SignatureSequence's bottom (pin release) and finishes one viewport later
 * (once its content has fully scrolled off). Each is still clamped against
 * the adjacent section's own safe boundary (SelectedWork / Moodboard) so a
 * short gap never starts the transition through still-visible content.
 */
function useSectionStops({
  lightEndRef,
  darkStartRef,
  darkEndRef,
  lightStartRef,
}: BoundaryRefs) {
  const [stops, setStops] = useState<Stops | null>(null);

  useEffect(() => {
    function bottomOf(ref: RefObject<HTMLDivElement | null>) {
      const el = ref.current;
      return el ? el.offsetTop + el.offsetHeight : null;
    }
    function topOf(ref: RefObject<HTMLDivElement | null>) {
      return ref.current?.offsetTop ?? null;
    }

    function measure() {
      const lightEnd = bottomOf(lightEndRef);
      const darkStart = topOf(darkStartRef);
      const darkEnd = bottomOf(darkEndRef);
      const lightStart = topOf(lightStartRef);
      if (lightEnd == null || darkStart == null || darkEnd == null || lightStart == null) {
        return;
      }

      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const vh = window.innerHeight;
      const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
      const frac = (px: number) => clamp01(px / total);

      const p1 = Math.max(frac(lightEnd), frac(darkStart - vh));
      const p2 = Math.max(p1 + 0.005, frac(darkStart));
      const p3 = Math.max(p2, frac(darkEnd));
      const p4 = Math.max(p3 + 0.005, Math.min(frac(lightStart), frac(darkEnd + vh)));

      setStops({
        input: [0, p1, p2, p3, p4, 1],
        bg: [BG_LIGHT, BG_LIGHT, BG_DARK, BG_DARK, BG_LIGHT, BG_LIGHT],
        fg: [FG_LIGHT, FG_LIGHT, FG_DARK, FG_DARK, FG_LIGHT, FG_LIGHT],
        dark: [0, 0, 1, 1, 0, 0],
      });
    }

    measure();
    // GSAP adds/resizes pin-spacers for every ScrollArrest on the page
    // (SelectedWork's own scrub, both pinned sections, Moodboard) after
    // this component's first mount — refresh whenever that settles rather
    // than guessing a fixed delay, or these boundaries measure stale
    // pre-pin-spacer positions.
    const onRefresh = () => measure();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    const settleId = window.setTimeout(measure, 500);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(settleId);
      window.removeEventListener("resize", measure);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
    };
  }, [lightEndRef, darkStartRef, darkEndRef, lightStartRef]);

  return stops;
}

/**
 * Continuously scrubs the page's real background AND foreground text color
 * between light and true black/white as the user scrolls Home — see
 * useSectionStops for why the transition window is tied to each pinned
 * section's viewport entry/exit rather than the gap between sections.
 * Writes to `document.body.style.backgroundColor` and a `--scroll-fg`
 * custom property (StatsReveal/SignatureSequence read it via
 * `text-[var(--scroll-fg)]`) rather than an overlay div, so there's no
 * z-index to reconcile against the header (z-50) or the pinned sections
 * (z-51/z-55) sitting above it.
 *
 * Also the single source of truth for the header's dark/light flip on this
 * page — replaces SignatureSequence's own `onToggleActive`, since "is the
 * page dark right now" is exactly what this value already tracks.
 */
export function ScrollTheme(props: BoundaryRefs) {
  const reducedMotion = useReducedMotion();
  const stops = useSectionStops(props);
  const { setActive } = useDarkSection();
  const { scrollYProgress } = useScroll();

  const bg = useTransform(
    scrollYProgress,
    stops?.input ?? [0, 1],
    stops?.bg ?? [BG_LIGHT, BG_LIGHT],
  );
  const fg = useTransform(
    scrollYProgress,
    stops?.input ?? [0, 1],
    stops?.fg ?? [FG_LIGHT, FG_LIGHT],
  );
  const darkness = useTransform(
    scrollYProgress,
    stops?.input ?? [0, 1],
    stops?.dark ?? [0, 0],
  );

  // useTransform re-fires "change" on every scroll frame regardless of
  // whether the *output* actually moved (long stretches of the page sit on
  // a flat light or dark plateau) — skipping the DOM write when the value
  // is unchanged avoids forcing a style/paint pass dozens of times a
  // second while GSAP's own scrub (the SelectedWork spine, the pinned
  // sections) is competing for the same frame budget.
  const lastBg = useRef<string | null>(null);
  const lastFg = useRef<string | null>(null);
  const lastDark = useRef<boolean | null>(null);

  useMotionValueEvent(bg, "change", (latest) => {
    if (reducedMotion || latest === lastBg.current) return;
    lastBg.current = latest;
    document.body.style.backgroundColor = latest;
    // Header reads --scroll-bg directly (bg-(--scroll-bg)/80) so its own
    // translucent bar rides this same scrub continuously instead of
    // hard-flipping between two fixed colors at a threshold.
    document.documentElement.style.setProperty("--scroll-bg", latest);
  });
  useMotionValueEvent(fg, "change", (latest) => {
    if (reducedMotion || latest === lastFg.current) return;
    lastFg.current = latest;
    document.documentElement.style.setProperty("--scroll-fg", latest);
  });
  useMotionValueEvent(darkness, "change", (latest) => {
    if (reducedMotion) return;
    const isDark = latest > 0.5;
    if (isDark === lastDark.current) return;
    lastDark.current = isDark;
    setActive(isDark);
  });

  useEffect(() => {
    if (!reducedMotion) return;
    document.body.style.backgroundColor = "";
    // StatsReveal/SignatureSequence fall back to their own opaque
    // bg-foreground for reduced-motion users, so their text needs to stay
    // light rather than resolve to --scroll-fg's light-mode default.
    document.documentElement.style.setProperty("--scroll-fg", FG_DARK);
    setActive(false);
  }, [reducedMotion, setActive]);

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.removeProperty("--scroll-bg");
      document.documentElement.style.removeProperty("--scroll-fg");
      setActive(false);
    };
  }, [setActive]);

  return null;
}

export default ScrollTheme;
