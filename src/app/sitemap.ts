import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blog"

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `https://vincentiwuno.me/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    { url: "https://vincentiwuno.me", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://vincentiwuno.me/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...blogEntries,
  ]
}
