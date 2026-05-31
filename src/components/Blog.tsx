"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import { AnimatedSection, StaggerContainer, staggerItem } from "./AnimatedSection"
import { blogPosts } from "@/lib/data"

const CATEGORY_COLOR: Record<string, { color: string; bg: string }> = {
  "smtp · infrastructure": { color: "rgba(52,211,153,1)",  bg: "rgba(52,211,153,0.08)"  },
  "phishing · red team":   { color: "rgba(220,80,80,1)",   bg: "rgba(220,80,80,0.08)"   },
  "dns · email security":  { color: "rgba(251,191,36,1)",  bg: "rgba(251,191,36,0.08)"  },
}

function getCategory(tag: string) {
  return CATEGORY_COLOR[tag] ?? { color: "rgba(108,92,231,1)", bg: "rgba(108,92,231,0.10)" }
}

function BlogCard({
  post,
  index,
  featured = false,
}: {
  post: (typeof blogPosts)[0] & { readTime?: string }
  index: number
  featured?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 180, damping: 18 })
  const sy = useSpring(my, { stiffness: 180, damping: 18 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  const cfg = getCategory(post.tag)
  const padded = String(index + 1).padStart(2, "0")

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`group relative border rounded-xl overflow-hidden flex flex-col cursor-default transition-colors duration-500 ${
        featured
          ? "bg-[var(--bg-elevated)] border-[var(--border-default)]"
          : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
      }`}
      style={{
        boxShadow: hovered
          ? `0 20px 56px rgba(0,0,0,0.35), 0 0 0 1px ${cfg.color.replace("1)", "0.15)")}`
          : "0 2px 8px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Mouse glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: hovered
            ? `radial-gradient(200px circle at ${sx.get()}px ${sy.get()}px, ${cfg.color.replace("1)", "0.06)")}, transparent 70%)`
            : "none",
        }}
      />

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(to right, ${cfg.color}, transparent)` }}
      />

      {/* Featured badge */}
      {featured && (
        <div
          className="absolute top-5 right-5 font-[family-name:var(--font-mono)] text-[9px] px-2 py-[3px] rounded-[3px] tracking-[0.14em] uppercase font-medium"
          style={{ color: cfg.color, background: cfg.bg }}
        >
          featured
        </div>
      )}

      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Index + tag row */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-[4px] rounded-[4px] tracking-[0.12em] lowercase border"
            style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.color.replace("1)", "0.2)") }}
          >
            {post.tag}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)]/40 group-hover:text-[var(--accent-light)]/40 transition-colors duration-300 tracking-[0.1em]">
            {padded}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-bold leading-[1.35] tracking-[-0.2px] mb-3 group-hover:text-white transition-colors duration-200 ${
            featured ? "text-[19px]" : "text-[16px]"
          }`}
        >
          {post.title}
        </h3>

        {/* Animated divider */}
        <div
          className="h-px mb-4 transition-all duration-500"
          style={{
            background: hovered
              ? `linear-gradient(to right, ${cfg.color.replace("1)", "0.35)")}, transparent)`
              : "var(--border-subtle)",
            width: hovered ? "55%" : "20px",
          }}
        />

        {/* Desc */}
        <p className="text-[12.5px] text-[var(--text-secondary)] leading-[1.85] mb-6 flex-1">
          {post.desc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            {/* Coming soon pill */}
            <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[9px] px-2 py-[3px] rounded-[3px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-tertiary)] tracking-[0.1em]">
              <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]/40" />
              {post.meta}
            </span>
          </div>
          {(post as any).readTime && (
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.1em]">
              {(post as any).readTime}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Blog() {
  const [featured, ...rest] = blogPosts

  return (
    <section id="blog" className="py-[120px] px-6 md:px-12 bg-[var(--bg-base)] relative overflow-hidden">
      {/* Background bloom */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(108,92,231,0.04),transparent_70%)] pointer-events-none" />

      {/* ── HEADER ── */}
      <AnimatedSection>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.25em] lowercase mb-5 flex items-center gap-3">
          <span className="text-[var(--text-tertiary)]">//</span> blog
          <span className="text-[var(--text-tertiary)]/40">— {blogPosts.length} posts incoming</span>
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="flex items-end justify-between mb-4 flex-wrap gap-6">
          <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05]">
            Writing &amp; Research
          </h2>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.1em] max-w-[260px] leading-[1.8] text-right hidden md:block">
            documenting what I learn — so others don&apos;t have to figure it out alone.
          </p>
        </div>
      </AnimatedSection>

      {/* Philosophy strip */}
      <AnimatedSection delay={0.15}>
        <div className="mb-14 flex items-center gap-4 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)]">
          <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          <span className="tracking-[0.15em] lowercase">
            if i had to google it, i&apos;m writing about it
          </span>
          <div className="flex-1 h-px bg-[var(--border-subtle)]" />
        </div>
      </AnimatedSection>

      {/* ── FEATURED POST (full width) ── */}
      <AnimatedSection delay={0.2}>
        <StaggerContainer className="mb-5">
          <BlogCard post={featured as any} index={0} featured />
        </StaggerContainer>
      </AnimatedSection>

      {/* ── REST OF POSTS ── */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
        {rest.map((post, i) => (
          <BlogCard key={post.title} post={post as any} index={i + 1} />
        ))}
      </StaggerContainer>

      {/* ── NEWSLETTER / NOTIFY CTA ── */}
      <AnimatedSection delay={0.2}>
        <div className="relative border border-dashed border-[var(--border-default)] rounded-xl p-8 md:p-10 overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.05),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--accent-light)] tracking-[0.2em] uppercase mb-2">
                get notified
              </p>
              <h3 className="text-[20px] font-extrabold tracking-[-0.5px] mb-2">
                First to read when posts drop
              </h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-[1.8] max-w-[380px]">
                Writeups, walkthroughs, and deep dives on real security topics — straight to your inbox. No fluff.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 md:w-[220px] font-[family-name:var(--font-mono)] text-[12px] px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-light)] transition-colors duration-200"
                />
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="font-[family-name:var(--font-mono)] text-[11px] px-5 py-3 bg-[var(--accent)] text-white rounded-lg tracking-[0.08em] hover:shadow-[0_0_24px_rgba(108,92,231,0.35)] transition-shadow duration-300 whitespace-nowrap"
                >
                  notify me →
                </motion.button>
              </div>
              <p className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.1em]">
                no spam · unsubscribe anytime · built with Postfix 😄
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── FOOTER CTA ── */}
      <AnimatedSection delay={0.1}>
        <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.1em]">
            follow along on{" "}
            <a
              href="https://X.com/0xvince1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-light)] hover:underline underline-offset-2"
            >
              @0xvince ↗
            </a>
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-light)] opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent-light)]" />
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.12em]">
              writing in progress
            </span>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}