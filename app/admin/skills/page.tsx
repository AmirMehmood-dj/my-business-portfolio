"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, X, Loader2, Check, Pencil } from "lucide-react";
import type { Skill } from "@/lib/types";

const CATEGORIES = ["Frontend", "Mobile", "Backend", "Tools", "AI"] as const;
type Cat = typeof CATEGORIES[number];

const inputCls = "w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Cat>("Frontend");
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchSkills(); }, []);
  useEffect(() => { if (editingId) editRef.current?.focus(); }, [editingId]);

  async function fetchSkills() {
    const res = await fetch("/api/admin/skills");
    if (res.ok) setSkills(await res.json());
    setLoading(false);
  }

  async function addSkill() {
    if (!newName.trim()) return;
    setAdding(true);
    const maxOrder = skills.filter(s => s.category === activeTab).length + 1;
    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim(), category: activeTab, order_index: maxOrder }),
    });
    if (res.ok) {
      const data = await res.json();
      setSkills(prev => [...prev, data]);
      setNewName("");
    }
    setAdding(false);
  }

  function startEdit(skill: Skill) {
    setEditingId(skill.id);
    setEditName(skill.name);
  }

  async function saveEdit(id: string) {
    if (!editName.trim()) { setEditingId(null); return; }
    const res = await fetch(`/api/admin/skills/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName.trim() }),
    });
    if (res.ok) {
      const updated = await res.json();
      setSkills(prev => prev.map(s => s.id === id ? updated : s));
    }
    setEditingId(null);
  }

  async function deleteSkill(id: string) {
    await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    setSkills(prev => prev.filter(s => s.id !== id));
  }

  const filtered = skills.filter(s => s.category === activeTab);
  const counts = Object.fromEntries(CATEGORIES.map(c => [c, skills.filter(s => s.category === c).length]));

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F172A]">Skills</h1>
        <p className="text-sm text-[#64748B] mt-1">{skills.length} total skills across {CATEGORIES.length} categories</p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${activeTab === cat ? "bg-[#2563EB] text-white" : "bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]"}`}
          >
            {cat} <span className="ml-1 opacity-70">({counts[cat]})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[#94A3B8]" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          {/* Add form */}
          <div className="flex gap-3 mb-6">
            <input
              className={`${inputCls} flex-1`}
              placeholder={`Add new ${activeTab} skill...`}
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addSkill()}
            />
            <button
              onClick={addSkill}
              disabled={adding || !newName.trim()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors disabled:opacity-60 flex-shrink-0"
            >
              {adding ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
              Add
            </button>
          </div>

          {/* Skills */}
          {filtered.length === 0 ? (
            <p className="text-center text-[#94A3B8] text-sm py-8">No {activeTab} skills yet. Add one above.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filtered.map(skill => (
                <div key={skill.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg group">
                  {editingId === skill.id ? (
                    <>
                      <input
                        ref={editRef}
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") saveEdit(skill.id); if (e.key === "Escape") setEditingId(null); }}
                        className="text-sm font-medium text-[#374151] bg-transparent outline-none border-b border-[#2563EB] w-28 min-w-0"
                      />
                      <button onClick={() => saveEdit(skill.id)} className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors ml-1">
                        <Check size={13} />
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-[#CBD5E1] hover:text-[#94A3B8] transition-colors">
                        <X size={13} />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-[#374151]">{skill.name}</span>
                      <button
                        onClick={() => startEdit(skill)}
                        className="text-[#CBD5E1] hover:text-[#2563EB] transition-colors ml-1 opacity-0 group-hover:opacity-100"
                      >
                        <Pencil size={11} />
                      </button>
                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="text-[#CBD5E1] hover:text-red-500 transition-colors"
                      >
                        <X size={13} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
