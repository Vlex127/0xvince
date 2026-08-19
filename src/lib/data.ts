// lib/data.ts

import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter, FaEnvelope, FaTrophy } from "react-icons/fa6"
import { SiTryhackme, SiHackthebox } from "react-icons/si"

export const navLinks = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "ctf", href: "#ctf" },
  { label: "blog", href: "/blog" },
  { label: "contact", href: "#contact" },
  { label: "uses", href: "/uses" },
]

// ─────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────
export type Skill = {
  icon: string
  title: string
  desc: string
  tags: string[]
}
export const skills: Skill[] = [
  {
    icon: "⚔️",
    title: "Offensive Security",
    desc: "Active exploitation, red-team tooling, and attack simulation in controlled lab environments.",
    tags: ["Metasploit", "Nmap", "Burp Suite", "SQLmap", "GoPhish", "Hydra"],
  },
  {
    icon: "🔒",
    title: "Network & Infrastructure",
    desc: "Protocol-level analysis, traffic inspection, and mail server hardening from scratch.",
    tags: ["Wireshark", "Postfix/SMTP", "DNS", "Tcpdump", "Firewall Rules", "DKIM/SPF"],
  },
  {
    icon: "💻",
    title: "Programming & Scripting",
    desc: "Writing automation scripts, recon tools, and lightweight exploits from the ground up.",
    tags: ["Python", "Bash", "SQL", "JavaScript", "HTML/CSS", "Docker", "Regex", "AST"],
  },
  {
    icon: "👁️",
    title: "OSINT & Recon",
    desc: "Passive and active reconnaissance — mapping attack surfaces before anyone else does.",
    tags: ["Maltego", "Shodan", "theHarvester", "Google Dorking", "Social Engineering"],
  },
  {
    icon: "🐧",
    title: "Operating Systems",
    desc: "Native in Linux environments — from daily driving Kali to configuring server instances.",
    tags: ["Kali Linux", "Ubuntu", "Windows Server", "Terminal", "Dual Boot"],
  },
  {
    icon: "🌐",
    title: "Web Application Security",
    desc: "End-to-end web vuln testing aligned with industry-standard methodology.",
    tags: ["XSS", "SQLi", "CSRF", "LFI/RFI", "OWASP Top 10", "Recon-ng"],
  },
  {
    icon: "🖥️",
    title: "Application Development",
    desc: "Building full-stack apps and tooling — from Next.js dashboards and API backends to Python automation with real databases and deployments.",
    tags: ["Next.js", "React", "TypeScript", "Python", "Flask", "SQLite", "REST APIs", "Docker"],
  },
  {
    icon: "🧬",
    title: "Reverse Engineering",
    desc: "Taking binaries apart to understand how they really behave — low-level analysis, debugging, and finding the hidden logic.",
    tags: ["GDB", "Ghidra", "Assembly", "x86/x64", "Binary Exploitation", "Obfuscation"],
  },
]

