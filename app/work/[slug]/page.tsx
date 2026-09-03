import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/work-detail/ProjectDetail";
import { getAdjacentProjects, getProject, getProjects } from "@/lib/content";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  // A real screenshot when the project has one, so a shared link previews the
  // work itself. Left off when it does not, which falls back to the site card
  // rather than emitting a broken image reference.
  const image = project.cover.image?.src;
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
    images: image ? [{ url: image, alt: project.cover.image?.alt }] : undefined,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(slug);

  return <ProjectDetail project={project} prev={prev} next={next} />;
}
