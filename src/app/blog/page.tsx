import Link from "next/link"
import { getPublishedPosts, getUpcomingPosts } from "@/lib/blog"
import type { Metadata } from "next"

const SITE_URL = "https://vincentiwuno.me"

export const metadata: Metadata = {
  title: "Blog | 0xVince",
  description: "Security research writeups, infrastructure deep dives, and CTF walkthroughs by Vincent Iwuno (0xVince).",
  openGraph: {
    title: "Blog | 0xVince",
    description: "Security research writeups, infrastructure deep dives, and CTF walkthroughs.",
    url: `${SITE_URL}/blog`,
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
}

export default function BlogPage() {
  const published = getPublishedPosts()
  const upcoming = getUpcomingPosts()

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <div className="max-w-[720px] mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.15em] lowercase hover:text-[var(--accent-light)] transition-colors duration-200 no-underline group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span> back home
          </Link>
          <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05] mt-8 mb-4">
            Blog
          </h1>
          <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-tertiary)] leading-[1.8]">
            security research, infrastructure deep dives &amp; ctf writeups
          </p>
        </div>

        {/* Published posts */}
        <div className="space-y-6">
          {published.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block no-underline"
            >
              <article className="relative bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 transition-all duration-300 hover:border-[var(--border-default)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-[var(--accent-light)] to-transparent rounded-t-xl" />

                <div className="relative z-10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-[3px] rounded-[3px] tracking-[0.12em] lowercase border text-[var(--accent-light)] border-[rgba(108,92,231,0.2)] bg-[rgba(108,92,231,0.06)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-[17px] font-bold tracking-[-0.3px] mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-light)] transition-colors duration-200">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.8] mb-4">
                    {post.desc}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.08em]">
                    <span>{post.publishedAt}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]/40" />
                    <span>{post.readTime}</span>
                    <span className="ml-auto text-[var(--accent-light)]/0 group-hover:text-[var(--accent-light)] transition-colors duration-200">
                      read →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* In the works */}
        {upcoming.length > 0 && (
          <div className="mt-20">
            <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.2em] uppercase mb-5">
              in the works
            </p>
            <div className="space-y-4">
              {upcoming.map((post) => (
                <div
                  key={post.slug}
                  className="flex items-start gap-4 p-5 rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--accent-light)] tracking-[0.12em] uppercase mt-1 shrink-0">
                    drafting
                  </span>
                  <div>
                    <h3 className="text-[14px] font-bold tracking-[-0.2px] text-[var(--text-primary)] mb-1">
                      {post.title}
                    </h3>
                    <p className="text-[12px] text-[var(--text-secondary)] leading-[1.7]">{post.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
