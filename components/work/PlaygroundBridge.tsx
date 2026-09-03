import Link from "next/link";

import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import type { PersonalProject } from "@/lib/content";

interface PlaygroundBridgeProps {
  projects: PersonalProject[];
}

/**
 * The one place /work admits that /playground exists.
 *
 * Without it the two halves of the practice never meet: someone who lands on
 * /work reads a list of client engagements and leaves, and the personal work
 * is reachable only from the menu, where it looks like a fifth nav item rather
 * than the other half of the same story. This sits directly under the client
 * listing so the contrast is the point — same person, different constraints.
 *
 * Named projects rather than a bare "see my side projects" link, and the same
 * numbered-index treatment the home page's SelectedWork uses: a link is more
 * persuasive when it has already shown you the specific things it leads to.
 */
export function PlaygroundBridge({ projects }: PlaygroundBridgeProps) {
  // Everything but the last entry. The array is ordered with the substantial
  // work first and Bug Squash (a toy) pinned last, so dropping the tail keeps
  // the joke off a page that is making a case. Add a second throwaway and this
  // needs to become an explicit flag rather than a position.
  const featured = projects.slice(0, -1);
  if (!featured.length) return null;

  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-400">
        <RevealOnScroll>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs tracking-normal text-muted-foreground lowercase">
                Off the brief
              </p>
              <h2 className="mt-2 max-w-xl font-heading text-3xl leading-tight md:text-4xl">
                Not all of it is client work.
              </h2>
            </div>
            <Link
              href="/playground"
              className="inline-flex min-h-11 items-center text-xs tracking-normal text-muted-foreground lowercase transition-colors hover:text-cta"
            >
              Everything in the playground →
            </Link>
          </div>
        </RevealOnScroll>

        <ol className="mt-10 md:mt-14 md:max-w-[70%]">
          {featured.map((project, index) => (
            <li key={project.slug}>
              <RevealOnScroll delay={index * 0.06}>
                <Link
                  href={`/playground/${project.slug}`}
                  data-cursor-label="View project"
                  className="group flex flex-wrap items-baseline gap-x-4 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="text-xs tracking-normal text-muted-foreground"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-2xl tracking-tight transition-colors group-hover:text-cta md:text-3xl">
                    {project.title}
                  </span>
                  <span className="text-xs tracking-normal text-muted-foreground lowercase md:ml-auto">
                    {project.status}
                  </span>
                </Link>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default PlaygroundBridge;
