import Link from "next/link"
import { usesData } from "@/lib/uses"
import type { Metadata } from "next"

const SITE_URL = "https://vincentiwuno.me"

export const metadata: Metadata = {
  title: "/uses | 0xVince",
  description: "The tools, software, and hardware Vincent Iwuno (0xVince) uses for security research, CTFs, and building.",
  openGraph: {
    title: "/uses | 0xVince",
    description: "My security research setup — tools, software, and gear.",
    url: `${SITE_URL}/uses`,
  },
  alternates: {
    canonical: `${SITE_URL}/uses`,
  },
}

export default function UsesPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <div className="max-w-[720px] mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.15em] lowercase hover:text-[var(--accent-light)] transition-colors duration-200 no-underline group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span> back home
          </Link>
          <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05] mt-8 mb-4">
            /uses
          </h1>
          <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-tertiary)] leading-[1.8] max-w-[460px]">
            what I actually use — for research, CTFs, and building infra. updated as my setup changes.
          </p>
        </div>

        {/* Site / shell */}
        <Section title={usesData.shell.title}>
          {usesData.shell.items.map((item) => (
            <ItemRow key={item.name} name={item.name} note={item.note} />
          ))}
        </Section>

        {/* Security toolkit */}
        <Section title={usesData.toolkit.title}>
          {usesData.toolkit.groups.map((group) => (
            <div key={group.label} className="mb-6 last:mb-0">
              <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--accent-light)] tracking-[0.18em] uppercase mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((tool) => (
                  <span
                    key={tool}
                    className="font-[family-name:var(--font-mono)] text-[11px] px-3 py-[6px] rounded-[4px] border border-[var(--border-subtle)] text-[var(--text-secondary)] bg-[var(--bg-elevated)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* Development */}
        <Section title={usesData.dev.title}>
          <div className="flex flex-wrap gap-2">
            {usesData.dev.items.map((item) => (
              <span
                key={item}
                className="font-[family-name:var(--font-mono)] text-[11px] px-3 py-[6px] rounded-[4px] border border-[var(--border-subtle)] text-[var(--text-secondary)] bg-[var(--bg-elevated)]"
              >
                {item}
              </span>
            ))}
          </div>
        </Section>

        {/* Infrastructure */}
        <Section title={usesData.infra.title}>
          {usesData.infra.items.map((item) => (
            <ItemRow key={item.name} name={item.name} note={item.note} />
          ))}
        </Section>

        {/* Hardware */}
        <Section title={usesData.hardware.title}>
          {usesData.hardware.items.map((item) => (
            <ItemRow key={item.name} name={item.name} note={item.note} muted={item.name.includes("replace")} />
          ))}
        </Section>

        {/* Desk */}
        <Section title={usesData.desk.title}>
          {usesData.desk.items.map((item) => (
            <ItemRow key={item.name} name={item.name} note={item.note} muted={item.name.includes("replace")} />
          ))}
        </Section>

        {/* Footer note */}
        <div className="mt-16 border-t border-[var(--border-subtle)] pt-6">
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] leading-[1.8]">
            inspired by <span className="text-[var(--accent-light)]">uses.tech</span> · want to talk tools?{" "}
            <Link href="/#contact" className="text-[var(--accent-light)] hover:underline underline-offset-2">get in touch</Link>
          </p>
        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.2em] lowercase mb-5 flex items-center gap-3">
        <span className="text-[var(--accent-light)]">//</span> {title}
      </h2>
      {children}
    </section>
  )
}

function ItemRow({ name, note, muted = false }: { name: string; note: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3 border-b border-[var(--border-subtle)] last:border-0">
      <span className={`font-[family-name:var(--font-mono)] text-[13px] leading-[1.6] no-underline ${muted ? "text-[var(--text-tertiary)]/50" : "text-[var(--text-primary)]"}`}>
        {name}
      </span>
      <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] text-right leading-[1.6] max-w-[60%]">
        {note}
      </span>
    </div>
  )
}