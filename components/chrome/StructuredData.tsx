import { siteConfig } from "@/lib/content";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";

/**
 * Schema.org JSON-LD for the site's identity.
 *
 * Meta tags describe a page; this describes the person and the site as
 * entities, which is what a search engine needs to connect this domain to a
 * named human and their profiles elsewhere. `sameAs` is the specific part that
 * matters: it is how Google links this site to the GitHub, LinkedIn and X
 * accounts as one identity instead of four unrelated pages.
 *
 * Rendered as a plain script tag rather than through `next/script` because it
 * has to be in the initial HTML. Crawlers parse the served document; a tag
 * injected after hydration is not reliably seen.
 */
export function StructuredData() {
  const fullName = `${siteConfig.name.replace(/\.$/, "")} Ezimorah`;

  const graph = [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: fullName,
      url: SITE_URL,
      image: absoluteUrl("/opengraph-image"),
      jobTitle: siteConfig.role,
      description: siteConfig.description,
      email: `mailto:${siteConfig.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      sameAs: siteConfig.social
        .filter((link) => link.href.startsWith("http"))
        .map((link) => link.href),
      knowsAbout: [
        "Product engineering",
        "Frontend architecture",
        "React",
        "Next.js",
        "TypeScript",
        "Design systems",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${fullName} · ${siteConfig.role}`,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // The content is built from local config, never from user input, so there
      // is no injection surface here. Serialised with JSON.stringify and the
      // closing-tag sequence escaped, which is the one string that could break
      // out of a script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}

export default StructuredData;
