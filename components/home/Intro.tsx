import Link from "next/link";

import { Highlight } from "@/components/shared/Highlight";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function Intro() {
  return (
    <section className="border-t border-border px-6 py-28 md:px-10">
      <div className="mx-auto max-w-400">
        <RevealOnScroll>
          <p className="max-w-3xl font-heading text-3xl leading-snug md:text-5xl">
            Most interfaces don&apos;t fail from doing too little. I design the
            parts that matter and cut the rest, brand systems, product surfaces,
            and editorial layouts built to hold up under <Highlight>real use.</Highlight>
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15} className="mt-10">
          <Link
            href="/manifest"
            className="inline-flex items-center gap-2 text-xs tracking-normal lowercase transition-colors hover:text-cta"
          >
            Read the manifest →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default Intro;
