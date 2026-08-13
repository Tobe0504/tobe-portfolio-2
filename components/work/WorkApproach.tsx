import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface WorkApproachProps {
  intro: string;
  statement: string;
}

/** Closes the page the way madeinevolve.com/services does: a small
 * grounding paragraph, then one larger statement that restates the thesis
 * at a bigger scale. Same two-tier text pattern, this site's own voice. */
export function WorkApproach({ intro, statement }: WorkApproachProps) {
  return (
    <section className="bg-foreground px-6 pt-24 pb-40 text-background md:px-10">
      <div className="mx-auto max-w-400">
        <RevealOnScroll>
          <p className="max-w-md text-sm leading-relaxed text-background/60">
            {intro}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mt-20 max-w-4xl font-heading text-3xl leading-snug tracking-tight md:text-5xl">
            {statement}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default WorkApproach;
