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
> **Scope:** This is the walkthrough from my own lab, run against mailboxes I control. GoPhish is for authorised simulations only on infrastructure you own or have explicit written permission to test — never send phishing to people without consent.

Phishing is the most reliable initial-access vector there is, so if you want to understand it — offensively or defensively — you need to run it in a controlled environment and see the actual numbers. GoPhish is the standard open-source framework for that: it handles senders, target groups, email templates, landing pages, and tracking, and it gives you a dashboard that shows exactly how people respond.

I ran this entirely on Kali, against mailboxes I control. Here's how the pieces fit together.

## What You Need

Before touching GoPhish, line up the plumbing:

- **A domain you own.** Don't use your real primary domain — that defeats the realism. Buy a lookalike or throwaway registered to your lab.
- **A sending IP that isn't blacklisted.** Residential IPs and most cloud ranges go straight to spam. This is the single biggest reason simulations fail.
- **An SMTP relay.** Brevo, AWS SES, or SendGrid handle reputation so your mail actually lands. GoPhish connects to it as a smart host.
- **DNS records on the sending domain:** SPF, DKIM, DMARC — the same trio from my mail-server post. If you skip these, everything you send is flagged and your results are meaningless.

If the sending infrastructure is weak, the campaign data tells you about your IP reputation, not human behaviour. Get delivery right first.

## Deploying GoPhish on Kali

Grab the latest release from the GitHub page rather than trusting an APT package, so you're on a current build:

