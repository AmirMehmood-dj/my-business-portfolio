"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, X, Loader2 } from "lucide-react";
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
    <div className="testimonial-card relative p-6 bg-white rounded-2xl border border-[#E2E8F0] flex-shrink-0 mx-3 flex flex-col">
      <Quote size={32} className="text-[#EFF6FF] absolute top-4 right-4 fill-[#EFF6FF]" />

      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star key={j} size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
        ))}
      </div>

      <p className="text-sm text-[#475569] leading-relaxed flex-1">
        &ldquo;{t.feedback}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-4 mt-6 border-t border-[#F1F5F9]">
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
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", feedback: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data && data.length > 0) setTestimonials(data); });
  }, []);

  async function handleSubmit() {
    if (!form.name.trim() || !form.feedback.trim()) return;
    setSubmitting(true);
    const res = await fetch("/api/testimonials/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (res.ok) {
      setSubmitted(true);
      setForm({ name: "", feedback: "", rating: 5 });
    }
  }

  function closeModal() {
    setShowModal(false);
    setSubmitted(false);
    setForm({ name: "", feedback: "", rating: 5 });
  }

  // Use real reviews only if there are enough to fill the slider without obvious repetition
  const useSlider = testimonials.length === 0 || testimonials.length >= 4;
  const displayed = useSlider
    ? (testimonials.length > 0 ? testimonials : defaultTestimonials)
    : testimonials;
  const repeated = displayed.length >= 6 ? displayed : Array.from({ length: Math.ceil(6 / displayed.length) }, () => displayed).flat();
  const doubled = [...repeated, ...repeated];

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
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-full hover:bg-[#1D4ED8] transition-all duration-200 shadow-md shadow-blue-200"
          >
            Write a Review
          </button>
        </motion.div>

        {useSlider ? (
          <>
            <div className="overflow-hidden testimonial-slider-wrap">
              <div className="flex" style={{ animation: "testimonial-scroll 30s linear infinite" }}>
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
              .testimonial-slider-wrap { container-type: inline-size; }
              .testimonial-card { width: calc(33.333cqi - 1.5rem); align-self: stretch; }
              .testimonial-slider-wrap > div { align-items: stretch; }
            `}</style>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {displayed.map((t) => (
              <div key={t.id} className="relative p-6 bg-white rounded-2xl border border-[#E2E8F0] flex flex-col">
                <Quote size={32} className="text-[#EFF6FF] absolute top-4 right-4 fill-[#EFF6FF]" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-sm text-[#475569] leading-relaxed flex-1">&ldquo;{t.feedback}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 mt-6 border-t border-[#F1F5F9]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-white">{t.name.charAt(0)}</span>
                  </div>
                  <p className="font-semibold text-sm text-[#0F172A]">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-[#0F172A] text-lg">Write a Review</h2>
                  <button onClick={closeModal} className="p-1.5 rounded-lg text-[#94A3B8] hover:bg-[#F8FAFC]"><X size={18} /></button>
                </div>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-[#DCFCE7] flex items-center justify-center mx-auto mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <p className="font-semibold text-[#0F172A] mb-1">Thank you for your review!</p>
                    <p className="text-sm text-[#64748B]">It will appear after approval.</p>
                    <button onClick={closeModal} className="mt-6 px-6 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-full hover:bg-[#1D4ED8] transition-colors">Close</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Your Name</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <button key={r} onClick={() => setForm((f) => ({ ...f, rating: r }))} className="p-1">
                            <Star size={24} className={r <= form.rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-[#E2E8F0] fill-[#E2E8F0]"} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Your Review</label>
                      <textarea
                        value={form.feedback}
                        onChange={(e) => setForm((f) => ({ ...f, feedback: e.target.value }))}
                        rows={4}
                        placeholder="Share your experience..."
                        className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || !form.name.trim() || !form.feedback.trim()}
                      className="w-full py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-full hover:bg-[#1D4ED8] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {submitting && <Loader2 size={14} className="animate-spin" />}
                      Submit Review
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
