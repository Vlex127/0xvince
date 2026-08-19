import { AnimatedSection } from "./AnimatedSection"
import { skills, type Skill } from "@/lib/data"

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="group relative bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl overflow-hidden cursor-default transition-all duration-300 hover:border-[var(--border-default)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4),0_0_0_1px_rgba(108,92,231,0.15)]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent-light)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Corner brackets — TL */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--accent-light)]/0 group-hover:border-[var(--accent-light)]/60 transition-all duration-300 rounded-tl-sm" />
      {/* Corner brackets — BR */}
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[var(--accent-light)]/0 group-hover:border-[var(--accent-light)]/60 transition-all duration-300 rounded-br-sm" />

      <div className="relative z-10 p-7">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon */}
          <div className="w-11 h-11 flex items-center justify-center bg-[var(--accent-subtle)] border border-[rgba(108,92,231,0.18)] rounded-[10px] text-xl text-[var(--accent-light)] group-hover:border-[rgba(108,92,231,0.35)] transition-all duration-300">
            {skill.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[13px] font-bold tracking-[0.04em] mb-1.5 text-[var(--text-primary)] group-hover:text-white transition-colors duration-200">
          {skill.title}
        </h3>

        {/* Divider */}
        <div className="w-8 h-px bg-[var(--border-subtle)] group-hover:w-16 group-hover:bg-[var(--accent-light)]/40 transition-all duration-500 mb-4" />

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-[5px] rounded-[4px] border transition-all duration-200"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-tertiary)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-[120px] px-6 md:px-12 bg-[var(--bg-base)] relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(108,92,231,0.05),transparent)] pointer-events-none" />

      {/* Section header */}
      <AnimatedSection>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.25em] lowercase mb-5 flex items-center gap-3">
          <span className="text-[var(--text-tertiary)]">//</span> technical skills
          <span className="text-[var(--text-tertiary)]/40">— {skills.length} categories</span>
        </p>
      </AnimatedSection>

      {/* Title row */}
      <AnimatedSection delay={0.1}>
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05]">
            My Arsenal
          </h2>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.12em] max-w-[260px] leading-[1.8] text-right hidden md:block">
            tools, technologies &amp; concepts I work with daily — from recon to exploit.
          </p>
        </div>
      </AnimatedSection>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillCard key={skill.title} skill={skill} />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-base)] to-transparent pointer-events-none" />
    </section>
  )
}