// ─────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────
export type ExperienceItem = {
  date: string
  title: string
  org: string
  type: "research" | "ctf" | "education" | "work"
  status: "current" | "completed"
  desc: string
  highlights?: string[]
  skills?: string[]
  link?: string
}
export const experience: ExperienceItem[] = [
  {
    date: "2026 — present",
    title: "Independent Security Researcher",
    org: "Self-employed",
    type: "research",
    status: "current",
    desc: "Building out real infra to actually test attack/defence stuff instead of just reading about it. Mail security and phishing sims mostly right now.",
    highlights: [
      "Got a real SMTP server running with Postfix + Brevo — SPF/DKIM/DMARC took way longer than I expected, kept landing in spam until I actually understood how domain verification works",
      "Ran GoPhish campaigns against myself basically, to see what makes people click",
      "Wrote a script that runs Nmap and emails me the report so I stop manually copy-pasting scan output",
    ],
    skills: ["Postfix", "GoPhish", "Python", "Nmap", "DNS", "Kali Linux", "SMTP", "DKIM/SPF/DMARC"],
    link: "https://vincentiwuno.me",
  },
  {
    date: "2026",
    title: "MCP Server Developer — SecureOps AI",
    org: "Open-source · Vlex127/secureops-mcp",
    type: "research",
    status: "current",
    desc: "Local security auditing server using MCP so an LLM can scan your codebase without your source code ever leaving the machine. Probably the most over-engineered thing on this page, honestly.",
    highlights: [
      "Multi-analyzer setup — RegexScanner, ASTAnalyzer, FileScanner, DepScanner — each one catching a different class of bug. The AST analyzer was the hard part: flagging eval/exec/pickle calls without nuking the whole file",
      "5 MCP tools, from run_local_security_audit to the SARIF one, all returning structured JSON. Felt very official writing an actual spec for tool responses",
      ".env scanning that catches unquoted secrets — my first version missed those, and that annoyed me enough to fix it properly",
      "SARIF v2.1.0 output that GitHub Advanced Security and VS Code's SARIF viewer both accept — sat in the docs for hours getting that schema right",
      "HTML dashboard for results: severity donut charts, risk gauges, searchable findings. Overkill, but fun",
    ],
    skills: ["Python", "MCP", "AST", "Regex", "SARIF", "Docker", "Security Auditing", "LLM Integration"],
    link: "https://github.com/Vlex127/secureops-mcp",
  },
  {
    date: "2025 — 2026",
    title: "CTF Competitor & Security Student",
    org: "TryHackMe · HackTheBox",
    type: "ctf",
    status: "completed",
    desc: "The grind year. TryHackMe and HackTheBox almost every night — web exploitation, privilege escalation, forensics, crypto, and binary stuff I still mostly hate. Every box was a real-world scenario, just with a flag at the end.",
    highlights: [
      "Worked challenges across 5+ categories — web, pwn, forensics, crypto, OSINT. Some took a day, some took a week",
      "Finished the structured TryHackMe paths: networking, Linux, and ethical hacking fundamentals — the boring-but-necessary part",
      "Started publishing writeups so I actually remember what I learned. Explaining it to nobody on the internet is the fastest way to find the gaps",
      "Slowly climbed from easy boxes to the harder HackTheBox tiers. Each one still humbles me",
    ],
    skills: ["Burp Suite", "GDB", "Wireshark", "CyberChef", "SQLmap", "John the Ripper", "Gobuster"],
  },
  {
    date: "2024 — 2025",
    title: "Foundations: Networking & Ethical Hacking",
    org: "Self-directed · Kali Linux Lab",
    type: "education",
    status: "completed",
    desc: "A full year spent learning security the hands-on way — no bootcamp, just a Kali box, a lot of intentional breakage, and the patience to figure out why things broke. This is the year everything else on this page builds on.",
    highlights: [
      "Got comfortable with TCP/IP, DNS, and HTTP at the packet level — Wireshark was open more than my browser that year",
      "Set up and re-broke my own Kali lab constantly, which forced me to actually fix what I broke",
      "Learned Python by writing the boring tooling — port scanners, brute-force scripts, log parsers",
      "Walked through the OWASP Top 10 by reproducing each one in a controlled environment instead of just reading about it",
    ],
    skills: ["Networking", "Linux CLI", "Python", "Wireshark", "OWASP", "VirtualBox", "HTTP/DNS"],
  },
]

