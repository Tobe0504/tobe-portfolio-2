"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface DarkSectionContextValue {
  active: boolean;
  setActive: (active: boolean) => void;
}

const DarkSectionContext = createContext<DarkSectionContextValue | null>(null);

/**
 * Lets an in-page section (e.g. SignatureSequence, a pinned dark moment)
 * tell the fixed Header to switch to its dark treatment while that section
 * is in view — the same visual state Header already has for /work/[slug]
 * routes, just triggered by scroll position instead of the route. Header
 * reads `active`; a scroll-bound section calls `setActive` from its
 * ScrollTrigger's enter/leave callbacks.
 */
export function DarkSectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  return (
    <DarkSectionContext.Provider value={{ active, setActive }}>
      {children}
    </DarkSectionContext.Provider>
  );
}

export function useDarkSection() {
  const ctx = useContext(DarkSectionContext);
  if (!ctx) throw new Error("useDarkSection must be used within a DarkSectionProvider");
  return ctx;
}
