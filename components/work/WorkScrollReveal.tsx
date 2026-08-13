"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Each word reads its own slice of the paragraph's scroll progress — dim
 * until its slice arrives, full brightness once it has, matching
 * madeinevolve.com/services' fade-in-as-you-scroll paragraph. A shared
 * `progress` motion value (one scroll listener for the whole paragraph)
 * rather than each word tracking its own element keeps this to a single
 * scroll subscription no matter how long the sentence is. */
function RevealWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  return (
    // Spacing is margin, not a trailing space character — a space as the
    // last character inside `inline-block` sits at the edge of that box's
    // own line box and gets collapsed away by normal whitespace rules
    // (same gotcha SignatureSequence.tsx hit first).
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block last:mr-0">
      {word}
    </motion.span>
  );
}

export function WorkScrollReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.2"],
  });
  const words = text.split(" ");

  return (
    <section className="bg-foreground px-6 py-32 text-background md:px-10">
      <p
        ref={ref}
        className="mx-auto max-w-5xl font-heading text-3xl leading-snug tracking-tight md:text-5xl"
      >
        {reducedMotion
          ? text
          : words.map((word, i) => (
              <RevealWord
                key={i}
                word={word}
                index={i}
                total={words.length}
                progress={scrollYProgress}
              />
            ))}
      </p>
    </section>
  );
}

export default WorkScrollReveal;
