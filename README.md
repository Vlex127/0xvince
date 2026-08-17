# 0xVince — Portfolio

> My personal cybersecurity portfolio — a place to show the work I talk about in interviews.

I built this because applying for security roles with "trust me, I know this stuff" doesn't work. I needed somewhere to point people — recruiters, hiring managers, other CTF players — where the projects, writeups, and lab work are actually visible instead of just mentioned.

So I built it myself. Nothing here is a template.

## How this thing came together

Honestly, this site has been through more versions than I'd like to admit.

**Version one was way too extra.** I started with zero Next.js/React experience and learned as I went over a few weeks. I got carried away with the "hacker aesthetic" — a full-screen boot loader with matrix rain, a glitch effect on my name, parallax orbs, a 3D-tilting avatar, mouse-tracked glow cards, a background video. It looked cool in a screenshot and was a pain to actually use. Every scroll triggered another animation, the loader made you wait, and the whole thing was heavy for no reason.

Then I got the feedback I needed: *the UI was too heavy.* So I ripped most of it out. Framer Motion is gone completely. The loader, the glitch, the orbs, the tilt — deleted. What's left is plain CSS hover states, server components where possible, and a site that loads instead of performing.

The actual hardest part of this project wasn't the frontend though. It was the **mail server** — setting up Postfix on Kali, wiring it through Brevo as a relay, and getting SPF, DKIM, and DMARC right so email actually lands in inboxes instead of spam. That took real debugging, and I wrote it all up in my first blog post. That's the kind of thing this site exists to prove I can do.

## What's here now

- **Hero** — name, tagline, straight to the point
- **About** — who I am and what I do
- **Skills** — what I work with, no gimmicks
- **Experience** — timeline with expandable highlights
- **Projects** — the real stuff: SMTP mail server, recon toolkit, SecureOps MCP
- **CTF** — platforms, skill breakdown, writeups in progress
- **Blog** — long-form posts on what I build and break
- **Uses** — the gear and tools I actually use
- **Contact** — form that reaches my inbox

There's also a Konami code easter egg. I kept that one. It's the fun that's actually fun.

## Stack

| Layer | What I used |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Fonts | Inter + JetBrains Mono |
| Content | Blog posts as data, rendered with react-markdown |
| Deployment | Vercel |
| Domain | Namecheap → vincentiwuno.me |

## Local dev

```bash
git clone https://github.com/Vlex127/0xvince
cd 0xvince
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). For typecheck + build before pushing:

```bash
pnpm check
```

## Structure

```
src/
  app/                # routes: home, blog, uses, api, not-found
    page.tsx          # home — imports all sections
    layout.tsx        # fonts + metadata
    blog/[slug]/      # individual post pages
  components/         # Hero, About, Skills, Experience, Projects, CTF, Blog, Contact...
  lib/
    data.ts           # site content
    blog.ts           # blog posts
    uses.ts           # /uses content
  public/             # images, video, favicon, CV
```

## What I'd do differently

- Start simpler. The "extra" version cost me time I could've spent on content.
- Ship the blog earlier — a real post beats a fancy animation.
- Set up `pnpm check` from day one instead of relying on build to catch mistakes.

## License

MIT. Fork it, use it, learn from it — but build your own.

---

Built by [Vincent Iwuno](https://vincentiwuno.me) · [@0xvince](https://twitter.com/0xvince1)