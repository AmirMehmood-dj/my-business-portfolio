"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Save, Briefcase, Star, Code } from "lucide-react";
import type { ExperienceItem } from "@/lib/types";

const inputCls = "w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all";
const labelCls = "block text-sm font-medium text-[#0F172A] mb-1.5";

const typeConfig = {
  work:      { icon: Briefcase, label: "Work",      color: "bg-[#EFF6FF] text-[#2563EB]" },
  freelance: { icon: Star,      label: "Freelance", color: "bg-[#F5F3FF] text-[#7C3AED]" },
  project:   { icon: Code,      label: "Project",   color: "bg-[#F0FDF4] text-[#16A34A]" },
};

type FormState = { title: string; company: string; period: string; description: string; type: ExperienceItem["type"]; order_index: number };
const emptyForm: FormState = { title: "", company: "", period: "", description: "", type: "work", order_index: 0 };

export default function AdminExperiencePage() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: ExperienceItem | null }>({ open: false, editing: null });
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const res = await fetch("/api/admin/experience");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  function openAdd() {
    setForm({ ...emptyForm, order_index: items.length + 1 });
    setModal({ open: true, editing: null });
  }

  function openEdit(item: ExperienceItem) {
    setForm({ title: item.title, company: item.company, period: item.period, description: item.description, type: item.type, order_index: item.order_index });
    setModal({ open: true, editing: item });
  }

  async function save() {
    setSaving(true);
    if (modal.editing) {
      const res = await fetch(`/api/admin/experience/${modal.editing.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
      }
    } else {
      const res = await fetch("/api/admin/experience", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      if (res.ok) { const created = await res.json(); setItems(prev => [...prev, created]); }
    }
    setSaving(false);
    setModal({ open: false, editing: null });
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this experience?")) return;
    await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
    setItems(prev => prev.filter(i => i.id !== id));
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Experience</h1>
          <p className="text-sm text-[#64748B] mt-1">{items.length} entries</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors">
          <Plus size={15} /> Add Entry
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[#94A3B8]" /></div>
      ) : (
        <div className="space-y-3">
          {items.map(item => {
            const { icon: Icon, label, color } = typeConfig[item.type] ?? typeConfig.work;
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color.split(" ")[0]}`}>
                    <Icon size={18} className={color.split(" ")[1]} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">{item.title}</p>
                    <p className="text-sm text-[#2563EB]">{item.company}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-lg ${color}`}>{label}</span>
                      <span className="text-xs text-[#94A3B8]">{item.period}</span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-[#94A3B8] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="p-2 rounded-lg text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
          {items.length === 0 && <p className="text-center text-[#94A3B8] text-sm py-12">No experience entries yet.</p>}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#F1F5F9]">
              <h2 className="font-semibold text-[#0F172A]">{modal.editing ? "Edit Experience" : "Add Experience"}</h2>
              <button onClick={() => setModal({ open: false, editing: null })} className="p-1.5 rounded-lg text-[#94A3B8] hover:bg-[#F8FAFC]"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Job Title</label>
                  <input className={inputCls} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Company</label>
                  <input className={inputCls} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Period</label>
                  <input className={inputCls} value={form.period} onChange={e => setForm({ ...form, period: e.target.value })} placeholder="2022 – Present" />
                </div>
                <div>
                  <label className={labelCls}>Type</label>
                  <select className={inputCls} value={form.type} onChange={e => setForm({ ...form, type: e.target.value as ExperienceItem["type"] })}>
                    <option value="work">Work</option>
                    <option value="freelance">Freelance</option>
                    <option value="project">Project</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea className={inputCls} rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Order</label>
                <input type="number" className={inputCls} value={form.order_index} onChange={e => setForm({ ...form, order_index: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="p-5 border-t border-[#F1F5F9] flex gap-3 justify-end">
              <button onClick={() => setModal({ open: false, editing: null })} className="px-4 py-2 text-sm font-medium text-[#64748B] border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] transition-colors">Cancel</button>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors disabled:opacity-70">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
