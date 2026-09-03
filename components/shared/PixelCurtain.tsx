"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The scroll glitch from paulkalkbrenner.net, ported.
 *
 * Their bundle builds it as a grid of plain divs and scrubs `autoAlpha` across
 * them one at a time — no canvas, no shader, no image. The whole effect is the
 * *order* the squares flip in, which they compute as:
 *
 *   priority = (rows - 1 - row) * 50 + Math.random() * 300 + Math.sin(col * 0.3) * 30
 *
 * then sort ascending. Read the three terms separately and the design is
 * legible: `(rows-1-row) * 50` sweeps bottom-to-top in bands; `random() * 300`
 * is six bands' worth of jitter, so bands overlap heavily instead of marching
 * in rank; and the sine across columns adds a slow horizontal wave the eye
 * picks up as structure rather than noise. Random alone would look like TV
 * static, and the sweep alone like a window blind — it needs all three.
 *
 * The tween itself is almost nothing: `duration: 0.01` per square with
 * `stagger: { amount: 1.5 }` and `ease: "none"`, so each square is a hard
 * on/off and the 1.5s is purely how long the *sequence* takes. Scrubbed at
 * 0.3, that becomes a dissolve you drive with the scroll wheel.
 */

interface PixelCurtainProps {
  /** `cover` flips the squares on as you scroll in (the incoming colour eats
   * the outgoing one); `reveal` starts solid and dissolves away. */
  mode?: "cover" | "reveal";
  columns?: number;
  rows?: number;
  /** The squares paint in `currentColor`, so the colour comes from a text
   * class here — `text-black` to hand over to a dark section, and so on. */
  className?: string;
}

/** Their defaults are 12×6. 16 columns is a touch finer, which suits squares
 * that have to sit against this site's type rather than against full-bleed
 * photography. */
const DEFAULT_COLUMNS = 16;
const DEFAULT_ROWS = 6;

/** All four straight from their bundle. */
const SCRUB = 0.3;
const PIXEL_DURATION = 0.01;
const STAGGER_AMOUNT = 1.5;
const ROW_STEP = 50;
const JITTER = 300;
const WAVE = 30;

export function PixelCurtain({
  mode = "cover",
  columns = DEFAULT_COLUMNS,
  rows = DEFAULT_ROWS,
  className,
}: PixelCurtainProps) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !root.current) return;

      const grid = root.current;
      const cells = gsap.utils.toArray<HTMLElement>(
        grid.querySelectorAll("[data-pixel]"),
      );
      if (!cells.length) return;

      // Sorted once per mount, not per frame. `Math.random()` here is what
      // stops the dissolve from looking identical on every visit, and being
      // fixed for the life of the mount is what stops it flickering when the
      // scrub runs backwards.
      const ordered = cells
        .map((element) => {
          const row = Number(element.dataset.row);
          const col = Number(element.dataset.col);
          return {
            element,
            priority:
              (rows - 1 - row) * ROW_STEP +
              Math.random() * JITTER +
              Math.sin(col * 0.3) * WAVE,
          };
        })
        .sort((a, b) => a.priority - b.priority)
        .map((entry) => entry.element);

      const from = mode === "cover" ? 0 : 1;
      gsap.set(ordered, { autoAlpha: from });

      gsap.to(ordered, {
        autoAlpha: 1 - from,
        duration: PIXEL_DURATION,
        stagger: { amount: STAGGER_AMOUNT, from: "start" },
        ease: "none",
        scrollTrigger: {
          trigger: grid,
          start: mode === "cover" ? "top bottom" : "top center",
          // `bottom bottom` for cover is the one number here that is *not*
          // the reference's (theirs is `bottom center`), and it is what fixes
          // the hard step at the band's lower edge.
          //
          // The band only works as a transition if the region below it is
          // already the colour the squares are filling with — otherwise the
          // last thing you see is a straight black-to-white line where the
          // band ends. That solid region now sits directly beneath it (see
          // HomeExperience), which makes *when* the band finishes filling the
          // thing that matters: it has to be complete by the moment its own
          // bottom edge — and therefore the top of that solid region — first
          // becomes visible. `bottom bottom` is exactly that moment. The
          // reference's `bottom center` finishes half a viewport too late, so
          // the join scrolls into view while squares are still missing, and
          // the seam shows through the gaps.
          end: mode === "cover" ? "bottom bottom" : "bottom top",
          scrub: SCRUB,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root, dependencies: [reducedMotion, mode, columns, rows] },
  );

  // Reduced motion gets nothing at all rather than a static block of squares
  // sitting across the page — the squares only mean something in motion.
  if (reducedMotion) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className={cn("pointer-events-none flex w-full", className)}
    >
      {Array.from({ length: columns }, (_, col) => (
        <div key={col} className="flex min-w-0 flex-1 flex-col justify-end">
          {Array.from({ length: rows }, (_, row) => (
            <div
              key={row}
              data-pixel
              data-row={row}
              data-col={col}
              // aspect-square + flex-1 columns is what makes the band size
              // itself: the squares stay square at every viewport, so the
              // band's height is simply rows × (viewport width / columns).
              className="aspect-square w-full bg-current [backface-visibility:hidden] [will-change:opacity]"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default PixelCurtain;
