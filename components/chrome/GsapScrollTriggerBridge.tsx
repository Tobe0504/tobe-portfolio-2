"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis is the only thing that ever moves scroll — autoRaf is off (see
 * SmoothScrollProvider), so this makes GSAP's ticker drive lenis.raf()
 * every frame instead, and tells ScrollTrigger to recompute on Lenis's
 * `scroll` event rather than the native `scroll` event Lenis intercepts.
 * `motion`'s whileInView and ScrollTrigger both stay passive readers of
 * Lenis's position — neither one drives scroll itself, which is what keeps
 * the two animation libraries from fighting each other.
 */
export function GsapScrollTriggerBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

export default GsapScrollTriggerBridge;
