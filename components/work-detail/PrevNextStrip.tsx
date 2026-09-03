import Link from "next/link";

import { CoverArt } from "@/components/shared/CoverArt";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

function NavCard({
  project,
  label,
  align,
}: {
  project: Project;
  label: string;
  align: "left" | "right";
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group flex flex-1 items-center gap-5 px-6 py-10 lg:px-10",
        align === "right" ? "flex-row-reverse text-right" : "text-left",
      )}
    >
      <div className="size-16 shrink-0 overflow-hidden rounded-md md:size-20">
        <CoverArt {...project.cover} fallbackSeed={project.slug} />
      </div>
      <div>
        <p className="text-xs sm:text-[11px] tracking-normal lowercase opacity-50">
          {label}
        </p>
        <p className="mt-1 font-heading text-2xl transition-colors group-hover:text-cta md:text-3xl">
          {project.title}
        </p>
      </div>
    </Link>
  );
}

interface PrevNextStripProps {
  prev: Project | null;
  next: Project | null;
}

export function PrevNextStrip({ prev, next }: PrevNextStripProps) {
  if (!prev && !next) return null;

  return (
    <div className="flex flex-col divide-y divide-background/15 border-t border-background/15 sm:flex-row sm:divide-x sm:divide-y-0">
      {prev ? <NavCard project={prev} label="Previous" align="left" /> : <div className="flex-1" />}
      {next ? <NavCard project={next} label="Next" align="right" /> : <div className="flex-1" />}
    </div>
  );
}

export default PrevNextStrip;
