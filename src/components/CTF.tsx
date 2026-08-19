import { AnimatedSection } from "./AnimatedSection"
import { TerminalWindow } from "./TerminalWindow"
const platforms = [
  {
    name: "TryHackMe",
    handle: "@0xvince",
    href: "https://tryhackme.com/p/0xvince",
    stat: "40+",
    sub: "rooms completed",
    color: "rgba(220,80,80,1)",
    bg: "rgba(220,80,80,0.08)",
    icon: "🏠",
    desc: "Structured learning paths, room-based labs, beginner to advanced.",
  },
  {
    name: "HackTheBox",
    handle: "@0xvince",
    href: "https://profile.hackthebox.com/profile/019fd33f-258c-71d2-8510-62d5bcd48ccc",
    stat: "12+",
    sub: "machines pwned",
    color: "rgba(159,239,0,1)",
    bg: "rgba(159,239,0,0.07)",
    icon: "📦",
    desc: "Real-world machine exploitation — Linux & Windows privilege escalation.",
  },
  {
    name: "HackerDNA",
    handle: "@vlex127",
    href: "https://hackerdna.com/users/vlex127",
    stat: "20+",
    sub: "challenges solved",
    color: "rgba(96,165,250,1)",
    bg: "rgba(96,165,250,0.10)",
    icon: "🏆",
    desc: "Ranked cyber-skills platform — labs and challenges benchmarked across a global leaderboard.",
  },
  {
    name: "Categories",
    handle: null,
    href: null,
    stat: "5+",
    sub: "challenge types",
    color: "rgba(251,191,36,1)",
    bg: "rgba(251,191,36,0.08)",
    icon: "🗂️",
    desc: "Web · Pwn · Crypto · Forensics · OSINT",
  },
]

const skills = [
  { label: "Web Exploitation",      level: "proficient", pct: 85, color: "rgba(108,92,231,1)" },
  { label: "Privilege Escalation",  level: "comfortable", pct: 70, color: "rgba(159,239,0,1)"  },
  { label: "Network Forensics",     level: "comfortable", pct: 70, color: "rgba(52,211,153,1)" },
  { label: "Cryptography",          level: "familiar",   pct: 55, color: "rgba(251,191,36,1)" },
  { label: "OSINT",                 level: "proficient", pct: 85, color: "rgba(96,165,250,1)" },
  { label: "Binary / Pwn",          level: "learning",   pct: 40, color: "rgba(220,80,80,1)"  },
]

const LEVEL_LABEL: Record<string, string> = {
  proficient: "proficient",
  comfortable: "comfortable",
  familiar: "familiar",
  learning: "in progress",
}

const upcomingWriteups = [
  { title: "Exploiting SSRF to reach internal AWS metadata",     category: "web",      diff: "medium" },
  { title: "Manual SQLi bypass on a WAF-protected login",        category: "web",      diff: "hard"   },
  { title: "Privilege escalation via SUID misconfiguration",     category: "linux",    diff: "medium" },
  { title: "Decoding a multi-layer crypto challenge (RSA+XOR)", category: "crypto",   diff: "hard"   },
]

const DIFF_COLOR: Record<string, string> = {
  easy:   "rgba(52,211,153,1)",
  medium: "rgba(251,191,36,1)",
  hard:   "rgba(220,80,80,1)",
}

function PlatformCard({ p }: { p: typeof platforms[0] }) {
  return (
    <div className="group relative bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }}
      />

      <div className="relative z-10 p-6">
        {/* Icon + platform */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg border transition-all duration-300"
            style={{
              background: p.bg,
              borderColor: p.bg,
            }}
          >
            {p.icon}
          </div>
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.12em] transition-colors duration-200 hover:underline underline-offset-2"
              style={{ color: p.color }}
            >
              visit ↗
            </a>
          )}
        </div>

        <div className="font-bold text-[13px] text-[var(--text-primary)] mb-0.5">{p.name}</div>
        {p.handle && (
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] mb-3">
            {p.handle}
          </div>
        )}
        <p className="text-[11px] text-[var(--text-tertiary)] leading-[1.7] mb-5">{p.desc}</p>

        {/* Stat */}
        <div className="pt-4 border-t border-[var(--border-subtle)]">
          <div
            className="text-[36px] font-black leading-none tracking-[-2px]"
            style={{ color: p.color }}
          >
            {p.stat}
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.14em] mt-1 uppercase">
            {p.sub}
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillBar({ label, level, pct, color }: { label: string; level: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-secondary)] tracking-[0.08em]">
          {label}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[10px] capitalize" style={{ color }}>
          {LEVEL_LABEL[level] ?? level}
        </span>
      </div>
      <div className="h-[3px] w-full bg-[var(--border-subtle)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(to right, ${color.replace("1)", "0.6)")}, ${color})`,
          }}
        />
      </div>
    </div>
  )
}

