import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

import { ContactCTA } from "@/components/contact/ContactCTA";
import { QuickFacts } from "@/components/contact/QuickFacts";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { Highlight } from "@/components/shared/Highlight";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Have a project, a question, or just want to talk shop? Get in touch. I usually reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="px-6 pt-32 pb-16 md:px-10">
        <div className="mx-auto max-w-400">
          <p className="text-xs tracking-normal text-muted-foreground lowercase">
            Contact
          </p>
          <h1 className="mt-2 max-w-2xl font-heading text-4xl leading-tight font-light tracking-tight md:text-5xl">
            Have a project, a question, or just want to talk shop? I read
            everything <Highlight>myself.</Highlight>
          </h1>
          <p className="mt-6 max-w-lg text-base text-muted-foreground">
            No account managers, no forms that go into a black hole, just tell
            me what you&apos;re working on and I&apos;ll get back to you
            personally.
          </p>
        </div>
      </section>

      <ContactCTA />

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-400">
          <RevealOnScroll>
            <QuickFacts />
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-400">
          <p className="text-xs tracking-normal text-muted-foreground lowercase">
            Elsewhere
          </p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>
      </section>
    </>
  );
}
