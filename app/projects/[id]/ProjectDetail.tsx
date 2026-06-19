"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Globe, Star } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";

export default function ProjectDetail({ id }: { id: string }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setProject(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#0F172A] mb-2">Project not found</p>
          <button onClick={() => router.back()} className="text-[#2563EB] text-sm hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  const allImages = [
    ...(project.image ? [project.image] : []),
    ...(project.images ?? []),
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Back + Live Demo row */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 text-xs font-medium bg-[#EFF6FF] text-[#2563EB] rounded-lg border border-[#BFDBFE]">
              {project.category}
            </span>
            {project.featured && (
              <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-[#FFFBEB] text-[#D97706] rounded-lg border border-[#FCD34D]">
                <Star size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
                Featured
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">{project.title}</h1>
        </div>

        {/* Image gallery */}
        {allImages.length > 0 && (
          <div className="mb-10">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#F1F5F9] mb-3 max-h-[260px] sm:max-h-[380px] lg:max-h-[480px] aspect-video">
              <Image
                src={allImages[activeImg]}
                alt={`${project.title} screenshot ${activeImg + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === i ? "border-[#2563EB] shadow-md" : "border-[#E2E8F0] hover:border-[#BFDBFE]"
                    }`}
                  >
                    <Image src={img} alt={`thumb ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {allImages.length === 0 && (
          <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] h-64 flex items-center justify-center mb-10">
            <Globe size={64} className="text-[#BFDBFE]" />
          </div>
        )}

        {/* Content grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-6">
              <h2 className="text-base font-semibold text-[#0F172A] mb-3">About this project</h2>
              <p className="text-[#475569] leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs font-medium bg-[#EFF6FF] text-[#2563EB] rounded-lg border border-[#BFDBFE]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.live_url && (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Links</h3>
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-all group"
                >
                  <ExternalLink size={15} className="text-[#2563EB]" />
                  <span className="text-sm font-medium text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate">
                    {project.live_url.replace(/^https?:\/\//, "")}
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
