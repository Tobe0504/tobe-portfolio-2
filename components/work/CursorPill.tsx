"use client";

import { motion, useMotionValue } from "motion/react";
import { useEffect } from "react";

import type { Project } from "@/lib/content";

interface CursorPillProps {
  project: Project | null;
}

/**
 * Direct 1:1 cursor tracking (no lerp) via motion values — writes straight
 * to the DOM, bypassing React re-render per mousemove event.
 */
export function CursorPill({ project }: CursorPillProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    function onMove(event: MouseEvent) {
      x.set(event.clientX + 18);
      y.set(event.clientY + 18);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-cta px-3.5 py-1.5 text-xs sm:text-[11px] tracking-normal text-cta-foreground lowercase"
      style={{ x, y }}
      animate={{ opacity: project ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {project?.category ?? ""}
    </motion.div>
  );
}

export default CursorPill;
