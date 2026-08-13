"use client";

import { useState } from "react";

import { HoverDimList } from "@/components/shared/HoverDimList";
import { usePointerFine } from "@/hooks/use-pointer-fine";

interface Capability {
  key: string;
  label: string;
  description: string;
}

const CAPABILITIES: Capability[] = [
  {
    key: "fullstack",
    label: "Full-Stack Product Engineering",
    description: "Next.js, React, and TypeScript on the front end, Go and Node on the back.",
  },
  {
    key: "ai",
    label: "AI & Generative Systems",
    description: "Interfaces and APIs built around real-time, model-driven workflows.",
  },
  {
    key: "fintech",
    label: "Fintech & Payments",
    description: "Onboarding, banking, and insurance platforms that move real money.",
  },
  {
    key: "systems",
    label: "Design Systems & Accessibility",
    description: "Reusable component libraries that keep a product consistent as it grows.",
  },
  {
    key: "performance",
    label: "Performance & Reliability",
    description: "Caching, load handling, and cross-browser work that holds up in production.",
  },
];

export function Capabilities() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const pointerFine = usePointerFine();

  return (
    <section className="border-b border-border px-6 py-24 md:px-10">
      <div className="mx-auto max-w-400">
        <p className="text-xs tracking-normal text-muted-foreground lowercase">
          Focus
        </p>
        <HoverDimList
          className="mt-8"
          items={CAPABILITIES}
          hoveredKey={hoveredKey}
          onHover={setHoveredKey}
          interactive={pointerFine}
          renderItem={(item) => (
            <div className="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:justify-between md:gap-6">
              <span className="font-heading text-3xl font-light md:text-5xl">
                {item.label}
              </span>
              <span className="max-w-sm text-sm text-muted-foreground md:text-right">
                {item.description}
              </span>
            </div>
          )}
        />
      </div>
    </section>
  );
}

export default Capabilities;
