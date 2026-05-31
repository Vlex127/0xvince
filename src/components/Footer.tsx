"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="py-9 px-6 md:px-12 bg-[var(--bg-base)] border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-3">
      <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.05em]">
        © 2026 <span className="text-[var(--accent-light)]">Vincent Iwuno</span> · 0xvince@vincentiwuno.me
      </p>
      <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.05em]">
        built with <span className="text-[var(--accent-light)]">♥</span> by{" "}
        <span className="text-[var(--accent-light)]">0xVince</span>
      </p>
    </footer>
  )
}
