export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`px-6 md:px-12 ${className}`}>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent" />
    </div>
  )
}