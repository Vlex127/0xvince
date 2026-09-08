import type { MetadataRoute } from "next"
import { getPublishedPosts } from "@/lib/blog"

const SITE_URL = "https://www.vincentiwuno.me"

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }))

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/blog`, lastModified: new Date() },
    { url: `${SITE_URL}/uses`, lastModified: new Date() },
    ...blogEntries,
  ]
}
