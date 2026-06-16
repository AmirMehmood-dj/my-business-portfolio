"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Save } from "lucide-react";
import type { Service } from "@/lib/types";

const ICONS = ["Globe", "Smartphone", "Palette", "TrendingUp", "Cpu", "Code2", "Layers", "Zap"];
const inputCls = "w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all";
const labelCls = "block text-sm font-medium text-[#0F172A] mb-1.5";

const empty: Omit<Service, "id" | "created_at"> = { title: "", description: "", icon: "Globe", features: [], price: "", order_index: 0 };

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: Service | null }>({ open: false, editing: null });
  const [form, setForm] = useState(empty);
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchServices(); }, []);

  async function fetchServices() {
    const res = await fetch("/api/admin/services");
    if (res.ok) setServices(await res.json());
    setLoading(false);
  }

  function openAdd() {
    setForm({ ...empty, order_index: services.length + 1 });
    setFeaturesText("");
    setModal({ open: true, editing: null });
  }

  function openEdit(s: Service) {
    setForm({ title: s.title, description: s.description, icon: s.icon, features: s.features, price: s.price ?? "", order_index: s.order_index });
    setFeaturesText((s.features ?? []).join("\n"));
    setModal({ open: true, editing: s });
  }

  async function save() {
    setSaving(true);
    const payload = { ...form, features: featuresText.split("\n").map(f => f.trim()).filter(Boolean) };
    if (modal.editing) {
      const res = await fetch(`/api/admin/services/${modal.editing.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (res.ok) {
        const updated = await res.json();
        setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
      }
    } else {
      const res = await fetch("/api/admin/services", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (res.ok) { const created = await res.json(); setServices(prev => [...prev, created]); }
    }
    setSaving(false);
    setModal({ open: false, editing: null });
  }

  async function deleteService(id: string) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    setServices(prev => prev.filter(s => s.id !== id));
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Services</h1>
          <p className="text-sm text-[#64748B] mt-1">{services.length} services</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors">
          <Plus size={15} /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[#94A3B8]" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-[#0F172A]">{s.title}</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Icon: {s.icon}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => deleteService(s.id)} className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#64748B] line-clamp-2 mb-3">{s.description}</p>
              <div className="flex flex-wrap gap-1">
                {(s.features ?? []).map(f => (
                  <span key={f} className="px-2 py-0.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded text-[#64748B]">{f}</span>
                ))}
              </div>
            </div>
          ))}
          {services.length === 0 && <p className="col-span-3 text-center text-[#94A3B8] text-sm py-12">No services yet.</p>}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#F1F5F9]">
              <h2 className="font-semibold text-[#0F172A]">{modal.editing ? "Edit Service" : "Add Service"}</h2>
              <button onClick={() => setModal({ open: false, editing: null })} className="p-1.5 rounded-lg text-[#94A3B8] hover:bg-[#F8FAFC]"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className={labelCls}>Title</label>
                <input className={inputCls} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea className={inputCls} rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Icon</label>
                <select className={inputCls} value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}>
                  {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Features <span className="text-[#94A3B8] font-normal">(one per line)</span></label>
                <textarea className={inputCls} rows={5} value={featuresText} onChange={e => setFeaturesText(e.target.value)} placeholder={"Feature 1\nFeature 2\n..."} />
              </div>
              <div>
                <label className={labelCls}>Price Range <span className="text-[#94A3B8] font-normal">(e.g. Starting $300)</span></label>
                <input className={inputCls} value={form.price ?? ""} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Starting $300" />
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
