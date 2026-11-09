import Image from "next/image";
import Link from "next/link";

import { JournalFigure } from "@/components/journal/JournalFigure";
import type { JournalBlock, JournalPost } from "@/lib/content";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function JournalBlockView({ block, index }: { block: JournalBlock; index: number }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-lg leading-relaxed text-foreground/90">{block.text}</p>
      );
    case "heading": {
      const Tag = block.level === 3 ? "h3" : "h2";
      return (
        <Tag className="mt-4 font-heading text-2xl leading-tight md:text-3xl">
          {block.text}
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote className="border-l-2 border-cta py-1 pl-6 font-heading text-2xl leading-snug text-foreground md:text-3xl">
          {block.text}
          {block.cite ? (
            <cite className="mt-3 block text-sm font-sans text-muted-foreground not-italic">
              {block.cite}
            </cite>
          ) : null}
        </blockquote>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-lg leading-relaxed text-foreground/90">
              <span className="mt-3 size-1 shrink-0 rounded-full bg-cta" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure>
          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(min-width: 768px) 42rem, 100vw"
              className="object-cover"
            />
          </div>
          {block.caption ? (
            <figcaption className="mt-2 text-xs tracking-normal text-muted-foreground lowercase">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    case "figure":
      return (
        <figure
          className={cn(
            "my-4",
            block.wide &&
              "relative left-1/2 w-[min(72rem,calc(100vw-3rem))] -translate-x-1/2",
          )}
        >
          <JournalFigure id={block.figure} />
          {block.caption ? (
            <figcaption className="mt-3 text-xs leading-relaxed tracking-normal text-muted-foreground lowercase">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    default: {
      const exhaustive: never = block;
      return exhaustive;
    }
  }
}

export function JournalPostView({ post }: { post: JournalPost }) {
  return (
    <article className="px-6 pt-32 pb-28 md:px-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/journal"
          className="text-xs tracking-normal text-muted-foreground lowercase transition-colors hover:text-cta"
        >
          ← Journal
        </Link>

        <div className="mt-8 flex items-center gap-4 text-xs tracking-normal text-muted-foreground lowercase">
          <span>{formatDate(post.date)}</span>
          {post.readingTime ? <span>{post.readingTime} min read</span> : null}
        </div>
        <h1 className="mt-4 font-heading text-4xl leading-tight md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-10 flex flex-col gap-6">
          {post.body.map((block, i) => (
            <JournalBlockView key={i} block={block} index={i} />
          ))}
        </div>

        {post.tags?.length ? (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs sm:text-[10px] tracking-normal text-muted-foreground lowercase"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default JournalPostView;
