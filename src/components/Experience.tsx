"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { AnimatedSection, StaggerContainer, staggerItem } from "./AnimatedSection"
import { experience } from "@/lib/data"

// ── Add these fields to your experience data in /lib/data.ts ──
// type: "work" | "ctf" | "research" | "education"
// status: "current" | "completed"
// highlights: string[]   ← bullet achievements (recruiter gold)
// skills: string[]       ← tech tags per role
// link?: string          ← optional proof/writeup URL

const TYPE_CONFIG = {
  work:      { label: "Work",      color: "rgba(108,92,231,1)",  bg: "rgba(108,92,231,0.12)" },
  ctf:       { label: "CTF",       color: "rgba(52,211,153,1)",  bg: "rgba(52,211,153,0.10)" },
  research:  { label: "Research",  color: "rgba(251,191,36,1)",  bg: "rgba(251,191,36,0.10)" },
  education: { label: "Education", color: "rgba(96,165,250,1)",  bg: "rgba(96,165,250,0.10)" },
} as const

function ExperienceCard({
  exp,
  index,
  isLast,
}: {
  exp: (typeof experience)[0] & {
    type?: keyof typeof TYPE_CONFIG
    status?: "current" | "completed"
    highlights?: string[]
    skills?: string[]
    link?: string
  }
  index: number
  isLast: boolean
}) {
  const [expanded, setExpanded] = useState(index === 0)
  const typeKey = (exp as any).type ?? "work"
  const cfg = TYPE_CONFIG[typeKey as keyof typeof TYPE_CONFIG]
  const isCurrent = (exp as any).status === "current"

  return (
    <motion.div
      variants={staggerItem}
      className="relative group"
    >
    
      {/* Timeline dot */}
      <div className="absolute -left-[44px] top-[22px] flex items-center justify-center">
        <div
          className="w-[10px] h-[10px] rounded-full z-10 transition-transform duration-300 group-hover:scale-125"
          style={{ background: cfg.color, boxShadow: `0 0 12px ${cfg.color}` }}
        />
        <div
          className="absolute w-[22px] h-[22px] rounded-full border opacity-30 group-hover:opacity-60 transition-opacity duration-300"
          style={{ borderColor: cfg.color }}
        />
      </div>

      {/* Card */}
      <motion.div
        onClick={() => setExpanded(e => !e)}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[var(--border-default)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-300"
          style={{ background: `linear-gradient(to bottom, ${cfg.color}, transparent)`, opacity: expanded ? 1 : 0.3 }}
        />

        {/* Top glow on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to right, transparent, ${cfg.color}, transparent)` }}
        />

        <div className="pl-7 pr-6 pt-6 pb-6">
          {/* Row 1: date + badges */}
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.15em]">
              {exp.date}
            </span>
            <div className="flex items-center gap-2">
              {/* Type badge */}
              <span
                className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-[3px] rounded-[3px] tracking-[0.12em] uppercase font-medium"
                style={{ color: cfg.color, background: cfg.bg }}
              >
                {cfg.label}
              </span>
              {/* Status badge */}
              {isCurrent && (
                <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[9px] px-2 py-[3px] rounded-[3px] bg-emerald-500/10 text-emerald-400 tracking-[0.12em] uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  current
                </span>
              )}
              {/* Expand toggle */}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-[var(--text-tertiary)] text-xs ml-1 select-none"
              >
                ↓
              </motion.span>
            </div>
          </div>

          {/* Role + org */}
          <h3 className="text-[17px] font-bold tracking-[-0.3px] mb-0.5 text-[var(--text-primary)] group-hover:text-white transition-colors duration-200">
            {exp.title}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)]">
              {exp.org}
            </span>
            {(exp as any).link && (
              <a
                href={(exp as any).link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--accent-light)]/60 hover:text-[var(--accent-light)] tracking-[0.12em] transition-colors duration-200"
              >
                view ↗
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-[13px] text-[var(--text-secondary)] leading-[1.85] max-w-[600px] mb-4">
            {exp.desc}
          </p>

          {/* Expandable section */}
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            {/* Highlights */}
            {(exp as any).highlights?.length > 0 && (
              <div className="mb-4 pt-4 border-t border-[var(--border-subtle)]">
                <p className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.2em] uppercase mb-3">
                  key highlights
                </p>
                <ul className="space-y-2">
                  {(exp as any).highlights.map((h: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-2.5 text-[12px] text-[var(--text-secondary)] leading-[1.7]"
                    >
                      <span style={{ color: cfg.color }} className="mt-[5px] text-[8px] shrink-0">▶</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skill tags */}
            {(exp as any).skills?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {(exp as any).skills.map((s: string) => (
                  <span
                    key={s}
                    className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-[4px] rounded-[3px] border border-[var(--border-subtle)] text-[var(--text-tertiary)] bg-[var(--bg-surface)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  })
  const lineScaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 80,
    damping: 20,
  })

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-[120px] px-6 md:px-12 bg-[var(--bg-surface)] relative overflow-hidden"
    >
      {/* Background bloom */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(108,92,231,0.05),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <AnimatedSection>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.25em] lowercase mb-5 flex items-center gap-3">
          <span className="text-[var(--text-tertiary)]">//</span> experience
          <span className="text-[var(--text-tertiary)]/40">— {experience.length} entries</span>
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05]">
            My Journey
          </h2>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.1em] max-w-[240px] leading-[1.8] text-right hidden md:block">
            click any entry to expand highlights &amp; stack
          </p>
        </div>
      </AnimatedSection>

      {/* Legend */}
      <AnimatedSection delay={0.15}>
        <div className="flex flex-wrap gap-4 mb-12">
          {Object.entries(TYPE_CONFIG).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: val.color, boxShadow: `0 0 6px ${val.color}` }}
              />
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.12em]">
                {val.label}
              </span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <StaggerContainer className="relative pl-10">
        {/* Animated scroll-driven line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border-subtle)]" />
        <motion.div
          className="absolute left-0 top-2 w-px bg-gradient-to-b from-[var(--accent-light)] via-[rgba(108,92,231,0.5)] to-transparent origin-top"
          style={{ scaleY: lineScaleY, height: "100%" }}
        />

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <ExperienceCard
              key={(exp as any).date ?? i}
              exp={exp as any}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </StaggerContainer>

      {/* Bottom CTA */}
      <AnimatedSection delay={0.2}>
        <div className="mt-16 pl-10 flex items-center gap-4">
          <div className="w-[9px] h-[9px] rounded-full bg-[var(--border-default)] border border-[var(--border-subtle)]" />
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.15em]">
            more on{" "}
            <a
              href="https://linkedin.com/in/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-light)] hover:underline underline-offset-2 transition-colors duration-200"
            >
              LinkedIn ↗
            </a>
          </span>
        </div>
      </AnimatedSection>
    </section>
  )
}