import type { Metadata } from "next";

import { JournalListing } from "@/components/journal/JournalListing";
import { getJournalPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
};

export default async function JournalPage() {
  const posts = await getJournalPosts();
  return <JournalListing posts={posts} />;
}
