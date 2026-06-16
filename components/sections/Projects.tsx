"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";

const categories = ["All", "Websites", "Applications"] as const;
type Category = (typeof categories)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="group relative bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:border-[#BFDBFE] hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-48 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] overflow-hidden">
        {project.image ? (
          <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Globe size={48} className="text-[#BFDBFE]" />
          </div>
        )}
        <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-[#2563EB] rounded-lg border border-[#BFDBFE]">
          {project.category}
        </span>
        {project.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-[#2563EB] text-white rounded-lg">
            Featured
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-[#0F172A] text-base mb-2 group-hover:text-[#2563EB] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="pt-4 mt-4 border-t border-[#F1F5F9]">
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#EFF6FF] text-[#2563EB] text-sm font-medium rounded-xl hover:bg-[#2563EB] hover:text-white transition-all duration-200"
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
    <section id="projects" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-[#2563EB] uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
            Selected work
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto">
            A showcase of projects I&apos;ve built — from SaaS platforms to
            mobile apps and AI-powered tools.
          </p>
        </motion.div>

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
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-200"
                  : "bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB]"
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
          <p className="text-center text-[#94A3B8] text-sm py-12">
            No projects yet.
          </p>
        )}
      </div>
    </section>
  );
}