\`\`\`bash
cd ~/Downloads
tar -xzf gophish-vX.X-linux-64bit.tar.gz
sudo mv gophish /opt/
cd /opt/gophish
\`\`\`

The admin UI runs over HTTPS with a self-signed cert generated on first launch. The included \`gophish.json\` controls the bind address and the phishing server URL:

\`\`\`json
{
  "admin_server": { "listen_url": "0.0.0.0:3333", "tls_cert": "gophish.crt" },
  "phish_server": { "listen_url": "0.0.0.0:80" }
}
\`\`\`

Start it and open the admin interface on port 3333:

\`\`\`bash
sudo ./gophish
# admin UI: https://localhost:3333  (password is printed to stdout on first run)
\`\`\`

## The Moving Parts

GoPhish composes a campaign out of five things. Understanding the model is most of the work.

- **SMTP Status / Sending Profile** — *how* mail leaves: relay host, port, username, password, and the "From" address.
- **Users & Groups** — your targets. In a lab, that's mailboxes you own.
- **Landing Pages** — the page a victim lands on, usually a cloned login form that captures submissions.
- **Email Templates** — the lure. GoPhish injects tracking pixels and links automatically.
- **Campaigns** — binds the four above together and launches.

## Step 1: Sending Profile

In the UI, New Profile → set the interface (your sending domain), the relay's host and port (587 with STARTTLS for most providers), and SMTP credentials. Hit *Send Test Email* — GoPhish gives a clear pass/fail and the raw SMTP conversation on failure, which is where you'll debug most of your delivery issues.

## Step 2: The Landing Page

The fastest route is *Clone Site*: give it a URL and GoPhish fetches the HTML. That rarely captures POSTed credentials, because the original form submits to the real server. You edit the captured HTML so the form posts to GoPhish's capture handler instead:

\`\`\`html
<form method="POST" action="/submit?{{ .GUID }}">
  <input type="hidden" name="data" value="{{ .Rhost }} {{ .Rtime }}" />
  <input type="text" name="username" />
  <input type="password" name="password" />
</form>
\`\`\`

The \`{{ .GUID }}\` is the tracking token GoPhish stamps on every link — it's how a credential submission gets tied back to a specific target. After capture, set a *Redirect URL* pointing at the genuine site so the victim lands somewhere normal and doesn't notice.

## Step 3: The Email Template

Templates use GoTemplate variables — \`{{ .Email.FirstName }}\`, \`{{ .BaseURL }}\` — so each send is personalised. Two things GoPhish handles for you and you should understand anyway:

- A **tracking pixel** is auto-added to measure opens.
- Every link is rewritten through \`{{ .BaseURL }}\` so clicks route through your GoPhish server and get recorded.

Make the single-target link red in the preview (there's a checkbox) so you can eyeball where it actually points.

## Step 4: Launch and What the Data Shows

A campaign moves each target through a lifecycle: *email sent → opened → clicked → data submitted → reported*. Watch those stages convert in the dashboard.

The interesting part is that success rate is almost entirely a function of message design, not the technical plumbing. Urgency ("your password expires today"), correct branding, and a plausible sender move the numbers far more than anything on the server side.

My lab run — 45 targets, all mailboxes I control — came out like this:

| Stage | Count | Rate |
|---|---:|---:|
| Email sent | 45 | 100% |
| Opened | 33 | 73.3% |
| Clicked | 28 | 62.2% |
| Data submitted | 24 | 53.3% |
| Reported | 0 | 0% |

## Defensive Takeaways

- **Check the sending domain, not the display name.** The "From" *label* is free text; the actual \`MAIL FROM\` and DKIM \`d=\` domain are the truth — which is exactly what SPF/DKIM/DMARC exist to expose.
- **Hover before clicking.** The rewritten \`{{ .BaseURL }}\` link is the tell in a real attack.
- **A submission is a breach.** If the landing page looked like a real login and credentials hit an unfamiliar server, the protocol is: change the password from a *known-good* device, then check for active sessions.

## What I Learned

A 53% credential-submission rate against a *plausible* login page is uncomfortable — and that's with a self-aware audience in a lab. It's tempting to think "no one would click that"; the dashboard says otherwise. The infrastructure gets your mail delivered; the *content* gets your click and the submission.

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
Most explanations of SPF, DKIM, and DMARC stop at "add these TXT records and email is secure." That's not wrong, but it hides the parts that actually matter to a researcher: *what each protocol does and doesn't verify*, and the specific ways each one quietly breaks.

This is the packet-level view — and the failure modes.

## The Mental Model

Three protocols, three different questions:

- **SPF** asks: *is this server allowed to send for the envelope-from domain?*
- **DKIM** asks: *was this message signed by the private key behind the header \`d=\` domain, and has it been altered since?*
- **DMARC** asks: *do SPF/DKIM actually line up with the domain the human sees in the From header — and if not, what should the receiver do?*

None of them, on its own, proves the visible sender is legitimate. That gap is where the whole game is played.

## SPF — Envelope Sender, Not the From Header

SPF is evaluated against the SMTP \`MAIL FROM\` (the *envelope* sender, visible in the \`Return-Path\`), **not** the \`From:\` header a user reads. That distinction surprises people and is exactly why SPF alone is trivially spoofable: an attacker can put your brand in the \`From:\` header while the envelope sender is a domain they control and SPF happily passes.

A record like \`v=spf1 include:_spf.example.com ip4:1.2.3.4 -all\` is a small program. \`include\` chains to another domain's SPF, \`ip4\`/\`ip6\` allow literal addresses, and the qualifier \`+\`/\`-\`/\`~\`/\`?\` sets the verdict.

### The failure modes

- **The 10-lookup limit.** SPF allows at most 10 DNS lookups per check. Chain enough \`include\`s (common once a SaaS provider layers CRM, marketing, and support tools) and you cross 10 — the receiver returns \`permerror\` and the check hard-fails. Fix it by inlining static \`ip4\` ranges instead of includes, or use a flattening service *carefully* — flattening has its own spoofing trade-offs.
- **The \`+all\` footgun.** \`+all\` means "any server on the internet is authorised." It appears in misconfigured zones constantly. Use \`-all\` (hard fail) once you're sure your senders are complete.
- **Forwarders break it.** When a mailing list or forwarder re-sends your mail from a different IP, SPF can fail because the new sender isn't in your list. This is *alignment*, and it's DKIM/DMARC's job, not SPF's.

## DKIM — A Cryptographic Seal on Headers and Body

DKIM hashes selected headers plus the body, signs that hash with the domain's private key, and drops the signature into a \`DKIM-Signature\` header. The receiver extracts the \`d=\` (domain) and \`s=\` (selector) tags, queries \`s._domainkey.d\` in DNS for the public key, and verifies. \`bh=\` covers the body; \`b=\` covers the signed headers.

### The failure modes

- **Signature stripping in transit.** Naive relays and mailing lists can remove or reformat the \`DKIM-Signature\` header, or a proxy that edits the subject line will change a signed header and blow the verification. Nothing is "hacked" — the seal is just broken by normal handling.
- **Selector hygiene.** Keys live under selectors (\`default\`, \`s1\`, \`google\`). If you decommission a sending service and leave an old selector pointing at a leaked key, you've published an attacker's signing key under your own domain. Audit selectors like you audit subdomains.
- **Sub-key disclosure via logging.** The signature is in a header, so anything that logs full headers (proxies, debug relays, mail archiving tools) leaks your signed messages. Not a break, but a real operational footgun worth calling out in a report.

## DMARC — The Protocol That Ties It Together

DMARC is the layer that finally compares the authentication results against the domain in the visible \`From:\` header. A message passes DMARC only when it passes SPF **and aligns**, or passes DKIM **and aligns**.

### Alignment is the whole point

- **SPF alignment** compares the envelope domain to the From domain.
- **DKIM alignment** compares the \`d=\` domain to the From domain.
- Two modes: \`s\` (strict — exact domain match) and \`r\` (relaxed — same organisational domain, subdomains allowed).

Real attack pattern: a message can pass SPF *and* DKIM yet still fail DMARC if neither domain aligns with the From header. Plenty of "authentication passed" phish live right here — technically signed, but by a domain that isn't the brand in the header. That's the signal DMARC gives receivers to apply your \`p=quarantine\` or \`p=reject\` policy.

### The escalation path

\`\`\`txt
p=none      # monitor only — you get aggregate (rua) reports, nothing is rejected
p=quarantine # move failures to spam
p=reject     # bounce failures
\`\`\`

Go \`none → quarantine → reject\` *only after reading your DMARC reports*, because jumping to \`reject\` while a legitimate third-party sender (your billing tool, your CRM) isn't aligned will bounce real mail. Aggregate XML reports show you every source sending as your domain and whether it authenticates — that's the data you escalate on.

## Building a Lab to See This Yourself

You don't need much to watch this happen. Start from a **correct** send, then break each piece and read the difference.

Here's a real message from my production setup (Postfix → Brevo relay, SPF/DKIM/DMARC configured), read through Gmail's **"Show original"**:

\`\`\`txt
From:       0xvince <0xvince@vincentiwuno.me>
Subject:    Hello from 0xvince welcome
mailed-by:  hb.d.sender-sib.com     # the envelope/relay domain (Brevo's infra)
signed-by:  vincentiwuno.me         # the DKIM d= domain — aligns with From
Security:   Standard encryption (TLS)
\`\`\`

That \`mailed-by\` vs \`signed-by\` split is the alignment story in plain English. Gmail tells you the mail physically left Brevo's infrastructure (\`mailed-by\`) but was *signed* by \`vincentiwuno.me\` (\`signed-by\`) — the same domain the human sees in \`From\`. DMARC's whole job is to enforce that the signing domain aligns with the visible sender, and here it does, so the authentication actually means something.

Now **break it on purpose** and watch the verdict change:

\`\`\`bash
# SPF hard-fail: send from a server not listed in the domain's SPF record
swaks --to you@gmail.com --from lab@yourdomain.com --server some-unlisted-host:25

# "Passes but doesn't align": DKIM verifies against a d= domain that is NOT the
# From domain — the classic authenticated-spoof shape.
\`\`\`

Open **"Show original"** again and read the raw \`Authentication-Results:\` header. A misaligned send comes back looking like this:

\`\`\`txt
Authentication-Results: mx.google.com;
  spf=fail (sender IP is not authorised) smtp.mailfrom=<unlisted-host>;
  dkim=pass header.d=<some-other-domain>;
  dmarc=fail action=oreject header.from=<your-brand>
\`\`\`

\`dkim=pass\` is genuine — but the \`d=\` domain doesn't line up with \`From\`, so \`dmarc=fail\`. The mail is cryptographically valid and still rejected, because it isn't *yours*. That one header is the clearest proof of why SPF and DKIM alone aren't enough, and why DMARC is the layer that ties them to what the reader actually sees.

## What I Learned

The three protocols aren't redundant checks of the same thing — they answer different questions and fail in different ways. SPF is about the sending *server*, DKIM about message *integrity*, and DMARC about whether either actually corresponds to the domain the human sees. Most people stop at "I added the records." The research starts when you deliberately break each one and watch the verdict headers change.`,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter((p) => !p.content.includes("Coming Soon"))
}

export function getUpcomingPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.content.includes("Coming Soon"))
}
