import { NextResponse } from "next/server"
import { sendBrevoEmail, addBrevoContact, buildEmailCard, currentTimestamp } from "@/lib/brevo"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let body: { email?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid request body" }, { status: 400 })
  }

  const email = (body.email ?? "").trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 })
  }

  // Store the subscriber in a Brevo list if one is configured
  const listId = process.env.BREVO_LIST_ID
  if (listId) {
    const added = await addBrevoContact(email, listId)
    if (!added.ok) {
      return NextResponse.json(
        { ok: false, error: added.error ?? "failed to subscribe" },
        { status: added.status }
      )
    }
  }

  const sentAt = currentTimestamp()

  const result = await sendBrevoEmail({
    subject: "[portfolio] new blog subscriber",
    html: buildEmailCard({
      eyebrow: "blog · new subscriber",
      title: "Someone subscribed 🔔",
      meta: [
        { label: "email", value: email },
        { label: "at", value: sentAt },
      ],
      bodyHtml:
        "Add this address to the blog notification list. Reply to this email to contact them directly.",
    }),
    text: [`New blog subscriber 🔔`, `Email: ${email}`, `At: ${sentAt}`].join("\n"),
  })

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.status === 503 ? "email not configured" : "failed to notify" },
      { status: result.status }
    )
  }

  return NextResponse.json({ ok: true })
}