"use client";

import { useState } from "react";

import { CoverArt } from "@/components/shared/CoverArt";
import type { GalleryItem } from "@/lib/content";
import { cn } from "@/lib/utils";

import { GalleryLightbox } from "./GalleryLightbox";

const spanToAspect: Record<GalleryItem["span"], string> = {
  s: "aspect-square",
  m: "aspect-3/4",
  l: "aspect-3/5",
};

/**
 * Pinterest-style masonry via CSS multi-column layout — each tile keeps its
 * own intrinsic height instead of being forced into a row, and
 * `break-inside-avoid` stops a tile splitting across columns. No JS layout
 * library needed.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 gap-1 sm:columns-3 lg:columns-4">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open image ${i + 1} of ${items.length}`}
            className={cn(
              "mb-1 block w-full cursor-zoom-in overflow-hidden rounded-sm break-inside-avoid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lemon",
              spanToAspect[item.span],
            )}
          >
            <CoverArt
              accent={item.accent}
              image={item.image}
              fallbackSeed={item.id}
              className="h-full w-full transition-transform duration-500 ease-out hover:scale-105"
            />
          </button>
        ))}
      </div>

      <GalleryLightbox items={items} index={openIndex} onIndexChange={setOpenIndex} />
    </>
  );
}

export default GalleryGrid;
