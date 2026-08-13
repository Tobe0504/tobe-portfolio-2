import type { Metadata } from "next";
import Link from "next/link";

import { BugSquashGame } from "@/components/playground/BugSquashGame";

export const metadata: Metadata = {
  title: "Bug Squash",
};

export default function BugSquashPage() {
  return (
    <>
      <section className="px-6 pt-32 pb-10 md:px-10">
        <div className="mx-auto max-w-400">
          <Link
            href="/playground"
            className="text-xs tracking-normal text-muted-foreground lowercase transition-colors hover:text-cta"
          >
            ← Playground
          </Link>

          <h1 className="mt-2 max-w-2xl font-heading text-4xl leading-tight font-light tracking-tight md:text-5xl">
            Bug Squash
          </h1>
          <p className="mt-6 max-w-lg text-base text-muted-foreground">
            The other half of the job. Click the bugs before they get away.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10">
        <BugSquashGame />
      </section>
    </>
  );
}
