"use client";

import { Grid } from "@/components/canvasui/Grid";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Our equivalent of podium.global's WebGL background-grid + mouse
 * interaction — canvasui's Grid already does "3D tiles ripple around the
 * cursor over live HTML," so the manifesto copy just becomes its content
 * instead of hand-rolling a flow-field shader.
 */
export function ManifestoSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="border-b border-border bg-background">
      <Grid
        className="min-h-[70vh] w-full"
        tileSize={64}
        gap={2}
        cornerRadius={3}
        liftHeight={reducedMotion ? 0 : 40}
        amplitude={reducedMotion ? 0 : 2}
        idleRipples={reducedMotion ? 0 : 6}
        tint={[0.16, 0.16, 0.88]}
        tintStrength={0.14}
      >
        <div className="mx-auto flex max-w-400 flex-col gap-10 px-6 py-14 md:px-10">
          <p className="max-w-4xl font-heading text-4xl leading-tight font-light tracking-tight md:text-6xl">
            Good code disappears.{" "}
            <span className="text-muted-foreground italic">Great</span> code
            leaves a system behind it that someone else can extend without you
            in the room.
          </p>
          <p className="max-w-2xl text-lg text-muted-foreground font-thin">
            I work in the space between product and infrastructure; where a
            feature has to survive real traffic, and an API has to hold up under
            load it wasn&apos;t originally built for. Most projects start with
            the boring part: what&apos;s actually needed, before deciding how to
            build it.
          </p>
        </div>
      </Grid>
    </section>
  );
}

export default ManifestoSection;
