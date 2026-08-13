import type { Metadata } from "next";
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
  return { title: project.title, description: project.summary };
}

export default async function PersonalProjectPage({ params }: PersonalProjectPageProps) {
  const { slug } = await params;
  if (slug === "bug-squash") notFound();

  const project = await getPersonalProject(slug);
  if (!project) notFound();

  return <PersonalProjectDetail project={project} />;
}
