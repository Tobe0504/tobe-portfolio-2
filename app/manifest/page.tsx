import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

import { Capabilities } from "@/components/manifest/Capabilities";
import { ManifestCta } from "@/components/manifest/ManifestCta";
import { ManifestHero } from "@/components/manifest/ManifestHero";
import { ManifestoSection } from "@/components/manifest/ManifestoSection";
import { ProcessAccordion } from "@/components/manifest/ProcessAccordion";

export const metadata: Metadata = pageMetadata({
  title: "Manifest",
  description:
    "How I work: discovery, architecture, build, and the principles underneath. What a project with me actually looks like from the inside.",
  path: "/manifest",
});

export default function ManifestPage() {
  return (
    <>
      <ManifestHero />
      <ManifestoSection />
      <Capabilities />
      <ProcessAccordion />
      <ManifestCta />
    </>
  );
}
