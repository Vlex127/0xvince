type BadgeProps = {
  color: string
  bg: string
  dot?: boolean
  className?: string
  children: React.ReactNode
}

export function Badge({ color, bg, dot = false, className = "", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[9px] px-2 py-[3px] rounded-[3px] tracking-[0.14em] uppercase font-medium ${className}`}
      style={{ color, background: bg }}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />}
      {children}
    </span>
  )
}