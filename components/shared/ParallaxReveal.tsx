"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Hand-curated slots cycled across a filtered list — varied column span,
 * aspect ratio, and vertical offset instead of a strict repeating grid, so
 * the page reads as loosely curated rather than templated. Same idea as
 * Moodboard's ROW_SLOTS (madeinevolve.com/projects is the direct
 * reference): the "randomness" is designed, not runtime-generated, so it
 * never produces an awkward pairing. Shared between /journal and the work
 * grid view so both masonry sections stay visually identical rather than
 * two hand-tuned copies drifting apart.
 *
 * Spans average out around 4/12 (three per row on desktop) rather than the
 * ~6/12 they used to — cards that wide were rendering each image at nearly
 * half the container's width, which read as oversized next to the actual
 * content. Grouped in threes that each sum to 12 (4+4+4, 3+5+4, 5+3+4) so
 * rows still pack cleanly; the variation within each group of three is
 * where the "not a strict grid" feel now lives instead of in the width. */
export const MASONRY_SLOTS = [
  { col: "md:col-span-4", aspect: "aspect-[4/3]", offset: "" },
  { col: "md:col-span-4", aspect: "aspect-[3/4]", offset: "md:mt-16" },
  { col: "md:col-span-4", aspect: "aspect-square", offset: "md:mt-6" },
  { col: "md:col-span-3", aspect: "aspect-[4/5]", offset: "md:mt-10" },
  { col: "md:col-span-5", aspect: "aspect-[4/3]", offset: "" },
  { col: "md:col-span-4", aspect: "aspect-square", offset: "md:mt-4" },
];

/**
 * Generic scroll-linked parallax frame — wraps whatever visual (a real
 * `<Image>`, a generated `<CoverArt>`, anything) in an oversized,
 * scroll-tracked layer so the same "settle in, then drift gently while
 * visible" motion works regardless of what's actually being rendered
 * inside it. Scroll progress is tracked per-card (not the page's overall
 * scrollYProgress) since cards sit at different heights in a masonry. The
 * inner layer is oversized (inset-[-10%]) so the parallax travel never
 * reveals empty space at the frame's edges, and collapses to a static
 * frame for reduced-motion users instead of just a slower drift.
 */
export function ParallaxFrame({
  aspect,
  className,
  children,
}: {
  aspect: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden rounded-lg bg-muted",
        aspect,
        className,
      )}
    >
      <motion.div
        className="absolute inset-[-10%]"
        style={reducedMotion ? undefined : { y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
