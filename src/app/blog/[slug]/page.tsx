import { notFound } from "next/navigation"
import Link from "next/link"
import { blogPosts, getBlogPost } from "@/lib/blog"
import { BlogPostContent } from "./content"
import type { Metadata } from "next"

const SITE_URL = "https://vincentiwuno.me"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: `${post.title} | 0xVince`,
    description: post.desc,
    openGraph: {
      title: post.title,
      description: post.desc,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.desc,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <article className="max-w-[720px] mx-auto px-6 py-24 md:py-32">
        {/* Back link */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.15em] lowercase hover:text-[var(--accent-light)] transition-colors duration-200 no-underline group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span> back to blog
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-[4px] rounded-[4px] tracking-[0.12em] lowercase border text-[var(--accent-light)] border-[rgba(108,92,231,0.25)] bg-[rgba(108,92,231,0.08)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-[clamp(32px,4.5vw,48px)] font-extrabold tracking-[-1.5px] leading-[1.1] mb-4 text-[var(--text-primary)]">
            {post.title}
          </h1>

          <p className="text-[15px] text-[var(--text-secondary)] leading-[1.8] mb-6">{post.desc}</p>

          <div className="flex items-center gap-4 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.08em] pb-6 border-b border-[var(--border-subtle)]">
            <span>{post.publishedAt}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]/40" />
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Content */}
        <BlogPostContent content={post.content} />
      </article>
    </main>
  )
}
