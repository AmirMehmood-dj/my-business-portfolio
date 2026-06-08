"use client";

import { motion } from "framer-motion";
import { Briefcase, Code, Star } from "lucide-react";
import { experience } from "@/lib/data";

const typeConfig = {
  work: { icon: Briefcase, color: "text-[#2563EB]", bg: "bg-[#EFF6FF]", badge: "Work" },
  freelance: { icon: Star, color: "text-[#7C3AED]", bg: "bg-[#F5F3FF]", badge: "Freelance" },
  project: { icon: Code, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]", badge: "Project" },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#2563EB] uppercase tracking-widest mb-3">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
            My journey
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto">
            5+ years of building real-world products, from freelance projects to
            full-time engineering roles.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#E2E8F0] hidden sm:block" />

          <div className="space-y-8">
            {experience.map((item, i) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="sm:pl-16 relative"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-5 hidden sm:flex w-12 h-12 rounded-full ${config.bg} items-center justify-center border-4 border-white shadow-sm`}
                  >
                    <Icon size={18} className={config.color} />
                  </div>

                  {/* Card */}
                  <div className="p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#BFDBFE] hover:bg-white transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-semibold text-[#0F172A] text-base">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#2563EB] font-medium">
                          {item.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-lg ${config.bg} ${config.color}`}
                        >
                          {config.badge}
                        </span>
                        <span className="text-xs text-[#94A3B8] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-lg">
                          {item.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
