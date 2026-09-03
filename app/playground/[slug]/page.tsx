import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

import { PersonalProjectDetail } from "@/components/playground/PersonalProjectDetail";
import { getPersonalProject, getPersonalProjects } from "@/lib/content";

interface PersonalProjectPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Excludes "bug-squash" — it has its own static route
 * (app/playground/bug-squash/page.tsx) which takes precedence for that
 * exact path, but generateStaticParams listing the same slug here would
 * still conflict at build time.
 */
export async function generateStaticParams() {
  const projects = await getPersonalProjects();
  return projects
    .filter((project) => project.slug !== "bug-squash")
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PersonalProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPersonalProject(slug);
  if (!project) return {};
  // A real screenshot when the project has one, so a shared link previews the
  // work itself. Left off when it does not, which falls back to the site card
  // rather than emitting a broken image reference.
  const image = project.cover.image?.src;
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/playground/${project.slug}`,
    type: "article",
    images: image ? [{ url: image, alt: project.cover.image?.alt }] : undefined,
  });
}

export default async function PersonalProjectPage({ params }: PersonalProjectPageProps) {
  const { slug } = await params;
  if (slug === "bug-squash") notFound();

  const project = await getPersonalProject(slug);
  if (!project) notFound();

  return <PersonalProjectDetail project={project} />;
}
