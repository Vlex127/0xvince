import { AnimatedSection } from "./AnimatedSection"
import { certifications } from "@/lib/data"
import { FaAward } from "react-icons/fa"

export function Certifications() {
  return (
    <section id="credentials" className="py-[120px] px-6 md:px-12 bg-[var(--bg-base)] relative overflow-hidden">
      {/* Background bloom */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(108,92,231,0.05),transparent_70%)] pointer-events-none" />

      <AnimatedSection>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.25em] lowercase mb-5 flex items-center gap-3">
          <span className="text-[var(--text-tertiary)]">//</span> credentials
          <span className="text-[var(--text-tertiary)]/40">— online verifiable</span>
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05]">
            Certified
          </h2>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] tracking-[0.1em] max-w-[260px] leading-[1.8] text-right hidden md:block">
            every credential links to a live issuer verification page.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {certifications.map((c, i) => (
          <AnimatedSection key={c.credential} delay={0.1 + i * 0.05}>
            <div className="group relative h-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-7 overflow-hidden transition-all duration-300 hover:border-[var(--border-default)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.32)]">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-[var(--accent-light)] to-transparent" />

              {/* Head: badge + issuer */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center border border-[rgba(108,92,231,0.25)] bg-[rgba(108,92,231,0.10)]">
                  <FaAward className="text-[var(--accent-light)] text-[18px]" />
                </div>
                <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-[4px] border border-[var(--border-subtle)] text-[var(--text-tertiary)] bg-[var(--bg-surface)]">
                  {c.issuer}
                </span>
              </div>

              <h3 className="text-[18px] font-bold tracking-[-0.4px] text-[var(--text-primary)] leading-[1.25] mb-1.5">
                {c.name}
              </h3>

              <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.06em] mb-4">
                {c.credential}
              </div>

              {/* Dates */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-secondary)] mb-5">
                <span>earned {c.earned}</span>
                {c.expires && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]/40" />
                    <span>valid thru {c.expires}</span>
                  </>
                )}
              </div>

              {/* Skills covered */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {c.skills.map((s) => (
                  <span
                    key={s}
                    className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-[4px] rounded-[3px] border border-[rgba(108,92,231,0.2)] bg-[rgba(108,92,231,0.06)] text-[var(--accent-light)] tracking-[0.06em]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Verify link */}
              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-tertiary)] hover:text-[var(--accent-light)] tracking-[0.1em] transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                verify on Microsoft Learn ↗
              </a>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
