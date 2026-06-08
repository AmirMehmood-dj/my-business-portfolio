"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, MessageCircle, Link, Send, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  budget: z.string().min(1, "Please select a budget"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const budgetOptions = [
  "< $500",
  "$500 – $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Let's discuss",
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "amir@example.com",
    href: "mailto:amir@example.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+92 300 1234567",
    href: "https://wa.me/923001234567",
  },
  {
    icon: Link,
    label: "LinkedIn",
    value: "linkedin.com/in/amirmehar",
    href: "https://linkedin.com/in/amirmehar",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setLoading(true);
    setError(null);
    try {
      const { error: supabaseError } = await supabase
        .from("contacts")
        .insert([{ ...data, status: "new" }]);
      if (supabaseError) throw supabaseError;
      setSubmitted(true);
      reset();
    } catch {
      setError("Something went wrong. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#2563EB] uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Send me a
            message and I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-semibold text-[#0F172A] mb-1">
                Get in touch
              </h3>
              <p className="text-sm text-[#64748B]">
                Available for freelance projects, full-time roles, and
                consulting engagements.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center group-hover:bg-[#2563EB] transition-colors">
                    <Icon
                      size={18}
                      className="text-[#2563EB] group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8]">{label}</p>
                    <p className="text-sm font-medium text-[#0F172A]">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability card */}
            <div className="p-5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-sm font-semibold text-[#0F172A]">
                  Currently available
                </span>
              </div>
              <p className="text-sm text-[#64748B]">
                Open to new projects starting{" "}
                <strong className="text-[#0F172A]">immediately</strong>. Response time
                within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-[#E2E8F0] text-center">
                <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-[#16A34A]" />
                </div>
                <h3 className="font-semibold text-[#0F172A] text-xl mb-2">
                  Message sent!
                </h3>
                <p className="text-[#64748B] mb-6">
                  Thank you for reaching out. I&apos;ll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 text-sm font-medium bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-5"
              >
                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name", { required: "Name is required", minLength: { value: 2, message: "Min 2 chars" } })}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all placeholder:text-[#CBD5E1]"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all placeholder:text-[#CBD5E1]"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Budget <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("budget", { required: "Budget is required" })}
                    className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all bg-white text-[#0F172A]"
                  >
                    <option value="">Select budget range</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <p className="mt-1 text-xs text-red-500">{errors.budget.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("message", { required: "Message is required", minLength: { value: 20, message: "Min 20 characters" } })}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all resize-none placeholder:text-[#CBD5E1]"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                {error && (
                  <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#2563EB] text-white font-medium rounded-xl hover:bg-[#1D4ED8] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-200"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
