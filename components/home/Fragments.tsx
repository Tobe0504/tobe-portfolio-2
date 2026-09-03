"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const FRAGMENTS = [
  { n: "01", text: "Restraint is a decision, not an absence of one." },
  {
    n: "02",
    text: "A system should survive contact with people who didn't build it.",
  },
  { n: "03", text: "Motion should explain something, or it shouldn't run." },
  { n: "04", text: "Good type does the talking so nothing else has to shout." },
];

function FragmentCard({
  fragment,
  floatDirection,
}: {
  fragment: (typeof FRAGMENTS)[number];
  /** Alternating up/down float per card — same effect, opposite phase, so
   * neighboring cards visibly drift apart rather than moving in lockstep. */
  floatDirection: 1 | -1;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.3, 1, 1, 1, 0.3],
  );
  // The actual "float": real vertical drift, not just scale/opacity — a
  // card rises (or sinks) up to 56px as it crosses the viewport, enough to
  // read as movement at a glance instead of a subtle zoom.
  const y = useTransform(scrollYProgress, [0, 1], [56 * floatDirection, -56 * floatDirection]);

  return (
    <motion.div
      ref={ref}
      style={reducedMotion ? undefined : { scale, opacity, y }}
      className="flex gap-5 border-t border-border pt-6"
    >
      <span className="text-sm text-muted-foreground">{fragment.n}</span>
      <p className="max-w-md font-heading text-2xl leading-snug font-light md:text-3xl">
        {fragment.text}
      </p>
    </motion.div>
  );
}

/**
 * yeqq.com.tr's numbered-fragment manifesto, in miniature — Home's version
 * stays short; the full one lives on /manifest.
 *
 * Each card's y/scale/opacity all track its own scroll position continuously
 * (Framer's useScroll/useTransform, one instance per card) rather than the
 * one-shot fade-and-settle RevealOnScroll uses elsewhere — it drifts and
 * grows into focus approaching center, eases back and settles leaving either
 * edge, alternating float direction per card so neighbors visibly separate
 * rather than moving in lockstep. The continuous "float, grow, and shrink on
 * scroll" beautiful-imperfections.com does with its floating imagery,
 * translated here onto plain text cards.
 */
export function Fragments() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-400">
        <p className="text-xs tracking-normal text-muted-foreground lowercase">
          Notes
        </p>
        <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {FRAGMENTS.map((fragment, i) => (
            <FragmentCard
              key={fragment.n}
              fragment={fragment}
              floatDirection={i % 2 === 0 ? 1 : -1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Fragments;
