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
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#2563EB] uppercase tracking-widest mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
            What I offer
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto">
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
                className="group relative p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#2563EB] hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 cursor-default"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center mb-5 group-hover:bg-[#2563EB] transition-colors duration-300">
                  <Icon
                    size={22}
                    className="text-[#2563EB] group-hover:text-white transition-colors duration-300"
                  />
                </div>

                <h3 className="font-semibold text-[#0F172A] text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-5">
                  {(service.features ?? []).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#64748B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:gap-2.5 transition-all duration-200"
                >
                  Get a quote
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
