"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Testimonial } from "@/lib/types";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setTestimonials(data); });
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#2563EB] uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
            What clients say
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto">
            Real feedback from real clients — their success is the best
            testament to my work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="relative p-6 bg-white rounded-2xl border border-[#E2E8F0] hover:shadow-lg hover:border-[#BFDBFE] transition-all duration-300"
            >
              <Quote size={32} className="text-[#EFF6FF] absolute top-4 right-4 fill-[#EFF6FF]" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
                ))}
              </div>

              <p className="text-sm text-[#475569] leading-relaxed mb-6">
                &ldquo;{t.feedback}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-[#F1F5F9]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-white">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0F172A]">{t.name}</p>
                  <p className="text-xs text-[#94A3B8]">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
