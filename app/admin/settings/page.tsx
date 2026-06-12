"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import type { HeroSettings, AboutSettings, StatItem } from "@/lib/types";

const tabs = ["Hero", "About", "Stats", "Social"] as const;
type Tab = typeof tabs[number];

type SocialSettings = {
  github: string;
  linkedin: string;
  email: string;
  whatsapp: string;
};

const inputCls = "w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all";
const labelCls = "block text-sm font-medium text-[#0F172A] mb-1.5";

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<Tab>("Hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [hero, setHero] = useState<HeroSettings>({ name: "", role: "", tagline: "", available: true });
  const [about, setAbout] = useState<AboutSettings>({ bio1: "", bio2: "", values: [] });
  const [stats, setStats] = useState<StatItem[]>([]);
  const [social, setSocial] = useState<SocialSettings>({ github: "", linkedin: "", email: "", whatsapp: "" });
  const [valuesText, setValuesText] = useState("");

  useEffect(() => {
    async function load() {
      const [h, a, s, so] = await Promise.all([
        fetch("/api/admin/settings/hero").then(r => r.json()),
        fetch("/api/admin/settings/about").then(r => r.json()),
        fetch("/api/admin/settings/stats").then(r => r.json()),
        fetch("/api/admin/settings/social").then(r => r.json()),
      ]);
      if (h) setHero(h);
      if (a) { setAbout(a); setValuesText((a.values ?? []).join("\n")); }
      if (s) setStats(s);
      if (so) setSocial(so);
      setLoading(false);
    }
    load();
  }, []);

  async function save() {
    setSaving(true);
    const aboutToSave = { ...about, values: valuesText.split("\n").map(v => v.trim()).filter(Boolean) };
    await Promise.all([
      fetch("/api/admin/settings/hero", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(hero) }),
      fetch("/api/admin/settings/about", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(aboutToSave) }),
      fetch("/api/admin/settings/stats", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(stats) }),
      fetch("/api/admin/settings/social", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(social) }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return (
    <div className="p-8 flex justify-center py-20">
      <Loader2 size={24} className="animate-spin text-[#94A3B8]" />
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Site Settings</h1>
          <p className="text-sm text-[#64748B] mt-1">Edit hero, about, stats, and social links</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors disabled:opacity-70"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-1 mb-8 w-fit flex-wrap">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${tab === t ? "bg-white text-[#2563EB] shadow-sm border border-[#E2E8F0]" : "text-[#64748B] hover:text-[#0F172A]"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Hero Tab */}
      {tab === "Hero" && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-5 max-w-2xl">
          <div>
            <label className={labelCls}>Name</label>
            <input className={inputCls} value={hero.name} onChange={e => setHero({ ...hero, name: e.target.value })} placeholder="Aamir Mehmood" />
          </div>
          <div>
            <label className={labelCls}>Role / Subtitle</label>
            <input className={inputCls} value={hero.role} onChange={e => setHero({ ...hero, role: e.target.value })} placeholder="Website & Application Developer · AI Prompt Engineer" />
          </div>
          <div>
            <label className={labelCls}>Tagline</label>
            <textarea className={inputCls} rows={3} value={hero.tagline} onChange={e => setHero({ ...hero, tagline: e.target.value })} placeholder="I build fast, scalable..." />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHero({ ...hero, available: !hero.available })}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${hero.available ? "bg-[#22C55E]" : "bg-[#CBD5E1]"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${hero.available ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
            <label className="text-sm font-medium text-[#0F172A]">Available for Work</label>
          </div>
        </div>
      )}

      {/* About Tab */}
      {tab === "About" && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-5 max-w-2xl">
          <div>
            <label className={labelCls}>Bio Paragraph 1</label>
            <textarea className={inputCls} rows={4} value={about.bio1} onChange={e => setAbout({ ...about, bio1: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Bio Paragraph 2</label>
            <textarea className={inputCls} rows={4} value={about.bio2} onChange={e => setAbout({ ...about, bio2: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Values <span className="text-[#94A3B8] font-normal">(one per line)</span></label>
            <textarea className={inputCls} rows={7} value={valuesText} onChange={e => setValuesText(e.target.value)} placeholder={"Clean, maintainable code\nPerformance-first mindset\n..."} />
          </div>
        </div>
      )}

      {/* Stats Tab */}
      {tab === "Stats" && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-5">
            {stats.map((s, i) => (
              <div key={i} className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <div className="mb-3">
                  <label className={labelCls}>Value</label>
                  <input className={inputCls} value={s.value} onChange={e => setStats(stats.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} placeholder="50+" />
                </div>
                <div>
                  <label className={labelCls}>Label</label>
                  <input className={inputCls} value={s.label} onChange={e => setStats(stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} placeholder="Projects Completed" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Tab */}
      {tab === "Social" && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-5 max-w-2xl">
          <p className="text-sm text-[#64748B] -mt-1">These links appear in the Hero section and Footer. Leave GitHub empty to hide it.</p>
          <div>
            <label className={labelCls}>GitHub URL</label>
            <input className={inputCls} value={social.github} onChange={e => setSocial({ ...social, github: e.target.value })} placeholder="https://github.com/your-username (leave empty to hide)" />
          </div>
          <div>
            <label className={labelCls}>LinkedIn URL</label>
            <input className={inputCls} value={social.linkedin} onChange={e => setSocial({ ...social, linkedin: e.target.value })} placeholder="https://linkedin.com/in/your-profile" />
          </div>
          <div>
            <label className={labelCls}>Email Address</label>
            <input className={inputCls} type="email" value={social.email} onChange={e => setSocial({ ...social, email: e.target.value })} placeholder="your@email.com" />
          </div>
          <div>
            <label className={labelCls}>WhatsApp Number <span className="text-[#94A3B8] font-normal">(with country code, no + or spaces)</span></label>
            <input className={inputCls} value={social.whatsapp} onChange={e => setSocial({ ...social, whatsapp: e.target.value })} placeholder="923018659791" />
          </div>
        </div>
      )}
    </div>
  );
}
