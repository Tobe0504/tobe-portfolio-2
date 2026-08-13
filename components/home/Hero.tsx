import Image from "next/image";

import { StatusBadges } from "./StatusBadges";
import { siteConfig } from "@/lib/content";

const [roleFirstWord, ...roleRestWords] = siteConfig.role.split(" ");
const roleRest = roleRestWords.join(" ");

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pt-10 pb-10 md:px-10 md:pt-14">
      <div className="mx-auto max-w-400">
        <h1 className="font-heading text-[clamp(3.75rem,16vw,8.5rem)] tracking-tighter md:mt-20">
          {siteConfig.name}
        </h1>

        <div className="relative z-10 -mt-8 flex justify-end pr-[4vw] sm:-mt-12 lg:-mt-16 lg:pr-[8vw]">
          <div className="relative aspect-[3/4] w-[clamp(11rem,40vw,26rem)] shrink-0 overflow-hidden rounded-2xl bg-muted shadow-[0_2px_4px_rgba(0,0,0,0.04),0_16px_40px_-12px_rgba(0,0,0,0.18)]">
            <Image
              src="https://res.cloudinary.com/dryjxk5jw/image/upload/v1785873925/Gemini_Generated_Image_mba90hmba90hmba9_buhqar.png"
              alt={`${siteConfig.name}, as a kid`}
              fill
              sizes="(min-width: 1024px) 26rem, 40vw"
              priority
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
          </div>
        </div>

        <div className="mt-4 flex justify-end sm:mt-6 lg:mt-8 ">
          <h2 className="font-heading text-[clamp(1.75rem,7.5vw,5rem)] leading-[0.82] tracking-tight text-foreground/50">
            {roleFirstWord}
            <br />
            {roleRest}
            <span className="text-right text-[20px] text-muted-foreground tracking-normal">
              & funny guy.
            </span>
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-8 sm:mt-10 sm:flex-row sm:items-end sm:justify-between md:mt-14">
          <p className="max-w-sm text-base text-muted-foreground">
            {siteConfig.tagline}
          </p>
          <p className="text-xs tracking-normal text-muted-foreground lowercase">
            scroll ↓
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <StatusBadges />
        </div>
      </div>
    </section>
  );
}

export default Hero;
