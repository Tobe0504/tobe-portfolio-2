import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/content";

/**
 * Served at /manifest.webmanifest, which does not collide with the /manifest
 * page route: Next names this file convention's output explicitly.
 *
 * `display: "browser"` rather than "standalone" on purpose. Standalone strips
 * the browser chrome, and a portfolio installed to a home screen with no
 * address bar and no share button is harder to send to someone else, which is
 * the single thing a portfolio most needs to allow.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} Ezimorah · ${siteConfig.role}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0c0a09",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
