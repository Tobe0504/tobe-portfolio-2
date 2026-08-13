"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CoverArt } from "@/components/shared/CoverArt";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SelectedWorkProps {
  projects: Project[];
}

function chronological(projects: Project[]) {
  return [...projects].sort(
    (a, b) => a.year - b.year || (a.order ?? 0) - (b.order ?? 0),
  );
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const reducedMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const ordered = chronological(projects);

  useGSAP(
    () => {
      if (reducedMotion || !railRef.current || !fillRef.current) return;

      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: railRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: railRef, dependencies: [reducedMotion] },
  );

  return (
    <section className="px-6 py-24 md:px-10">
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
            className="text-xs tracking-normal text-muted-foreground lowercase transition-colors hover:text-cta"
          >
            View all work →
          </Link>
        </div>

        <div ref={railRef} className="relative mt-20 md:mt-24">
          <div className="absolute inset-y-0 left-4 w-px bg-border md:left-1/2 md:-translate-x-1/2">
            <div
              ref={fillRef}
              className={cn(
                "h-full w-full origin-top bg-cta",
                !reducedMotion && "scale-y-0",
              )}
            />
          </div>

          <ol className="flex flex-col gap-20 md:gap-28">
            {ordered.map((project, i) => {
              const onRight = i % 2 === 1;
              return (
                <li key={project.slug} className="relative">
                  <RevealOnScroll
                    delay={(i % 4) * 0.06}
                    className="md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10"
                  >
                    <span className="absolute top-8 left-4 z-10 size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-cta bg-background md:static md:col-start-2 md:size-3 md:translate-x-0 md:translate-y-0 md:justify-self-center" />

                    <div
                      className={cn(
                        "pl-12 md:pl-0",
                        onRight ? "md:col-start-3" : "md:col-start-1",
                      )}
                    >
                      <Link
                        href={`/work/${project.slug}`}
                        className="group block"
                        data-cursor-label="View project"
                      >
                        {/* aspect-[16/10] matches the real screenshots' own
                            ~1.6 ratio (they're desktop captures) — the old
                            4/3 was cropping a meaningful strip off every
                            one. max-w-lg caps how large they're ever asked
                            to render: the source screenshots read soft
                            past a few hundred px regardless of their large
                            reported pixel dimensions, so displaying them
                            smaller (not fetching them smaller) is what
                            actually keeps them looking sharp — the wider
                            they're stretched, the more that softness shows. */}
                        <div className="relative aspect-16/10 w-full max-w-lg overflow-hidden rounded-xl">
                          <CoverArt
                            {...project.cover}
                            fallbackSeed={project.slug}
                            sizes="(min-width: 768px) 32rem, 100vw"
                            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
                        </div>
                        <p className="mt-4 text-[11px] tracking-normal text-muted-foreground lowercase">
                          {project.category} — {project.year}
                          {project.live === false ? " — no longer live" : ""}
                        </p>
                        <h3 className="mt-1 font-heading text-2xl transition-colors group-hover:text-cta md:text-3xl">
                          {project.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 max-w-sm text-sm text-muted-foreground">
                          {project.summary}
                        </p>
                      </Link>
                    </div>
                  </RevealOnScroll>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default SelectedWork;
