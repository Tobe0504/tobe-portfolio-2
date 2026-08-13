import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { CoverArt } from "@/components/shared/CoverArt";
import type { GalleryAspect, PersonalProject } from "@/lib/content";
import { cn } from "@/lib/utils";

const ASPECT_CLASS: Record<GalleryAspect, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

function StatusPill({ status }: { status: PersonalProject["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] tracking-normal lowercase",
        status === "in progress" && "border-cta/40 text-cta",
        status === "shipped" && "border-border text-muted-foreground",
        status === "paused" && "border-border text-muted-foreground/60",
      )}
    >
      {status}
    </span>
  );
}

export function PersonalProjectDetail({ project }: { project: PersonalProject }) {
  return (
    <article className="px-6 pt-32 pb-28 md:px-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/playground"
          className="text-xs tracking-normal text-muted-foreground lowercase transition-colors hover:text-cta"
        >
          ← Playground
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <StatusPill status={project.status} />
          {project.timeline ? (
            <span className="text-xs tracking-normal text-muted-foreground lowercase">
              {project.timeline}
            </span>
          ) : null}
        </div>
        <h1 className="mt-4 font-heading text-4xl leading-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{project.summary}</p>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs tracking-normal text-muted-foreground lowercase transition-colors hover:text-cta"
          >
            Visit site
            <ArrowUpRight className="size-3.5" />
          </a>
        ) : null}

        <div className="mt-10 aspect-[16/10] w-full overflow-hidden rounded-lg border border-border">
          <CoverArt {...project.cover} fallbackSeed={project.slug} className="h-full w-full" />
        </div>

        {project.problem?.length ? (
          <div className="mt-12">
            <p className="text-xs tracking-normal text-muted-foreground lowercase">
              The problem
            </p>
            <div className="mt-4 flex flex-col gap-4">
              {project.problem.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-foreground/90">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {project.approach?.length ? (
          <div className="mt-12">
            <p className="text-xs tracking-normal text-muted-foreground lowercase">
              The approach
            </p>
            <div className="mt-4 flex flex-col gap-4">
              {project.approach.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-foreground/90">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {project.gallery?.length ? (
          <div className="mt-12 flex flex-col gap-6">
            {project.gallery.map((piece, i) => (
              <figure key={i} className="flex flex-col gap-3">
                <div
                  className={cn(
                    "overflow-hidden rounded-lg border border-border",
                    ASPECT_CLASS[piece.aspect],
                  )}
                >
                  <CoverArt {...piece.cover} fallbackSeed={`${project.slug}-${i}`} />
                </div>
                {piece.caption ? (
                  <figcaption className="text-[11px] tracking-normal text-muted-foreground lowercase">
                    {piece.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        ) : null}

        {project.tags?.length ? (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-[10px] tracking-normal text-muted-foreground lowercase"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default PersonalProjectDetail;
