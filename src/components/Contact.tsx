"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "./AnimatedSection"
import { contactLinks } from "@/lib/data"

export function Contact() {
  return (
    <section id="contact" className="py-[120px] px-6 md:px-12 bg-[var(--bg-surface)]">
      <AnimatedSection>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.25em] lowercase mb-5 flex items-center gap-3">
          <span className="text-[var(--text-tertiary)]">//</span> contact
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div>
          <AnimatedSection delay={0.1}>
            <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05] mb-16">
              Let&apos;s work
              <br />together.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[2] mb-9">
              Have a security concern, want to collaborate, or just want to talk hacking? Hit me up — I respond to every message.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-col gap-3">
              {contactLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-4 font-[family-name:var(--font-mono)] text-[13px] text-[var(--text-tertiary)] no-underline transition-colors duration-300 hover:text-[var(--accent-light)] px-4 py-3 rounded-lg hover:bg-[var(--accent-subtle)]"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg text-base transition-all duration-300 group-hover:border-[var(--accent-light)] group-hover:shadow-[0_0_12px_rgba(108,92,231,0.15)] flex-shrink-0">
                    {link.icon}
                  </div>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.15em] lowercase">
                your name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg px-4 py-3.5 text-[var(--text-primary)] font-[family-name:var(--font-mono)] text-[13px] outline-none transition-all duration-300 placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-light)] focus:shadow-[0_0_0_3px_rgba(108,92,231,0.1),0_0_20px_rgba(108,92,231,0.08)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.15em] lowercase">
                your email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg px-4 py-3.5 text-[var(--text-primary)] font-[family-name:var(--font-mono)] text-[13px] outline-none transition-all duration-300 placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-light)] focus:shadow-[0_0_0_3px_rgba(108,92,231,0.1),0_0_20px_rgba(108,92,231,0.08)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.15em] lowercase">
                message
              </label>
              <textarea
                placeholder="Tell me about your project or question..."
                rows={5}
                className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg px-4 py-3.5 text-[var(--text-primary)] font-[family-name:var(--font-mono)] text-[13px] outline-none transition-all duration-300 placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-light)] focus:shadow-[0_0_0_3px_rgba(108,92,231,0.1),0_0_20px_rgba(108,92,231,0.08)] resize-none"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="self-start px-9 py-4 bg-[var(--accent)] text-white font-[family-name:var(--font-mono)] text-xs font-semibold tracking-[0.06em] border-none rounded-lg cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(108,92,231,0.25)] hover:shadow-[0_0_30px_rgba(108,92,231,0.4),0_8px_32px_rgba(0,0,0,0.3)]"
            >
              send message →
            </motion.button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  )
}
