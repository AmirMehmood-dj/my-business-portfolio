"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Code2, Link, MessageCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-white to-white pointer-events-none" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230F172A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              Available for Work
            </motion.div>

            {/* Heading */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight tracking-tight"
            >
              Hi, I&apos;m{" "}
              <span className="text-[#2563EB]">Amir Mehar</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 text-lg sm:text-xl font-medium text-[#64748B]"
            >
              Frontend Engineer · Mobile Developer · AI Prompt Engineer
            </motion.p>

            {/* Tagline */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-5 text-base sm:text-lg text-[#64748B] max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              I build fast, scalable, and modern web &amp; mobile applications
              that convert visitors into clients.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white font-medium rounded-xl hover:bg-[#1D4ED8] transition-all duration-200 shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5"
              >
                Hire Me
                <ArrowRight size={16} />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0F172A] font-medium rounded-xl border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-200 hover:-translate-y-0.5"
              >
                View Projects
              </a>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F8FAFC] text-[#64748B] font-medium rounded-xl border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download size={16} />
                Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="https://github.com/amirmehar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] transition-colors"
              >
                <Code2 size={16} />
                GitHub
              </a>
              <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
              <a
                href="https://linkedin.com/in/amirmehar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] transition-colors"
              >
                <Link size={16} />
                LinkedIn
              </a>
              <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Profile image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#BFDBFE] animate-[spin_30s_linear_infinite]" />
              {/* Outer glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]" />
              {/* Avatar container */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center overflow-hidden shadow-2xl shadow-blue-200">
                <span className="text-6xl font-bold text-white select-none">AM</span>
              </div>
              {/* Badge: React */}
              <div className="absolute -top-2 -right-2 bg-white border border-[#E2E8F0] rounded-xl px-3 py-1.5 shadow-md text-xs font-semibold text-[#0F172A]">
                React ⚛️
              </div>
              {/* Badge: Next.js */}
              <div className="absolute -bottom-2 -left-2 bg-[#0F172A] rounded-xl px-3 py-1.5 shadow-md text-xs font-semibold text-white">
                Next.js
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-xs text-[#94A3B8]">Scroll down</span>
        <div className="w-5 h-8 border-2 border-[#CBD5E1] rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"
          />
        </div>
      </motion.div>
    </section>
  );
}
