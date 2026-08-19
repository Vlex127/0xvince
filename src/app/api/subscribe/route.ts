import { NextResponse } from "next/server"
import { sendBrevoEmail, addBrevoContact } from "@/lib/brevo"

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

  const listId = process.env.BREVO_LIST_ID
  if (listId) {     
    const added = await addBrevoContact(email, listId)
    if (!added.ok) {
      return NextResponse.json({ ok: false, error: added.error }, { status: 502 })
    }
  }
  const sentAt = new Date().toLocaleString("en-US")
  const result = await sendBrevoEmail({
    subject: "[portfolio] new blog subscriber",
    html: `
      <div style="font-family: monospace; background: #050507; color: #EDEDF2; padding: 24px;">
        <h2 style="color: #8F7DFF;">Someone subscribed</h2>
        <p style="color: #8A8A9A;">${email} · ${sentAt}</p>
        <p>Add this address to the blog notification list.</p>
      </div>
    `,
    text: [`New blog subscriber`, `Email: ${email}`, `At: ${sentAt}`].join("\n"),
  })
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 })
  }
    return NextResponse.json({ ok: true })
}