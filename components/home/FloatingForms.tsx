"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { GalleryItem } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The "Forms follow perspective" cluster from noth.in, rebuilt.
 *
 * Their objects looked like a hover effect and aren't one. Sampling the live
 * transforms says otherwise on both counts: scrolling changes every object's
 * matrix (translate, rotation and a little scale, each at its own rate), and
 * so does moving the pointer across the section — with the objects easing back
 * toward rest when the pointer settles. Neither input touches the other's
 * element; they compose. That's why the cluster reads as depth rather than as
 * a parallax trick: two unrelated forces act on the same objects at different
 * strengths, so nothing in the frame ever moves in lockstep with anything else.
 *
 * Composed here as three nested boxes per object, because a single element
 * can't carry both forces — GSAP would have one tween's `y` overwrite the
 * other's every frame:
 *
 *   outer   absolutely placed, never animated  (where the object lives)
 *   drift   pointer, via quickTo               (where the mouse pushes it)
 *   float   scroll, via a scrubbed ScrollTrigger + its own rotation
 *
 * The objects are your gallery photographs rather than noth.in's cut-out
 * still-lifes, so this reads as drifting prints rather than floating props —
 * and it doubles as a second, more physical route into /gallery than the
 * Moodboard grid further down.
 */

/** Where each object sits and how hard each force pushes it. Hand-placed
 * rather than generated: the cluster has to stay legible (nothing centred,
 * nothing colliding, a clear diagonal through the middle), and six random
 * positions almost never do. `depth` is the one number that matters — it
 * scales both forces together, so a "near" object drifts far and rotates hard
 * while a "far" one barely moves, which is what sells the depth. */
const SLOTS = [
  {
    left: "2%", top: "6%", width: "24%", depth: 1, spin: -9,
    phone: { left: "0%", top: "4%", width: "50%" },
  },
  {
    left: "63%", top: "0%", width: "19%", depth: 0.45, spin: 7,
    phone: { left: "56%", top: "30%", width: "42%" },
  },
  {
    left: "28%", top: "30%", width: "27%", depth: 0.75, spin: 5,
    phone: { left: "14%", top: "62%", width: "46%" },
  },
  { left: "6%", top: "62%", width: "18%", depth: 0.35, spin: -6, phone: null },
  { left: "72%", top: "46%", width: "23%", depth: 0.95, spin: 11, phone: null },
  { left: "45%", top: "76%", width: "15%", depth: 0.6, spin: -12, phone: null },
] as const;

/** Three objects on phones, six from `md` up.
 *
 * Six of these at their desktop widths land between 55px and 105px across on a
 * 390px screen — too small to read as pictures and too many to read as a
 * composition, which is the exact "scattered clutter" the desktop version
 * avoids by having room. Touch also removes half the effect outright: there is
 * no pointer to drift toward, so all a phone gets is the scroll parallax.
 *
 * So phones get the three objects with the widest depth spread (1, 0.45, 0.75
 * — the near, the far and the middle) at roughly double the width, which keeps
 * the parallax legible because the three that remain are the three that move
 * by visibly different amounts. The other three carry `phone: null` and are
 * not rendered below `md` rather than hidden with CSS: an unrendered object is
 * three fewer images fetched on the connection least able to afford them. */

/** Pixels an object at depth 1 travels across the full width of the section
 * as the pointer crosses it. */
const POINTER_REACH = 70;
/** Pixels an object at depth 1 travels vertically over the scroll range. */
const SCROLL_REACH = 170;

export function FloatingForms({ items }: { items: GalleryItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isPhone = useMediaQuery("(max-width: 767px)");
  const usable = isPhone ? SLOTS.filter((slot) => slot.phone) : SLOTS;
  const objects = items.filter((item) => item.image).slice(0, usable.length);

  useGSAP(
    () => {
      if (reducedMotion || !root.current) return;

      const drifts = gsap.utils.toArray<HTMLElement>(
        root.current.querySelectorAll("[data-drift]"),
      );
      const floats = gsap.utils.toArray<HTMLElement>(
        root.current.querySelectorAll("[data-float]"),
      );
      if (!drifts.length) return;

      floats.forEach((element) => {
        const depth = Number(element.dataset.depth);
        const spin = Number(element.dataset.spin);
        gsap.fromTo(
          element,
          { y: SCROLL_REACH * depth, rotate: -spin },
          {
            y: -SCROLL_REACH * depth,
            rotate: spin,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      // quickTo rather than a fresh tween per pointermove: it reuses one tween
      // per property per element and just re-points it, which is the
      // difference between six objects and sixty tweens a second.
      const setters = drifts.map((element) => ({
        depth: Number(element.dataset.depth),
        x: gsap.quickTo(element, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(element, "y", { duration: 0.9, ease: "power3.out" }),
      }));

      function onMove(event: PointerEvent) {
        const rect = root.current?.getBoundingClientRect();
        if (!rect) return;
        // Normalised to −1..1 about the section's own centre, so an object's
        // rest position is the middle of the section rather than the middle
        // of the viewport — the cluster settles where it was designed to sit
        // no matter where the section happens to be on screen.
        const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        setters.forEach((setter) => {
          setter.x(nx * POINTER_REACH * setter.depth);
          setter.y(ny * POINTER_REACH * setter.depth * 0.6);
        });
      }
      function onLeave() {
        setters.forEach((setter) => {
          setter.x(0);
          setter.y(0);
        });
      }

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: root, dependencies: [reducedMotion, isPhone] },
  );

  if (!objects.length) return null;

  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-400">
        <p className="text-xs tracking-normal text-muted-foreground lowercase">
          Perspective
        </p>
        <h2 className="mt-2 max-w-2xl font-heading text-4xl md:text-5xl">
          Form follows the way you look at it.
        </h2>

        <div
          ref={root}
          className="relative mt-12 h-[62vh] min-h-[22rem] md:mt-24 md:h-[90vh]"
        >
          {objects.map((item, index) => {
            const slot = usable[index];
            return (
              <div
                key={item.id}
                className="absolute left-(--phone-l) top-(--phone-t) w-(--phone-w) md:left-(--l) md:top-(--t) md:w-(--w)"
                style={
                  {
                    "--l": slot.left,
                    "--t": slot.top,
                    "--w": slot.width,
                    "--phone-l": slot.phone?.left ?? slot.left,
                    "--phone-t": slot.phone?.top ?? slot.top,
                    "--phone-w": slot.phone?.width ?? slot.width,
                  } as React.CSSProperties
                }
              >
                <div data-drift data-depth={slot.depth}>
                  <div
                    data-float
                    data-depth={slot.depth}
                    data-spin={slot.spin}
                    className="will-change-transform"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)]">
                      <Image
                        src={item.image!.src}
                        alt={item.image!.alt}
                        fill
                        sizes="(min-width: 768px) 25vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FloatingForms;
