"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { ParallaxFrame, MASONRY_SLOTS } from "@/components/shared/ParallaxReveal";
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
  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const post of posts) {
      for (const tag of post.tags ?? []) set.add(tag);
    }
    return Array.from(set);
  }, [posts]);

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = activeTag
    ? posts.filter((post) => post.tags?.includes(activeTag))
    : posts;

  return (
    <section className="px-6 pt-16 pb-32 md:px-10">
      <div className="mx-auto max-w-400">
        {/* <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-2 border-b border-border pb-6 text-xs tracking-normal lowercase">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={cn(
                "transition-colors hover:text-foreground",
                activeTag === tag ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {tag}
            </button>
          ))}
        </div> */}

        <p className="mt-10 max-w-4xl font-heading text-4xl leading-[1.15] font-light tracking-tight md:text-6xl">
          A running notebook where{" "}
          <span className="text-muted-foreground">{tags.join(", ")}</span> come
          together as one continuous line of thinking.
        </p>

        <button
          type="button"
          onClick={() => setActiveTag(null)}
          disabled={!activeTag}
          className="mt-8 font-heading text-2xl tracking-tight transition-colors enabled:hover:text-cta disabled:cursor-default"
        >
          [{activeTag ?? "All"}]
        </button>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12">
          {filtered.map((post, i) => {
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
                    <span className="self-start text-[11px] tracking-normal text-muted-foreground lowercase">
                      entry
                    </span>
                    <span className="font-heading text-lg leading-snug transition-colors group-hover:text-cta">
                      {post.title}
                    </span>

                    <span className="self-start text-[11px] tracking-normal text-muted-foreground lowercase">
                      read
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(post.date)}
                      {post.readingTime
                        ? ` — ${post.readingTime} min read`
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
