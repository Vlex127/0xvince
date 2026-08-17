import Image from "next/image"
import { AnimatedSection } from "./AnimatedSection"
import { socialLinks } from "@/lib/data"

function AvatarCard() {
  return (
    <AnimatedSection delay={0.3} className="flex items-center justify-center">
      <div className="relative group">
        <div className="relative w-[300px] h-[380px] rounded-2xl overflow-hidden border border-[var(--border-default)] transition-colors duration-500 group-hover:border-[var(--border-strong)]">
          <Image
            src="/profile.png"
            alt="Vincent Iwuno — 0xVince"
            fill
            sizes="(max-width: 768px) 300px, 300px"
            quality={90}
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </AnimatedSection>
  )
}

function CVButton() {
  return (
    <a
      href="/vincent-iwuno-cv.pdf"
      download="Vincent_Iwuno_CV.pdf"
      className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-lg overflow-hidden no-underline
        bg-[var(--accent)] text-white
        shadow-[0_0_20px_rgba(108,92,231,0.25),0_4px_16px_rgba(0,0,0,0.3)]
        hover:shadow-[0_0_32px_rgba(108,92,231,0.45),0_8px_32px_rgba(0,0,0,0.4)]
        transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Download icon */}
      <svg
        className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2v8M5 7l3 3 3-3" />
        <path d="M2 12h12" />
      </svg>

      <span className="relative z-10 font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[0.08em]">
        download cv
      </span>

      {/* PDF badge */}
      <span className="relative z-10 font-[family-name:var(--font-mono)] text-[9px] px-1.5 py-[2px] rounded-[3px] bg-white/15 tracking-[0.1em]">
        PDF
      </span>
    </a>
  )
}

export function About() {
  return (
    <section id="about" className="py-[120px] px-6 md:px-12 bg-[var(--bg-surface)]">
      <AnimatedSection>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-light)] tracking-[0.25em] lowercase mb-5 flex items-center gap-3">
          <span className="text-[var(--text-tertiary)]">//</span> about me
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-center">
        <div>
          <AnimatedSection delay={0.1}>
            <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05] mb-12">
              Who am
              <br />I?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-5 mb-10">
              <p className="text-base text-[var(--text-secondary)] leading-[2]">
                I&apos;m{" "}
                <strong className="text-[var(--text-primary)] font-semibold">
                  Vincent Iwuno
                </strong>
                , a cybersecurity researcher and ethical hacker based in Nigeria. I&apos;m
                passionate about understanding how systems work — and how they break.
              </p>
              <p className="text-base text-[var(--text-secondary)] leading-[2]">
                I specialize in{" "}
                <strong className="text-[var(--text-primary)] font-semibold">
                  penetration testing
                </strong>
                , network security, and security awareness. When I&apos;m not doing CTFs,
                I&apos;m building tools, writing about security, or setting up infrastructure
                on Kali Linux.
              </p>
              <p className="text-base text-[var(--text-secondary)] leading-[2]">
                I also build{" "}
                <strong className="text-[var(--text-primary)] font-semibold">
                  full-stack applications
                </strong>{" "}
                and enjoy{" "}
                <strong className="text-[var(--text-primary)] font-semibold">
                  reverse engineering
                </strong>{" "}
                — same curiosity, different layer of the stack.
              </p>
              <p className="text-base text-[var(--text-secondary)] leading-[2]">
                Currently sharpening my skills through competitive CTF play, real infrastructure
                projects, and working towards professional certifications in offensive security.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats row */}
          <AnimatedSection delay={0.25}>
            <div className="flex gap-10 mb-10 py-6 border-y border-[var(--border-subtle)]">
              {[
                { value: "06", label: "Projects" },
                { value: "5+", label: "Categories" },
                { value: "2", label: "Platforms" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold text-[var(--text-primary)] tracking-[-1px]">
                    {stat.value}
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.1em] uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Social links + CV button */}
          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap gap-2 mb-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-mono)] text-[11px] px-4 py-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-full text-[var(--text-tertiary)] no-underline transition-all duration-300 hover:border-[var(--accent-light)] hover:text-[var(--accent-light)] hover:shadow-[0_4px_16px_rgba(108,92,231,0.15)] hover:-translate-y-0.5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CV download row */}
            <div className="flex items-center gap-4 pt-2">
              <CVButton />
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-tertiary)] tracking-[0.1em]">
                updated{" "}
                <span className="text-[var(--text-secondary)]">2026</span>
              </span>
            </div>
          </AnimatedSection>
        </div>

        <AvatarCard />
      </div>
    </section>
  )
}