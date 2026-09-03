"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";

import { ParticleReveal } from "@/components/canvasui/ParticleReveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * ParticleReveal's `background` prop only paints the WebGL canvas in
 * "native" html-in-canvas mode — most browsers fall back to plain DOM
 * content with no canvas at all, and the wrapper itself has no CSS
 * background. Without an explicit bg class here, that fallback renders
 * invisible white-on-white text. Everything here uses literal white/black,
 * not theme tokens, since this block deliberately opts out of the
 * light/dark toggle rather than keeping a WebGL-painted color in sync
 * with it.
 */
export function ContactCTA() {
  const reducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable (e.g. insecure context) — the mailto
      // and visible email text are still there as a fallback.
    }
  }

  return (
    <ParticleReveal
      className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-8 bg-[#0e0d0a] px-6"
      background="#0e0d0a"
      radius={420}
      softness={0.7}
      drift={reducedMotion ? 0 : 1}
      smoothing={reducedMotion ? 0 : 0.25}
    >
      <a
        href={`mailto:${siteConfig.email}`}
        className="block px-6 py-2 text-center font-heading text-4xl break-words text-white transition-colors hover:text-cta sm:text-6xl md:text-7xl"
      >
        {siteConfig.email}
      </a>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-xs text-white lowercase transition-[border-color,transform] duration-150 hover:border-white/50 active:scale-[0.97]"
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? "copied" : "copy email"}
        </button>

        <a
          href={`mailto:${siteConfig.email}`}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-full bg-cta px-5 text-xs text-cta-foreground lowercase transition-transform duration-300 hover:scale-105 active:scale-95",
          )}
        >
          <Mail className="size-3.5" />
          open mail app
        </a>
      </div>
    </ParticleReveal>
  );
}

export default ContactCTA;
