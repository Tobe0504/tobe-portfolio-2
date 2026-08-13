"use client";

import { GlassObject } from "@/components/canvasui/GlassObject";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface HeroGlassMarkProps {
  className?: string;
}

/**
 * The site's one signature moment — the IK mark extruded into rotating
 * liquid glass. Only instance of GlassObject on the site; the nav/footer use
 * the flat static SignatureMark instead (see components/shared).
 */
export function HeroGlassMark({ className }: HeroGlassMarkProps) {
  const reducedMotion = useReducedMotion();

  return (
    <GlassObject
      className={cn("aspect-square", className)}
      src="/signature-mark.svg"
      depth={0.22}
      bevel={0.6}
      ior={1.6}
      thickness={3}
      dispersion={1.2}
      clearcoat={0.6}
      highlight="#3730e0"
      scale={2.6}
      floatIntensity={reducedMotion ? 0 : 1}
      rotationIntensity={reducedMotion ? 0 : 0.6}
      floatSpeed={1.4}
      autoRotate={!reducedMotion}
      autoRotateSpeed={0.6}
      orbit={false}
      zoom={false}
    />
  );
}

export default HeroGlassMark;
