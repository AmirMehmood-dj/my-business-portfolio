"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Search,
  PencilRuler,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import type { AboutSettings } from "@/lib/types";

const highlights = [
  {
    icon: Code2,
    title: "Web & App Development",
    desc: "3+ years building production websites and applications with React, Next.js, Node.js and TypeScript, focusing on performance and scalability.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    desc: "Cross-platform mobile apps with React Native & Expo, delivering native-like performance on iOS and Android.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    desc: "Technical SEO, Core Web Vitals, schema markup, and server-side rendering strategies that rank and convert.",
  },
  {
    icon: PencilRuler,
    title: "Figma to Code",
    desc: "Pixel-perfect implementation of complex Figma designs with meticulous attention to spacing, typography, and interaction design.",
  },
  {
    icon: Cpu,
    title: "AI Prompt Engineering",
    desc: "Designing effective AI workflows and prompts to integrate intelligent features into modern applications.",
  },
];

const defaultAbout: AboutSettings = {
  bio1: "I'm Aamir Mehmood, a Website & Application Developer with over 3 years of experience crafting high-performance applications. I've worked with startups, agencies, and enterprise clients across multiple industries.",
  bio2: "My approach combines strong engineering fundamentals with a sharp eye for design. Whether it's a SaaS dashboard, an e-commerce platform, or a React Native app, I care deeply about the end user's experience and the maintainability of the codebase.",
  values: [
    "Clean, maintainable code",
    "Performance-first mindset",
    "Attention to UI/UX details",
    "On-time delivery",
    "Clear communication",
    "Continuous learning",
  ],
};

export default function About() {
  const [about, setAbout] = useState<AboutSettings>(defaultAbout);

  useEffect(() => {
    fetch("/api/admin/settings/about")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setAbout(data); });
  }, []);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#2563EB] uppercase tracking-widest mb-3">
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
            Passionate engineer, pragmatic builder
          </h2>
          <p className="mt-4 text-[#64748B] max-w-2xl mx-auto text-lg">
            I specialize in turning complex requirements into elegant, scalable
            solutions — from pixel-perfect UIs to robust mobile apps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-[#64748B] leading-relaxed mb-6">{about.bio1}</p>
            <p className="text-[#64748B] leading-relaxed mb-8">{about.bio2}</p>

            <p className="text-sm font-semibold text-[#0F172A] mb-4 uppercase tracking-wide">
              What I bring to every project
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(about.values ?? []).map((v) => (
                <div key={v} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#2563EB] flex-shrink-0" />
                  <span className="text-sm text-[#64748B]">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`p-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#BFDBFE] hover:bg-[#EFF6FF] transition-colors group ${
                  i === 4 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center mb-3 group-hover:bg-[#DBEAFE] transition-colors">
                  <item.icon size={20} className="text-[#2563EB]" />
                </div>
                <h3 className="font-semibold text-[#0F172A] mb-1 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
