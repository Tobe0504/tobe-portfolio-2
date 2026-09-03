import { ArrowUpRight, Award } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/lib/content";
import { MediaReel } from "./MediaReel";
import { PrevNextStrip } from "./PrevNextStrip";

interface ProjectDetailProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

/**
 * iancoad.com pattern: a sticky ~30% sidebar beside a scrolling media
 * column. `position: sticky` + `items-start`/`self-start` does the whole
 * pin — no JS, no ScrollTrigger. The sidebar's containing block ends where
 * this grid row ends, so it releases cleanly once the body copy below (a
 * sibling, not part of this grid) scrolls into view.
 */
export function ProjectDetail({ project, prev, next }: ProjectDetailProps) {
  return (
    <article className="bg-foreground text-background">
      <div className="lg:grid lg:grid-cols-[32%_68%] lg:items-start">
        <aside className="flex flex-col justify-center gap-8 px-6 py-16 lg:sticky lg:top-0 lg:h-screen lg:self-start lg:px-10 lg:py-0">
          <div>
            <Link
              href="/work"
              className="text-xs tracking-normal lowercase opacity-60 transition-opacity hover:opacity-100"
            >
              ← All work
            </Link>
            <p className="mt-8 text-xs tracking-normal lowercase opacity-60">
              {project.category}, {project.year}
            </p>
            <h1 className="mt-3 font-heading text-4xl leading-[0.95] font-light tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-xs text-sm opacity-80">
              {project.summary}
            </p>
            {project.live === false ? (
              <p className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs tracking-normal lowercase opacity-60">
                <span className="size-1.5 rounded-full bg-background/40" />
                No longer live
              </p>
            ) : project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs tracking-normal lowercase opacity-80 transition-opacity hover:opacity-100"
              >
                Visit site
                <ArrowUpRight className="size-3.5" />
              </a>
            ) : null}
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs lowercase">
            <div>
              <dt className="opacity-50">Client</dt>
              <dd className="mt-1 normal-case opacity-90">{project.client}</dd>
            </div>
            <div>
              <dt className="opacity-50">Role</dt>
              <dd className="mt-1 normal-case opacity-90">
                {project.role.join(", ")}
              </dd>
            </div>
            {project.timeline ? (
              <div>
                <dt className="opacity-50">Timeline</dt>
                <dd className="mt-1 normal-case opacity-90">{project.timeline}</dd>
              </div>
            ) : null}
          </dl>

          {project.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-background/20 px-3 py-1 text-xs sm:text-[10px] tracking-normal lowercase opacity-70"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </aside>

        <MediaReel project={project} />
      </div>

      <div className="border-t border-background/15 px-6 py-16 lg:px-10">
        {project.body.map((paragraph, i) => (
          <p
            key={i}
            className="max-w-2xl text-lg leading-relaxed opacity-90 not-first:mt-6"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {project.challenges?.length ? (
        <div className="border-t border-background/15 px-6 py-16 lg:px-10">
          <p className="text-xs tracking-normal opacity-50 lowercase">
            Challenges
          </p>
          <ul className="mt-6 flex max-w-2xl flex-col gap-3">
            {project.challenges.map((challenge, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed opacity-90">
                <span className="mt-2.5 size-1 shrink-0 rounded-full bg-cta" />
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.features?.length ? (
        <div className="border-t border-background/15 px-6 py-16 lg:px-10">
          <p className="text-xs tracking-normal opacity-50 lowercase">
            Key features
          </p>
          <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {project.features.map((feature) => (
              <div key={feature.name}>
                <p className="font-heading text-xl">{feature.name}</p>
                <p className="mt-1 text-sm opacity-70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {project.achievements?.length ? (
        <div className="border-t border-background/15 px-6 py-16 lg:px-10">
          <p className="text-xs tracking-normal opacity-50 lowercase">
            Achievements
          </p>
          <div className="mt-6 flex max-w-2xl flex-col gap-6">
            {project.achievements.map((achievement) => (
              <div key={achievement.name} className="flex gap-4">
                <Award className="mt-1 size-5 shrink-0 text-cta" />
                <div>
                  <p className="font-heading text-lg">{achievement.name}</p>
                  <p className="mt-1 text-sm opacity-70">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <PrevNextStrip prev={prev} next={next} />
    </article>
  );
}

export default ProjectDetail;
