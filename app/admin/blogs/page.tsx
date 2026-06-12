"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, Clock, X, Loader2 } from "lucide-react";
import { formatDate, slugify } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

type FormState = {
  title: string;
  category: string;
  read_time: string;
  excerpt: string;
  content: string;
};

const emptyForm: FormState = {
  title: "", category: "", read_time: "5", excerpt: "", content: "",
};

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    const res = await fetch("/api/admin/blogs");
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEdit(post: BlogPost) {
    setEditing(post);
    setForm({
      title: post.title,
      category: post.category,
      read_time: String(post.read_time),
      excerpt: post.excerpt,
      content: post.content,
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
  }

  async function handleSave() {
    if (!form.title || !form.excerpt) return;
    setSaving(true);

    const payload = {
      title: form.title,
      slug: slugify(form.title),
      category: form.category,
      read_time: parseInt(form.read_time) || 5,
      excerpt: form.excerpt,
      content: form.content,
      thumbnail: "/blog/placeholder.jpg",
    };

    if (editing) {
      const res = await fetch(`/api/admin/blogs/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setPosts((prev) => prev.map((p) => (p.id === editing.id ? data : p)));
      } else {
        const { error } = await res.json();
        alert(`Save failed: ${error}`);
        setSaving(false);
        return;
      }
    } else {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, published_at: new Date().toISOString() }),
      });
      if (res.ok) {
        const data = await res.json();
        setPosts((prev) => [data, ...prev]);
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

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Blog Posts</h1>
          <p className="text-sm text-[#64748B] mt-1">{posts.length} posts</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[#94A3B8]" /></div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors">
              <div className="w-full sm:w-20 h-14 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 text-xs font-medium bg-[#EFF6FF] text-[#2563EB] rounded-lg">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-[#94A3B8]"><Clock size={10} />{post.read_time} min</span>
                  <span className="text-xs text-[#94A3B8]">{formatDate(post.published_at)}</span>
                </div>
                <h3 className="font-medium text-[#0F172A] line-clamp-1">{post.title}</h3>
                <p className="text-sm text-[#94A3B8] line-clamp-1 mt-0.5">{post.excerpt}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors">
                  <Eye size={15} />
                </a>
                <button onClick={() => openEdit(post)} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#7C3AED] hover:bg-[#F5F3FF] transition-colors">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(post.id)} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="py-12 text-center text-[#94A3B8] text-sm">No posts yet. Create your first post.</div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-[#0F172A] text-lg">{editing ? "Edit Post" : "New Blog Post"}</h2>
                  <button onClick={closeModal} className="p-1.5 rounded-lg text-[#94A3B8] hover:bg-[#F8FAFC]"><X size={18} /></button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Title</label>
                    <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Post title" className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Category</label>
                      <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="e.g. Next.js" className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Read time (min)</label>
                      <input type="number" value={form.read_time} onChange={(e) => setForm((f) => ({ ...f, read_time: e.target.value }))} min="1" className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Excerpt</label>
                    <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={3} placeholder="Short summary of the post..." className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Content <span className="text-[#94A3B8] font-normal">(HTML supported)</span></label>
                    <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={8} placeholder="Write your full article here..." className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all resize-none font-mono" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[#F1F5F9]">
                  <button onClick={closeModal} className="px-4 py-2.5 text-sm font-medium text-[#64748B] border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] transition-colors">Cancel</button>
                  <button onClick={handleSave} disabled={saving || !form.title} className="px-4 py-2.5 text-sm font-medium bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-colors disabled:opacity-60 flex items-center gap-2">
                    {saving && <Loader2 size={14} className="animate-spin" />}
                    {editing ? "Save Changes" : "Publish"}
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
