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

// Aspect alone was not enough. Every piece rendered at the full width of the
// reel, so a 9/19.5 phone screenshot on a desktop viewport became ~1400px wide
// and ~3000px tall: a phone blown up to the size of a building, sitting in a
// column of laptop screenshots that are genuinely that wide. Capping the
// portrait case at roughly a real handset's width and centring it makes the
// two read at the scale of the devices they were taken on.
const WIDTH_CLASS: Record<GalleryAspect, string> = {
  portrait: "mx-auto w-full max-w-[20rem]",
  landscape: "w-full",
  square: "mx-auto w-full max-w-[36rem]",
  wide: "w-full",
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
              WIDTH_CLASS[piece.aspect],
            )}
          >
            <CoverArt {...piece.cover} fallbackSeed={`${project.slug}-${i}`} />
          </div>
          {piece.caption ? (
            <figcaption
              className={cn(
                "text-xs sm:text-[11px] tracking-normal lowercase opacity-50",
                WIDTH_CLASS[piece.aspect],
              )}
            >
              {piece.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

export default MediaReel;
