import { NextResponse } from "next/server"
import { sendBrevoEmail } from "@/lib/brevo"

export async function POST(request: Request) {
  let body: { email?: string; subject?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid request body" }, { status: 400 })
  }

  const message = (body.message ?? "").trim()
  if (!message) return NextResponse.json({ ok: false, error: "missing message" }, { status: 400 })
  if (message.length > 500) return NextResponse.json({ ok: false, error: "message too long" }, { status: 400 })

  const subject = (body.subject ?? "general inquiry").trim().slice(0, 80)
  const email = (body.email ?? "").trim()
  const sentAt = new Date().toLocaleString("en-US")
  const html = `
    <div style="font-family: monospace; background: #050507; color: #EDEDF2; padding: 24px;">
      <h2 style="color: #8F7DFF;">${subject}</h2>
      <p style="color: #8A8A9A;">From: ${email || "no email given"} · ${sentAt}</p>
      <div style="border-left: 3px solid #6C5CE7; padding-left: 12px; margin-top: 16px;">
        ${message.replace(/\n/g, "<br/>")}
      </div>
    </div>
  `
  const result = await sendBrevoEmail({
    subject: `[portfolio] ${subject}`,
    replyTo: email || undefined,
    html,
    text: [`New message — ${subject}`, `From: ${email || "no email given"}`, `Sent: ${sentAt}`, "", message].join("\n"),
  })
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: result.error === "email not configured" ? 503 : 502 }
    )
  }
  return NextResponse.json({ ok: true })
}