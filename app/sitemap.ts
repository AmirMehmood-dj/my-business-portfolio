import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase";

const siteUrl = "https://aamirmehmood.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = createServerClient();

  const [{ data: projects }, { data: blogs }] = await Promise.all([
    db.from("projects").select("id, created_at").order("created_at", { ascending: false }),
    db.from("blogs").select("slug, published_at").order("published_at", { ascending: false }),
  ]);

  const projectUrls: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
    url: `${siteUrl}/projects/${p.id}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogUrls: MetadataRoute.Sitemap = (blogs ?? []).map((b) => ({
    url: `${siteUrl}/blog/${b.slug}`,
    lastModified: new Date(b.published_at),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogUrls,
    ...projectUrls,
  ];
}
