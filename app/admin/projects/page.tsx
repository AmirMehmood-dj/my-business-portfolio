"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, ExternalLink, Search,
  X, Loader2, ImageIcon, Star, Upload, Trash,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";

type FormState = {
  title: string;
  description: string;
  image: string;
  images: string[];
  tech: string;
  category: "Websites" | "Applications";
  live_url: string;
  featured: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  title: "", description: "", image: "", images: [], tech: "",
  category: "Websites", live_url: "", featured: false,
};

const inputCls = "w-full px-4 py-2.5 text-sm border rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingExtra, setUploadingExtra] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const extraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    const res = await fetch("/api/admin/projects");
    if (res.ok) setProjects(await res.json());
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setErrors({});
    setShowModal(true);
  }

  function openEdit(p: Project) {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description,
      image: p.image ?? "",
      images: p.images ?? [],
      tech: p.tech.join(", "),
      category: p.category,
      live_url: p.live_url ?? "",
      featured: p.featured,
    });
    setErrors({});
    setShowModal(true);
  }

  async function uploadExtraImage(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5 MB");
      return;
    }
    setUploadingExtra(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage
      .from("projects")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    if (error) { alert(`Upload failed: ${error.message}`); setUploadingExtra(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("projects").getPublicUrl(data.path);
    setForm((f) => ({ ...f, images: [...f.images, publicUrl] }));
    setUploadingExtra(false);
  }

  function removeExtraImage(index: number) {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  }

  function closeModal() {
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    setErrors({});
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleImageFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setErrors((e) => ({ ...e, image: "Please select an image file (JPG, PNG, WebP)" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((e) => ({ ...e, image: "Image must be under 5 MB" }));
      return;
    }

    setUploadingImage(true);
    setErrors((e) => ({ ...e, image: undefined }));

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from("projects")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) {
      setErrors((e) => ({ ...e, image: `Upload failed: ${error.message}` }));
      setUploadingImage(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("projects")
      .getPublicUrl(data.path);

    setField("image", publicUrl);
    setUploadingImage(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageFile(file);
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.tech.trim()) e.tech = "Add at least one technology";
    if (form.live_url && !/^https?:\/\/.+/.test(form.live_url)) e.live_url = "Must start with https://";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      image: form.image || null,
      images: form.images,
      tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
      category: form.category,
      live_url: form.live_url.trim() || null,
      featured: form.featured,
    };

    if (editing) {
      const res = await fetch(`/api/admin/projects/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === editing.id ? data : p)));
      } else {
        const { error } = await res.json();
        alert(`Save failed: ${error}`);
        setSaving(false);
        return;
      }
    } else {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setProjects((prev) => [data, ...prev]);
      } else {
        const { error } = await res.json();
        alert(`Create failed: ${error}`);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    closeModal();
  }

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const techTags = form.tech.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Projects</h1>
          <p className="text-sm text-[#64748B] mt-1">{projects.length} total projects</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all bg-white"
        />
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#94A3B8] uppercase tracking-wide">Project</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#94A3B8] uppercase tracking-wide hidden sm:table-cell">Category</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#94A3B8] uppercase tracking-wide hidden md:table-cell">Tech Stack</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#94A3B8] uppercase tracking-wide">Featured</th>
                <th className="text-right px-5 py-3.5 text-xs font-medium text-[#94A3B8] uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center">
                    <Loader2 size={20} className="animate-spin mx-auto text-[#94A3B8]" />
                  </td>
                </tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-[#E2E8F0]" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] flex items-center justify-center flex-shrink-0">
                          <ImageIcon size={14} className="text-[#93C5FD]" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-[#0F172A]">{p.title}</p>
                        <p className="text-xs text-[#94A3B8] mt-0.5 line-clamp-1">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="px-2.5 py-1 text-xs font-medium bg-[#EFF6FF] text-[#2563EB] rounded-lg">{p.category}</span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.tech.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs bg-[#F8FAFC] text-[#64748B] rounded border border-[#E2E8F0]">{t}</span>
                      ))}
                      {p.tech.length > 3 && <span className="text-xs text-[#94A3B8]">+{p.tech.length - 3}</span>}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${p.featured ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#F8FAFC] text-[#94A3B8]"}`}>
                      {p.featured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {p.live_url && (
                        <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors">
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#7C3AED] hover:bg-[#F5F3FF] transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && (
          <div className="py-12 text-center text-[#94A3B8] text-sm">No projects found.</div>
        )}
      </div>

      {/* ─── Modal ─── */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={closeModal} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1F5F9] sticky top-0 bg-white rounded-t-2xl z-10">
                  <div>
                    <h2 className="font-semibold text-[#0F172A] text-lg">{editing ? "Edit Project" : "Add New Project"}</h2>
                    <p className="text-xs text-[#94A3B8] mt-0.5">Fields marked <span className="text-red-400">*</span> are required</p>
                  </div>
                  <button onClick={closeModal} className="p-2 rounded-xl text-[#94A3B8] hover:bg-[#F8FAFC] transition-colors">
                    <X size={18} />
                  </button>
                </div>

                <div className="px-6 py-5 space-y-5">

                  {/* Title + Category */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                        Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        value={form.title}
                        onChange={(e) => setField("title", e.target.value)}
                        placeholder="e.g. E-commerce Platform"
                        className={`${inputCls} ${errors.title ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-[#E2E8F0]"}`}
                      />
                      {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Category</label>
                      <select
                        value={form.category}
                        onChange={(e) => setField("category", e.target.value as FormState["category"])}
                        className={`${inputCls} border-[#E2E8F0] bg-white`}
                      >
                        <option value="Websites">Websites</option>
                        <option value="Applications">Applications</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setField("description", e.target.value)}
                      rows={3}
                      placeholder="Briefly describe what this project does and the problem it solves..."
                      className={`${inputCls} ${errors.description ? "border-red-300" : "border-[#E2E8F0]"} resize-none`}
                    />
                    {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Project Image</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageFile(f); e.target.value = ""; }}
                    />
                    <input
                      ref={extraInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        Array.from(e.target.files ?? []).forEach(uploadExtraImage);
                        e.target.value = "";
                      }}
                    />

                    {form.image ? (
                      /* ── Image preview ── */
                      <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] group">
                        <img src={form.image} alt="Project preview" className="w-full h-44 object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-3 py-2 bg-white text-[#0F172A] text-xs font-medium rounded-lg shadow hover:bg-[#F8FAFC] transition-colors"
                          >
                            <Upload size={13} />
                            Change
                          </button>
                          <button
                            type="button"
                            onClick={() => setField("image", "")}
                            className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white text-xs font-medium rounded-lg shadow hover:bg-red-600 transition-colors"
                          >
                            <Trash size={13} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ── Upload dropzone ── */
                      <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative flex flex-col items-center justify-center h-36 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-[#2563EB] hover:bg-[#F8FAFF] ${errors.image ? "border-red-300 bg-red-50" : "border-[#CBD5E1] bg-[#F8FAFC]"}`}
                      >
                        {uploadingImage ? (
                          <>
                            <Loader2 size={24} className="animate-spin text-[#2563EB] mb-2" />
                            <p className="text-sm text-[#64748B]">Uploading...</p>
                          </>
                        ) : (
                          <>
                            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center mb-3">
                              <Upload size={18} className="text-[#2563EB]" />
                            </div>
                            <p className="text-sm font-medium text-[#0F172A]">Click to upload or drag & drop</p>
                            <p className="text-xs text-[#94A3B8] mt-1">PNG, JPG, WebP — max 5 MB</p>
                          </>
                        )}
                      </div>
                    )}
                    {errors.image && <p className="mt-1.5 text-xs text-red-500">{errors.image}</p>}
                  </div>

                  {/* Additional Images */}
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      Additional Images
                      <span className="text-[#94A3B8] font-normal text-xs ml-1">(gallery — multiple allowed)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {form.images.map((img, i) => (
                        <div key={i} className="relative w-20 h-16 rounded-xl overflow-hidden border border-[#E2E8F0] group flex-shrink-0">
                          <img src={img} alt={`extra ${i + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeExtraImage(i)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                          >
                            <X size={14} className="text-white" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => extraInputRef.current?.click()}
                        disabled={uploadingExtra}
                        className="w-20 h-16 rounded-xl border-2 border-dashed border-[#CBD5E1] hover:border-[#2563EB] hover:bg-[#F8FAFF] flex flex-col items-center justify-center gap-1 transition-all disabled:opacity-50"
                      >
                        {uploadingExtra ? (
                          <Loader2 size={16} className="animate-spin text-[#2563EB]" />
                        ) : (
                          <>
                            <Upload size={14} className="text-[#94A3B8]" />
                            <span className="text-[10px] text-[#94A3B8]">Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Live URL */}
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Live URL</label>
                    <input
                      value={form.live_url}
                      onChange={(e) => setField("live_url", e.target.value)}
                      placeholder="https://myapp.com"
                      className={`${inputCls} ${errors.live_url ? "border-red-300" : "border-[#E2E8F0]"}`}
                    />
                    {errors.live_url && <p className="mt-1 text-xs text-red-500">{errors.live_url}</p>}
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      Tech Stack <span className="text-red-400">*</span>
                      <span className="text-[#94A3B8] font-normal text-xs ml-1">(comma separated)</span>
                    </label>
                    <input
                      value={form.tech}
                      onChange={(e) => setField("tech", e.target.value)}
                      placeholder="React, Next.js, TypeScript, Supabase"
                      className={`${inputCls} ${errors.tech ? "border-red-300" : "border-[#E2E8F0]"}`}
                    />
                    {errors.tech && <p className="mt-1 text-xs text-red-500">{errors.tech}</p>}
                    {techTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {techTags.map((t) => (
                          <span key={t} className="px-2.5 py-1 text-xs bg-[#EFF6FF] text-[#2563EB] rounded-lg border border-[#BFDBFE] font-medium">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Featured */}
                  <button
                    type="button"
                    onClick={() => setField("featured", !form.featured)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                      form.featured ? "border-[#FCD34D] bg-[#FFFBEB]" : "border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#FCD34D] hover:bg-[#FFFBEB]"
                    }`}
                  >
                    <Star size={16} className={form.featured ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CBD5E1]"} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${form.featured ? "text-[#B45309]" : "text-[#64748B]"}`}>Mark as Featured</p>
                      <p className="text-xs text-[#94A3B8] mt-0.5">Featured projects appear highlighted on your portfolio</p>
                    </div>
                    <div className={`w-10 h-5 rounded-full transition-colors ${form.featured ? "bg-[#F59E0B]" : "bg-[#CBD5E1]"}`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow mt-0.5 transition-transform ${form.featured ? "translate-x-5" : "translate-x-0.5"}`} />
                    </div>
                  </button>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#F1F5F9] sticky bottom-0 bg-white rounded-b-2xl">
                  <button onClick={closeModal} className="px-5 py-2.5 text-sm font-medium text-[#64748B] border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={saving || uploadingImage || uploadingExtra}
                    className="px-5 py-2.5 text-sm font-medium bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-colors disabled:opacity-60 flex items-center gap-2">
                    {saving && <Loader2 size={14} className="animate-spin" />}
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
