/**
 * The site's absolute origin, needed by everything that cannot use a relative
 * URL: canonical links, Open Graph and Twitter image URLs, the sitemap, and
 * robots.txt.
 *
 * Resolved in order of how much the deployment actually knows:
 *
 *   1. NEXT_PUBLIC_SITE_URL, if it is set. This is the only one that survives a
 *      custom domain, so set it in production and stop thinking about the rest.
 *   2. VERCEL_PROJECT_PRODUCTION_URL, which Vercel injects with the project's
 *      production domain. Deliberately not VERCEL_URL: that is the immutable
 *      per-deployment host, so canonicals built from it would point every
 *      preview at itself and compete with production in search results.
 *   3. localhost, so `next dev` and `next build` work with nothing configured.
 *
 * Wrong values here are not a crash, they are worse: link previews silently
 * break and canonicals point somewhere that does not exist.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/** Absolute URL for a site-relative path, e.g. `absoluteUrl("/work")`. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
