"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
]

const TERMINAL_LINES = [
  { prefix: "$", text: "sudo unlock easter-egg --user=visitor" },
  { prefix: "", text: "authenticating..." },
  { prefix: "", text: "" },
  { prefix: "✓", text: "access granted", success: true },
  { prefix: "", text: "" },
  { prefix: "#", text: "you found the hidden terminal." },
  { prefix: "#", text: "not many people get here." },
  { prefix: "#", text: "you've got good taste — and patience." },
  { prefix: "", text: "" },
  { prefix: "#", text: "feel free to reach out anytime." },
  { prefix: "#", text: "— 0xVince" },
]
 
export function KonamiEasterEgg() {
  const [show, setShow] = useState(false)
  const [lines, setLines] = useState(0)
  const progress = useRef(0)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (show) {
        if (e.code === "Escape") setShow(false)
        return
      }

      if (e.code === KONAMI[progress.current]) {
        progress.current++
        if (progress.current === KONAMI.length) {
          setShow(true)
          progress.current = 0
        }
      } else {
        progress.current = 0
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [show])

  useEffect(() => {
    if (!show) { setLines(0); return }
    const timers = TERMINAL_LINES.map((_, i) =>
      setTimeout(() => setLines(i + 1), 200 + i * 180)
    )
    return () => timers.forEach(clearTimeout)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-[rgba(5,5,7,0.92)] backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl overflow-hidden max-w-[480px] w-full shadow-[0_0_60px_rgba(108,92,231,0.15)]"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.1em]">
                  easter-egg.sh
                </span>
              </div>
              <button
                onClick={() => setShow(false)}
                className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors bg-transparent border-none cursor-pointer"
              >
                esc
              </button>
            </div>

            {/* Terminal body */}
            <div className="p-5 font-[family-name:var(--font-mono)] text-[12px] leading-[2] min-h-[220px]">
              {TERMINAL_LINES.slice(0, lines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {line.prefix && (
                    <span className={`${line.success ? "text-[var(--success)]" : "text-[var(--accent-light)]"}`}>
                      {line.prefix}{" "}
                    </span>
                  )}
                  <span className={
                    line.success ? "text-[var(--success)]" :
                    line.text.startsWith("—") ? "text-[var(--text-tertiary)] italic" :
                    "text-[var(--text-secondary)]"
                  }>
                    {line.text}
                  </span>
                </motion.div>
              ))}
              {lines < TERMINAL_LINES.length && (
                <span className="inline-block w-[7px] h-[14px] bg-[var(--accent-light)] animate-pulse ml-0.5 align-middle" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
