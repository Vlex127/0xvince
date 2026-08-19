type TerminalWindowProps = {
  label: string
  children: React.ReactNode
}

export function TerminalWindow({ label, children }: TerminalWindowProps) {
  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-5 font-[family-name:var(--font-mono)] text-[12px]">
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-[10px] text-[var(--text-tertiary)] tracking-[0.1em]">{label}</span>
      </div>
      <div className="space-y-1.5 text-[var(--text-tertiary)]">{children}</div>
    </div>
  )
}