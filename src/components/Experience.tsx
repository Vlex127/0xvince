"use client"

import { useState } from "react"
import { AnimatedSection } from "./AnimatedSection"
import { Badge } from "./Badge"
import { experience, type ExperienceItem } from "@/lib/data"

const TYPE_CONFIG = {
  work:      { label: "Work",      color: "rgba(108,92,231,1)",  bg: "rgba(108,92,231,0.12)" },
  ctf:       { label: "CTF",       color: "rgba(52,211,153,1)",  bg: "rgba(52,211,153,0.10)" },
  research:  { label: "Research",  color: "rgba(251,191,36,1)",  bg: "rgba(251,191,36,0.10)" },
  education: { label: "Education", color: "rgba(96,165,250,1)",  bg: "rgba(96,165,250,0.10)" },
} as const

function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)
  const cfg = TYPE_CONFIG[exp.type]
  const isCurrent = exp.status === "current"
  const highlights = exp.highlights ?? []
  const skills = exp.skills ?? []

  return (
    <div className="relative group">
      {/* Timeline dot */}
      <div className="absolute -left-[44px] top-[22px] flex items-center justify-center">
        <div
          className="w-[10px] h-[10px] rounded-full z-10"
          style={{ background: cfg.color, boxShadow: `0 0 12px ${cfg.color}` }}
        />
        <div
          className="absolute w-[22px] h-[22px] rounded-full border opacity-30"
          style={{ borderColor: cfg.color }}
        />
      </div>

      {/* Card */}
      <div
        onClick={() => setExpanded(e => !e)}
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
              <Badge color={cfg.color} bg={cfg.bg}>
                {cfg.label}
              </Badge>
              {/* Status badge */}
              {isCurrent && (
                <Badge color="rgba(52,211,153,1)" bg="rgba(52,211,153,0.10)" dot>
                  current
                </Badge>
              )}
              {/* Expand toggle */}
              <span
                className={`text-[var(--text-tertiary)] text-xs ml-1 select-none transition-transform duration-300 inline-block ${expanded ? "rotate-180" : ""}`}
              >
                ↓
              </span>
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
            {exp.link && (
              <a
                href={exp.link}
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
          {expanded && (
            <div className="border-t border-[var(--border-subtle)] pt-4">
              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="mb-4">
                  <p className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.2em] uppercase mb-3">
                    key highlights
                  </p>
                  <ul className="space-y-2">
                    {highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[12px] text-[var(--text-secondary)] leading-[1.7]"
                      >
                        <span style={{ color: cfg.color }} className="mt-[5px] text-[8px] shrink-0">▶</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skill tags */}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-[4px] rounded-[3px] border border-[var(--border-subtle)] text-[var(--text-tertiary)] bg-[var(--bg-surface)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Experience() {
  return (
    <section
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
                style={{ background: val.color }}
              />
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.12em]">
                {val.label}
              </span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <div className="relative pl-10">
        {/* Static timeline line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent-light)] via-[rgba(108,92,231,0.5)] to-transparent" />

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <ExperienceCard
              key={exp.date}
              exp={exp}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <AnimatedSection delay={0.2}>
        <div className="mt-16 pl-10 flex items-center gap-4">
          <div className="w-[9px] h-[9px] rounded-full bg-[var(--border-default)] border border-[var(--border-subtle)]" />
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.15em]">
            more on{" "}
            <a
              href="https://linkedin.com/in/vincentiwuno"
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