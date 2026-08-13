import { HomeExperience } from "@/components/home/HomeExperience";
import { getFeaturedGalleryItems, getFeaturedProjects, getSiteStats } from "@/lib/content";

export default async function Home() {
  const [featured, moodboardItems, stats] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedGalleryItems(),
    getSiteStats(),
  ]);

  return (
    <HomeExperience featured={featured} moodboardItems={moodboardItems} stats={stats} />
  );
}
