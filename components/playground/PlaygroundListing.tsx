import Link from "next/link";

import { CoverArt } from "@/components/shared/CoverArt";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import type { PersonalProject } from "@/lib/content";
import { cn } from "@/lib/utils";

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

export function PlaygroundListing({ projects }: { projects: PersonalProject[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => {
        const card = (
          <>
            <div className="aspect-4/5 w-full overflow-hidden rounded-lg border border-border">
              <CoverArt {...project.cover} fallbackSeed={project.slug} className="h-full w-full" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <p className="font-heading text-2xl transition-colors group-hover:text-cta">
                {project.title}
              </p>
              <StatusPill status={project.status} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
            {project.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[10px] tracking-normal text-muted-foreground lowercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </>
        );

        return (
          <RevealOnScroll key={project.slug} delay={i * 0.05}>
            <Link href={`/playground/${project.slug}`} className="group block">
              {card}
            </Link>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}

export default PlaygroundListing;
