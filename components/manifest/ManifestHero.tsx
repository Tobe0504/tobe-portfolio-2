import { siteConfig } from "@/lib/content";

export function ManifestHero() {
  return (
    <section className="border-b border-border px-6 pt-32 pb-20 md:px-10">
      <div className="mx-auto max-w-400">
        <h1 className="font-heading text-[18vw] leading-[0.85] font-light tracking-tight md:text-6xl">
          Manifest
        </h1>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-xs tracking-normal text-muted-foreground lowercase">
          <span>{siteConfig.location}</span>
          <span>{siteConfig.role}</span>
        </div>
      </div>
    </section>
  );
}

export default ManifestHero;
