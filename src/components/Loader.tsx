"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function Loader() {
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 5
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setShow(false), 400)
          return 100
        }
        return next
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[10001] bg-[var(--bg-base)] flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--accent-light)] tracking-[0.15em]"
          >
            initializing system
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="w-[200px] h-px bg-[var(--border-subtle)] relative overflow-hidden"
          >
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] transition-all duration-400"
              style={{ width: `${progress}%` }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.1em]"
          >
            {Math.floor(progress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
