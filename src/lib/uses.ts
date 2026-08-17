export const usesData = {
  shell: {
    title: "Shell & OS",
    items: [
      { name: "Kali Linux", note: "daily driver — rolling release, recon and exploitation tooling" },
      { name: "Ubuntu / Windows Server", note: "server-side testing and Windows targets" },
      { name: "Zsh + custom dotfiles", note: "aliases for recon, enumeration, and reporting" },
      { name: "VirtualBox", note: "isolated lab VMs for safe exploitation practice" },
    ],
  },
  toolkit: {
    title: "Security Toolkit",
    groups: [
      {
        label: "recon & enumeration",
        items: ["Nmap", "Gobuster", "theHarvester", "Shodan", "Maltego"],
      },
      {
        label: "exploitation & testing",
        items: ["Metasploit", "Burp Suite", "SQLmap", "Hydra", "GoPhish"],
      },
      {
        label: "analysis & forensics",
        items: ["Wireshark", "Tcpdump", "CyberChef", "GDB", "Ghidra", "John the Ripper"],
      },
    ],
  },
  dev: {
    title: "Development",
    items: ["Python", "Bash", "TypeScript", "JavaScript", "SQL", "HTML/CSS", "Docker", "Next.js", "Tailwind CSS", "Flask"],
  },
  infra: {
    title: "Infrastructure",
    items: [
      { name: "Postfix + Brevo relay", note: "production mail with SPF, DKIM, DMARC" },
      { name: "MCP (Model Context Protocol)", note: "SecureOps — LLM-driven local security audits" },
      { name: "SARIF", note: "structured findings output for code review" },
      { name: "DNS", note: "record management and email authentication" },
    ],
  },
  hardware: {
    title: "Hardware",
    items: [
      { name: "Lenovo ThinkPad T-series", note: "16GB RAM · Kali dual-boot, portable lab" },
      { name: "Android phone", note: "stock OS · 2FA and hotspot tethering for recon" },
      { name: "OpenWrt router + Pi-hole", note: "network-wide DNS filtering, ad-blocking, visibility" },
    ],
  },
  desk: {
    title: "Desk & Peripherals",
    items: [
      { name: `Dell 27" 1440p monitor`, note: "color-accurate, plenty of room for terminals and Burp" },
      { name: "Mechanical keyboard", note: "hot-swappable · tactile switches" },
      { name: "Logitech mouse", note: "ergonomic · quiet clicks, long battery" },
      { name: "Over-ear headphones", note: "noise-cancelling for deep focus and CTF sessions" },
    ],
  },
}