"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";

const categories = ["All", "Websites", "Web Applications", "Applications"] as const;
type Category = (typeof categories)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#3B82F6]/50 hover:bg-white/10 transition-all duration-300 flex flex-col backdrop-blur-sm"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563EB]/0 to-[#7C3AED]/0 group-hover:from-[#2563EB]/5 group-hover:to-[#7C3AED]/5 transition-all duration-300 pointer-events-none" />

      <div className="relative h-48 bg-gradient-to-br from-[#1E3A8A]/30 to-[#4C1D95]/20 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Globe size={48} className="text-white/20" />
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-1 text-xs font-medium bg-[#1E3A8A]/50 text-[#93C5FD] rounded-lg border border-[#3B82F6]/30">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2.5 py-1 text-xs font-medium bg-[#FFFBEB]/10 text-[#FCD34D] rounded-lg border border-[#FCD34D]/30">
              ⭐ Featured
            </span>
          )}
        </div>
        <h3 className="font-semibold text-white text-base mb-2 group-hover:text-[#60A5FA] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="pt-4 mt-4 border-t border-white/10">
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white/10 text-white text-sm font-medium rounded-xl hover:bg-gradient-to-r hover:from-[#2563EB] hover:to-[#7C3AED] transition-all duration-200"
          >
            View Details
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Category>("All");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setProjects(data); });
  }, []);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 bg-[#040B1A] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#4C1D95] opacity-10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#1E3A8A] opacity-10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-[#60A5FA] uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Selected work
          </h2>
          <p className="mt-4 text-[#94A3B8] max-w-xl mx-auto">
            A showcase of projects I&apos;ve built — from SaaS platforms to
            mobile apps and AI-powered tools.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                active === cat
                  ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-lg shadow-blue-900/30"
                  : "bg-white/5 text-[#94A3B8] border border-white/10 hover:border-[#3B82F6]/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="sync">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {projects.length === 0 && (
          <p className="text-center text-[#475569] text-sm py-12">
            No projects yet.
          </p>
        )}
      </div>
    </section>
  );
}
