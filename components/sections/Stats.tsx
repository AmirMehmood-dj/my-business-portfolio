"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 3,  suffix: "+", label: "Years of Experience",   desc: "Building real-world products" },
  { value: 20, suffix: "+", label: "Projects Delivered",    desc: "Across web, mobile & AI" },
  { value: 15, suffix: "+", label: "Happy Clients",         desc: "From startups to enterprises" },
  { value: 100, suffix: "%", label: "Client Satisfaction",  desc: "On-time & on-budget delivery" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="bg-[#040B1A] relative overflow-hidden">
      {/* Divider glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="relative p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center hover:border-[#3B82F6]/40 hover:bg-white/10 transition-all duration-300 group"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563EB]/0 to-[#7C3AED]/0 group-hover:from-[#2563EB]/10 group-hover:to-[#7C3AED]/10 transition-all duration-300 pointer-events-none" />

              <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#A78BFA]">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1.5 text-sm sm:text-base font-semibold text-white">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-[#64748B] hidden sm:block">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
