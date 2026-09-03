"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(CustomEase, useGSAP);

/**
 * The load intro from paulkalkbrenner.net, ported beat for beat.
 *
 * The reference is a Webflow build; its motion code ships as one minified
 * GSAP bundle (cdn.odyn.dev/p/j52r/bundle.js). The hero routine in there
 * reduces to this timeline, which is what the numbers below mirror:
 *
 *   gsap.timeline()
 *     .set(".home-hero", { opacity: 1 })
 *     .fromTo(imgWrap,
 *       { width: "105vw", height: "105vh", x: "-30vw", y: "-44vh" },
 *       { width: "100%", height: "100%", x: "15vw", y: "0vh", duration: 1.4 }, 0.6)
 *     .fromTo(word0, { xPercent: -180 }, { xPercent: 78, duration: 1.2 }, "<+=0.2")
 *     .fromTo(word1, { xPercent:  120 }, { xPercent: 30, duration: 1.2 }, "<")
 *     .to([word0, word1], { xPercent: 0, duration: 1 })
 *     .to(imgWrap, { x: "0vw", duration: 1 }, "<")
 *     .fromTo(nav, { yPercent: -200 }, { yPercent: 0, clearProps: "all", duration: 1 }, "<")
 *
 * Read as pixels rather than as ratios, that is three separate elements doing
 * the same two moves. Beat one (0.6s → 2.0s): a viewport-filling image
 * collapses into the tiny inline slot between the two headline words while
 * both words fly in from off-screen — but none of them land centred, they all
 * land ~15vw to the right. Beat two (2.0s → 3.0s): image, both words and the
 * header give up that 15vw together, so the composition settles as one object
 * rather than as three.
 *
 * The reference can hardcode `-30vw` / `xPercent: -180` because "Paul" and
 * "Kalkbrenner" are fixed strings at a fixed size — those constants only
 * happen to mean "cover the viewport" and "just off-screen" for that exact
 * text. With different words they would mean nothing in particular, so the
 * off-stage positions here are measured from the real rects at run time
 * instead. Same picture, but it survives a rename, a font swap and every
 * breakpoint — the reference needs a whole second `matchMedia` branch of
 * magic numbers for mobile, this needs none. Durations, offsets, ordering and
 * the ease are left exactly as they are above.
 */

// The reference's own ease, verbatim: `CustomEase.create("osmo", "0.625,
// 0.05, 0, 1")`, paired with its `duration: 0.6` default. Applied as timeline
// defaults rather than through gsap.defaults() so merely importing this module
// doesn't silently re-ease every other animation on the site (ScrollTheme,
// ScrollArrest, SelectedWork).
const EASE = CustomEase.create("hero-intro", "0.625, 0.05, 0, 1");

/** How far past the viewport edge the words' off-stage start positions sit,
 * so they are genuinely gone rather than clipped against the edge. */
const BLEED = 0.025;

/** Share of viewport height the image occupies at the top of the intro.
 *
 * The reference opens on a true full bleed (105vw × 105vh) and can afford to:
 * its loader stills are wide, and it crops them to a wide box. This photo is
 * 896×1195 portrait. Covering a 1440×900 box with it means scaling to
 * max(1440/896, 900/1195) = 1.6×, so the opening frame was an upscale — which
 * is exactly the "it gets more pixelated the more of the screen it fills"
 * effect, and it got worse on wider monitors, not better.
 *
 * Opening at 86% of viewport height in the slot's own aspect instead means the
 * image renders at ~580px wide on a 900px-tall screen — under its native
 * width, so there is no upscale left to see. It also crops nothing: the
 * opening frame and the final chip are the same shape, so the animation is now
 * purely a change of size rather than a change of size AND crop. */
const OPENING_HEIGHT = 0.86;

/** The shared right-hand offset everything lands on at the end of beat one
 * and gives up during beat two — the reference's `x: "15vw"`. */
const SETTLE = 0.15;

/** Once per session, not once per mount. Returning to `/` from another route
 * remounts this component, and replaying a *load* intro on an internal
 * navigation reads as a bug. Mirrors the reference's own run-once flag.
 * Client-only: `useGSAP` never runs during SSR, so this can't leak across
 * requests on the server. */
let hasPlayed = false;

