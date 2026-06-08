"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Search,
  PencilRuler,
  Cpu,
  CheckCircle2,
} from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Frontend Expertise",
    desc: "5+ years building production React and Next.js applications with TypeScript, focusing on performance and developer experience.",
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

const values = [
  "Clean, maintainable code",
  "Performance-first mindset",
  "Attention to UI/UX details",
  "On-time delivery",
  "Clear communication",
  "Continuous learning",
];

export default function About() {
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

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#64748B] leading-relaxed mb-6">
              I&apos;m <strong className="text-[#0F172A]">Amir Mehar</strong>, a
              Frontend Engineer and Mobile Developer with over 5 years of
              experience crafting high-performance applications. I&apos;ve
              worked with startups, agencies, and enterprise clients across
              multiple industries.
            </p>
            <p className="text-[#64748B] leading-relaxed mb-8">
              My approach combines strong engineering fundamentals with a sharp
              eye for design. Whether it&apos;s a SaaS dashboard, an e-commerce
              platform, or a React Native app, I care deeply about the end
              user&apos;s experience and the maintainability of the codebase.
            </p>

            <p className="text-sm font-semibold text-[#0F172A] mb-4 uppercase tracking-wide">
              What I bring to every project
            </p>
            <div className="grid grid-cols-2 gap-3">
              {values.map((v) => (
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -2 }}
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
