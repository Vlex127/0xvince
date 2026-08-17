"use client"

import { useState, useEffect } from "react"
import { navLinks } from "@/lib/data"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-[rgba(5,5,7,0.85)] backdrop-blur-xl border-b border-[var(--border-subtle)]"
            : "py-6"
        }`}
      >
        <a href="#" className="text-[16px] font-extrabold tracking-[-0.5px] text-[var(--text-primary)] no-underline">
          0x<span className="text-[var(--accent-light)]">Vince</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] no-underline tracking-[0.08em] lowercase relative group transition-colors duration-300 hover:text-[var(--text-primary)]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent-light)] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CV download button — desktop */}
        <a
          href="/vincent-iwuno-cv.pdf"
          download
          className="hidden md:inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.08em] lowercase px-4 py-2 border border-[var(--accent-light)]/30 rounded-md hover:bg-[var(--accent)]/10 hover:border-[var(--accent-light)]/50 transition-all duration-300 no-underline"
        >
          cv ↓
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`w-5 h-[1.5px] bg-[var(--text-primary)] block origin-center transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
          />
          <span
            className={`w-5 h-[1.5px] bg-[var(--text-primary)] block transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-5 h-[1.5px] bg-[var(--text-primary)] block origin-center transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] bg-[rgba(5,5,7,0.95)] backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-mono)] text-lg text-[var(--text-secondary)] no-underline tracking-[0.1em] lowercase hover:text-[var(--accent-light)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/vincent-iwuno-cv.pdf"
            download
            onClick={() => setMobileOpen(false)}
            className="font-[family-name:var(--font-mono)] text-lg text-[var(--accent-light)] no-underline tracking-[0.1em] lowercase border border-[var(--accent-light)]/30 px-6 py-2 rounded-md hover:bg-[var(--accent)]/10 transition-colors"
          >
            cv ↓
          </a>
        </div>
      )}
    </>
  )
}