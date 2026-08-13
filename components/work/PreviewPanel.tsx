"use client";

import { AnimatePresence, motion } from "motion/react";

import { CoverArt } from "@/components/shared/CoverArt";
import type { Project } from "@/lib/content";

interface PreviewPanelProps {
  project: Project | null;
}

/**
 * Fixed-position preview — confirmed via the k95.it research this does NOT
 * track the cursor, only the image source swaps. Desktop-only (xl:block);
 * unmounted entirely on touch by the parent, not just hidden.
 */
export function PreviewPanel({ project }: PreviewPanelProps) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.slug}
          className="pointer-events-none fixed top-1/2 right-[8%] z-40 hidden w-100 aspect-16/10 -translate-y-1/2 overflow-hidden rounded-lg shadow-2xl shadow-black/20 xl:block"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <CoverArt {...project.cover} fallbackSeed={project.slug} sizes="400px" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default PreviewPanel;
