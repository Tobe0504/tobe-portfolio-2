"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";

import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { CoverArt } from "@/components/shared/CoverArt";
import { ScrollArrest } from "@/components/shared/ScrollArrest";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { GalleryItem } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Same "loose, not gridded" character as before (varied size/rotation),
 * now laid out in a single horizontal row instead of a scattered 2D
 * canvas — lift adds a little vertical jitter so the row doesn't read as a
 * straight line. Cycles if there are more featured items than slots. */
const ROW_SLOTS = [
  { size: 280, rotate: -4, lift: 0 },
  { size: 220, rotate: 3, lift: 40 },
  { size: 320, rotate: -2, lift: -20 },
  { size: 240, rotate: 5, lift: 30 },
  { size: 260, rotate: 2, lift: -30 },
  { size: 300, rotate: -5, lift: 10 },
  { size: 220, rotate: 4, lift: -40 },
  { size: 280, rotate: -3, lift: 20 },
  { size: 250, rotate: 3, lift: -10 },
  { size: 310, rotate: -3, lift: 35 },
  { size: 240, rotate: 5, lift: -25 },
  { size: 270, rotate: -4, lift: 15 },
];

/** How much bigger the tile nearest the viewport's horizontal center gets,
 * and how wide that falloff is as a fraction of viewport width. */
const FOCUS_MAX_SCALE = 0.24;
const FOCUS_FALLOFF_VW = 0.55;

interface MoodboardProps {
  items: GalleryItem[];
}

/**
 * A pinned horizontal-scroll gallery: vertical scroll input drives the row
 * sideways while the section holds its position, then releases back into
 * normal vertical scroll once the row has fully passed. Heading and gallery
 * both live inside the same `h-screen` pinned block — the pin engages
 * almost immediately on entering the section instead of after a separate
 * heading block scrolls away first, so nothing about the page's chrome
 * (header included) is ever mid-transition for an extended, disconnected
 * stretch of scroll.
 *
 * The tile nearest the viewport's horizontal center scales up ("in focus"),
 * and scrolling snaps to whichever tile is closest once input stops —
 * both driven by the same per-frame position read, and both computed
 * fresh rather than assuming even spacing (tile widths vary).
 */
