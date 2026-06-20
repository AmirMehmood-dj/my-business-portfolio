"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Testimonial } from "@/lib/types";

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Founder",
    company: "BrightSpace Agency",
    feedback: "Aamir delivered our website ahead of schedule and it exceeded all expectations. The attention to detail, clean code, and responsiveness across all devices was outstanding. Highly recommend him for any web project.",
    rating: 5,
    created_at: "",
  },
  {
    id: "2",
    name: "James Carter",
    role: "CEO",
    company: "TechFlow Solutions",
    feedback: "Working with Aamir was a seamless experience from start to finish. He understood our requirements perfectly and built a robust web application with excellent UI. Professional, communicative, and highly skilled.",
    rating: 5,
    created_at: "",
  },
  {
    id: "3",
    name: "Aisha Rahman",
    role: "Marketing Director",
    company: "Nova Retail",
    feedback: "Aamir transformed our outdated website into a modern, high-performing platform. Our conversion rate improved significantly after launch. His expertise in React and Next.js is truly impressive.",
    rating: 5,
    created_at: "",
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Product Manager",
    company: "HealthSync App",
    feedback: "The mobile app Aamir built for us using React Native is exactly what we envisioned. Smooth performance on both iOS and Android, clean design, and delivered on time. Will definitely work with him again.",
    rating: 5,
    created_at: "",
  },
  {
    id: "5",
    name: "Omar Khalid",
    role: "Owner",
    company: "Gulf Trading Co.",
    feedback: "Aamir built our e-commerce platform from scratch and the results speak for themselves. Great communication throughout the project and he went above and beyond to ensure everything worked perfectly.",
    rating: 5,
    created_at: "",
  },
  {
    id: "6",
    name: "Emily Watson",
    role: "CTO",
    company: "StartupLab Inc.",
    feedback: "Exceptional developer. Aamir integrated AI features into our platform flawlessly and the code quality is top-notch. He brings both technical expertise and creative problem-solving to every challenge.",
    rating: 5,
    created_at: "",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="relative p-6 bg-white rounded-2xl border border-[#E2E8F0] w-[calc(33.333vw-24px)] flex-shrink-0 mx-3">
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
        <p className="font-semibold text-sm text-[#0F172A]">{t.name}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data && data.length > 0) setTestimonials(data); });
  }, []);

  const displayed = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const doubled = [...displayed, ...displayed];

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
      </div>

      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            animation: "testimonial-scroll 30s linear infinite",
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes testimonial-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
