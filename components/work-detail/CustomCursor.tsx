"use client";

import { motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

import { usePointerFine } from "@/hooks/use-pointer-fine";

const LABEL_ATTR = "data-cursor-label";

const SPRING = { type: "spring", duration: 0.3, bounce: 0 } as const;

/**
 * Replaces the native cursor only while mounted (this route) and only on
 * fine pointers — sets `document.body.style.cursor` directly rather than a
 * global CSS class, so it can never leak into other routes if unmount ever
 * races a navigation.
 *
 * Any element anywhere on the site can opt into the hover reaction by
 * adding `data-cursor-label="..."`. The ring grows toward it (magnetic
 * "something's interactive here" cue, beautiful-imperfections.com's cursor
 * behavior translated onto our own mark) and a solid label pill appears
 * offset beside it — a separate opaque element rather than text inside the
 * blended ring, since layering a second mix-blend-difference layer on top
 * of the first would composite against the ring's own pixels as much as
 * the page underneath, making legibility unpredictable.
 */
export function CustomCursor() {
  const pointerFine = usePointerFine();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!pointerFine) return;

    document.body.style.cursor = "none";
    setActive(true);

    function onMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    function onOver(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest?.(`[${LABEL_ATTR}]`);
      if (target) setLabel(target.getAttribute(LABEL_ATTR));
    }

    function onOut(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest?.(`[${LABEL_ATTR}]`);
      if (target) setLabel(null);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    return () => {
      document.body.style.cursor = "";
      setActive(false);
      setLabel(null);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [pointerFine, x, y]);

  if (!active) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-100 -translate-x-1/2 -translate-y-1/2 rounded-full border border-background mix-blend-difference"
        style={{ x, y }}
        animate={{ width: label ? 52 : 24, height: label ? 52 : 24 }}
        transition={SPRING}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-100 ml-6 -translate-y-1/2 rounded-full bg-foreground px-3 py-1.5 text-[10px] tracking-normal whitespace-nowrap text-background lowercase"
        style={{ x, y }}
        initial={false}
        animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.75 }}
        transition={SPRING}
      >
        {label}
      </motion.span>
    </>
  );
}

export default CustomCursor;
