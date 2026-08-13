"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

import { CoverArt } from "@/components/shared/CoverArt";
import type { GalleryItem } from "@/lib/content";
import { cn } from "@/lib/utils";

interface GalleryLightboxProps {
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

/**
 * Radix Dialog gives this the accessibility groundwork for free — focus
 * trap, Escape-to-close, aria wiring — while the entrance stays a plain
 * ease-out fade+scale (tw-animate-css's data-state utilities), matching the
 * "paired elements share one timing" rule: overlay and content both run
 * 200ms so they read as one motion, not two.
 */
export function GalleryLightbox({ items, index, onIndexChange }: GalleryLightboxProps) {
  const open = index !== null;
  const item = index !== null ? items[index] : null;

  useEffect(() => {
    if (index === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") onIndexChange(((index as number) + 1) % items.length);
      if (event.key === "ArrowLeft") onIndexChange(((index as number) - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, items.length, onIndexChange]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-90 bg-foreground/90 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
            "duration-200",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-90 flex items-center justify-center p-6 outline-none md:p-16",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "duration-200 ease-out",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            {item?.image?.alt ?? "Gallery image"}
          </DialogPrimitive.Title>

          {item ? (
            <div className="flex max-h-full w-full max-w-2xl flex-col items-center gap-4">
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg">
                <CoverArt
                  accent={item.accent}
                  image={item.image}
                  fallbackSeed={item.id}
                  className="h-full w-full"
                />
              </div>
              {item.caption ? (
                <p className="text-center text-sm tracking-normal text-background/80">
                  {item.caption}
                </p>
              ) : null}
            </div>
          ) : null}

          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute top-6 right-6 inline-flex size-10 items-center justify-center rounded-full bg-background/10 text-background transition-[background-color,transform] duration-150 hover:bg-background/20 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lemon"
          >
            <X className="size-5" />
          </DialogPrimitive.Close>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => onIndexChange(((index as number) - 1 + items.length) % items.length)}
                className="absolute top-1/2 left-4 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/10 text-background transition-[background-color,transform] duration-150 hover:bg-background/20 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lemon md:left-8"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => onIndexChange(((index as number) + 1) % items.length)}
                className="absolute top-1/2 right-4 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/10 text-background transition-[background-color,transform] duration-150 hover:bg-background/20 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lemon md:right-8"
              >
                <ChevronRight className="size-5" />
              </button>
              <p className="absolute bottom-6 text-xs tracking-normal text-background/60 lowercase">
                {(index as number) + 1} / {items.length}
              </p>
            </>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default GalleryLightbox;
