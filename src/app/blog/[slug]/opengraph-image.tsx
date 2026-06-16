import { ImageResponse } from "next/og";
import { getPostBySlug, BLOG_POSTS } from "@/lib/blog-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const THEMES = [
  { bg: "#205358", text: "#F7DFBA", accent: "#FEA94F" },
  { bg: "#304B3D", text: "#F7DFBA", accent: "#FEA94F" },
  { bg: "#F8EDDD", text: "#205358", accent: "#F1541C" },
];

// lore/routing.md: params es Promise en Next.js 16
export default async function ArticleOGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      <div style={{ background: "#205358", width: "100%", height: "100%", display: "flex" }} />,
      { ...size }
    );
  }

  const idx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const theme = THEMES[idx] ?? THEMES[0];

  return new ImageResponse(
    (
      <div
        style={{
          background: theme.bg,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${theme.text}10 1.5px, transparent 1.5px)`,
            backgroundSize: "24px 24px",
            display: "flex",
          }}
        />

        {/* Decorative large number */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: -10,
            fontSize: 320,
            fontWeight: 200,
            color: theme.text,
            opacity: 0.04,
            lineHeight: 0.85,
            display: "flex",
          }}
        >
          {post.num}
        </div>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <span style={{ fontSize: 13, color: theme.accent, letterSpacing: 5, textTransform: "uppercase" }}>
            {post.category}
          </span>
          <span style={{ fontSize: 13, color: `${theme.text}40`, letterSpacing: 3 }}>
            ENMA · BLOG · {post.num}
          </span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              fontSize: post.title.length > 60 ? 46 : 56,
              fontWeight: 300,
              color: theme.text,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 920,
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              width: 80,
              height: 3,
              background: theme.accent,
              borderRadius: 4,
              marginTop: 32,
              display: "flex",
            }}
          />
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 12, color: `${theme.text}50`, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
              Por
            </span>
            <span style={{ fontSize: 24, fontWeight: 400, color: theme.text }}>{post.author}</span>
            {post.role && (
              <span style={{ fontSize: 15, color: `${theme.text}60` }}>{post.role}</span>
            )}
          </div>
          <span style={{ fontSize: 13, color: `${theme.text}30`, letterSpacing: 2 }}>
            enmachile.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
