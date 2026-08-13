import type { Metadata } from "next";

import { WorkApproach } from "@/components/work/WorkApproach";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkImagePair } from "@/components/work/WorkImagePair";
import { WorkListing } from "@/components/work/WorkListing";
import { WorkScrollReveal } from "@/components/work/WorkScrollReveal";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
};

// Curated, not derived from the full project.category strings (those run
// long — "Corporate Site / Global Trade" — which reads fine in a list row
// but not spread thin across a hero). A short, representative slice of the
// real domains the project data actually covers instead.
const HERO_LABELS = [
  "Product Engineering",
  "Fintech",
  "EdTech",
  "Sports Media",
];

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <>
      <WorkHero
        labels={HERO_LABELS}
        statement="Product. Engineering. Every project run as one continuous practice."
      />

      <WorkScrollReveal text="A software practice built to handle the whole surface of a product, from the first wireframe to the system that keeps running after launch — not a hand-off between specialists, one person carrying the thread all the way through." />

      <WorkListing projects={projects} />

      <WorkImagePair />

      <WorkApproach
        intro="I work with founders and teams who'd rather ship something real than sit through another deck. This many projects in, the pattern holds: smaller scopes, longer runways, work that outlives the contract."
        statement="Every project starts with the same question: what does this actually need to work? And ends with something a person can maintain, not just admire in a screenshot."
      />
    </>
  );
}
