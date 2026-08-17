const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts"

const ACCENT = "#6C5CE7"
const ACCENT_SOFT = "#8F7DFF"
const BG = "#050507"
const SURFACE = "#0E0E16"
const BORDER = "#26263A"
const TEXT = "#EDEDF2"
const TEXT_MUTED = "#8A8A9A"

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function buildEmailCard(opts: {
  eyebrow: string
  title: string
  meta: Array<{ label: string; value: string }>
  bodyHtml: string
}): string {
  const { eyebrow, title, meta, bodyHtml } = opts
  const metaRows = meta
    .map(
      (m) => `${escapeHtml(m.label)}&nbsp;: <span style="color:${TEXT};">${escapeHtml(m.value)}</span>`
    )
    .join("<br/>")

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:${BG};font-family:Menlo,Consolas,'Courier New',monospace;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${SURFACE};border:1px solid ${BORDER};border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,${ACCENT},${ACCENT_SOFT});padding:22px 28px;">
              <div style="color:#FFFFFF;font-size:16px;font-weight:bold;letter-spacing:1px;">0xVince <span style="opacity:.7;">//</span> portfolio</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <div style="font-size:11px;color:${TEXT_MUTED};letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">${escapeHtml(eyebrow)}</div>
              <div style="font-size:22px;color:${ACCENT_SOFT};font-weight:bold;margin-bottom:20px;">${escapeHtml(title)}</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:12px 14px;background:${BG};border:1px solid ${BORDER};border-radius:8px;font-size:12px;color:${TEXT_MUTED};">
                    ${metaRows}
                  </td>
                </tr>
              </table>
              <div style="background:${BG};border:1px solid ${BORDER};border-left:3px solid ${ACCENT};border-radius:8px;padding:18px 20px;font-size:14px;line-height:1.7;color:${TEXT};white-space:normal;">
                ${bodyHtml}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;border-top:1px solid ${BORDER};background:${BG};">
              <div style="font-size:11px;color:${TEXT_MUTED};line-height:1.7;">
                <a href="https://vincentiwuno.me" style="color:${ACCENT_SOFT};text-decoration:none;">vincentiwuno.me</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function currentTimestamp(): string {
  return typeof Intl !== "undefined"
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date())
    : new Date().toISOString()
}

export async function addBrevoContact(email: string, listId: string): Promise<{ ok: true } | { ok: false; status: number; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return { ok: false, status: 503, error: "email not configured" }
  }

  try {
    const res = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, listIds: [Number(listId)] }),
    })

    const text = await res.text()
    if (!res.ok) {
      const isDuplicate = res.status === 400 && text.includes("already exist")
      if (!isDuplicate) {
        console.error("brevo contact error", res.status, text)
        return { ok: false, status: 502, error: "failed to add contact" }
      }
      return { ok: true } // already subscribed
    }

    return { ok: true }
  } catch (err) {
    console.error("brevo contact exception", err)
    return { ok: false, status: 502, error: "failed to add contact" }
  }
}

export async function sendBrevoEmail(opts: {
  subject: string
  html: string
  text: string
  replyTo?: string
}): Promise<{ ok: true } | { ok: false; status: number }> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return { ok: false, status: 503 }
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || "0xvince@vincentiwuno.me"

  try {
    const res = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: "0xVince Portfolio" },
        to: [{ email: "0xvince@vincentiwuno.me" }],
        replyTo: opts.replyTo?.trim() ? { email: opts.replyTo.trim() } : undefined,
        subject: opts.subject,
        htmlContent: opts.html,
        textContent: opts.text,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error("brevo error", res.status, detail)
      return { ok: false, status: 502 }
    }

    return { ok: true }
  } catch (err) {
    console.error("brevo exception", err)
    return { ok: false, status: 502 }
  }
}