export interface BlogPost {
  slug: string
  title: string
  desc: string
  publishedAt: string
  readTime: string
  tags: string[]
  featured: boolean
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-a-production-mail-server-on-kali-linux",
    title: "Building a Production Mail Server on Kali Linux from Scratch",
    desc: "A full walkthrough: Postfix setup, Brevo relay configuration, DKIM key generation, SPF/DMARC record publishing, and testing deliverability — all on a custom domain.",
    publishedAt: "2026-06-29",
    readTime: "12 min read",
    tags: ["smtp", "infrastructure", "kali linux"],
    featured: true,
    content: `
## Why Build a Mail Server?

Most people never touch the guts of email. You type an address, hit send, and magic happens. But for a security researcher, "magic" is just a gap in understanding.

I wanted to know exactly what happens when an email leaves my server and lands in someone's inbox — the chain of trust, the authentication handshakes, and every failure point along the way.

So I built one.

## The Architecture

\`\`\`
┌─────────────┐     ┌──────────┐     ┌───────────┐
│  Kali Linux  │────▶│  Postfix  │────▶│  Brevo    │
│  (MTA)       │     │  (SMTP)   │     │  (Relay)  │
└─────────────┘     └──────────┘     └───────────┘
                           │
                           ▼
                    ┌───────────┐
                    │  DNS      │
                    │  SPF      │
                    │  DKIM     │
                    │  DMARC    │
                    └───────────┘
\`\`\`

The stack is straightforward:

- **Kali Linux** — the OS, acting as the Mail Transfer Agent (MTA)
- **Postfix** — the SMTP server that queues and delivers outbound mail
- **Brevo** — the SMTP relay (smarthost) that handles final delivery to providers like Gmail, Outlook, and ProtonMail
- **DNS records** — SPF, DKIM, and DMARC prove to receiving servers that the email actually came from me

## Step 1: Setting Up Postfix

Postfix handles the heavy lifting. It listens for outgoing mail, queues it, and forwards it to the relay.

\`\`\`bash
sudo apt update && sudo apt install postfix -y
\`\`\`

During installation, select **"Internet Site"** and set the system mail name to your domain (\`vincentiwuno.me\`).

The main config file lives at \`/etc/postfix/main.cf\`. Here's the minimal setup:

\`\`\`bash
# /etc/postfix/main.cf
myhostname = kali.vincentiwuno.me
mydomain = vincentiwuno.me
myorigin = $mydomain
inet_interfaces = all
inet_protocols = ipv4
mydestination = $myhostname, localhost.$mydomain, $mydomain
\`\`\`

But we're not delivering directly to the internet. Why? Because most residential IPs are blacklisted, and running a fully open MTA requires dedicated infrastructure, reverse DNS, and careful reputation management. Using a relay is the pragmatic choice.

## Step 2: Configuring the Relay (Brevo)

Brevo (formerly Sendinblue) provides SMTP relay credentials. You generate them in the Brevo dashboard under **SMTP & API**.

Add these lines to \`/etc/postfix/main.cf\`:

\`\`\`bash
# Relay configuration
relayhost = [smtp-relay.brevo.com]:587
smtp_use_tls = yes
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_tls_CAfile = /etc/ssl/certs/ca-certificates.crt
\`\`\`

Now create the SASL password file:

\`\`\`bash
echo "[smtp-relay.brevo.com]:587 your_brevo_login:your_brevo_password" | sudo tee /etc/postfix/sasl_passwd
sudo postmap hash:/etc/postfix/sasl_passwd
sudo chmod 600 /etc/postfix/sasl_passwd /etc/postfix/sasl_passwd.db
\`\`\`

Restart Postfix:

\`\`\`bash
sudo systemctl restart postfix
\`\`\`

At this point, you can send email. But it'll go straight to spam — or get rejected entirely — because receiving servers have no way to verify that \`vincentiwuno.me\` actually authorised \`kali.vincentiwuno.me\` to send mail on its behalf.

That's where email authentication comes in.

## Step 3: SPF — Sender Policy Framework

SPF tells receiving servers: "These are the only IPs authorised to send email for this domain."

My \`vincentiwuno.me\` domain is managed through **Namecheap**. I added a TXT record:

\`\`\`txt
Record type: TXT
Host: @
Value: v=spf1 include:spf.brevo.com ~all
\`\`\`

This says: "Only Brevo's SMTP servers are allowed to send as \`vincentiwuno.me\`. Everything else gets a soft fail (\`~all\`)."

To verify it's live:

\`\`\`bash
dig TXT vincentiwuno.me +short
"v=spf1 include:spf.brevo.com ~all"
\`\`\`

## Step 4: DKIM — DomainKeys Identified Mail

DKIM adds a cryptographic signature to every outgoing email. Receiving servers decrypt it using a public key published in your DNS. If it matches, the email hasn't been tampered with.

Generate a DKIM key pair:

\`\`\`bash
sudo apt install opendkim opendkim-tools -y
sudo mkdir -p /etc/opendkim/keys/vincentiwuno.me
cd /etc/opendkim/keys/vincentiwuno.me
sudo opendkim-genkey -s default -d vincentiwuno.me
sudo chown -R opendkim:opendkim /etc/opendkim
\`\`\`

This creates two files:

- \`default.private\` — the private key (keep this secret)
- \`default.txt\` — the public key to publish in DNS

The public key file looks like this:

\`\`\`
default._domainkey IN TXT "v=DKIM1; h=sha256; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC..."
\`\`\`

Publish it in Namecheap:

\`\`\`txt
Record type: TXT
Host: default._domainkey
Value: v=DKIM1; h=sha256; k=rsa; p=MIGfMA0...
\`\`\`

Now configure Postfix to sign outgoing mail with DKIM:

\`\`\`bash
# /etc/postfix/main.cf
milter_default_action = accept
milter_protocol = 6
smtpd_milters = inet:localhost:8891
non_smtpd_milters = inet:localhost:8891
\`\`\`

Configure \`/etc/opendkim.conf\`:

\`\`\`
Domain vincentiwuno.me
KeyFile /etc/opendkim/keys/vincentiwuno.me/default.private
Selector default
Socket inet:8891@localhost
\`\`\`

Restart both services:

\`\`\`bash
sudo systemctl restart opendkim postfix
\`\`\`

Verify DKIM is signing:

\`\`\`bash
sudo opendkim-testkey -d vincentiwuno.me -s default -vvv
\`\`\`

If everything's right, you'll see \`key OK\`.

## Step 5: DMARC — Domain-based Message Authentication, Reporting & Conformance

DMARC tells receiving servers what to do when SPF or DKIM fails. It also sends you reports so you can see who's trying to spoof your domain.

\`\`\`txt
Record type: TXT
Host: _dmarc
Value: v=DMARC1; p=quarantine; sp=quarantine; rua=mailto:dmarc-reports@vincentiwuno.me; pct=100; fo=1
\`\`\`

Breaking this down:

- \`p=quarantine\` — if authentication fails, send the email to spam (vs \`none\` or \`reject\`)
- \`sp=quarantine\` — same policy for subdomains
- \`rua=mailto:...\` — send aggregate reports to this address
- \`pct=100\` — apply to 100% of email
- \`fo=1\` — generate reports if either SPF or DKIM fails

## Step 6: Testing Deliverability

I sent test emails to several providers:

\`\`\`bash
echo "Testing SPF, DKIM, and DMARC configuration" | mail -s "Email Authentication Test" mypersonal@gmail.com
\`\`\`

Then checked the full headers:

\`\`\`
Authentication-Results: mx.google.com;
       spf=pass (google.com: domain of 0xvince@vincentiwuno.me designates 139.99.99.99 as permitted sender) smtp.mailfrom=0xvince@vincentiwuno.me;
       dkim=pass header.i=@vincentiwuno.me header.s=default;
       dmarc=pass (p=QUARANTINE sp=QUARANTINE dis=NONE)
\`\`\`

All three passed. Zero emails landed in spam.

## Results

After the full setup:

- **SPF**: Pass ✅
- **DKIM**: Pass ✅
- **DMARC**: Pass ✅
- **Deliverability**: 100% inbox rate across Gmail, Outlook, and ProtonMail
- **Spam folder**: 0/20 test emails

The full authentication chain:

\`\`\`
Email → Postfix signs (DKIM) → Relay to Brevo → SPF check → DKIM verify → DMARC policy → Inbox
\`\`\`

## What I Learned

Building a mail server from scratch demystifies the single most-used protocol on the internet. A few takeaways:

1. **Email security is a chain** — SPF, DKIM, and DMARC are worthless alone. Together, they form a trust layer that makes spoofing extremely difficult.

2. **Relays are not cheating** — Using Brevo (or SendGrid, or AWS SES) is standard practice. Direct-to-internet SMTP from a residential IP is a losing battle.

3. **Testing is everything** — Tools like \`swaks\`, \`mail-tester.com\`, and raw header inspection are invaluable for debugging.

4. **DNS propagation is slow** — Record changes can take 5 minutes to 48 hours. Patience matters.

The full config is reproducible in under an hour on a fresh Kali install. Every command, every DNS record, every test — documented and repeatable.

Next up: DKIM key rotation, DMARC reporting dashboards, and what happens when you deliberately misconfigure each record to study failure modes.
`,
  },
  {
    slug: "gophish-lab-simulating-phishing-campaigns",
    title: "GoPhish Lab: Simulating a Phishing Campaign End-to-End",
    desc: "Setting up GoPhish, crafting convincing lure emails, building credential-capture landing pages, and what the data tells you about human vulnerability.",
    publishedAt: "2026-06-25",
    readTime: "9 min read",
    tags: ["phishing", "red team", "gophish"],
    featured: false,
    content: `
## Coming Soon

This post is currently being written. The research and lab work is complete — documenting the findings takes time.

What it will cover:

- Deploying GoPhish on Kali Linux
- Designing realistic lure templates that bypass common filters
- Setting up landing pages for credential harvesting in a controlled environment
- Analysing campaign metrics: open rates, click-through rates, and credential submission rates
- How small design changes (urgency, personalization, branding) dramatically affect success rates
- Defensive takeaways: what to look for in a phishing email

Follow [@0xvince](https://x.com/0xvince1) to know when it drops.
`,
  },
  {
    slug: "spf-dkim-dmarc-what-they-actually-do",
    title: "SPF, DKIM, DMARC — What They Actually Do and How to Break Them",
    desc: "Not just definitions — a practical look at how email authentication works at the packet level, and what happens when each record is misconfigured.",
    publishedAt: "2026-06-20",
    readTime: "10 min read",
    tags: ["dns", "email security", "smtp"],
    featured: false,
    content: `
## Coming Soon

This post is currently in the research phase.

What it will cover:

- Deep dive into each authentication protocol at the packet level
- What happens when SPF has too many DNS lookups (the \`include\` limit)
- DKIM signature failures: replay attacks, key rotation, and selector management
- DMARC policy escalation from \`none\` → \`quarantine\` → \`reject\`
- Building a lab to test each misconfiguration and observing the results
- Real-world spoofing techniques and how these protocols prevent (or fail to prevent) them

Follow [@0xvince](https://x.com/0xvince1) to know when it drops.
`,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter((p) => !p.content.includes("Coming Soon"))
}
