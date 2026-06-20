import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase";

const siteUrl = "https://aamirmehmood.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = createServerClient();

  const { data: projects } = await db
    .from("projects")
    .select("id, created_at")
    .order("created_at", { ascending: false });

  const projectUrls: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
    url: `${siteUrl}/projects/${p.id}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
