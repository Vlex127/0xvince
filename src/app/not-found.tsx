"use client"

import { useEffect, useState } from "react"

const LINES = [
  { prefix: "$", text: "nmap -sV vincentiwuno.me/???", delay: 0 },
  { prefix: "", text: "Starting Nmap 7.95 ( https://nmap.org )", delay: 600 },
  { prefix: "", text: "Nmap scan report for vincentiwuno.me", delay: 1200 },
  { prefix: "", text: "Host is up (0.0042s latency).", delay: 1600 },
  { prefix: "", text: "", delay: 2000 },
  { prefix: "→", text: "ERROR: host unreachable · port closed", delay: 2400, error: true },
  { prefix: "", text: "", delay: 2800 },
  { prefix: "$", text: "echo $?", delay: 3200 },
  { prefix: "", text: "404", delay: 3600, error: true },
]

export default function NotFound() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisible(i + 1), line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center px-6">
      <div className="max-w-[560px] w-full">
        {/* Terminal window */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border-subtle)]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.1em]">
              terminal — 404
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-5 font-[family-name:var(--font-mono)] text-[12px] leading-[2] min-h-[240px]">
            {LINES.slice(0, visible).map((line, i) => (
              <div key={i}>
                {line.prefix && (
                  <span className="text-[var(--accent-light)]">{line.prefix} </span>
                )}
                <span className={line.error ? "text-[var(--error)]" : "text-[var(--text-secondary)]"}>
                  {line.text}
                </span>
              </div>
            ))}
            {visible < LINES.length && (
              <span className="inline-block w-[7px] h-[14px] bg-[var(--accent-light)] animate-pulse ml-0.5 align-middle" />
            )}
          </div>
        </div>

        {/* Back link */}
        <a
          href="/"
          className={`mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12px] text-[var(--accent-light)] tracking-[0.08em] no-underline hover:underline underline-offset-4 transition-opacity duration-500 ${
            visible >= LINES.length ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          ← back to home
        </a>
      </div>
    </div>
  )
}