// ─────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────
export type Project = {
  num: string
  title: string
  desc: string
  stack: string[]
  status: "live" | "active" | "lab" | "wip"
  impact?: string
  link?: string
  screenshot?: string
}
export const projects: Project[] = [
  {
    num: "01",
    title: "Custom SMTP Mail Server",
    desc: "A mail server that actually delivers. Postfix + Brevo on Kali, with SPF, DKIM, and DMARC all configured on vincentiwuno.me. The auth records took forever to get right — kept landing in spam until I properly understood how domain verification works.",
    impact: "Real authenticated email that doesn't hit spam folders on Gmail, Outlook, ProtonMail.",
    stack: ["Postfix", "Brevo", "DNS", "Kali Linux", "DKIM", "SPF", "DMARC"],
    status: "live",
    screenshot: "/projects/smtp.svg",
    link: "https://vincentiwuno.me",
  },
  {
    num: "02",
    title: "Phishing Awareness Lab",
    desc: "A controlled GoPhish deployment for studying how phishing actually works end to end — lure design, spoofed domains, landing pages, credential capture analysis. Only ever run against myself. The point was to understand the attack, not to run one.",
    impact: "Watching the numbers change when I tweaked a lure template or landing page — tiny design decisions move click-through rates more than you'd think.",
    stack: ["GoPhish", "SMTP", "HTML/CSS", "Python"],
    status: "lab",
    screenshot: "/projects/phishing.svg",
  },
  {
    num: "03",
    title: "Network Recon Automation Toolkit",
    desc: "Python scripts that wrap Nmap with sensible defaults, parse the XML output into a readable report, and email it to my inbox over my own SMTP server. Built because I got tired of manually formatting scan output during recon.",
    impact: "Scan to report in one command — stopped copy-pasting scan output into notes by hand.",
    stack: ["Python", "Nmap", "Bash", "SMTP", "XML parsing"],
    status: "active",
    screenshot: "/projects/recon.svg",
    link: "https://github.com/Vlex127",
  },
  {
    num: "04",
    title: "CTF Writeup Platform",
    desc: "A personal writeup site for documenting CTF solutions — structured by category, difficulty, and platform. Built to solidify my own understanding and give back to the community.",
    impact: "",
    stack: ["Next.js", "Markdown", "Tailwind"],
    status: "wip",
  },
  {
    num: "05",
    title: "Recon Dashboard",
    desc: "A web UI for turning raw Nmap output into something you can actually search — port timeline views, host maps, and a clean list instead of a wall of XML. Early stage, still fleshing it out.",
    impact: "",
    stack: ["Python", "Flask", "Nmap", "SQLite"],
    status: "wip",
  },
  {
    num: "06",
    title: "SecureOps MCP",
    desc: "A local security auditing server built on the Model Context Protocol — an LLM can trigger scans of your codebase without the source code ever leaving your machine. 14 rules, 39 regex patterns, AST checks, SARIF output, path-traversal protection.",
    impact: "LLM-driven security audits with zero source code leaving the machine.",
    stack: ["Python", "MCP", "AST", "Regex", "SARIF", "Docker"],
    status: "active",
    screenshot: "/projects/secureops.svg",
    link: "https://github.com/Vlex127/secureops-mcp",
  },
]

// ─────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────
export const socialLinks = [
  { label: "GitHub", href: "https://github.com/vlex127" },
  { label: "TryHackMe", href: "https://tryhackme.com/p/0xvince" },
  { label: "HackTheBox", href: "https://profile.hackthebox.com/profile/019fd33f-258c-71d2-8510-62d5bcd48ccc" },
  { label: "HackerDNA", href: "https://hackerdna.com/users/vlex127" },
  { label: "LinkedIn", href: "https://linkedin.com/in/vincentiwuno" },
  { label: "X", href: "https://X.com/0xvince1" },
]

// ─────────────────────────────────────────
// CONTACT LINKS
// ─────────────────────────────────────────
export const contactLinks = [
  { id: "email",     icon: FaEnvelope,   label: "0xvince@vincentiwuno.me",      href: "mailto:0xvince@vincentiwuno.me" },
  { id: "github",    icon: FaGithub,     label: "github.com/Vlex127",           href: "https://github.com/Vlex127" },
  { id: "twitter",   icon: FaXTwitter,   label: "@0xvince",                     href: "https://X.com/0xvince1" },
  { id: "linkedin",  icon: FaLinkedin,   label: "linkedin.com/in/vincentiwuno", href: "https://linkedin.com/in/vincentiwuno" },
  { id: "tryhackme", icon: SiTryhackme,  label: "tryhackme.com/p/0xvince",      href: "https://tryhackme.com/p/0xvince" },
  { id: "hackthebox",icon: SiHackthebox, label: "profile.hackthebox.com",       href: "https://profile.hackthebox.com/profile/019fd33f-258c-71d2-8510-62d5bcd48ccc" },
  { id: "hackerdna", icon: FaTrophy,     label: "hackerdna.com/users/vlex127",  href: "https://hackerdna.com/users/vlex127" },
  { id: "instagram", icon: FaInstagram,  label: "@0xvince",                     href: "https://instagram.com/vincent_iwuno" },
]