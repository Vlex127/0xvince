import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.vincentiwuno.me";
const OG_IMAGE = `${SITE_URL}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vincent Iwuno (0xVince) — Cybersecurity Researcher",
    template: "%s | 0xVince",
  },
  description:
    "18-year-old cybersecurity researcher from Nigeria specialising in penetration testing, offensive security, CTF challenges, and security tooling. Open to internships and entry-level security roles.",
  keywords: [
    "cybersecurity",
    "penetration testing",
    "ethical hacker",
    "CTF player",
    "security researcher",
    "0xvince",
    "Vincent Iwuno",
    "bug bounty",
    "web security",
    "network security",
    "offensive security",
    "kali linux",
    "tryhackme",
    "hackthebox",
    "nigeria cybersecurity",
    "young hacker",
  ],
  authors: [{ name: "Vincent Iwuno", url: SITE_URL }],
  creator: "Vincent Iwuno",
  publisher: "Vincent Iwuno",
  category: "technology",
  classification: "Cybersecurity / Portfolio",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Vincent Iwuno — 0xVince",
    title: "Vincent Iwuno (0xVince) — Cybersecurity Researcher",
    description:
      "18-year-old offensive security researcher from Nigeria. Penetration testing, CTF player, and security tooling — open to internships and entry-level roles.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Vincent Iwuno — 0xVince · Cybersecurity Researcher",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@0xvince1",
    creator: "@0xvince1",
    title: "Vincent Iwuno (0xVince) — Cybersecurity Researcher",
    description:
      "18-year-old offensive security researcher from Nigeria. Penetration testing, CTF player, security tooling.",
    images: [OG_IMAGE],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  manifest: "/manifest.json",

  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050507",
  colorScheme: "dark",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vincent Iwuno — 0xVince",
    url: SITE_URL,
    description:
      "Cybersecurity researcher and penetration tester from Nigeria. Offensive security, CTF challenges, and security tooling.",
    author: {
      "@type": "Person",
      name: "Vincent Iwuno",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vincent Iwuno",
    alternateName: "0xVince",
    url: SITE_URL,
    image: OG_IMAGE,
    jobTitle: "Cybersecurity Researcher",
    description:
      "18-year-old cybersecurity researcher from Nigeria specialising in penetration testing, offensive security, and CTF challenges.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    email: "0xvince@vincentiwuno.me",
    sameAs: [
      "https://github.com/Vlex127",
      "https://x.com/0xvince1",
      "https://linkedin.com/in/vincentiwuno",
      "https://instagram.com/vincent_iwuno",
      "https://tryhackme.com/p/0xvince",
    ],
    knowsAbout: [
      "Penetration Testing",
      "Network Security",
      "Web Application Security",
      "CTF Challenges",
      "OSINT",
      "Python Scripting",
      "Kali Linux",
      "Offensive Security",
      "Social Engineering",
      "SMTP / Email Security",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Cybersecurity Researcher",
      occupationLocation: {
        "@type": "Country",
        name: "Nigeria",
      },
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Microsoft Certified: Security Operations Analyst Associate (SC-200)",
      recognizedBy: {
        "@type": "Organization",
        name: "Microsoft",
      },
      dateCreated: "2026-08-28",
      url: "https://learn.microsoft.com/en-us/users/vincentiwuno-6270/credentials/certification/security-operations-analyst",
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          defer
          data-domain="vincentiwuno.me"
          src="https://plausible.io/js/script.js"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Vincent Iwuno (0xVince) — Cybersecurity Researcher",
              description:
                "18-year-old cybersecurity researcher from Nigeria specialising in penetration testing, offensive security, CTF challenges, and security tooling.",
              url: SITE_URL,
              author: { "@type": "Person", name: "Vincent Iwuno" },
            }),
          }}
        />
      </head>
      <body
        className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-[family-name:var(--font-display)] antialiased"
        style={{ textRendering: "optimizeLegibility" }}
      >
        {children}
      </body>
    </html>
  );
}
