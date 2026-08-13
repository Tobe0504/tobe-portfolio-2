import { CoverArt } from "@/components/shared/CoverArt";
import type { GalleryAspect, Project } from "@/lib/content";
import { cn } from "@/lib/utils";

// portrait is specifically "phone screenshot" in practice, not portrait
// photography — 3/4 was cropping real mobile screenshots hard (they run
// closer to 9/19.5, an actual phone viewport) since the ratios are nowhere
// near each other (0.75 vs ~0.46).
const ASPECT_CLASS: Record<GalleryAspect, string> = {
  portrait: "aspect-[9/19.5]",
  landscape: "aspect-16/10",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

export function MediaReel({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6 px-6 py-16 lg:gap-10 lg:px-10 lg:py-24">
      {project.gallery.map((piece, i) => (
        <figure key={i} className="flex flex-col gap-3">
          <div
            className={cn(
              "overflow-hidden rounded-lg",
              ASPECT_CLASS[piece.aspect],
            )}
          >
            <CoverArt {...piece.cover} fallbackSeed={`${project.slug}-${i}`} />
          </div>
          {piece.caption ? (
            <figcaption className="text-[11px] tracking-normal lowercase opacity-50">
              {piece.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

export default MediaReel;
