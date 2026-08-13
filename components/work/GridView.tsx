import Link from "next/link";

import { CoverArt } from "@/components/shared/CoverArt";
import { ParallaxFrame } from "@/components/shared/ParallaxReveal";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Own slot list rather than the shared MASONRY_SLOTS (journal uses that
 * one) — every cover here is a real desktop screenshot at roughly a 16/10
 * ratio, so mixing in the shared list's portrait/square slots would crop a
 * meaningful strip off every image just to hit a shape it was never in.
 * Varying col-span/offset alone still gets the "loosely curated, not a
 * strict grid" feel without fighting the source images' own proportions.
 *
 * Spans average ~4/12 (three per row on desktop) instead of the ~6/12 they
 * used to — that was rendering each screenshot at nearly half the
 * container's width, which is both oversized next to the rest of the page
 * and the exact thing that makes their real softness visible. Grouped in
 * threes that each sum to 12 (4+4+4, 3+5+4, 5+3+4) so rows keep packing
 * cleanly; the variation is in which three you get, not the total width. */
const WORK_SLOTS = [
  { col: "md:col-span-4", offset: "" },
  { col: "md:col-span-4", offset: "md:mt-10" },
  { col: "md:col-span-4", offset: "md:mt-4" },
  { col: "md:col-span-3", offset: "md:mt-6" },
  { col: "md:col-span-5", offset: "" },
  { col: "md:col-span-4", offset: "md:mt-12" },
];

export function GridView({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12">
      {projects.map((project, i) => {
        const slot = WORK_SLOTS[i % WORK_SLOTS.length];
        return (
          <RevealOnScroll
            key={project.slug}
            delay={0.06 * (i % 3)}
            className={cn("col-span-1", slot.col, slot.offset)}
          >
            <Link href={`/work/${project.slug}`} className="group block">
              <ParallaxFrame aspect="aspect-16/10">
                <CoverArt
                  {...project.cover}
                  fallbackSeed={project.slug}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </ParallaxFrame>

              <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5">
                <span className="self-start text-[11px] tracking-normal text-muted-foreground lowercase">
                  work
                </span>
                <span className="font-heading text-lg leading-snug transition-colors group-hover:text-cta">
                  {project.title}
                </span>

                <span className="self-start text-[11px] tracking-normal text-muted-foreground lowercase">
                  info
                </span>
                <span className="text-sm text-muted-foreground">
                  {project.category} — {project.client}, {project.year}
                  {project.live === false ? " — no longer live" : ""}
                </span>
              </div>
            </Link>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}

export default GridView;
