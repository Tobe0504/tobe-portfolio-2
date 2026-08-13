import Link from "next/link";

import { HoverDimList } from "@/components/shared/HoverDimList";
import type { Project } from "@/lib/content";

interface ListViewProps {
  projects: Project[];
  hoveredSlug: string | null;
  onHover: (slug: string | null) => void;
  interactive: boolean;
}

/** k95.it/en/works pattern: non-hovered rows dim, hovered row snaps to full
 * contrast — combined with madeinevolve.com/services' numbered-list index
 * (01, 02, 03…) and its proportions: a modest, compact list column rather
 * than full-bleed editorial type, so the fixed PreviewPanel image reads as
 * the dominant visual and the list as the menu you're scanning, not the
 * other way around. */
export function ListView({ projects, hoveredSlug, onHover, interactive }: ListViewProps) {
  return (
    <HoverDimList
      items={projects.map((project) => ({ ...project, key: project.slug }))}
      hoveredKey={hoveredSlug}
      onHover={onHover}
      interactive={interactive}
      className="max-w-2xl"
      renderItem={(project, index) => (
        <Link
          href={`/work/${project.slug}`}
          className="flex items-baseline gap-4 py-5"
        >
          <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex flex-1 flex-col gap-1">
            <span className="font-heading text-2xl font-light md:text-3xl">
              {project.title}
            </span>
            <span className="flex items-center gap-3 text-xs tracking-normal text-muted-foreground lowercase">
              <span>{project.category}</span>
              <span>{project.client}</span>
              <span>{project.year}</span>
              {project.live === false ? <span>no longer live</span> : null}
            </span>
          </span>
        </Link>
      )}
    />
  );
}

export default ListView;
