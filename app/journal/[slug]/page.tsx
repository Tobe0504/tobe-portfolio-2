import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

import { JournalPostView } from "@/components/journal/JournalPostView";
import { getJournalPost, getJournalPosts } from "@/lib/content";

interface JournalPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getJournalPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: JournalPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    type: "article",
    images: [{ url: post.coverImage.src, alt: post.coverImage.alt }],
    publishedTime: post.date,
    tags: post.tags,
  });
}

export default async function JournalPostPage({ params }: JournalPostPageProps) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();

  return <JournalPostView post={post} />;
}
