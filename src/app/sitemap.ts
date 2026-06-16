import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";

const BASE = "https://enmachile.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                     lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/nosotros`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/servicios`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/proyectos`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
