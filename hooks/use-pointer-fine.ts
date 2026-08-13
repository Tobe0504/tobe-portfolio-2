"use client";

import { useMediaQuery } from "./use-media-query";

/** True only for mouse/trackpad-class pointers. Gate mouse-driven-only UI on this — not CSS display, real conditional mounting. */
export function usePointerFine(): boolean {
  return useMediaQuery("(pointer: fine)");
}
