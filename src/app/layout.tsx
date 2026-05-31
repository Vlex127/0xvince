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

const SITE_URL = "https://vincentiwuno.me";
const OG_IMAGE = `${SITE_URL}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "0xVince — Cybersecurity Researcher",
    template: "%s | 0xVince",
  },
  description:
    "Cybersecurity researcher based in Lagos, Nigeria. Specializing in penetration testing, network security, and CTF challenges.",
  keywords: [
    "cybersecurity",
    "penetration testing",
    "ethical hacker",
    "CTF",
    "security researcher",
    "0xvince",
    "Vincent Iwuno",
    "Lagos Nigeria",
    "bug bounty",
    "web security",
    "network security",
  ],
  authors: [{ name: "Vincent Iwuno", url: SITE_URL }],
  creator: "Vincent Iwuno",
  publisher: "Vincent Iwuno",
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
    siteName: "0xVince",
    title: "0xVince — Cybersecurity Researcher",
    description:
      "Cybersecurity researcher based in Lagos, Nigeria. Specializing in penetration testing, network security, and CTF challenges.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "0xVince — Cybersecurity Researcher",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "0xVince — Cybersecurity Researcher",
    description:
      "Cybersecurity researcher based in Lagos, Nigeria. Specializing in penetration testing, network security, and CTF challenges.",
    images: [OG_IMAGE],
    creator: "@0xvince",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "theme-color": "#050507",
    "color-scheme": "dark",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#050507",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050507",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vincent Iwuno",
  alternateName: "0xVince",
  url: SITE_URL,
  jobTitle: "Cybersecurity Researcher",
  description:
    "Cybersecurity researcher based in Lagos, Nigeria. Specializing in penetration testing, network security, and CTF challenges.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  sameAs: [
    "https://github.com/Vlex127",
    "https://X.com/0xvince1",
    "https://linkedin.com/in/vincentiwuno",
    "https://instagram.com/0xvince",
  ],
  knowsAbout: [
    "Penetration Testing",
    "Network Security",
    "Web Security",
    "CTF",
    "OSINT",
    "Python",
    "Kali Linux",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
