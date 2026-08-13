"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { useDarkSection } from "@/components/chrome/DarkSectionProvider";
import { CoverArt } from "@/components/shared/CoverArt";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface WorkHeroProps {
  /** A handful of real category strings from the project data — spread
   * across the top the way madeinevolve.com/services opens with "Brand
   * Direction … Performance Marketing … Advanced Tech". */
  labels: string[];
  statement: string;
}

/**
 * madeinevolve.com/services' open: a full-bleed photo, a row of category
 * labels near the top, one closing statement pinned near the bottom. Their
 * version crossfades the photo into a shrinking corner thumbnail as a case
 * study grows in behind it — that's a bespoke, hand-built transition tied
 * to their specific case-study content, not something worth cloning
 * wholesale for a placeholder image. What's reproduced here is the
 * composition and the feel: dark photo backdrop, a living image instead of
 * a static one, both matching the reference's restraint.
 */
export function WorkHero({ labels, statement }: WorkHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { setActive } = useDarkSection();

  // Cursor-driven sideways drift — raw position goes through a spring so
  // the image trails the pointer instead of snapping to it 1:1 (that's
  // CursorPill's job elsewhere; this wants to feel slow and photographic).
  // Tracked on window, not the section, since the section is full-viewport
  // width anyway and this avoids re-binding the listener on every mount.
  const pointerX = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 40, damping: 20, mass: 1 });
  const x = useTransform(springX, [-0.5, 0.5], ["-3%", "3%"]);

  useEffect(() => {
    if (reducedMotion) return;
    function onMove(event: MouseEvent) {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [pointerX, reducedMotion]);

  // Header inverts to light-on-dark for as long as this photo hero is the
  // thing under it — same "own the header while mounted" contract Home's
  // ScrollTheme uses, just a plain on/off instead of a continuous scrub
  // since this section doesn't gradually lighten the way Home's does.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.intersectionRatio > 0.5),
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      setActive(false);
    };
  }, [setActive]);

  return (
    <section
      ref={sectionRef}
      // -mt-16 cancels <main>'s pt-16 (there to clear the fixed header
      // everywhere else) so this section actually starts at the true
      // viewport top instead of 64px below it — the header then overlays
      // its own translucent bar directly on the photo instead of sitting
      // in a dead gray strip above it. h-dvh (not min-h-screen) keeps it
      // at exactly one viewport, matching "this should be 100vh" rather
      // than "at least" 100vh.
      className="relative -mt-16 flex h-dvh flex-col overflow-hidden bg-foreground text-background"
    >
      <div className="absolute inset-[-10%]">
        <motion.div
          className="h-full w-full"
          style={reducedMotion ? undefined : { x }}
          animate={reducedMotion ? undefined : { scale: [1, 1.06, 1] }}
          transition={
            reducedMotion
              ? undefined
              : { duration: 16, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <CoverArt
            accent={3}
            fallbackSeed="work-hero"
            className="h-full w-full opacity-60"
            image={{
              src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786092749/1115415032728872879_h0xmpw.jpg",
              alt: "Works BG",
            }}
          />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-foreground/60" />

      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-x-10 gap-y-2 px-6 pb-16 text-xs tracking-normal lowercase opacity-80 md:px-10 hidden">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <p className="relative px-6 pb-16 font-heading text-3xl leading-tight tracking-tight md:px-10 md:text-5xl md:leading-tight mt-auto">
        {statement}
      </p>
    </section>
  );
}

export default WorkHero;
