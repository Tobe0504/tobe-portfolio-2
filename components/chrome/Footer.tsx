import Link from "next/link";

import { SignatureMark } from "@/components/shared/SignatureMark";
import { siteConfig } from "@/lib/content";

/**
 * byfrontyard.com's footer — pinned under the page, revealed as the last
 * section scrolls up and off rather than just arriving in normal flow.
 * The mechanism (confirmed by inspecting their DOM, no JS on their end
 * either): the footer is `position: sticky; bottom: 0` in normal document
 * flow, nothing else. Once its natural (static) position would put it below
 * the viewport, sticky catches it and holds it flush to the bottom edge —
 * so while `<main>` (given a higher z-index in layout.tsx) keeps scrolling
 * normally above it, the footer stays visually still, and main's trailing
 * content appears to slide up and off, revealing it. No overlap or negative
 * margin needed — that would just cancel out the scroll room the reveal
 * needs to play out over.
 */
export function Footer() {
  return (
    <footer className="sticky bottom-0 z-0 overflow-hidden bg-foreground text-background">
      <div className="mx-auto max-w-400 px-6 py-20 md:px-0">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <SignatureMark className="h-10 w-10" />
            <p className="mt-6 max-w-sm font-heading text-2xl leading-snug">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-0 sm:gap-2">
              <span className="text-xs sm:text-[11px] tracking-normal text-background/50 lowercase">
                Index
              </span>
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center text-sm transition-colors hover:text-cta sm:min-h-0"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-0 sm:gap-2">
              {/* Third column rather than an extra row in Connect: a resume is
                  not a social profile, and burying it under the same heading
                  is how it stops getting found. */}
              <span className="text-xs sm:text-[11px] tracking-normal text-background/50 lowercase">
                Documents
              </span>
              {siteConfig.documents.map((doc) => (
                <a
                  key={doc.href}
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 items-center text-sm transition-colors hover:text-cta sm:min-h-0"
                >
                  {doc.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-0 sm:gap-2">
              <span className="text-xs sm:text-[11px] tracking-normal text-background/50 lowercase">
                Connect
              </span>
              {siteConfig.social.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center text-sm transition-colors hover:text-cta sm:min-h-0"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-background/15 pt-6 text-xs sm:text-[11px] tracking-normal text-background/40 lowercase sm:flex-row sm:items-center sm:justify-between">
          <span>{siteConfig.location}</span>
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>
      </div>

      <a
        href="#top"
        className="block pt-8 pb-6 font-heading leading-[0.82] tracking-tighter transition-opacity hover:opacity-80"
      >
        <span className="block px-6 tracking-tighter text-[clamp(3.5rem,22vw,7rem)] whitespace-nowrap md:px-10 md:text-[clamp(10rem,40vw,28rem)] lg:text-[clamp(14rem,48vw,40rem)]">
          {siteConfig.name}
        </span>
      </a>
    </footer>
  );
}

export default Footer;
