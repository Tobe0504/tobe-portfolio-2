"use client";

import { useState } from "react";
import Link from "next/link";

import { PreviewPanel } from "@/components/work/PreviewPanel";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

interface SelectedWorkProps {
  projects: Project[];
}

function chronological(projects: Project[]) {
  return [...projects].sort(
    (a, b) => a.year - b.year || (a.order ?? 0) - (b.order ?? 0),
  );
}

/**
 * The index listing from brand.squarespace.com, applied to the project list.
 *
 * Theirs is six names stacked in 85px type with no rules, no thumbnails and no
 * numbers — until you hover one. The hovered row then does two things at once:
 * it swaps from the sans into an italic serif, and its index number appears as
 * a superscript, pushing the name to the right to make room. Nothing else on
 * the row moves. It reads as the list *naming* the thing you are pointing at
 * rather than merely highlighting it, and the face swap is what carries it —
 * a colour change alone at that size would barely register.
 *
 * The serif is already in this project (`--font-display-serif`, Instrument
 * Serif, loaded in the root layout with its italic) and already means this
 * exact thing here: `Highlight` uses italic serif as the site's "one lifted
 * word" device. So the swap lands as the site's own idiom rather than as a
 * borrowed trick.
 *
 * What replaced what: this was an alternating left/right timeline of cover
 * screenshots down a scrubbed vertical rail. The rail went with it — a
 * progress spine reads as "you are moving through a sequence", which was true
 * of the timeline and is not true of a flat index. The covers did not go: they
 * moved into `PreviewPanel`, the same fixed hover preview the /work listing
 * uses, so the screenshots still carry the page on desktop and the list stays
 * the structure. Squarespace shows no preview at all; keeping one is a
 * deliberate departure, because losing every project image from the home page
 * would cost more than matching the reference exactly is worth.
 */
export function SelectedWork({ projects }: SelectedWorkProps) {
  // The preview is desktop-only and unmounted rather than hidden on touch —
  // same contract the /work listing has with this component.
  const pointerFine = usePointerFine();
  const [hovered, setHovered] = useState<string | null>(null);
  const ordered = chronological(projects);
  const active = ordered.find((project) => project.slug === hovered) ?? null;

  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-400">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-normal text-muted-foreground lowercase">
              Selected work
            </p>
            <h2 className="mt-2 max-w-lg font-heading text-4xl leading-tight md:text-5xl">
              A few things I&apos;ve shipped, in order.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center text-xs tracking-normal text-muted-foreground lowercase transition-colors hover:text-cta"
          >
            View all work →
          </Link>
        </div>

        <ol
          className="mt-16 md:mt-20 md:max-w-[58%]"
          onMouseLeave={() => setHovered(null)}
          onBlur={() => setHovered(null)}
        >
          {ordered.map((project, index) => {
            const dimmed = hovered !== null && hovered !== project.slug;
            return (
              <li key={project.slug}>
                <RevealOnScroll delay={(index % 4) * 0.06}>
                  <Link
                    href={`/work/${project.slug}`}
                    data-cursor-label="View project"
                    onMouseEnter={() => setHovered(project.slug)}
                    onFocus={() => setHovered(project.slug)}
                    className={cn(
                      "group relative block py-2 transition-opacity duration-300 md:py-1",
                      // Lighter than the 0.25 the shared HoverDimList uses.
                      // The reference dims nothing at all — the face swap is
                      // its whole signal — but this site has taught its other
                      // listings to dim, so this keeps the cue and pulls it
                      // back to where it supports the swap instead of
                      // out-shouting it.
                      dimmed ? "opacity-45" : "opacity-100",
                    )}
                  >
                    {/* Absolute so its arrival costs no layout: the name's own
                        shift right is what makes room for it, which keeps the
                        two halves of the reveal on the same beat instead of
                        the number nudging the row as it fades. */}
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.35em] left-0 text-xs tracking-normal text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:text-sm"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex flex-wrap items-baseline gap-x-5 md:flex-nowrap">
                      <span // `transition-[translate]`, not `transform`: Tailwind v4 compiles
                        // `translate-x-*` to the standalone `translate` property, so a
                        // transition naming `transform` matches nothing and the shift
                        // snaps. The face swap is deliberately not in the transition —
                        // `font-style` and `font-family` are not animatable, and the
                        // reference's swap is instant too.
                        className="font-heading text-[clamp(2.25rem,7vw,5.5rem)] leading-[1.05] tracking-tight transition-[translate] duration-300 ease-out group-hover:translate-x-[0.6em] group-hover:italic group-hover:[font-family:var(--font-display-serif)] group-focus-visible:translate-x-[0.6em] group-focus-visible:italic group-focus-visible:[font-family:var(--font-display-serif)]"
                      >
                        {project.title}
                      </span>

                      <span className="text-xs sm:text-[11px] tracking-normal text-muted-foreground lowercase md:ml-auto md:pl-8">
                        {project.category}, {project.year}
                        {project.live === false ? ", no longer live" : ""}
                      </span>
                    </span>
                  </Link>
                </RevealOnScroll>
              </li>
            );
          })}
        </ol>
      </div>

      {pointerFine ? <PreviewPanel project={active} /> : null}
    </section>
  );
}

export default SelectedWork;
