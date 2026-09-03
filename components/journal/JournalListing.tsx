"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ParallaxFrame,
  MASONRY_SLOTS,
} from "@/components/shared/ParallaxReveal";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import type { JournalPost } from "@/lib/content";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function JournalListing({ posts }: { posts: JournalPost[] }) {
  return (
    <section className="px-6 pt-16 pb-32 md:px-10">
      <div className="mx-auto max-w-400">
        {/* This page had no heading of any kind — every other route has one,
            so /journal announced nothing to a screen reader or a crawler. The
            sentence that used to sit here was the page's only large type, but
            it was a <p>, so it looked like a heading without being one. */}
        <p className="text-xs tracking-normal text-muted-foreground lowercase">
          Journal
        </p>
        <h1 className="mt-10 max-w-4xl font-heading text-4xl leading-[1.15] font-light tracking-tight md:text-6xl">
          A running notebook. One continuous line of thinking, published
          whenever it finishes forming.
        </h1>

        {/* The tag list and its `[All]` reset button are gone. `setActiveTag`
            was never called with a tag — nothing rendered the chips — so the
            filter could only ever be reset to the state it was already in, and
            the button sat permanently disabled. The sentence above also read
            "where Life come together" the moment there was a single tag: a
            sentence assembled around a variable, which breaks as soon as the
            variable is not plural. Worth rebuilding, with real chips, when
            there are enough entries to filter. */}

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12">
          {posts.map((post, i) => {
            const slot = MASONRY_SLOTS[i % MASONRY_SLOTS.length];
            return (
              <RevealOnScroll
                key={post.slug}
                delay={0.06 * (i % 3)}
                className={cn("col-span-1", slot.col, slot.offset)}
              >
                <Link href={`/journal/${post.slug}`} className="group block">
                  <ParallaxFrame aspect={slot.aspect}>
                    <Image
                      src={post.coverImage.src}
                      alt={post.coverImage.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </ParallaxFrame>

                  <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5">
                    <span className="self-start text-xs sm:text-[11px] tracking-normal text-muted-foreground lowercase">
                      entry
                    </span>
                    <span className="font-heading text-lg leading-snug transition-colors group-hover:text-cta">
                      {post.title}
                    </span>

                    <span className="self-start text-xs sm:text-[11px] tracking-normal text-muted-foreground lowercase">
                      read
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(post.date)}
                      {post.readingTime
                        ? ` · ${post.readingTime} min read`
                        : ""}
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default JournalListing;
