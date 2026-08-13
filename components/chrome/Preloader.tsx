"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const FACTS = [
  "loading pixels one by one",
  "aligning everything to an 8px grid",
  "this screen serves no purpose, it's for the vibes",
  "coffee count today: 3",
  "almost there",
];

const STEP_MS = 50;
const TOTAL_MS = FACTS.length * STEP_MS;

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const stepId = setInterval(() => {
      setIndex((i) => Math.min(i + 1, FACTS.length - 1));
    }, STEP_MS);

    const start = performance.now();
    let raf = requestAnimationFrame(function tick(now: number) {
      const pct = Math.min(100, Math.round(((now - start) / TOTAL_MS) * 100));
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    });

    const finishTimeout = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, TOTAL_MS + 200);

    return () => {
      clearInterval(stepId);
      cancelAnimationFrame(raf);
      clearTimeout(finishTimeout);
      document.body.style.overflow = "";
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "preloader-failsafe fixed inset-0 z-100 flex flex-col justify-end bg-[#0e0d0a] px-6 py-10 transition-opacity duration-700 md:px-10",
        done ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="font-heading text-lg text-white lowercase md:text-2xl"
        >
          {FACTS[index]}
        </motion.p>
      </AnimatePresence>
      <p className="mt-2 font-heading text-6xl text-white tabular-nums md:text-8xl">
        {progress}%
      </p>
    </div>
  );
}

export default Preloader;
