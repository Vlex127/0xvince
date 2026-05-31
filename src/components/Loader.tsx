"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

const BOOT_LINES = [
  { text: "› booting 0xvince/portfolio v2.0", delay: 0 },
  { text: "› loading offensive security modules...", delay: 320 },
  { text: "› mounting recon toolkit", delay: 580 },
  { text: "› initializing ctf workspace", delay: 820 },
  { text: "› establishing secure channel", delay: 1050 },
  { text: "› all systems nominal", delay: 1260, accent: true },
]

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&"

function useGlitchText(text: string, active: boolean) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)

  useEffect(() => {
    if (!active) { setDisplay(text); return }
    let iterations = 0
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((char, i) => {
          if (char === " ") return " "
          if (i < iterations) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join("")
      )
      iterations += 0.4
      if (iterations >= text.length) clearInterval(interval)
    }, 30)
    frame.current = interval as unknown as number
    return () => clearInterval(interval)
  }, [text, active])

  return display
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const cols = Math.floor(canvas.width / 20)
    const drops = Array(cols).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,15,0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(108,92,231,0.35)"
      ctx.font = "13px monospace"

      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillText(char, i * 20, y * 20)
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }

    const id = setInterval(draw, 45)
    return () => clearInterval(id)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-[0.18] pointer-events-none"
    />
  )
}

function BootLine({ line, index }: { line: typeof BOOT_LINES[0]; index: number }) {
  const [visible, setVisible] = useState(false)
  const [done, setDone] = useState(false)
  const glitched = useGlitchText(line.text, visible && !done)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), line.delay + 400)
    const t2 = setTimeout(() => setDone(true), line.delay + 400 + line.text.length * 30 + 200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [line.delay, line.text.length])

  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`font-[family-name:var(--font-mono)] text-[11px] tracking-[0.08em] leading-[1.8] ${
        line.accent
          ? "text-emerald-400"
          : "text-[var(--text-tertiary)]"
      }`}
    >
      {line.accent && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 mb-[1px] animate-pulse" />
      )}
      {glitched}
      {!done && (
        <span className="inline-block w-[6px] h-[11px] bg-[var(--accent-light)] ml-0.5 align-middle animate-pulse opacity-80" />
      )}
    </motion.div>
  )
}

export function Loader() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"boot" | "progress" | "done">("boot")
  const [show, setShow] = useState(true)
  const titleText = "0xVince"
  const glitchedTitle = useGlitchText(titleText, phase === "boot")

  // Boot → progress phase
  useEffect(() => {
    const t = setTimeout(() => setPhase("progress"), 1800)
    return () => clearTimeout(t)
  }, [])

  // Progress bar
  useEffect(() => {
    if (phase !== "progress") return
    const interval = setInterval(() => {
      setProgress(prev => {
        // Realistic: fast at first, slow in middle, fast at end
        const remaining = 100 - prev
        const increment = Math.random() * (remaining * 0.18) + 1
        const next = Math.min(prev + increment, 100)
        if (next >= 100) {
          clearInterval(interval)
          setPhase("done")
          setTimeout(() => setShow(false), 700)
          return 100
        }
        return next
      })
    }, 60)
    return () => clearInterval(interval)
  }, [phase])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(8px)",
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10001] bg-[var(--bg-base)] flex flex-col overflow-hidden"
        >
          {/* Matrix rain bg */}
          <MatrixRain />

          {/* Scan line sweep */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-light)] to-transparent opacity-20 pointer-events-none"
            animate={{ y: ["0vh", "100vh"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Corner brackets */}
          {[
            "top-4 left-4 border-t border-l",
            "top-4 right-4 border-t border-r",
            "bottom-4 left-4 border-b border-l",
            "bottom-4 right-4 border-b border-r",
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              className={`absolute w-6 h-6 border-[var(--accent-light)]/30 ${cls}`}
            />
          ))}

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-8 px-6">

            {/* Big glitch title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div
                className="font-[family-name:var(--font-mono)] text-[clamp(48px,8vw,80px)] font-black text-[var(--accent-light)] tracking-[-3px] leading-none select-none"
                style={{ textShadow: "0 0 40px rgba(108,92,231,0.4)" }}
              >
                {glitchedTitle}
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.3em] uppercase mt-2">
                offensive security · portfolio
              </div>
            </motion.div>

            {/* Terminal boot log */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-[440px] bg-[var(--bg-elevated)]/80 backdrop-blur-sm border border-[var(--border-subtle)] rounded-xl p-5"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-[var(--border-subtle)]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.1em]">
                  system ~ boot
                </span>
              </div>

              {/* Boot lines */}
              <div className="space-y-0.5 min-h-[120px]">
                {BOOT_LINES.map((line, i) => (
                  <BootLine key={i} line={line} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Progress bar */}
            <AnimatePresence>
              {phase !== "boot" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-[440px] space-y-3"
                >
                  {/* Bar track */}
                  <div className="relative h-[3px] w-full bg-[var(--border-subtle)] rounded-full overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(to right, rgba(108,92,231,0.8), rgba(162,155,254,1))",
                        boxShadow: "0 0 12px rgba(108,92,231,0.6)",
                        transition: "width 0.1s ease",
                      }}
                    />
                    {/* Shimmer on bar */}
                    <motion.div
                      className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ left: `calc(${progress}% - 16px)` }}
                    />
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.1em]">
                      {phase === "done" ? (
                        <span className="text-emerald-400">ready</span>
                      ) : (
                        "loading assets"
                      )}
                    </span>
                    <span
                      className="font-[family-name:var(--font-mono)] text-[11px] font-bold tracking-[0.05em]"
                      style={{ color: "rgba(162,155,254,1)" }}
                    >
                      {Math.floor(progress)}
                      <span className="text-[var(--text-tertiary)] font-normal">%</span>
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom status bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 border-t border-[var(--border-subtle)] px-6 py-3 flex items-center justify-between"
          >
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.15em] uppercase">
              vincentiwuno.me
            </span>
            <div className="flex items-center gap-4">
              <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.1em]">
                kali linux · lagos ng
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}