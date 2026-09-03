"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

import { usePointerFine } from "@/hooks/use-pointer-fine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(useGSAP);

/**
 * The pointer from heronaiapp.com, rebuilt.
 *
 * Its cursor is a full-viewport `<canvas>` driven by an object exposed as
 * `window.__canvasCursor`; reading that object's live state on the site gives
 * the whole design away — `target` vs `current` (raw pointer vs an eased one
 * chasing it), a `trail` array capped at `trailLength: 34`, and three eased
 * 0..1 progress values (`hoverProgress`, `pressProgress`, `visibilityProgress`)
 * that the renderer mixes in. Mid-drag on the real site `current` sits ~260px
 * behind `target`, which is the entire trick: the dot never keeps up, so the
 * 34 positions behind it spread into a smear when you move fast and collapse
 * into a single dot when you stop.
 *
 * Two things here are deliberately not theirs. Their accent is #FA3600; this
 * draws in `--cta` so the site keeps one accent instead of gaining a second
 * (see the note on --cta in globals.css). And their hover square is a bare
 * outline, where this one keeps the `data-cursor-label` contract the previous
 * CustomCursor established — the square widens into a pill and names the
 * action, so "view project" / "zoom in" survive the swap.
 *
 * Split across two elements on purpose: the trail is per-frame pixel work that
 * only canvas does cheaply, while the square is one box that needs a CSS
 * transition on its width and real text inside it. Heron splits it the same
 * way (their `hoverSquare` is a DOM node, transformed per frame).
 */

/** Positions kept behind the dot. Heron's `trailLength`. */
const TRAIL_LENGTH = 34;
/** How hard `current` chases `target` each frame. Lower = longer smear. */
const FOLLOW = 0.18;
/** How hard the 0..1 progress values chase their targets each frame. */
const PROGRESS_EASE = 0.14;
/** Dot radius at rest, in CSS px. */
const DOT_RADIUS = 4;
/** Extra radius at full press — the swell when the button goes down. */
const PRESS_GROWTH = 0.9;

const LABEL_ATTR = "data-cursor-label";
/** Heron's `interactiveSelector`, plus this site's own label hook. */
const INTERACTIVE =
  `a,button,input,textarea,select,[role="button"],[${LABEL_ATTR}]`;

export function CanvasCursor() {
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  // Mounting at all is the on/off switch. A coarse pointer has nothing to
  // draw a cursor for, and hiding the native one there would be actively
  // harmful; reduced-motion users keep their own cursor rather than a
  // trailing one that lags 260px behind their hand.
  const enabled = pointerFine && !reducedMotion;

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const square = squareRef.current;
      if (!enabled || !canvas || !square) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // The accent is read off the DOM rather than hardcoded so this follows
      // --cta through theme changes. Whatever string the browser computes
      // (`oklch(...)` here) goes straight to fillStyle and transparency is
      // applied via globalAlpha — that sidesteps parsing the colour into
      // rgba() components, which is the step that breaks on colour spaces.
      const accent = getComputedStyle(canvas).getPropertyValue("--cta").trim();

      document.body.style.cursor = "none";

      const target = { x: -200, y: -200 };
      const current = { x: -200, y: -200 };
      const trail: { x: number; y: number }[] = [];
      let press = 0;
      let pressTarget = 0;
      let hover = 0;
      let hoverTarget = 0;
      let visible = 0;
      let visibleTarget = 0;

      let width = 0;
      let height = 0;
      let dpr = 1;

      function resize() {
        if (!canvas || !ctx) return;
        width = window.innerWidth;
        height = window.innerHeight;
        // Capped at 2: past that the trail costs more than it looks better.
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      resize();

      function onMove(event: PointerEvent) {
        target.x = event.clientX;
        target.y = event.clientY;
        visibleTarget = 1;

        const el = (event.target as Element | null)?.closest?.(INTERACTIVE);
        hoverTarget = el ? 1 : 0;
        setLabel(el?.getAttribute(LABEL_ATTR) ?? null);
      }
      // Leaving the window has to snap, not ease: easing `visible` down over
      // ~15 frames leaves a dot melting in the corner after the pointer is
      // already gone.
      function onLeave() {
        visibleTarget = 0;
        hoverTarget = 0;
        setLabel(null);
      }
      function onDown() {
        pressTarget = 1;
      }
      function onUp() {
        pressTarget = 0;
      }

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      window.addEventListener("pointercancel", onUp, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
      window.addEventListener("resize", resize);

      function tick() {
        if (!ctx) return;

        current.x += (target.x - current.x) * FOLLOW;
        current.y += (target.y - current.y) * FOLLOW;
        press += (pressTarget - press) * PROGRESS_EASE;
        hover += (hoverTarget - hover) * PROGRESS_EASE;
        visible += (visibleTarget - visible) * PROGRESS_EASE;

        trail.unshift({ x: current.x, y: current.y });
        if (trail.length > TRAIL_LENGTH) trail.length = TRAIL_LENGTH;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = accent;

        // Oldest first so the bright head paints over its own tail. Radius and
        // alpha both fall off toward the tail, which is what turns a line of
        // identical dots into something that reads as motion — and because
        // every entry is a *past* position of `current`, standing still piles
        // all 34 on the same pixel and the smear disappears on its own.
        const radius = DOT_RADIUS * (1 + press * PRESS_GROWTH);
        for (let i = trail.length - 1; i >= 0; i--) {
          const t = 1 - i / TRAIL_LENGTH;
          ctx.globalAlpha = visible * t * t * (1 - hover * 0.55);
          ctx.beginPath();
          ctx.arc(trail[i].x, trail[i].y, radius * t, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // The square rides the same eased position as the trail's head, so the
        // two never separate on a fast flick.
        gsap.set(square, {
          x: current.x,
          y: current.y,
          scale: hover,
          opacity: visible * hover,
        });
      }

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        document.body.style.cursor = "";
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        document.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("blur", onLeave);
        window.removeEventListener("resize", resize);
      };
    },
    { dependencies: [enabled] },
  );

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-200"
      />
      {/* Width and border-radius transition in CSS rather than GSAP: the pill
          has to size itself to whatever text `data-cursor-label` carries, and
          "animate to the width this content happens to need" is one line of
          CSS against a measure-and-tween in JS. GSAP keeps transform and
          opacity, so the two never touch the same property. */}
      <div
        ref={squareRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-200 flex h-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-cta text-xs sm:text-[10px] tracking-normal whitespace-nowrap text-cta lowercase opacity-0 transition-[width,border-radius,padding] duration-300 ease-out"
        style={{
          width: label ? "auto" : "2.75rem",
          borderRadius: label ? "999px" : "0.125rem",
          paddingInline: label ? "0.75rem" : 0,
        }}
      >
        {label}
      </div>
    </>
  );
}

export default CanvasCursor;
