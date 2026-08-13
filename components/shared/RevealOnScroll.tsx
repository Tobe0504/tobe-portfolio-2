"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Thin `whileInView` wrapper — fade + rise, once per element. Reduced-motion is handled globally via <MotionConfig reducedMotion="user"> in the root layout. */
export function RevealOnScroll({ children, className, delay = 0, y = 24 }: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default RevealOnScroll;
