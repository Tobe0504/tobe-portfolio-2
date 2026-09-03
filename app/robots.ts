import type { MetadataRoute } from "next";

import { SITE_URL, absoluteUrl } from "@/lib/site-url";

/**
 * Generated rather than a static robots.txt because the sitemap line has to
 * carry an absolute URL, and the origin is only known at build time.
 *
 * Preview deployments are excluded outright. Without this, every Vercel preview
 * is a full, crawlable duplicate of the site competing with production for the
 * same queries, which is the usual cause of a portfolio ranking on a URL nobody
 * meant to publish.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.VERCEL_ENV === "production" ||
    (!process.env.VERCEL_ENV && !SITE_URL.includes("localhost"));

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
