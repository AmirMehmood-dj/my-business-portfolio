"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Server, Wrench, Sparkles } from "lucide-react";
import type { Skill } from "@/lib/types";

const categories = [
  { key: "Frontend", icon: Monitor,    label: "Frontend Development", span: "lg:col-span-2" },
  { key: "Backend",  icon: Server,     label: "Backend & Database",   span: "lg:col-span-1" },
  { key: "Mobile",   icon: Smartphone, label: "Mobile Development",   span: "lg:col-span-1" },
  { key: "AI",       icon: Sparkles,   label: "AI & Automation",      span: "lg:col-span-1" },
  { key: "Tools",    icon: Wrench,     label: "Dev Tools",            span: "lg:col-span-1" },
];

export default function Skills() {
  const [skillsData, setSkillsData] = useState<Skill[]>([]);

  useEffect(() => {
    fetch("/api/admin/skills")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setSkillsData(data); });
  }, []);

  const grouped: Record<string, Skill[]> = {};
  for (const s of skillsData) {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  }

  return (
    <section id="skills" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium text-[#2563EB] uppercase tracking-widest mb-3">
            Skills & Technologies
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
            My technical toolkit
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto">
            Technologies I use to deliver exceptional products — from websites
            and apps to AI integrations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(({ key, icon: Icon, label, span }, i) => {
            const items = grouped[key] ?? [];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`group bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:border-[#BFDBFE] hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-300 ${span}`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] group-hover:bg-[#2563EB] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Icon size={18} className="text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">{label}</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{items.length} technologies</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#F1F5F9] mb-5" />

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1.5 text-xs font-medium text-[#374151] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg hover:bg-[#EFF6FF] hover:border-[#BFDBFE] hover:text-[#2563EB] transition-all duration-150 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {items.length === 0 && (
                    <span className="text-xs text-[#CBD5E1]">No skills added yet</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
