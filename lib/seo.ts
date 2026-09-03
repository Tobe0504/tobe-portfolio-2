import type { Metadata } from "next";

import { siteConfig } from "@/lib/content";

/**
 * Builds a complete `openGraph` block for a route.
 *
 * This exists because of one line in the Next metadata docs: metadata objects
 * are merged **shallowly**, and "nested fields such as openGraph ... defined in
 * an earlier segment are overwritten by the last segment to define them". So a
 * page that sets `openGraph: { title }` does not add a title to the root's
 * block, it replaces the whole thing, silently dropping siteName, locale, type
 * and the image from app/opengraph-image.tsx.
 *
 * That failure is invisible in the app and only shows up when someone pastes a
 * link and gets a preview with no picture. Restating the shared fields once,
 * here, is what stops every new route from having to remember them.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  images,
  publishedTime,
  tags,
}: {
  title: string;
  description: string;
  /** Site-relative, e.g. "/work" or `/work/${slug}`. */
  path: string;
  type?: "website" | "article";
  /** Route-specific preview image. Omit to inherit the site-wide card. */
  images?: { url: string; alt?: string }[];
  publishedTime?: string;
  tags?: string[];
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: siteConfig.name,
      locale: "en_US",
      title,
      description,
      url: path,
      // Verified empirically, and the opposite of what you would expect: once a
      // route defines `openGraph` at all, the image from app/opengraph-image.tsx
      // is NOT inherited, and the route ships with no preview picture. So the
      // site card is named explicitly as the default here.
      images: images ?? [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} ${siteConfig.role}`,
        },
      ],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && tags ? { tags } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
