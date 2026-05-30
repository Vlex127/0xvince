"use client"

import { motion } from "framer-motion"
import { AnimatedSection, StaggerContainer, staggerItem } from "./AnimatedSection"
import { blogPosts } from "@/lib/data"

export function Blog() {
  return (
    <section id="blog" className="py-[120px] px-6 md:px-12 bg-[var(--bg-base)]">
      <AnimatedSection>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.25em] lowercase mb-5 flex items-center gap-3">
          <span className="text-[var(--text-tertiary)]">//</span> blog
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05] mb-16">
          Latest Posts
        </h2>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogPosts.map((post) => (
          <motion.div
            key={post.title}
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className="group relative bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-8 overflow-hidden transition-all duration-500 hover:border-[var(--border-strong)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            <div className="relative z-10">
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--accent-light)] tracking-[0.15em] bg-[var(--accent-subtle)] border border-[rgba(108,92,231,0.12)] px-3 py-[5px] rounded-full inline-block mb-5 lowercase">
                {post.tag}
              </span>
              <h3 className="text-[17px] font-bold leading-[1.4] tracking-[-0.2px] mb-3">
                {post.title}
              </h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-[1.8] mb-6">
                {post.desc}
              </p>
              <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.05em]">
                {post.meta}
              </div>
            </div>
          </motion.div>
        ))}
      </StaggerContainer>
    </section>
  )
}
