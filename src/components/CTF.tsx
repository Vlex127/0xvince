"use client"

import { motion } from "framer-motion"
import { AnimatedSection, StaggerContainer, staggerItem } from "./AnimatedSection"
import { ctfStats } from "@/lib/data"

export function CTF() {
  return (
    <section id="ctf" className="py-[120px] px-6 md:px-12 bg-[var(--bg-surface)]">
      <AnimatedSection>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.25em] lowercase mb-5 flex items-center gap-3">
          <span className="text-[var(--text-tertiary)]">//</span> ctf writeups
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05] mb-16">
          Capture The Flag
        </h2>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ctfStats.map((stat) => (
          <motion.div
            key={stat.platform}
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className="group relative bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl p-7 text-center overflow-hidden transition-all duration-500 hover:border-[var(--border-strong)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            {/* Radial glow on hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(108,92,231,0.05),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10">
              <div className="text-xs font-semibold text-[var(--text-secondary)] tracking-[0.02em] mb-2">
                {stat.platform}
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--accent-light)] tracking-[0.12em] lowercase mb-3">
                {stat.badge}
              </div>
              <div className="text-[40px] font-black text-[var(--text-primary)] tracking-[-2px] leading-none">
                {stat.stat.includes("+") ? (
                  <>
                    {stat.stat.replace("+", "")}
                    <span className="text-[var(--accent-light)]">+</span>
                  </>
                ) : stat.stat.startsWith("#") ? (
                  <>
                    <span className="text-[var(--accent-light)]">#</span>
                    {stat.stat.slice(1)}
                  </>
                ) : stat.stat.includes("+") ? (
                  <>
                    {stat.stat.replace("+", "")}
                    <span className="text-[var(--accent-light)]">+</span>
                  </>
                ) : (
                  stat.stat
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </StaggerContainer>

      <AnimatedSection delay={0.3}>
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-tertiary)] mt-10 text-center tracking-[0.05em]">
          writeups dropping soon — follow{" "}
          <span className="text-[var(--accent-light)]">@0xvince</span> for updates
        </p>
      </AnimatedSection>
    </section>
  )
}
