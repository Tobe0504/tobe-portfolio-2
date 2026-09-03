import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

import { JournalListing } from "@/components/journal/JournalListing";
import { getJournalPosts } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Journal",
  description:
    "A running notebook. Long thoughts on design, engineering and whatever else is holding my attention.",
  path: "/journal",
});

export default async function JournalPage() {
  const posts = await getJournalPosts();
  return <JournalListing posts={posts} />;
}
