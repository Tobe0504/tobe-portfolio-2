import type { Metadata } from "next";

import { Capabilities } from "@/components/manifest/Capabilities";
import { ManifestCta } from "@/components/manifest/ManifestCta";
import { ManifestHero } from "@/components/manifest/ManifestHero";
import { ManifestoSection } from "@/components/manifest/ManifestoSection";
import { ProcessAccordion } from "@/components/manifest/ProcessAccordion";

export const metadata: Metadata = {
  title: "Manifest",
};

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