export function HeroIntro({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      // `data-intro` is driven imperatively rather than through state on
      // purpose. It gates the pre-hydration CSS in globals.css (stage held at
      // opacity 0, header parked off-screen), and it has to flip in the same
      // synchronous turn that GSAP hands those properties back — a React
      // state update would land a frame or more later, and in that gap the
      // CSS would still be parking a header GSAP had already released.
      const settled = () => {
        stage.dataset.intro = "done";
      };

      if (hasPlayed || reducedMotion) {
        // useGSAP runs in a layout effect, so this lands before paint: a
        // remount (or a reduced-motion visitor) shows the finished hero
        // directly, never a hidden one that pops in afterwards.
        settled();
        return;
      }

      const slot = stage.querySelector<HTMLElement>("[data-hero-slot]");
      const wrap = stage.querySelector<HTMLElement>("[data-hero-img-wrap]");
      const words = gsap.utils.toArray<HTMLElement>(
        stage.querySelectorAll("[data-hero-word]"),
      );
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      if (!slot || !wrap || words.length < 2) {
        settled();
        return;
      }

      hasPlayed = true;
      let timeline: gsap.core.Timeline | null = null;
      let cancelled = false;
      let completed = false;

      // Every start position below is measured, so the measuring has to
      // happen against final metrics. Before webfonts settle, the words are
      // laid out in the fallback face at the wrong width, which puts the image
      // slot — and therefore the entire cover rect — in the wrong place. The
      // reference awaits the same promise for the same reason.
      const fontsReady = document.fonts?.ready ?? Promise.resolve();

      fontsReady.then(() => {
        if (cancelled) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const bleedX = vw * BLEED;
        const settle = vw * SETTLE;

        // One measure pass, then one write pass — no line below reads a value
        // that an earlier line has already invalidated.
        const slotRect = slot.getBoundingClientRect();
        const wordRects = words.map((word) => word.getBoundingClientRect());

        // The wrap is `position: absolute; inset: 0` inside the slot, so its
        // box *is* the slot's box: blowing it up and pulling it back by the
        // slot's own offset is what puts the opening panel on screen, and
        // animating both back to `100%` / `0` is what lands it inside the
        // headline. Animated as width/height rather than a scale so the image
        // is never resampled and the corner radius holds at every size along
        // the way.
        //
        // The aspect is measured off the live slot rather than repeated as a
        // constant here, so Hero's `aspect-[3/4]` stays the single place that
        // decides the shape — change it there and the opening panel follows
        // instead of silently starting to crop.
        const openingHeight = vh * OPENING_HEIGHT;
        const openingWidth = openingHeight * (slotRect.width / slotRect.height);
        const cover = {
          width: openingWidth,
          height: openingHeight,
          x: (vw - openingWidth) / 2 - slotRect.left,
          y: (vh - openingHeight) / 2 - slotRect.top,
        };

        // Each word fully off-stage on its own side: the first word's
        // trailing edge parked left of x=0, the second word's leading edge
        // parked right of the viewport, both with a bleed's clearance.
        const offStage = [
          -(wordRects[0].right + bleedX),
          vw - wordRects[1].left + bleedX,
        ];

        timeline = gsap.timeline({
          defaults: { ease: EASE, duration: 0.6 },
          onComplete: () => {
            completed = true;
            settled();
            // Beyond tidiness: the header is `position: fixed`, and a
            // leftover transform on it would make it the containing block for
            // its own fixed descendants — the same trap PageTransition
            // documents for the page wrapper.
            if (header) gsap.set(header, { clearProps: "all" });
          },
        });

        timeline
          // Beat one. `fromTo` renders its start state the moment it is
          // created (GSAP's default `immediateRender`), so the cover rect, the
          // off-stage words and the parked header are all in place before the
          // stage is ever revealed — the reference leans on exactly the same
          // behaviour.
          .set(stage, { opacity: 1 })
          .fromTo(
            wrap,
            cover,
            { width: "100%", height: "100%", x: settle, y: 0, duration: 1.4 },
            0.6,
          )
          .fromTo(
            words[0],
            { x: offStage[0] },
            { x: settle, duration: 1.2 },
            "<+=0.2",
          )
          .fromTo(words[1], { x: offStage[1] }, { x: settle, duration: 1.2 }, "<")
          // Beat two — the shared 15vw slide, everything moving as one.
          .to(words, { x: 0, duration: 1 })
          .to(wrap, { x: 0, duration: 1 }, "<");

        if (header) {
          timeline.fromTo(
            header,
            { yPercent: -200 },
            { yPercent: 0, duration: 1 },
            "<",
          );
        }
      });

      // The timeline is built after an await, so useGSAP's own context never
      // sees it and can't revert it — unmounting mid-intro (a route change
      // two seconds in) has to tear it down here instead.
      return () => {
        cancelled = true;
        timeline?.kill();
        if (header) gsap.set(header, { clearProps: "all" });
        // An intro that never reached the end doesn't count as played, so
        // the flag has to be handed back. Without this, React's development
        // StrictMode double-mount would burn the one allowed run on a pass
        // that gets torn down immediately and the intro would only ever be
        // visible in production builds.
        if (!completed) hasPlayed = false;
      };
    },
    { scope: stageRef, dependencies: [reducedMotion] },
  );

  return (
    <div ref={stageRef} data-hero-stage data-intro="pending" className={className}>
      {children}
    </div>
  );
}

export default HeroIntro;
