import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getGalleryItems } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "A loose, unsorted archive of shots, frames and fragments collected off the clock.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <section className="px-6 pt-32 pb-10 md:px-10">
        <div className="mx-auto max-w-400">
          <p className="text-xs tracking-normal text-muted-foreground lowercase">
            Gallery
          </p>
          <h1 className="mt-2 max-w-2xl font-heading text-4xl leading-tight font-light tracking-tight md:text-5xl">
            A loose, unsorted archive of shots and fragments.
          </h1>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-400">
          <GalleryGrid items={items} />
        </div>
      </section>
    </>
  );
}
