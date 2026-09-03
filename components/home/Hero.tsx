import Image from "next/image";
import Link from "next/link";

import { HeroIntro } from "./HeroIntro";
import { StatusBadges } from "./StatusBadges";
import { siteConfig } from "@/lib/content";

/** The headline is one unbreakable line — `Tobe. [portrait] Ezimorah` — with
 * the portrait sitting in an inline slot between the two words, because the
 * load intro (see HeroIntro) works by collapsing a full-viewport image down
 * into exactly that slot. Change these two strings and the intro re-measures
 * itself; nothing else needs touching. */
const HERO_WORDS = [siteConfig.name, "Ezimorah"] as const;

/** Moved up from what used to be the `Intro` section a screen below. The
 * reference site puts exactly one descriptive paragraph in the middle of its
 * hero's bottom strip and doesn't repeat it further down the page, so keeping
 * a near-identical statement in both places would have been saying the same
 * thing twice within one scroll. The `Highlight` marker the old section wrapped
 * around "real use" doesn't come with it: it's a highlighter-pen bar sized in
 * `em`, which at this strip's 12px would render as a ~4px smudge. */
const STATEMENT =
  "Most interfaces don't fail from doing too little. I design the parts that matter and cut the rest, brand systems, product surfaces, and editorial layouts built to hold up under real use.";

export function Hero() {
  return (
    // `relative` is the positioning context the statement below anchors to on
    // small screens, and `isolate z-20` keeps the intro's full-bleed image
    // painting above the sections that follow it in the document.
    <section className="relative isolate z-20 px-6 md:px-10">
      {/* Full viewport height, minus the fixed header's 4rem that `main`
          already reserves as top padding — so the hero occupies exactly one
          screen and no more, the way the reference's does. Headline takes the
          slack in the middle; the strip is pinned to the bottom edge. */}
      <HeroIntro className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-400 flex-col pb-8">
        <div className="flex flex-1 items-center justify-center">
          {/* `nowrap` is structural, not stylistic: the two words and the
              image slot have to stay on one line for the intro to have a
              single horizontal axis to fly along. The clamp is sized so the
              line spans ~80% of the viewport — matching how much of the screen
              the reference's headline claims — while still clearing the page
              gutters at every width down to 320px. */}
          <h1 className="whitespace-nowrap text-center font-heading text-[clamp(2rem,12vw,14rem)] leading-[0.8] tracking-tighter">
            <span data-hero-word className="inline-block">
              {HERO_WORDS[0]}
            </span>
            <span
              aria-hidden="true"
              data-hero-slot
              // Sized in `em` so the slot tracks the headline's own clamp at
              // every viewport. The reference uses a landscape 1.5/1 chip
              // because its loader stills are landscape; this one is portrait
              // to match the photo, at a height (0.5em × 4/3 ≈ 0.67em) that
              // lands just under the cap height of the words it sits between.
              className="relative z-10 mx-[0.06em] inline-flex aspect-[3/4] w-[0.5em] items-center justify-center"
            >
              {/* The element the intro actually animates. Absolute + inset-0
                  means its box is the slot's box, so growing it to viewport
                  size is all it takes to fill the screen — and the radius,
                  being an em of the headline rather than a fixed px, stays in
                  proportion at every size it passes through. */}
              <span
                data-hero-img-wrap
                className="absolute inset-0 block overflow-hidden rounded-[0.05em] bg-muted will-change-[width,height,transform]"
              >
                <Image
                  src="https://res.cloudinary.com/dryjxk5jw/image/upload/v1785873925/Gemini_Generated_Image_mba90hmba90hmba9_buhqar.png"
                  alt=""
                  fill
                  // Sized for the intro's opening panel (~40vw at desktop),
                  // not for the ~90px chip it spends the rest of its life as.
                  // next/image measures only the settled size and warns in dev
                  // that this is too generous — expected, and wrong to act on:
                  // fetching at chip size would make the opening frame mush.
                  sizes="(min-width: 768px) 40vw, 80vw"
                  preload
                  className="object-cover"
                />
                <span className="pointer-events-none absolute inset-0 rounded-[0.05em] ring-1 ring-black/10 ring-inset dark:ring-white/10" />
              </span>
            </span>
            <span data-hero-word className="inline-block">
              {HERO_WORDS[1]}
            </span>
          </h1>
        </div>

        {/* The bottom strip: status, statement, action — the reference's three
            columns, at one small type size with nothing between them and the
            headline. Below `md` the statement lifts out of the strip entirely
            and sits at the top of the screen instead (see its own classes),
            leaving status and action as a two-up row, which is the same move
            the reference makes at its own breakpoint. */}
        <div className="grid grid-cols-2 items-end gap-6 text-xs tracking-normal lowercase md:grid-cols-[1fr_minmax(0,22rem)_1fr] md:gap-10">
          <div className="flex flex-col gap-0.5">
            {/* Built as one template string rather than `{role} &amp; funny
                guy`: JSX drops the space between an expression and the text
                that follows it, and renders "Product Engineer& funny guy". */}
            <span className="text-muted-foreground/60">
              {`${siteConfig.role} & funny guy`}
            </span>
            <StatusBadges />
          </div>

          {/* Full-strength ink, not muted: in the reference only the small
              label above the live line is dimmed — the statement and the
              action next to it both read at full contrast, which is what
              stops a strip this small from disappearing under the headline. */}
          <p className="absolute inset-x-6 top-2 max-w-[22rem] leading-relaxed normal-case md:static md:inset-auto md:top-auto md:max-w-none md:leading-normal">
            {STATEMENT}
          </p>

          <Link
            href="/manifest"
            className="inline-flex min-h-11 items-center justify-self-end text-right transition-colors hover:text-cta"
          >
            Read the manifest →
          </Link>
        </div>
      </HeroIntro>
    </section>
  );
}

export default Hero;
