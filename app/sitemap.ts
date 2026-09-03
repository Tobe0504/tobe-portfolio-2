import type { MetadataRoute } from "next";

import {
  getJournalPosts,
  getPersonalProjects,
  getProjects,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

/**
 * Built from the content itself rather than a hand-kept list, so a new project
 * or journal entry is in the sitemap the moment it is in the data. A sitemap
 * that has to be updated by hand is a sitemap that goes stale.
 *
 * `priority` is a hint about relative importance within this site only, not a
 * ranking lever: the landing pages a visitor is most likely to want first, then
 * individual case studies, then the rest.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, personal, posts] = await Promise.all([
    getProjects(),
    getPersonalProjects(),
    getJournalPosts(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
      { url: absoluteUrl("/work"), changeFrequency: "monthly", priority: 0.9 },
      { url: absoluteUrl("/manifest"), changeFrequency: "yearly", priority: 0.7 },
      { url: absoluteUrl("/playground"), changeFrequency: "monthly", priority: 0.7 },
      { url: absoluteUrl("/journal"), changeFrequency: "weekly", priority: 0.7 },
      { url: absoluteUrl("/gallery"), changeFrequency: "monthly", priority: 0.5 },
      { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.6 },
    ] as const
  ).map((entry) => ({ ...entry, lastModified: now }));

  return [
    ...staticRoutes,
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...personal.map((project) => ({
      url: absoluteUrl(`/playground/${project.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/journal/${post.slug}`),
      // A post's own date, not the build date: claiming everything changed
      // today teaches crawlers to ignore the field.
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
