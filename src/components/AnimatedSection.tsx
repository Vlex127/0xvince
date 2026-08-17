import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  return <div className={className}>{children}</div>
}

export function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}