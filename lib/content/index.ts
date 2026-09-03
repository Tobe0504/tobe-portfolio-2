import { galleryItems } from "./gallery";
import { journalPosts } from "./journal";
import { personalProjects } from "./personal-projects";
import { projects } from "./projects";
import type {
  GalleryItem,
  JournalPost,
  PersonalProject,
  Project,
} from "./types";

export * from "./types";
export { siteConfig } from "./site";
export { projects } from "./projects";
export { journalPosts } from "./journal";
export { personalProjects } from "./personal-projects";
export { galleryItems } from "./gallery";

/**
 * All accessors below are `async` even though the data is local/sync — every
 * page.tsx is written the way it would look against a real CMS, so swapping
 * the source later touches zero call sites.
 */

export async function getProjects(): Promise<Project[]> {
  return [...projects].sort(
    (a, b) => (b.order ?? b.year) - (a.order ?? a.year),
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured);
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getAdjacentProjects(
  slug: string,
): Promise<{ prev: Project | null; next: Project | null }> {
  const ordered = await getProjects();
  const index = ordered.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = ordered[(index - 1 + ordered.length) % ordered.length] ?? null;
  const next = ordered[(index + 1) % ordered.length] ?? null;
  return { prev, next };
}

export async function getJournalPosts(): Promise<JournalPost[]> {
  return [...journalPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getJournalPost(
  slug: string,
): Promise<JournalPost | null> {
  return journalPosts.find((p) => p.slug === slug) ?? null;
}

export async function getPersonalProjects(): Promise<PersonalProject[]> {
  return personalProjects;
}

export async function getPersonalProject(
  slug: string,
): Promise<PersonalProject | null> {
  return personalProjects.find((p) => p.slug === slug) ?? null;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return galleryItems;
}

export async function getFeaturedGalleryItems(): Promise<GalleryItem[]> {
  return galleryItems.filter((item) => item.featured);
}

export interface SiteStats {
  projectCount: number;
  clientCount: number;
  yearsActive?: number;
}

/** Computed from the real project data, not hand-maintained — stays accurate as projects.ts changes. */
export async function getSiteStats(): Promise<SiteStats> {
  const clients = new Set(projects.map((p) => p.client));
  return {
    projectCount: projects.length + personalProjects.length,
    clientCount: clients.size,
    yearsActive: 5,
  };
}
