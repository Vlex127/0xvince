const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts"

export async function sendBrevoEmail(opts: {
  subject: string
  html: string
  text?: string
  replyTo?: string
}) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return { ok: false, error: "email not configured" }

  const res = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: { email: process.env.BREVO_SENDER_EMAIL || "0xvince@vincentiwuno.me", name: "0xVince Portfolio" },
      to: [{ email: "0xvince@vincentiwuno.me" }],
      replyTo: opts.replyTo ? { email: opts.replyTo } : undefined,
      subject: opts.subject,
      htmlContent: opts.html,
      textContent: opts.text,
    }),
  })

  if (!res.ok) {
    console.error("brevo failed", res.status, await res.text())
    return { ok: false, error: "failed to send" }
  }

  return { ok: true }
}

export async function addBrevoContact(email: string, listId: string) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return { ok: false, error: "email not configured" }

  try {
    const res = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email, listIds: [Number(listId)] }),
    })
    // Brevo returns 400 with "already exist" when the contact is already in the list — that's fine
    if (!res.ok && !(res.status === 400 && (await res.text()).includes("already exist"))) {
      return { ok: false, error: "failed to add contact" }
    }
    return { ok: true }
  } catch (err) {
    console.error("brevo exception", err)
    return { ok: false, error: "failed to add contact" }
  }
}