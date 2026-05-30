// lib/data.ts

export const navLinks = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "ctf", href: "#ctf" },
  { label: "blog", href: "#blog" },
  { label: "contact", href: "#contact" },
]

// ─────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────
export const skills = [
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
    tags: ["Python", "Bash", "SQL", "JavaScript", "HTML/CSS"],
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
]

// ─────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────
export const experience = [
  {
    date: "2026 — present",
    title: "Independent Security Researcher",
    org: "Self-employed · Lagos, Nigeria",
    type: "research",
    status: "current",
    desc: "Independently researching offensive security techniques and building real-world infrastructure to test attack and defence scenarios. Focus areas include email security, phishing simulation, and network-layer exploitation.",
    highlights: [
      "Architected a production-grade SMTP mail server using Postfix + Brevo with full SPF, DKIM, and DMARC authentication on a custom domain",
      "Deployed and operated GoPhish phishing simulation labs — designed realistic lure templates and tracked campaign metrics to study human attack vectors",
      "Built a Python + Nmap recon automation pipeline that auto-emails formatted scan reports to a custom domain inbox on completion",
      "Actively documenting research as technical blog posts to contribute back to the security community",
    ],
    skills: ["Postfix", "GoPhish", "Python", "Nmap", "DNS", "Kali Linux", "SMTP", "DKIM/SPF/DMARC"],
    link: "https://vincentiwuno.me",
  },
  {
    date: "2025 — 2026",
    title: "CTF Competitor & Security Student",
    org: "TryHackMe · HackTheBox",
    type: "ctf",
    status: "completed",
    desc: "Immersed in competitive Capture the Flag events spanning web exploitation, privilege escalation, network forensics, binary analysis, and cryptography. Treated every challenge as a real-world attack scenario.",
    highlights: [
      "Solved challenges across 5+ categories: web, pwn, forensics, crypto, and OSINT",
      "Completed structured learning paths on TryHackMe covering networking, Linux, and ethical hacking fundamentals",
      "Documented and published writeups — building a personal knowledge base of attack techniques and mitigations",
      "Consistently progressed to harder difficulty tiers on HackTheBox through methodical enumeration and exploitation",
    ],
    skills: ["Burp Suite", "GDB", "Wireshark", "CyberChef", "SQLmap", "John the Ripper", "Gobuster"],
  },
  {
    date: "2024 — 2025",
    title: "Foundations: Networking & Ethical Hacking",
    org: "Self-directed · Kali Linux Lab",
    type: "education",
    status: "completed",
    desc: "Dedicated a full year to building the technical foundation of a security career — not through courses alone, but through hands-on lab work, building broken things intentionally, and understanding why they break.",
    highlights: [
      "Mastered TCP/IP, DNS, HTTP, and core networking protocols through packet-level analysis with Wireshark",
      "Set up and administered a personal Kali Linux lab environment for safe exploitation practice",
      "Learned Python scripting with a focus on security tooling: port scanners, brute-force scripts, and log parsers",
      "Studied the OWASP Top 10 in depth — reproducing each vulnerability class in controlled web environments",
    ],
    skills: ["Networking", "Linux CLI", "Python", "Wireshark", "OWASP", "VirtualBox", "HTTP/DNS"],
  },
]

