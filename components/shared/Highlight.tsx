import type { ReactNode } from "react";

/**
 * The light-background counterpart to SignatureSequence's lemon/italic
 * word treatment — lemon can't be used as literal text color on white
 * (fails contrast), so here it's a highlighter-pen mark behind normal-ink
 * italic serif text instead. Same "one lifestyle-voice word per moment"
 * restraint.
 */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span
        className="relative z-10 italic"
        style={{ fontFamily: "var(--font-display-serif)" }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0.5 -z-0 h-[0.32em] -rotate-1 bg-lemon/80"
      />
    </span>
  );
}

export default Highlight;
