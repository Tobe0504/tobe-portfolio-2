"use client";

import { useRef } from "react";
import { FloatingForms } from "@/components/home/FloatingForms";
import { Fragments } from "@/components/home/Fragments";
import { Hero } from "@/components/home/Hero";
import { Moodboard } from "@/components/home/Moodboard";
import { ScrollTheme } from "@/components/home/ScrollTheme";
import { SelectedWork } from "@/components/home/SelectedWork";
import { SignatureSequence } from "@/components/home/SignatureSequence";
import { StatsReveal } from "@/components/home/StatsReveal";
import { PixelCurtain } from "@/components/shared/PixelCurtain";
import type { GalleryItem, Project, SiteStats } from "@/lib/content";

interface HomeExperienceProps {
  featured: Project[];
  moodboardItems: GalleryItem[];
  stats: SiteStats;
}

export function HomeExperience({
  featured,
  moodboardItems,
  stats,
}: HomeExperienceProps) {
  const lightEndRef = useRef<HTMLDivElement>(null);
  const darkStartRef = useRef<HTMLDivElement>(null);
  const darkEndRef = useRef<HTMLDivElement>(null);
  const lightStartRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ScrollTheme
        lightEndRef={lightEndRef}
        darkStartRef={darkStartRef}
        darkEndRef={darkEndRef}
        lightStartRef={lightStartRef}
      />
      <Hero />
      <Fragments />
      <FloatingForms items={moodboardItems} />
      <div ref={lightEndRef}>
        <SelectedWork projects={featured} />
      </div>
      {/* The two 60vh spacers that used to sit here were doing real work —
          they gave ScrollTheme room to scrub the page from light to dark and
          back without the change landing on top of readable text. The glitch
          now does that handover visibly, and the black block below is what
          makes it a handover rather than a decorative band.

          The dark stretch owns its own black ground instead of borrowing
          ScrollTheme's scrub. StatsReveal and SignatureSequence are both
          transparent by design — they show whatever `body` is scrubbed to —
          and that scrub is a continuous fade that had not finished by the time
          the squares had. So the band went fully black while the page beneath
          it was still white, and the join between them read as a hard step.
          Painting this stretch black outright means the squares fill *into*
          the colour that is already there: the black edge stops being a line
          and becomes the ragged edge of the fill itself.

          ScrollTheme still runs and is still needed — it drives --scroll-fg
          and the header's inversion, neither of which this block covers. All
          it loses here is responsibility for a background nothing can see. */}
      <PixelCurtain mode="cover" className="text-black" />
      <div className="bg-black">
        <div ref={darkStartRef}>
          <StatsReveal stats={stats} />
        </div>
        <div ref={darkEndRef}>
          <SignatureSequence />
        </div>
      </div>
      {/* Mirrored: black ends exactly where this band begins, and these
          squares dissolve *away* from their bottom row up, so the black
          recedes with the same ragged edge it arrived on. */}
      <PixelCurtain mode="reveal" className="text-black" />
      <div ref={lightStartRef}>
        <Moodboard items={moodboardItems} />
      </div>
    </>
  );
}

export default HomeExperience;
