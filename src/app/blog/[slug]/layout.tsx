import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/blog-data";

// lore/routing.md: params es Promise en Next.js 16
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado · Enma",
    };
  }

  return {
    title: `${post.title} · Enma`,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      url: `https://enmachile.com/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default function BlogArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