export function CTF() {
  return (
    <section id="ctf" className="py-[120px] px-6 md:px-12 bg-[var(--bg-surface)] relative overflow-hidden">
      {/* Background bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(108,92,231,0.04),transparent_70%)] pointer-events-none" />

      {/* ── HEADER ── */}
      <AnimatedSection>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.25em] lowercase mb-5 flex items-center gap-3">
          <span className="text-[var(--text-tertiary)]">//</span> capture the flag
          <span className="text-[var(--text-tertiary)]/40">— ongoing</span>
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="flex items-end justify-between mb-4 flex-wrap gap-6">
          <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05]">
            CTF &amp; Hacking Labs
          </h2>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.1em] max-w-[260px] leading-[1.8] text-right hidden md:block">
            hands-on attack &amp; defence — not just theory.
          </p>
        </div>
      </AnimatedSection>

      {/* Terminal intro */}
      <AnimatedSection delay={0.15}>
        <div className="mb-14 max-w-[600px]">
          <TerminalWindow label="0xvince ~ terminal">
            <p><span className="text-[var(--accent-light)]">$</span> <span className="text-[var(--text-secondary)]">whoami</span></p>
            <p className="pl-2">→ security researcher · ctf player · offensive security student</p>
            <p className="mt-2"><span className="text-[var(--accent-light)]">$</span> <span className="text-[var(--text-secondary)]">cat philosophy.txt</span></p>
            <p className="pl-2 leading-[1.7]">
              → I don&apos;t just read about vulnerabilities — I reproduce them, document how they work, and understand why defences fail.
            </p>
            <p className="mt-2"><span className="text-[var(--accent-light)]">$</span> <span className="text-emerald-400">status</span></p>
            <p className="pl-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-400">actively solving · writeups incoming</span>
            </p>
          </TerminalWindow>
       </div>
        
      </AnimatedSection>

      {/* ── PLATFORM CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {platforms.map((p) => (
          <PlatformCard key={p.name} p={p} />
        ))}
      </div>

      {/* ── SKILL BREAKDOWN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        <AnimatedSection delay={0.1}>
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--accent-light)] tracking-[0.22em] uppercase mb-6">
              skill breakdown
            </p>
            <div className="space-y-5">
              {skills.map((s) => (
                <SkillBar key={s.label} {...s} />
              ))}
            </div>
            <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] mt-5 leading-[1.7]">
              self-assessed proficiency across lab environments — not benchmark scores.
            </p>
          </div>
        </AnimatedSection>

        {/* ── UPCOMING WRITEUPS ── */}
        <AnimatedSection delay={0.2}>
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--accent-light)] tracking-[0.22em] uppercase mb-6">
              writeups in progress
            </p>
            <div className="space-y-3">
              {upcomingWriteups.map((w) => (
                <div
                  key={w.title}
                  className="group flex items-start gap-3 p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] hover:border-[var(--border-default)] transition-all duration-300 cursor-default"
                >
                  {/* Diff dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-[5px] shrink-0"
                    style={{ background: DIFF_COLOR[w.diff] }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-[var(--text-secondary)] leading-[1.6] group-hover:text-[var(--text-primary)] transition-colors duration-200">
                      {w.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="font-[family-name:var(--font-mono)] text-[9px] px-1.5 py-[2px] rounded-[3px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-tertiary)] tracking-[0.1em]">
                        {w.category}
                      </span>
                      <span
                        className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em]"
                        style={{ color: DIFF_COLOR[w.diff] }}
                      >
                        {w.diff}
                      </span>
                    </div>
                  </div>
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] shrink-0 opacity-50 mt-[3px]">
                    soon
                  </span>
                </div>
              ))}
            </div>

            {/* Difficulty legend */}
            <div className="flex items-center gap-4 mt-5">
              {Object.entries(DIFF_COLOR).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: v }} />
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.1em]">{k}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* ── FOOTER CTA ── */}
      <AnimatedSection delay={0.2}>
        <div className="flex items-center justify-between flex-wrap gap-4 pt-10 border-t border-[var(--border-subtle)]">
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.1em]">
            writeups dropping on{" "}
            <a
              href="https://X.com/0xvince1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-light)] hover:underline underline-offset-2"
            >
              @0xvince ↗
            </a>{" "}
            and this site — follow to be notified.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.12em]">
              actively competing
            </span>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}