// ─────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────
export const projects = [
  {
    num: "01",
    title: "Custom SMTP Mail Server",
    desc: "Deployed a full production-grade mail server on Kali Linux using Postfix and Brevo as the relay provider. Configured SPF, DKIM, and DMARC records on a custom domain (vincentiwuno.me) — the same authentication stack used by enterprise mail systems to prevent spoofing.",
    impact: "Fully authenticated outbound email with 0 spam-folder delivery on major providers.",
    stack: ["Postfix", "Brevo", "DNS", "Kali Linux", "DKIM", "SPF", "DMARC"],
    status: "live",
    link: "https://vincentiwuno.me",
  },
  {
    num: "02",
    title: "Phishing Awareness Lab",
    desc: "Set up a controlled GoPhish deployment to simulate end-to-end phishing campaigns — from lure design and domain spoofing to landing page capture and credential harvesting analysis. Built to study how attacks work, not to run them.",
    impact: "Revealed how small design decisions dramatically affect click-through and credential submission rates.",
    stack: ["GoPhish", "SMTP", "HTML/CSS", "Python"],
    status: "lab",
  },
  {
    num: "03",
    title: "Network Recon Automation Toolkit",
    desc: "Python scripts that wrap Nmap with smart defaults, parse XML output into readable reports, and auto-email findings to a designated inbox via the custom SMTP server. Designed to cut down repetitive recon work during lab sessions.",
    impact: "Reduced manual recon documentation time significantly — scan-to-report in one command.",
    stack: ["Python", "Nmap", "Bash", "SMTP", "XML parsing"],
    status: "active",
    link: "https://github.com/0xvince",
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
    desc: "A web UI for visualizing Nmap scan output — turns raw XML into a clean, searchable interface with port timeline views and host maps.",
    impact: "",
    stack: ["Python", "Flask", "Nmap", "SQLite"],
    status: "wip",
  },
]

// ─────────────────────────────────────────
// CTF STATS
// ─────────────────────────────────────────
export const ctfStats = [
  {
    platform: "TryHackMe",
    stat: "Active",
    badge: "Rooms completed",
    icon: "🏠",
    href: "https://tryhackme.com/",
  },
  {
    platform: "HackTheBox",
    stat: "Active",
    badge: "Machines pwned",
    icon: "📦",
    href: "https://hackthebox.com/",
  },
  {
    platform: "Categories",
    stat: "5+",
    badge: "Web · Pwn · Crypto · Forensics · OSINT",
    icon: "🗂️",
  },
  {
    platform: "Techniques",
    stat: "10+",
    badge: "XSS · SQLi · LFI · PrivEsc · RCE",
    icon: "⚙️",
  },
]

// ─────────────────────────────────────────
// BLOG POSTS
// ─────────────────────────────────────────
export const blogPosts = [
  {
    tag: "smtp · infrastructure",
    title: "Building a production mail server on Kali Linux from scratch",
    desc: "A full walkthrough: Postfix setup, Brevo relay configuration, DKIM key generation, SPF/DMARC record publishing, and testing deliverability — all on a custom domain.",
    meta: "coming soon · 2026",
    readTime: "12 min read",
  },
  {
    tag: "phishing · red team",
    title: "GoPhish lab: simulating a phishing campaign end-to-end",
    desc: "Setting up GoPhish, crafting convincing lure emails, building credential-capture landing pages, and what the data tells you about human vulnerability.",
    meta: "coming soon · 2026",
    readTime: "9 min read",
  },
  {
    tag: "dns · email security",
    title: "SPF, DKIM, DMARC — what they actually do and how to break them",
    desc: "Not just definitions — a practical look at how email authentication works at the packet level, and what happens when each record is misconfigured.",
    meta: "coming soon · 2026",
    readTime: "10 min read",
  },
]

// ─────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────
export const socialLinks = [
  { label: "GitHub", href: "https://github.com/0xvince" },
  { label: "TryHackMe", href: "https://tryhackme.com/p/0xvince" },
  { label: "HackTheBox", href: "https://hackthebox.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/in/vincentiwuno" },
  { label: "Twitter/X", href: "https://twitter.com/0xvince" },
]

// ─────────────────────────────────────────
// CONTACT LINKS
// ─────────────────────────────────────────
export const contactLinks = [
  { id: "email",     icon: "✉️", label: "0xvince@vincentiwuno.me",      href: "mailto:0xvince@vincentiwuno.me" },
  { id: "github",    icon: "⚙️", label: "github.com/0xvince",           href: "https://github.com/0xvince" },
  { id: "twitter",   icon: "✦",  label: "@0xvince",                     href: "https://twitter.com/0xvince" },
  { id: "linkedin",  icon: "⊞",  label: "linkedin.com/in/vincentiwuno", href: "https://linkedin.com/in/vincentiwuno" },
  { id: "tryhackme", icon: "🏴", label: "tryhackme.com/p/0xvince",      href: "https://tryhackme.com/p/0xvince" },
]