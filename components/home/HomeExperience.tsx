"use client";

import { useRef } from "react";
import { Fragments } from "@/components/home/Fragments";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Moodboard } from "@/components/home/Moodboard";
import { ScrollTheme } from "@/components/home/ScrollTheme";
import { SelectedWork } from "@/components/home/SelectedWork";
import { SignatureSequence } from "@/components/home/SignatureSequence";
import { StatsReveal } from "@/components/home/StatsReveal";
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
      <Intro />
      <Fragments />
      <div ref={lightEndRef}>
        <SelectedWork projects={featured} />
      </div>
      <div aria-hidden="true" className="h-[60vh]" />
      <div ref={darkStartRef}>
        <StatsReveal stats={stats} />
      </div>
      <div ref={darkEndRef}>
        <SignatureSequence />
      </div>
      <div aria-hidden="true" className="h-[60vh]" />
      <div ref={lightStartRef}>
        <Moodboard items={moodboardItems} />
      </div>
    </>
  );
}

export default HomeExperience;
