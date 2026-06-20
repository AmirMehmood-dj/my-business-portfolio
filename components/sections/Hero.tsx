"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import Image from "next/image";
import type { HeroSettings } from "@/lib/types";

type SocialSettings = { github: string; linkedin: string; email: string; whatsapp: string };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const roles = [
  "Website Developer",
  "Mobile App Developer",
  "React & Next.js Expert",
  "AI Prompt Engineer",
  "Full Stack Developer",
];

const techStack = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Node.js", color: "#4ade80" },
  { name: "React Native", color: "#a78bfa" },
  { name: "Tailwind", color: "#38bdf8" },
];

const defaultHero: HeroSettings = {
  name: "Aamir Mehmood",
  role: "Website & Application Developer · AI Prompt Engineer",
  tagline: "I build fast, scalable, and modern web & mobile applications that convert visitors into clients.",
  available: true,
};

const defaultSocial: SocialSettings = {
  github: "https://github.com/AmirMehmood-dj",
  linkedin: "https://www.linkedin.com/in/amirmehmood0325/",
  email: "meharamir985@gmail.com",
  whatsapp: "923018659791",
};

function TypingEffect() {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    if (!isDeleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(isDeleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
      }, isDeleting ? 40 : 80);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, isDeleting, roleIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#A78BFA]">
      {displayed}<span className="animate-pulse text-[#60A5FA]">|</span>
    </span>
  );
}

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const [hero, setHero] = useState<HeroSettings>(defaultHero);
  const [social, setSocial] = useState<SocialSettings>(defaultSocial);

  useEffect(() => {
    fetch("/api/admin/settings/hero")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setHero(data); });
    fetch("/api/admin/settings/social")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setSocial(data); });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-[#040B1A]">

      {/* Background glow blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[#1E3A8A] opacity-20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[450px] h-[450px] rounded-full bg-[#4C1D95] opacity-20 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#1E40AF] opacity-10 blur-[100px] pointer-events-none" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #60A5FA 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">

          {/* ── Left content ── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Available badge */}
            {hero.available && (
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1E40AF] bg-[#1E3A8A]/30 text-[#93C5FD] text-sm font-medium mb-6 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                Available for Work
              </motion.div>
            )}

            {/* Name */}
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            >
              <span className="text-white">Hi, I&apos;m </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#A78BFA]">
                {hero.name}
              </span>
            </motion.h1>

            {/* Typing role */}
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="mt-4 text-lg sm:text-xl font-medium text-[#94A3B8] min-h-[1.75rem]"
            >
              I&apos;m a <TypingEffect />
            </motion.p>

            {/* Tagline */}
            <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="mt-5 text-base sm:text-lg text-[#64748B] max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {hero.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="mt-6 lg:mt-8 w-full"
            >
              {/* Mobile layout */}
              <div className="flex flex-col gap-3 sm:hidden">
                <a href="#contact"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold rounded-full hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-900/40"
                >
                  Hire Me <ArrowRight size={16} />
                </a>
                <div className="flex gap-3">
                  <a href="#projects"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
                  >
                    View Projects
                  </a>
                  <a href="/cv.pdf" download
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-[#94A3B8] font-medium rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200 backdrop-blur-sm"
                  >
                    <Download size={16} /> CV
                  </a>
                </div>
              </div>
              {/* Desktop layout */}
              <div className="hidden sm:flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold rounded-full hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-900/40 hover:-translate-y-0.5"
                >
                  Hire Me <ArrowRight size={16} />
                </a>
                <a href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
                >
                  View Projects
                </a>
                <a href="/cv.pdf" download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-[#94A3B8] font-medium rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
                >
                  <Download size={16} /> Download CV
                </a>
              </div>
            </motion.div>

            {/* Tech stack */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 hidden sm:block">
              <p className="text-xs text-[#475569] uppercase tracking-widest mb-3 text-center lg:text-left">Tech Stack</p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {techStack.map((tech) => (
                  <span key={tech.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 backdrop-blur-sm"
                    style={{ color: tech.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Profile image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex-shrink-0 order-first lg:order-none"
          >
            {/* Glow behind photo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] opacity-30 blur-3xl scale-110 pointer-events-none" />

            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[340px] lg:h-[340px]">
              {/* Spinning ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#3B82F6]/40 animate-[spin_25s_linear_infinite]" />
              {/* Second ring */}
              <div className="absolute inset-3 rounded-full border border-[#7C3AED]/20" />

              {/* Photo circle */}
              <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-[#3B82F6]/30 shadow-2xl shadow-blue-900/50">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] to-[#4C1D95]" />
                {imgError ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white select-none">AM</span>
                  </div>
                ) : (
                  <Image src="/profile.jpg" alt={hero.name} fill className="object-cover" onError={() => setImgError(true)} priority />
                )}
              </div>

              {/* Floating badge — React */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 sm:-right-4 bg-[#0F172A] border border-[#1E3A8A] rounded-xl px-3 py-1.5 shadow-lg text-xs font-semibold text-white backdrop-blur-sm"
              >
                ⚛️ React
              </motion.div>

              {/* Floating badge — Next.js */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-2 -left-2 sm:-left-4 bg-white text-[#0F172A] rounded-xl px-3 py-1.5 shadow-lg text-xs font-semibold"
              >
                Next.js ▲
              </motion.div>

              {/* Floating badge — projects */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-4 sm:-right-12 -translate-y-1/2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-xl px-3 py-1.5 shadow-lg text-xs font-semibold text-white hidden sm:block"
              >
                <Sparkles size={10} className="inline mr-1" />
                20+ Projects
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 hidden sm:flex"
      >
        <span className="text-xs text-[#475569]">Scroll down</span>
        <div className="w-5 h-8 border-2 border-[#334155] rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"
          />
        </div>
      </motion.div>
    </section>
  );
}
