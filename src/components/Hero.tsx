export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.15] pointer-events-none"
      >
        <source src="/output.mp4" type="video/mp4" />
      </video>

      {/* Layered dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)]/70 via-[var(--bg-base)]/55 to-[var(--bg-base)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)]/80 via-transparent to-transparent pointer-events-none" />

      {/* Grid */}
      <div className="hero-grid" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-[760px]">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-8 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)]/60">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)] tracking-[0.18em] lowercase">
            available for work · remote
          </span>
        </div>

        {/* Role label */}
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--accent-light)] tracking-[0.22em] lowercase mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[var(--accent-light)]" />
          penetration tester &amp; ctf player
        </p>

        {/* Name */}
        <h1 className="text-[clamp(58px,9vw,104px)] font-black leading-[0.9] tracking-[-4px] mb-2 text-[var(--text-primary)] select-none">
          <span className="block">Vincent</span>
          <span className="block text-[var(--accent-light)]">Iwuno</span>
        </h1>

        {/* Handle */}
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-tertiary)] tracking-[0.2em] mb-8">
          <span className="text-[var(--accent-light)]/60">alias</span>{" "}
          <span className="text-[var(--text-secondary)]">0xVince</span>
          <span className="text-[var(--text-tertiary)]/40 ml-3"># {`{`} offensive security {`}`}</span>
        </p>

        {/* Static tagline */}
        <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-secondary)] leading-[1.9] max-w-[500px] mb-4">
          <span className="text-[var(--accent-light)]/50">$</span>{" "}
          breaking systems to build better ones.
        </p>

        {/* Descriptor */}
        <p className="text-sm text-[var(--text-tertiary)] leading-[1.8] max-w-[420px] mb-12">
          I research attack surfaces, exploit vulnerabilities responsibly, and build tools
          that make the web harder to break — for everyone else.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap items-center">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-8 py-4 font-[family-name:var(--font-mono)] text-xs font-medium tracking-[0.06em] no-underline rounded-md bg-[var(--accent)] text-white shadow-[0_0_24px_rgba(108,92,231,0.3),0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_0_36px_rgba(108,92,231,0.5),0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-0.5"
          >
            view my work{" "}
            <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">→</span>
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 px-8 py-4 font-[family-name:var(--font-mono)] text-xs font-medium tracking-[0.06em] no-underline rounded-md bg-transparent text-[var(--text-primary)] border border-[var(--border-default)] transition-all duration-300 hover:border-[var(--accent-light)] hover:text-[var(--accent-light)] hover:-translate-y-0.5"
          >
            get in touch
          </a>
          <a
            href="https://github.com/Vlex127"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.15em] hover:text-[var(--accent-light)] transition-colors duration-200 lowercase ml-1"
          >
            github ↗
          </a>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="hidden lg:flex absolute right-12 bottom-24 flex-col gap-8 z-10">
        {[
          { num: "06", suffix: "", label: "projects shipped" },
          { num: "5", suffix: "+", label: "ctf categories" },
          { num: "#1", suffix: "", label: "nigeria on hackerdna" },
        ].map((stat) => (
          <div key={stat.label} className="text-right group cursor-default">
            <div className="text-[42px] font-black text-[var(--text-primary)] tracking-[-2px] leading-none group-hover:text-[var(--accent-light)] transition-colors duration-300">
              {stat.num}
              <span className="text-[var(--accent-light)] font-light text-2xl">{stat.suffix}</span>
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.18em] lowercase mt-1.5">
              {stat.label}
            </div>
          </div>
        ))}

        {/* Vertical rule */}
        <div className="absolute -left-6 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[var(--border-default)] to-transparent" />
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div className="hidden md:flex absolute bottom-10 left-12 items-center gap-4 z-10">
        <div className="w-10 h-px bg-[var(--accent-light)]" />
        <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.18em] lowercase">
          scroll to explore
        </span>
      </div>
    </section>
  )
}