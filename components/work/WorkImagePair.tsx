import { CoverArt } from "@/components/shared/CoverArt";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

/**
 * madeinevolve.com/services pairs two full-bleed photos side by side here —
 * theirs lean on a specific motion-blur photographic style, which is a
 * photography choice rather than a code effect, so this reproduces the
 * composition (two large frames, no caption, staggered reveal) with the
 * site's own generated placeholder art instead of cloning their imagery.
 */
export function WorkImagePair() {
  return (
    <section className="grid grid-cols-1 gap-1 bg-foreground md:grid-cols-2">
      <RevealOnScroll y={0} className="aspect-[4/5] md:aspect-3/4">
        <CoverArt
          accent={5}
          fallbackSeed="work-pair-1"
          className="h-full w-full"
          image={{
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786094563/Statue_of_Goddess_Fortuna_sxkyc2.jpg",
            alt: "Image pair 1",
          }}
        />
      </RevealOnScroll>
      <RevealOnScroll y={0} delay={0.12} className="aspect-[4/5] md:aspect-3/4">
        <CoverArt
          accent={2}
          fallbackSeed="work-pair-2"
          className="h-full w-full"
          image={{
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786094562/__41_gmcrzd.jpg",
            alt: "Image pair 2",
          }}
        />
      </RevealOnScroll>
    </section>
  );
}

export default WorkImagePair;
