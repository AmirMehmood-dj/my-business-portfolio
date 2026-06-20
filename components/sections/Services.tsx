"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, TrendingUp, Cpu, Code2, Layers, Zap, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Cpu,
  Code2,
  Layers,
  Zap,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/admin/services")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setServices(data); });
  }, []);

  return (
    <section id="services" className="py-24 bg-[#040B1A] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#1E3A8A] opacity-10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#4C1D95] opacity-10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#60A5FA] uppercase tracking-widest mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            What I offer
          </h2>
          <p className="mt-4 text-[#94A3B8] max-w-xl mx-auto">
            End-to-end development services tailored to your business goals —
            from design implementation to AI-powered features.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#3B82F6]/50 hover:bg-white/10 transition-all duration-300 cursor-default backdrop-blur-sm flex flex-col"
              >
                {/* Gradient border glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563EB]/0 to-[#7C3AED]/0 group-hover:from-[#2563EB]/10 group-hover:to-[#7C3AED]/10 transition-all duration-300 pointer-events-none" />

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/50 flex items-center justify-center mb-5 group-hover:bg-[#2563EB] transition-colors duration-300">
                  <Icon size={22} className="text-[#60A5FA] group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="font-semibold text-white text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-5 flex-1">
                  {(service.features ?? []).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#64748B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    sessionStorage.setItem("selectedService", JSON.stringify({
                      title: service.title,
                      description: service.description,
                      price: service.price ?? "",
                    }));
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-sm font-semibold rounded-full hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-900/30 hover:-translate-y-0.5 cursor-pointer"
                >
                  Let&apos;s Talk
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
