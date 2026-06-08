"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Frontend: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
  Mobile: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  Backend: "bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]",
  Tools: "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
  AI: "bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]",
};

const categoryIcons: Record<string, string> = {
  Frontend: "⚛️",
  Mobile: "📱",
  Backend: "🗄️",
  Tools: "🛠️",
  AI: "🤖",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#2563EB] uppercase tracking-widest mb-3">
            Skills & Technologies
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
            My technical toolkit
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto">
            Technologies I use to deliver exceptional products — from frontend
            to mobile to AI integrations.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.4 }}
              whileHover={{ y: -3, boxShadow: "0 16px 32px -8px rgba(0,0,0,0.07)" }}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 transition-colors duration-200"
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">{categoryIcons[category]}</span>
                <h3 className="font-semibold text-[#0F172A]">{category}</h3>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: categoryIndex * 0.1 + i * 0.05,
                      duration: 0.3,
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${categoryColors[category]}`}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
