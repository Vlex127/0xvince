import { NextResponse } from "next/server"
import { sendBrevoEmail, buildEmailCard, currentTimestamp } from "@/lib/brevo"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let body: { email?: string; subject?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid request body" }, { status: 400 })
  }

  const message = (body.message ?? "").trim()
  if (!message) {
    return NextResponse.json({ ok: false, error: "missing message" }, { status: 400 })
  }
  if (message.length > 500) {
    return NextResponse.json({ ok: false, error: "message too long" }, { status: 400 })
  }

  const subject = (body.subject ?? "general inquiry").trim().slice(0, 80)
  const email = (body.email ?? "").trim()
  const sentAt = currentTimestamp()
  const sender = email || "no email given"

  const result = await sendBrevoEmail({
    subject: `[portfolio] ${subject}`,
    replyTo: email || undefined,
    html: buildEmailCard({
      eyebrow: "new message",
      title: subject,
      meta: [
        { label: "from", value: sender },
        { label: "sent", value: sentAt },
      ],
      bodyHtml: (message.replace(/\n/g, "<br/>")) || "&nbsp;",
    }),
    text: [`New message — ${subject}`, `From: ${sender}`, `Sent: ${sentAt}`, "", message].join("\n"),
  })

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.status === 503 ? "email not configured" : "failed to send" },
      { status: result.status }
    )
  }

  return NextResponse.json({ ok: true })
}