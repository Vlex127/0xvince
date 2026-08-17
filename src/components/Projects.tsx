import { AnimatedSection } from "./AnimatedSection"
import { projects } from "@/lib/data"

const STATUS_CONFIG = {
  live:   { label: "Live",    color: "rgba(52,211,153,1)",  bg: "rgba(52,211,153,0.10)",  dot: true  },
  active: { label: "Active",  color: "rgba(108,92,231,1)",  bg: "rgba(108,92,231,0.12)",  dot: true  },
  lab:    { label: "Lab",     color: "rgba(251,191,36,1)",  bg: "rgba(251,191,36,0.10)",  dot: false },
  wip:    { label: "In Progress", color: "rgba(96,165,250,1)", bg: "rgba(96,165,250,0.10)", dot: true },
} as const

type ProjectStatus = keyof typeof STATUS_CONFIG

function ProjectCard({ project }: { project: (typeof projects)[0] & { status?: ProjectStatus; impact?: string; link?: string } }) {
  const statusKey = ((project as any).status ?? "lab") as ProjectStatus
  const cfg = STATUS_CONFIG[statusKey]
  const isWip = statusKey === "wip"
  const link = (project as any).link as string | undefined
  const impact = (project as any).impact as string | undefined
  const screenshot = (project as any).screenshot as string | undefined

  return (
    <div
      className={`group relative border rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        isWip
          ? "bg-[var(--bg-surface)]/50 border-dashed border-[var(--border-subtle)]"
          : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(108,92,231,0.12)]"
      }`}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(to right, ${cfg.color}, transparent)` }}
      />

      {/* WIP diagonal watermark */}
      {isWip && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.35em] uppercase rotate-[-35deg] opacity-[0.04] text-[var(--text-primary)] whitespace-nowrap text-[80px] font-black"
          >
            soon
          </span>
        </div>
      )}

      {/* Screenshot */}
      {screenshot && !isWip && (
        <div className="relative h-[150px] overflow-hidden shrink-0 group-hover:scale-[1.02] transition-transform duration-500 origin-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screenshot}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-surface)]/20 to-[var(--bg-surface)]" />
        </div>
      )}

      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          {/* Big number */}
          <div className="font-[family-name:var(--font-mono)] text-[52px] font-extrabold leading-none tracking-[-3px] text-[var(--border-subtle)] transition-colors duration-300 select-none group-hover:text-[var(--accent-light)]/20">
            {project.num}
          </div>

          {/* Status badge */}
          <div className="flex flex-col items-end gap-1.5 mt-1">
            <span
              className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[9px] px-2 py-[3px] rounded-[3px] tracking-[0.14em] uppercase font-medium"
              style={{ color: cfg.color, background: cfg.bg }}
            >
              {cfg.dot && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: cfg.color }} />
                </span>
              )}
              {cfg.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-bold tracking-[-0.2px] mb-2 text-[var(--text-primary)] group-hover:text-white transition-colors duration-200 leading-snug">
          {project.title}
        </h3>

        {/* Divider */}
        <div
          className="h-px mb-4 transition-all duration-500 group-hover:w-[60%]"
          style={{
            background: "var(--border-subtle)",
            width: "24px",
          }}
        />

        {/* Description */}
        <p className="text-[12.5px] text-[var(--text-secondary)] leading-[1.85] mb-5 flex-1">
          {project.desc}
        </p>

        {/* Impact callout */}
        {impact && !isWip && (
          <div
            className="flex items-start gap-2 rounded-lg px-3 py-2.5 mb-5 border"
            style={{
              background: cfg.bg,
              borderColor: cfg.color.replace("1)", "0.2)"),
            }}
          >
            <span className="text-[10px] mt-[1px] shrink-0" style={{ color: cfg.color }}>▶</span>
            <p className="font-[family-name:var(--font-mono)] text-[10px] leading-[1.7]" style={{ color: cfg.color }}>
              {impact}
            </p>
          </div>
        )}

        {/* WIP placeholder */}
        {isWip && (
          <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 mb-5 border border-dashed border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40">
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] leading-[1.7]">
              🔧 under active development — details coming soon.
            </span>
          </div>
        )}

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-[4px] rounded-[3px] border border-[var(--border-subtle)] text-[var(--text-tertiary)] bg-[var(--bg-elevated)] group-hover:border-[var(--border-default)] group-hover:text-[var(--text-secondary)] transition-all duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: link or locked */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
          <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.12em] uppercase">
            {isWip ? "in development" : `project ${project.num}`}
          </span>
          {link && !isWip ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] transition-colors duration-200 hover:underline underline-offset-2"
              style={{ color: cfg.color }}
            >
              view ↗
            </a>
          ) : isWip ? (
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] opacity-50 tracking-[0.1em]">
              🔒 locked
            </span>
          ) : (
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] opacity-40 tracking-[0.1em]">
              private repo
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const liveProjects = projects.filter(p => (p as any).status !== "wip")
  const wipProjects  = projects.filter(p => (p as any).status === "wip")

  return (
    <section id="projects" className="py-[120px] px-6 md:px-12 bg-[var(--bg-base)] relative overflow-hidden">
      {/* Background bloom */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(108,92,231,0.05),transparent_70%)] pointer-events-none" />

      <AnimatedSection>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.25em] lowercase mb-5 flex items-center gap-3">
          <span className="text-[var(--text-tertiary)]">//</span> projects
          <span className="text-[var(--text-tertiary)]/40">— {projects.length} total · {wipProjects.length} in progress</span>
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="flex items-end justify-between mb-4 flex-wrap gap-6">
          <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05]">
            What I&apos;ve Built
          </h2>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.1em] max-w-[260px] leading-[1.8] text-right hidden md:block">
            real infra, real tooling — built to understand systems by breaking and rebuilding them.
          </p>
        </div>
      </AnimatedSection>

      {/* Status legend */}
      <AnimatedSection delay={0.15}>
        <div className="flex flex-wrap gap-4 mb-14">
          {Object.entries(STATUS_CONFIG).map(([key, val]) => (
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

      {/* Live projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
        {liveProjects.map((project) => (
          <ProjectCard key={project.num} project={project as any} />
        ))}
      </div>

      {/* WIP projects — dashed row */}
      {wipProjects.length > 0 && (
        <>
          <AnimatedSection delay={0.1}>
            <div className="flex items-center gap-3 my-8">
              <div className="h-px flex-1 border-t border-dashed border-[var(--border-subtle)]" />
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.18em] uppercase">
                in the lab
              </span>
              <div className="h-px flex-1 border-t border-dashed border-[var(--border-subtle)]" />
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {wipProjects.map((project) => (
              <ProjectCard key={project.num} project={project as any} />
            ))}
          </div>
        </>
      )}

      {/* Bottom CTA */}
      <AnimatedSection delay={0.2}>
        <div className="mt-16 flex items-center justify-between flex-wrap gap-4">
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.12em]">
            more coming as I build in public —
            <a
              href="https://github.com/Vlex127"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-light)] hover:underline underline-offset-2 ml-1"
            >
              follow along on GitHub ↗
            </a>
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.12em]">
              actively building
            </span>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}