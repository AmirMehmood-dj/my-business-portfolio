"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Code2,
  Search,
  X,
} from "lucide-react";
import { projects as initialProjects } from "@/lib/data";
import type { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id: string) {
    if (confirm("Delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  }

  function openEdit(p: Project) {
    setEditing(p);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditing(null);
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Projects</h1>
          <p className="text-sm text-[#64748B] mt-1">
            {projects.length} total projects
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#94A3B8] uppercase tracking-wide">
                  Project
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#94A3B8] uppercase tracking-wide hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#94A3B8] uppercase tracking-wide hidden md:table-cell">
                  Tech Stack
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#94A3B8] uppercase tracking-wide">
                  Featured
                </th>
                <th className="text-right px-5 py-3.5 text-xs font-medium text-[#94A3B8] uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#0F172A]">{p.title}</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5 line-clamp-1">
                      {p.description}
                    </p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="px-2.5 py-1 text-xs font-medium bg-[#EFF6FF] text-[#2563EB] rounded-lg">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-xs bg-[#F8FAFC] text-[#64748B] rounded border border-[#E2E8F0]"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 3 && (
                        <span className="text-xs text-[#94A3B8]">
                          +{p.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        p.featured
                          ? "bg-[#F0FDF4] text-[#16A34A]"
                          : "bg-[#F8FAFC] text-[#94A3B8]"
                      }`}
                    >
                      {p.featured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {p.live_url && (
                        <a
                          href={p.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {p.github_url && (
                        <a
                          href={p.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                        >
                          <Code2 size={14} />
                        </a>
                      )}
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#7C3AED] hover:bg-[#F5F3FF] transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-[#94A3B8] text-sm">
            No projects found.
          </div>
        )}
      </div>

      {/* Modal placeholder */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl w-full max-w-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-[#0F172A] text-lg">
                    {editing ? "Edit Project" : "Add New Project"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-1.5 rounded-lg text-[#94A3B8] hover:bg-[#F8FAFC]"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  {(["title", "description", "live_url", "github_url"] as const).map(
                    (field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-[#0F172A] mb-1.5 capitalize">
                          {field.replace("_", " ")}
                        </label>
                        <input
                          defaultValue={editing?.[field] ?? ""}
                          placeholder={`Enter ${field.replace("_", " ")}`}
                          className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all"
                        />
                      </div>
                    )
                  )}
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      Category
                    </label>
                    <select
                      defaultValue={editing?.category ?? "Web"}
                      className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] bg-white"
                    >
                      {["Web", "Mobile", "AI", "Business"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[#F1F5F9]">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2.5 text-sm font-medium text-[#64748B] border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2.5 text-sm font-medium bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-colors"
                  >
                    {editing ? "Save Changes" : "Create Project"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
