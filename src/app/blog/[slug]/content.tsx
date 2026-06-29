"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Components } from "react-markdown"

const components: Components = {
  h2: ({ children, ...props }) => (
    <h2
      className="text-[22px] font-bold tracking-[-0.5px] mt-10 mb-4 text-[var(--text-primary)]"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-[17px] font-bold tracking-[-0.3px] mt-8 mb-3 text-[var(--text-primary)]"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-[14px] text-[var(--text-secondary)] leading-[2] mb-5" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="text-[var(--accent-light)] hover:underline underline-offset-2 transition-colors duration-200"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code
          className="font-[family-name:var(--font-mono)] text-[12px] px-1.5 py-[2px] rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--accent-light)]"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <div className="relative group my-6">
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-t-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          <span className="ml-2 font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-tertiary)] tracking-[0.08em]">
            terminal
          </span>
        </div>
        <pre className="overflow-x-auto bg-[var(--bg-surface)] rounded-b-lg border border-[var(--border-subtle)] border-t-0 p-4">
          <code
            className="font-[family-name:var(--font-mono)] text-[13px] leading-[1.8] text-[var(--text-secondary)] block"
            {...props}
          >
            {children}
          </code>
        </pre>
      </div>
    )
  },
  pre: ({ children }) => <>{children}</>,
  ul: ({ children, ...props }) => (
    <ul className="space-y-2 mb-5" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="space-y-2 mb-5 list-decimal list-inside" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-[14px] text-[var(--text-secondary)] leading-[1.8]" {...props}>
      <span className="text-[var(--accent-light)]/60 mr-2">→</span>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-2 border-[var(--accent-light)]/40 pl-5 py-2 my-6 bg-[var(--bg-elevated)]/40 rounded-r-lg"
      {...props}
    >
      <div className="text-[14px] text-[var(--text-secondary)] italic leading-[1.8]">{children}</div>
    </blockquote>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-[var(--text-primary)]" {...props}>
      {children}
    </strong>
  ),
  hr: () => <div className="my-10 h-px bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent" />,
}

export function BlogPostContent({ content }: { content: string }) {
  return (
    <div className="prose-custom">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
