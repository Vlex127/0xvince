import { ImageResponse } from "next/og"
import { getBlogPost } from "@/lib/blog"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "0xVince — blog post"

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)

  const title = post?.title ?? "0xVince"
  const tags = post?.tags ?? []
  const meta = post ? `${post.publishedAt} · ${post.readTime}` : "vincentiwuno.me"

  // Shrink the type as the title gets long so it never overflows the canvas.
  const fontSize =
    title.length > 70 ? 46 : title.length > 48 ? 54 : title.length > 32 ? 62 : 72

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#050507",
          backgroundImage:
            "radial-gradient(900px 500px at 85% -10%, rgba(108,92,231,0.28), transparent 70%), radial-gradient(700px 400px at -5% 110%, rgba(162,155,254,0.14), transparent 70%)",
          padding: "72px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#eceef2",
        }}
      >
        {/* Top bar: brand + meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: "#a29bfe",
                borderRadius: 3,
              }}
            />
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 1,
                color: "#eceef2",
              }}
            >
              0xVince
            </div>
            <div style={{ fontSize: 22, color: "#8a8f9e" }}>/ blog</div>
          </div>
          <div style={{ fontSize: 22, color: "#8a8f9e" }}>{meta}</div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            marginTop: 40,
          }}
        >
          <div
            style={{
              fontSize,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: -1.5,
              color: "#eceef2",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 22,
                    color: "#a29bfe",
                    backgroundColor: "rgba(108,92,231,0.14)",
                    border: "1px solid rgba(108,92,231,0.35)",
                    borderRadius: 8,
                    padding: "8px 18px",
                  }}
                >
                  {`#${tag}`}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 22, color: "#8a8f9e" }}>
            Vincent Iwuno — Cybersecurity Researcher
          </div>
          <div style={{ fontSize: 22, color: "#a29bfe" }}>vincentiwuno.me</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
