"use client"

import { useState } from "react"
import { AnimatedSection } from "./AnimatedSection"
import { contactLinks } from "@/lib/data"
import { TerminalWindow } from "./TerminalWindow"
const SUBJECTS = [
  "security consultation",
  "penetration testing inquiry",
  "ctf collaboration",
  "job opportunity",
  "just saying hi",
  "other",
]

const LINK_COLORS: Record<string, { color: string; bg: string }> = {
  email:     { color: "rgba(108,92,231,1)", bg: "rgba(108,92,231,0.10)" },
  github:    { color: "rgba(255,255,255,0.8)", bg: "rgba(255,255,255,0.06)" },
  twitter:   { color: "rgba(96,165,250,1)",  bg: "rgba(96,165,250,0.10)"  },
  linkedin:  { color: "rgba(52,211,153,1)",  bg: "rgba(52,211,153,0.10)"  },
  tryhackme: { color: "rgba(220,80,80,1)",   bg: "rgba(220,80,80,0.10)"   },
}

type FormState = "idle" | "sending" | "success"
type SendMode = "api" | "mailto"

export function Contact() {
  const [form, setForm] = useState({ email: "", subject: "", message: "" })
  const [state, setState] = useState<FormState>("idle")
  const [sendMode, setSendMode] = useState<SendMode>("api")
  const [focused, setFocused] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.message.trim()) return

    setState("sending")
    const subject = form.subject || "general inquiry"
    const message = form.message.trim()

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.trim(), subject, message }),
      })
      if (res.ok) {
        setSendMode("api")
        setState("success")
        return
      }
    } catch {
      // endpoint unreachable — fall through to mailto
    }

    const mailto = `mailto:0xvince@vincentiwuno.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    window.location.href = mailto
    setSendMode("mailto")
    setState("success")
  }

  const inputBase =
    "w-full bg-[var(--bg-base)] border rounded-lg px-4 py-3.5 text-[var(--text-primary)] font-[family-name:var(--font-mono)] text-[13px] outline-none transition-all duration-300 placeholder:text-[var(--text-tertiary)]/50 resize-none"
  const inputFocus = (field: string) =>
    focused === field
      ? "border-[var(--accent-light)] shadow-[0_0_0_3px_rgba(108,92,231,0.12),0_0_20px_rgba(108,92,231,0.08)]"
      : "border-[var(--border-subtle)] hover:border-[var(--border-default)]"

  return (
    <section id="contact" className="py-[120px] px-6 md:px-12 bg-[var(--bg-surface)] relative overflow-hidden">
      {/* Background bloom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(108,92,231,0.06),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <AnimatedSection>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.25em] lowercase mb-5 flex items-center gap-3">
          <span className="text-[var(--text-tertiary)]">//</span> contact
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* ── LEFT PANEL ── */}
        <div>
          <AnimatedSection delay={0.1}>
            <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.0] mb-6">
              Let&apos;s work
              <br />
              <span className="text-[var(--accent-light)]">together.</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[2] mb-10 max-w-[400px]">
              Have a security concern, want to collaborate on a CTF, or exploring a hire?
              I read every message and reply within 24 hours.
            </p>
          </AnimatedSection>

          {/* Availability card */}
          <AnimatedSection delay={0.25}>
            <div className="mb-10 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-3">
              <span className="relative flex h-2 w-2 mt-[5px] shrink-0">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <div>
                <p className="font-[family-name:var(--font-mono)] text-[11px] text-emerald-400 tracking-[0.15em] uppercase mb-0.5">
                  available for work
                </p>
                <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] leading-[1.7]">
                  open to security roles, freelance pentesting, CTF teams &amp; internships · remote
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Terminal block */}
          <AnimatedSection delay={0.3}>
            <div className="mb-10">
              <TerminalWindow label="preferred contact">
                <p><span className="text-[var(--accent-light)]">$</span> <span className="text-[var(--text-secondary)]">ping</span> 0xvince@vincentiwuno.me</p>
                <p className="pl-2">→ response time: <span className="text-emerald-400">&lt; 24h</span></p>
                <p className="mt-2"><span className="text-[var(--accent-light)]">$</span> <span className="text-[var(--text-secondary)]">best for</span></p>
                <p className="pl-2">→ security consulting · collaborations · opportunities</p>
              </TerminalWindow>
            </div>
          </AnimatedSection>

          {/* Contact links */}
          <AnimatedSection delay={0.35}>
            <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.2em] uppercase mb-4">
              find me on
            </p>
            <div className="flex flex-col gap-2">
              {contactLinks.map((link) => {
                  const cfg = LINK_COLORS[link.id] ?? { color: "rgba(108,92,231,1)", bg: "rgba(108,92,231,0.1)" }
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3.5 font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-tertiary)] no-underline px-3.5 py-2.5 rounded-lg transition-all duration-300 hover:translate-x-1"
                      style={{ "--hover-bg": cfg.bg, "--hover-color": cfg.color } as React.CSSProperties}
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border-subtle)] text-sm flex-shrink-0 bg-[var(--bg-elevated)] transition-all duration-300 group-hover:border-current group-hover:bg-[var(--hover-bg)] group-hover:text-[var(--hover-color)]">
                        <link.icon size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] opacity-50 capitalize">{link.id}</span>
                        <span className="text-[12px]">{link.label}</span>
                      </div>
                      <span className="ml-auto text-[10px] opacity-0 group-hover:opacity-60 transition-opacity duration-200">↗</span>
                    </a>
                  )
               })}
            </div>
          </AnimatedSection>
        </div>

        {/* ── RIGHT PANEL: FORM ── */}
        <AnimatedSection delay={0.2}>
          <div className="relative bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-8 overflow-hidden">
            {/* Card top glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-light)]/30 to-transparent" />

            {state === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl mb-5">
                  ✓
                </div>
                <h3 className="text-[18px] font-bold mb-2 text-[var(--text-primary)]">Message sent.</h3>
                <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-tertiary)] leading-[1.8] max-w-[280px]">
                  {sendMode === "api"
                    ? "It landed directly in my inbox — I reply within 24 hours."
                    : "Your email app should have opened — finish sending from there."}
                </p>
                <button
                  onClick={() => { setState("idle"); setForm({ email: "", subject: "", message: "" }) }}
                  className="mt-8 font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.1em] hover:underline underline-offset-2"
                >
                  send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--accent-light)] tracking-[0.2em] uppercase mb-5">
                    send a message
                  </p>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.15em] lowercase">
                    your email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className={`${inputBase} ${inputFocus("email")}`}
                  />
                </div>

                {/* Subject dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.15em] lowercase">
                    subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    className={`${inputBase} ${inputFocus("subject")} appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-[var(--bg-base)]">select a topic...</option>
                    {SUBJECTS.map(s => (
                      <option key={s} value={s} className="bg-[var(--bg-base)] capitalize">{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.15em] lowercase">
                      message
                    </label>
                    <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)]/50">
                      {form.message.length}/500
                    </span>
                  </div>
                  <textarea
                    placeholder="Tell me about your project, the role, or what you need help with..."
                    rows={5}
                    maxLength={500}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    required
                    className={`${inputBase} ${inputFocus("message")}`}
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 bg-[var(--accent)] text-white font-[family-name:var(--font-mono)] text-[11px] font-semibold tracking-[0.08em] rounded-lg cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(108,92,231,0.25)] hover:shadow-[0_0_30px_rgba(108,92,231,0.45),0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {state === "sending" ? "sending…" : "send message →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}