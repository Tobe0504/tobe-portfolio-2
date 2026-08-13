import Link from "next/link";

export function ManifestCta() {
  return (
    <section className="px-6 py-28 md:px-10">
      <div className="mx-auto flex max-w-400 flex-col items-start gap-6">
        <p className="font-heading text-3xl md:text-4xl">
          Have a product that needs someone to own it end to end?
        </p>
        <Link
          href="/contact"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-cta px-6 py-3 text-xs text-cta-foreground lowercase transition-transform duration-300 hover:scale-105"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}

export default ManifestCta;
