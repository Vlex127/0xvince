"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import type { ReactNode } from "react"

interface DividerProps {
  className?: string
}

export function Divider({ className = "" }: DividerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div ref={ref} className={`px-6 md:px-12 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent origin-center"
      />
    </div>
  )
}
