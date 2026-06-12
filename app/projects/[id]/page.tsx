import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase";
import ProjectDetail from "./ProjectDetail";

const siteUrl = "https://aamirmehmood.com";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const db = createServerClient();
  const { data: project } = await db
    .from("projects")
    .select("title, description, image, tech, category")
    .eq("id", id)
    .single();

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = `${project.title} — Aamir Mehmood`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/projects/${id}`,
      siteName: "Aamir Mehmood Portfolio",
      images: project.image
        ? [{ url: project.image, width: 1200, height: 630, alt: project.title }]
        : [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
      type: "article",
    },
    keywords: project.tech ?? [],
    alternates: {
      canonical: `${siteUrl}/projects/${id}`,
    },
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return <ProjectDetail id={id} />;
}
