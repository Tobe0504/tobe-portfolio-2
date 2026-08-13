import type { Metadata } from "next";

import { PlaygroundListing } from "@/components/playground/PlaygroundListing";
import { getPersonalProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Playground",
};

export default async function PlaygroundPage() {
  const projects = await getPersonalProjects();

  return (
    <>
      <section className="px-6 pt-32 pb-16 md:px-10">
        <div className="mx-auto max-w-400">
          <p className="text-xs tracking-normal text-muted-foreground lowercase">
            Playground
          </p>
          <h1 className="mt-2 max-w-2xl font-heading text-4xl leading-tight font-light tracking-tight md:text-5xl">
            Things I&apos;m building on my own time, in various states of done.
          </h1>
          <p className="mt-6 max-w-lg text-base text-muted-foreground">
            No clients, no deadlines, just whatever I&apos;m curious about this
            month.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-400">
          <PlaygroundListing projects={projects} />
        </div>
      </section>
    </>
  );
}
