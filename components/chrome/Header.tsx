"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SignatureMark } from "@/components/shared/SignatureMark";
import { useScrolled } from "@/hooks/use-scrolled";
import { siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

import { useDarkSection } from "./DarkSectionProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MenuToggle } from "./MenuToggle";

/** Project detail pages (/work/[slug]) render a dark `bg-foreground` article
 * with no light backdrop underneath the fixed header — invert the header to
 * match rather than leaving a mismatched light bar over dark content. */
function useIsDarkRoute() {
  const pathname = usePathname();
  return /^\/work\/[^/]+$/.test(pathname ?? "");
}

export function Header() {
  const isDarkRoute = useIsDarkRoute();
  const isHome = usePathname() === "/";
  const { active: darkSectionActive } = useDarkSection();
  const dark = isDarkRoute || darkSectionActive;
  // Home already gets continuous coverage from ScrollTheme's per-frame
  // --scroll-bg scrub (including through its own dark sections), so it's
  // excluded here — routing it through the hard flip too would swap a
  // smooth scrub for a stepped 300ms transition during the exact same
  // moments. Everywhere else, darkSectionActive is the only thing that
  // ever tells the header to invert (no continuous var is running), so it
  // needs to drive the hard flip itself, same as isDarkRoute already does.
  const hardDark = isDarkRoute || (darkSectionActive && !isHome);
  // Fully transparent at the very top of any page — heroes are expected to
  // carry their own contrast there (WorkHero's gradient, Home's light bg).
  // The blur+tint only earns its keep once real content is scrolling
  // underneath the bar and needs something to separate it from the header.
  const scrolled = useScrolled();

  return (
    <header
      // Hook for Home's load intro (HeroIntro), which drops the header in
      // from above as the final beat and needs to park it off-screen before
      // that — and for the CSS in globals.css that holds it parked until
      // GSAP has hydrated and taken over.
      data-site-header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        scrolled &&
          (hardDark
            ? "bg-foreground/80 backdrop-blur-md transition-colors duration-300"
            : "bg-(--scroll-bg)/80 backdrop-blur-md"),
      )}
    >
      <div className="mx-auto grid h-16 max-w-400 grid-cols-3 items-center px-6 md:px-0">
        <div className="flex justify-start">
          <Link
            href="/"
            className={cn(
              "flex min-h-11 items-center gap-1 transition-opacity hover:opacity-70",
              hardDark ? "text-background" : "text-(--scroll-fg)",
            )}
            aria-label={`${siteConfig.name}, home`}
          >
            <SignatureMark className="h-10 w-10" />
            <span className="text-lg font-medium tracking-normal lowercase">
              {siteConfig.initials}
            </span>
          </Link>
        </div>

        <div className="flex justify-center">
          <MenuToggle
            nav={siteConfig.nav}
            social={siteConfig.social}
            dark={dark}
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <LanguageSwitcher dark={dark} />
          <Link
            href="/contact"
            className={cn(
              "hidden min-h-11 items-center rounded-full border px-4 text-xs tracking-normal lowercase transition-[color,border-color,transform] duration-150 hover:border-cta hover:text-cta active:scale-[0.97] sm:inline-flex",
              dark
                ? "border-background/25 text-background/70"
                : "border-border text-muted-foreground",
            )}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
