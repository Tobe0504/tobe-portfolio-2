"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { usePointerFine } from "@/hooks/use-pointer-fine";
import type { Project } from "@/lib/content";

import { CursorPill } from "./CursorPill";
import { GridView } from "./GridView";
import { ListView } from "./ListView";
import { PreviewPanel } from "./PreviewPanel";
import { ViewToggle, type ViewMode } from "./ViewToggle";

interface WorkListingProps {
  projects: Project[];
}

export function WorkListing({ projects }: WorkListingProps) {
  const [view, setView] = useState<ViewMode>("list");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const pointerFine = usePointerFine();

  const hovered = projects.find((p) => p.slug === hoveredSlug) ?? null;
  const listInteractive = view === "list" && pointerFine;

  return (
    <section className="px-6 pt-16 pb-24 md:px-10">
      <div className="mx-auto max-w-400">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-normal text-muted-foreground lowercase">
              {projects.length} projects
            </p>
            <h1 className="mt-2 font-heading text-5xl font-normal tracking-tight md:text-6xl">
              Work
            </h1>
          </div>
          <ViewToggle view={view} onChange={setView} />
        </div>

        <div
          className="relative mt-14"
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <AnimatePresence mode="wait">
            {view === "list" ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <ListView
                  projects={projects}
                  hoveredSlug={hoveredSlug}
                  onHover={setHoveredSlug}
                  interactive={listInteractive}
                />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <GridView projects={projects} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {listInteractive ? (
        <>
          <PreviewPanel project={hovered} />
          <CursorPill project={hovered} />
        </>
      ) : null}
    </section>
  );
}

export default WorkListing;