export function Moodboard({ items }: MoodboardProps) {
  const reducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Opaque only while actually pinned. Before the pin engages, this section
  // is still scrolling up from below like any normal-flow content — an
  // unconditional opaque background here would go solid white the moment
  // it enters the viewport, well before ScrollTheme's own background has
  // finished lightening, creating a hard seam against the still-dark page
  // above it. Once pinned it does need to be opaque (its own content has to
  // read cleanly, and it's what stops SignatureSequence's tail end from
  // showing through underneath).
  const [pinned, setPinned] = useState(false);

  if (reducedMotion) {
    return (
      <section className="border-t border-border px-6 py-24 md:px-10">
        <MoodboardHeading />
        <div className="mt-14 flex flex-wrap items-start justify-center gap-6">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open image ${i + 1} of ${items.length}`}
              data-cursor-label="Zoom in"
              className="moodboard-tile group aspect-3/4 w-40 cursor-zoom-in overflow-hidden rounded-lg border border-border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lemon"
            >
              <CoverArt
                accent={item.accent}
                image={item.image}
                fallbackSeed={item.id}
                className="h-full w-full"
              />
            </button>
          ))}
        </div>
        <GalleryLightbox
          items={items}
          index={openIndex}
          onIndexChange={setOpenIndex}
        />
      </section>
    );
  }

  return (
    // No border-t here (unlike the reduced-motion return above) — that
    // border is a fixed --border gray, subtle against a permanent white
    // background but a visible seam against ScrollTheme's dynamic one.
    <section>
      <ScrollArrest
        duration={Math.max(1.5, items.length * 0.35)}
        className={cn(
          "relative flex h-screen flex-col overflow-hidden",
          pinned && "bg-background",
        )}
        onToggleActive={setPinned}
        animate={({ timeline, root }) => {
          const track = root.querySelector<HTMLElement>("[data-track]");
          if (!track) return;
          const distance = track.scrollWidth - root.clientWidth;
          if (distance <= 0) return;

          const tiles = Array.from(
            track.querySelectorAll<HTMLElement>(".moodboard-tile"),
          );

          function syncFocus() {
            const viewportCenter = window.innerWidth / 2;
            const falloff = window.innerWidth * FOCUS_FALLOFF_VW;
            for (const tile of tiles) {
              const tilt = Number(tile.dataset.tilt) || 0;
              const lift = Number(tile.dataset.lift) || 0;
              const rect = tile.getBoundingClientRect();
              const tileCenter = rect.left + rect.width / 2;
              const proximity = Math.max(
                0,
                1 - Math.abs(tileCenter - viewportCenter) / falloff,
              );
              const scale = 1 + proximity * FOCUS_MAX_SCALE;
              tile.style.transform = `rotate(${tilt}deg) translateY(${lift}px) scale(${scale})`;
            }
          }

          timeline.to(track, {
            x: -distance,
            ease: "none",
            duration: 1,
            onUpdate: syncFocus,
          });
          syncFocus();
        }}
        snap={(root: HTMLDivElement) => {
          const track = root.querySelector<HTMLElement>("[data-track]");
          if (!track) return undefined;
          const distance = track.scrollWidth - root.clientWidth;
          if (distance <= 0) return undefined;

          const viewportCenter = window.innerWidth / 2;
          const tiles = Array.from(
            track.querySelectorAll<HTMLElement>(".moodboard-tile"),
          );
          const points = tiles.map((tile) => {
            const rect = tile.getBoundingClientRect();
            const tileCenter = rect.left + rect.width / 2;
            return Math.min(
              1,
              Math.max(0, (tileCenter - viewportCenter) / distance),
            );
          });

          return {
            snapTo: points,
            duration: { min: 0.2, max: 0.6 },
            ease: "power2.out",
          };
        }}
      >
        <div className="relative z-10 px-6 pt-10 md:px-10">
          <MoodboardHeading dynamic />
        </div>

        <div className="relative mt-8 flex flex-1 items-center overflow-hidden">
          <div
            data-track
            className="flex items-center gap-8 pl-6 md:pl-10"
            style={{ width: "max-content" }}
          >
            {items.map((item, i) => {
              const slot = ROW_SLOTS[i % ROW_SLOTS.length];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Open image ${i + 1} of ${items.length}`}
                  data-tilt={slot.rotate}
                  data-lift={slot.lift}
                  data-cursor-label="Zoom in"
                  className="moodboard-tile group aspect-3/4 shrink-0 cursor-zoom-in overflow-hidden rounded-lg border border-border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lemon"
                  style={
                    {
                      width: `clamp(160px, 42vw, ${slot.size}px)`,
                    } as CSSProperties
                  }
                >
                  <CoverArt
                    accent={item.accent}
                    image={item.image}
                    fallbackSeed={item.id}
                    className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </ScrollArrest>

      <GalleryLightbox
        items={items}
        index={openIndex}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}

/**
 * `dynamic` opts into ScrollTheme's `--scroll-fg` instead of the static
 * text-foreground/text-muted-foreground tokens. Only safe where a
 * scroll-driven background can actually be behind it (the main, non-
 * reduced-motion Moodboard, still transparent while it scrolls up from
 * below) — the reduced-motion fallback below always sits on a plain white
 * body background, and ScrollTheme forces --scroll-fg to its *light-on-dark*
 * value for the (unrelated) StatsReveal/SignatureSequence reduced-motion
 * fallback, which would render this heading invisible if it opted in too.
 */
function MoodboardHeading({ dynamic = false }: { dynamic?: boolean }) {
  return (
    <div className="mx-auto flex max-w-400 items-end justify-between gap-6">
      <div>
        <p
          className={cn(
            "text-xs tracking-normal lowercase",
            dynamic ? "text-(--scroll-fg)/60" : "text-muted-foreground",
          )}
        >
          Off the clock
        </p>
        <h2
          className={cn(
            "mt-2 font-heading text-4xl md:text-5xl",
            dynamic && "text-(--scroll-fg)",
          )}
        >
          A few things I keep coming back to.
        </h2>
      </div>
      <Link
        href="/gallery"
        className={cn(
          "hidden shrink-0 text-xs tracking-normal lowercase transition-colors hover:text-cta sm:inline",
          dynamic ? "text-(--scroll-fg)/60" : "text-muted-foreground",
        )}
      >
        Full gallery →
      </Link>
    </div>
  );
}

export default Moodboard;
