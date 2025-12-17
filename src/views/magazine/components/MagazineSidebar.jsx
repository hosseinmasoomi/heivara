"use client";

import TrendingTags from "./TrendingTags";
import NewsletterCard from "./NewsletterCard";
import PodcastCard from "./PodcastCard";

export default function MagazineSidebar({ trends }) {
  return (
    <>
      <TrendingTags trends={trends} />
      <NewsletterCard />
      <PodcastCard />
    </>
  );
}
