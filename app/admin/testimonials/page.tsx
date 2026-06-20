"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Star, X, Loader2, Check } from "lucide-react";
import type { Testimonial } from "@/lib/types";

type FormState = {
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: string;
};

const emptyForm: FormState = {
  name: "", role: "", company: "", feedback: "", rating: "5",
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchTestimonials(); }, []);

  async function fetchTestimonials() {
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) setTestimonials(await res.json());
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  }

  async function handleApprove(id: string) {
    const res = await fetch(`/api/admin/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" }),
    });
    if (res.ok) {
      const data = await res.json();
      setTestimonials((prev) => prev.map((t) => (t.id === id ? data : t)));
    }
  }

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEdit(t: Testimonial) {
    setEditing(t);
    setForm({ name: t.name, role: t.role, company: t.company, feedback: t.feedback, rating: String(t.rating) });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
  }

  async function handleSave() {
    if (!form.name || !form.feedback) return;
    setSaving(true);
    const payload = {
      name: form.name,
      role: form.role,
      company: form.company,
      feedback: form.feedback,
      rating: parseInt(form.rating) || 5,
    };

    if (editing) {
      const res = await fetch(`/api/admin/testimonials/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setTestimonials((prev) => prev.map((t) => (t.id === editing.id ? data : t)));
      } else {
        const { error } = await res.json();
        alert(`Save failed: ${error}`);
        setSaving(false);
        return;
      }
    } else {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setTestimonials((prev) => [data, ...prev]);
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
          <h1 className="text-2xl font-bold text-[#0F172A]">Testimonials</h1>
          <p className="text-sm text-[#64748B] mt-1">{testimonials.length} reviews</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors">
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[#94A3B8]" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className={`p-5 bg-white rounded-2xl border hover:shadow-md transition-all ${(t as any).status === 'pending' ? 'border-[#FCD34D]' : 'border-[#E2E8F0] hover:border-[#BFDBFE]'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>
                {(t as any).status === 'pending' && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#FFFBEB] text-[#D97706] rounded-lg border border-[#FCD34D]">Pending</span>
                )}
              </div>
              <p className="text-sm text-[#475569] leading-relaxed mb-4 line-clamp-3">&ldquo;{t.feedback}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#F1F5F9]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-white">{t.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-[#0F172A] truncate">{t.name}</p>
                  <p className="text-xs text-[#94A3B8] truncate">{t.role}, {t.company}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {(t as any).status === 'pending' && (
                    <button onClick={() => handleApprove(t.id)} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-green-600 hover:bg-green-50 transition-colors" title="Approve">
                      <Check size={13} />
                    </button>
                  )}
                  <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#7C3AED] hover:bg-[#F5F3FF] transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <div className="col-span-3 py-12 text-center text-[#94A3B8] text-sm">No testimonials yet.</div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl w-full max-w-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-[#0F172A] text-lg">{editing ? "Edit Testimonial" : "Add Testimonial"}</h2>
                  <button onClick={closeModal} className="p-1.5 rounded-lg text-[#94A3B8] hover:bg-[#F8FAFC]"><X size={18} /></button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Name</label>
                      <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Client name" className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Role</label>
                      <input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="e.g. CEO" className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Company</label>
                    <input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="Company name" className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Feedback</label>
                    <textarea value={form.feedback} onChange={(e) => setForm((f) => ({ ...f, feedback: e.target.value }))} rows={4} placeholder="Client feedback..." className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Rating</label>
                    <select value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] bg-white">
                      {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[#F1F5F9]">
                  <button onClick={closeModal} className="px-4 py-2.5 text-sm font-medium text-[#64748B] border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] transition-colors">Cancel</button>
                  <button onClick={handleSave} disabled={saving || !form.name} className="px-4 py-2.5 text-sm font-medium bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-colors disabled:opacity-60 flex items-center gap-2">
                    {saving && <Loader2 size={14} className="animate-spin" />}
                    {editing ? "Save Changes" : "Add"}
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
