"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const TAGLINES = [
  "breaking systems to build better ones.",
  "finding what others overlook.",
  "turning vulnerabilities into knowledge.",
  "thinking like an attacker, defending like an engineer.",
]

function useTypingEffect(phrases: string[], speed = 45, pause = 2200) {
  const [displayed, setDisplayed] = useState("")
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplayed(current.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        } else {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        if (charIdx > 0) {
          setDisplayed(current.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        } else {
          setDeleting(false)
          setPhraseIdx(i => (i + 1) % phrases.length)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause])

  return displayed
}

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const tagline = useTypingEffect(TAGLINES)

  return (
    <section
      ref={ref}
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

      {/* Orb 1 */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none -top-[200px] -right-[150px] opacity-50"
        animate={{ x: [0, -40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(108,92,231,0.18),transparent_70%)] blur-[120px]" />
      </motion.div>

      {/* Orb 2 */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute w-[450px] h-[450px] rounded-full pointer-events-none bottom-[-120px] left-[8%] opacity-50"
        animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(162,155,254,0.1),transparent_70%)] blur-[100px]" />
      </motion.div>

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-light)] to-transparent opacity-[0.07] pointer-events-none"
        style={{ animation: "scanLine 6s linear infinite" }}
      />

      {/* ── CONTENT ── */}
      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 max-w-[760px]">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-8 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)]/60 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-secondary)] tracking-[0.18em] lowercase">
            available for work · remote
          </span>
        </motion.div>

        {/* Role label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-mono)] text-xs text-[var(--accent-light)] tracking-[0.22em] lowercase mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-[var(--accent-light)]" />
          penetration tester &amp; ctf player
        </motion.p>

        {/* Name — with glitch */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(58px,9vw,104px)] font-black leading-[0.9] tracking-[-4px] mb-2 text-[var(--text-primary)] select-none"
        >
          <span className="block">Vincent</span>
          <span
            className="block text-[var(--accent-light)]"
            style={{ animation: "glitch 8s steps(1) infinite" }}
          >
            Iwuno
          </span>
        </motion.h1>

        {/* Handle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-tertiary)] tracking-[0.2em] mb-8"
        >
          <span className="text-[var(--accent-light)]/60">alias</span>{" "}
          <span className="text-[var(--text-secondary)]">0xVince</span>
          <span className="text-[var(--text-tertiary)]/40 ml-3"># {`{`} offensive security {`}`}</span>
        </motion.p>

        {/* Typing tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-secondary)] leading-[1.9] max-w-[500px] mb-4 min-h-[1.4em]"
        >
          <span className="text-[var(--accent-light)]/50">$</span>{" "}
          {tagline}
          <span className="inline-block w-[2px] h-[1em] bg-[var(--accent-light)] ml-0.5 align-middle animate-pulse" />
        </motion.p>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm text-[var(--text-tertiary)] leading-[1.8] max-w-[420px] mb-12"
        >
          I research attack surfaces, exploit vulnerabilities responsibly, and build tools
          that make the web harder to break — for everyone else.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-4 flex-wrap items-center"
        >
          <MagneticButton href="#projects" variant="primary">
            view my work{" "}
            <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">→</span>
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            get in touch
          </MagneticButton>
          <a
            href="https://github.com/Vlex127"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.15em] hover:text-[var(--accent-light)] transition-colors duration-200 lowercase ml-1"
          >
            github ↗
          </a>
        </motion.div>
      </motion.div>

      {/* ── STATS ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="hidden lg:flex absolute right-12 bottom-24 flex-col gap-8 z-10"
      >
        {[
          { num: "10", suffix: "+", label: "projects shipped" },
          { num: "∞", suffix: "", label: "ctf challenges" },
          { num: "0", suffix: "day", label: "research focus" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-right group cursor-default"
          >
            <div className="text-[42px] font-black text-[var(--text-primary)] tracking-[-2px] leading-none group-hover:text-[var(--accent-light)] transition-colors duration-300">
              {stat.num}
              <span className="text-[var(--accent-light)] font-light text-2xl">{stat.suffix}</span>
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.18em] lowercase mt-1.5">
              {stat.label}
            </div>
          </motion.div>
        ))}

        {/* Vertical rule */}
        <div className="absolute -left-6 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[var(--border-default)] to-transparent" />
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden md:flex absolute bottom-10 left-12 items-center gap-4 z-10"
      >
        <div
          className="w-10 h-px bg-[var(--accent-light)] origin-left"
          style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
        />
        <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.18em] lowercase">
          scroll to explore
        </span>
      </motion.div>
    </section>
  )
}

function MagneticButton({
  href,
  variant,
  children,
}: {
  href: string
  variant: "primary" | "ghost"
  children: React.ReactNode
}) {
  const isPrimary = variant === "primary"

  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center gap-2.5 px-8 py-4 font-[family-name:var(--font-mono)] text-xs font-medium tracking-[0.06em] no-underline rounded-md relative overflow-hidden transition-all duration-300 ${
        isPrimary
          ? "bg-[var(--accent)] text-white shadow-[0_0_24px_rgba(108,92,231,0.3),0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_36px_rgba(108,92,231,0.5),0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-transparent text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--accent-light)] hover:text-[var(--accent-light)] hover:shadow-[inset_0_0_0_1px_rgba(108,92,231,0.2)]"
      }`}
    >
      {isPrimary && (
        <span className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.a>
  )
}