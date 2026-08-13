"use client";

import { ScrollArrest } from "@/components/shared/ScrollArrest";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Placeholder ethos copy — structurally correct (short line, one
 * lemon/italic emphasis word, builds toward the pivot from "engineer" to
 * "person") but generic. Swap for real lines in a content pass; nothing
 * else about this component needs to change when you do.
 */
const LINES = [
  { pre: "I build software", word: "for a living.", post: "" },
  { pre: "I build a", word: "life", post: "for the rest of it." },
  { pre: "Same attention,", word: "same care.", post: "" },
  { pre: "Different hours,", word: "same person.", post: "" },
  { pre: "Welcome to", word: "both sides.", post: "" },
];

function Word({ children }: { children: string }) {
  return (
    <span
      className="text-lemon italic"
      style={{ fontFamily: "var(--font-display-serif)" }}
    >
      {children}
    </span>
  );
}

/**
 * Splits a line into individually-staggerable tokens, keeping the emphasis
 * phrase (`word`) as one unbroken unit. Visibility lives on each word span,
 * not the parent `<p>` — GSAP only ever animates the words, so the parent
 * must stay fully opaque or an animated child's opacity:1 would still
 * render invisible inside an opacity:0 ancestor.
 */
function LineTokens({
  line,
  hidden,
}: {
  line: (typeof LINES)[number];
  hidden: boolean;
}) {
  const preWords = line.pre ? line.pre.split(" ") : [];
  const postWords = line.post ? line.post.split(" ") : [];
  // Spacing is margin, not a trailing space character — a space as the last
  // character inside `inline-block` sits at the edge of that box's own line
  // box and gets collapsed away by normal whitespace rules, which is what
  // was silently swallowing every space between words.
  const wordClass = cn(
    "mr-[0.28em] inline-block last:mr-0",
    hidden && "opacity-0",
  );

  return (
    <>
      {preWords.map((w, i) => (
        <span key={`pre-${i}`} data-word className={wordClass}>
          {w}
        </span>
      ))}
      <span data-word className={wordClass}>
        <Word>{line.word}</Word>
      </span>
      {postWords.map((w, i) => (
        <span key={`post-${i}`} data-word className={wordClass}>
          {w}
        </span>
      ))}
    </>
  );
}

/**
 * Reduced-motion users get ScrollArrest's static-flow fallback (no pin), but
 * the crossfading lines below are only ever revealed by the GSAP timeline —
 * without it every line but the first would stay permanently at opacity-0.
 * So this renders a completely different, already-static layout: all lines
 * stacked and visible, no absolute positioning, nothing waiting on a
 * timeline that will never run.
 */
function StaticLines() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {LINES.map((line, i) => (
        <p key={i} className="text-2xl leading-snug font-light md:text-4xl">
          {line.pre} <Word>{line.word}</Word> {line.post}
        </p>
      ))}
    </div>
  );
}

export function SignatureSequence() {
  const reducedMotion = useReducedMotion();

  return (
    <ScrollArrest
      duration={LINES.length * 0.7}
      className={cn(
        "relative z-55 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-(--scroll-fg)",
        // Same reasoning as StatsReveal: ScrollTheme owns the background and
        // text color continuously across the whole dark run, this section
        // only needs its own opaque fallback when that scroll-scrub isn't
        // running.
        reducedMotion && "bg-foreground",
      )}
      coverHeader
      animate={({ timeline, root }) => {
        const lines = Array.from(
          root.querySelectorAll<HTMLElement>("[data-line]"),
        );

        lines.forEach((line, i) => {
          const words = Array.from(
            line.querySelectorAll<HTMLElement>("[data-word]"),
          );

          if (i > 0) {
            const prevWords =
              lines[i - 1].querySelectorAll<HTMLElement>("[data-word]");
            timeline.to(
              prevWords,
              { opacity: 0, y: -18, duration: 0.25, ease: "power1.in" },
              i - 0.55,
            );

            timeline.fromTo(
              words,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.035,
                ease: "power2.out",
              },
              i - 0.4,
            );
          }
        });

        const total = timeline.duration();
        const bar = root.querySelector("[data-progress]");
        if (bar) {
          timeline.fromTo(
            bar,
            { scaleX: 0 },
            { scaleX: 1, ease: "none", duration: total },
            0,
          );
        }
      }}
    >
      {reducedMotion ? (
        <StaticLines />
      ) : (
        <>
          <div className="relative flex h-32 w-full max-w-3xl items-center justify-center text-center">
            {LINES.map((line, i) => (
              <p
                key={i}
                data-line
                className="absolute inset-x-0 text-3xl leading-snug font-light md:text-5xl"
              >
                <LineTokens line={line} hidden={i !== 0} />
              </p>
            ))}
          </div>

          <div className="absolute bottom-14 h-px w-40 bg-background/20">
            <div
              data-progress
              className="h-full w-full origin-left scale-x-0 bg-lemon"
            />
          </div>
        </>
      )}
    </ScrollArrest>
  );
}

export default SignatureSequence;
