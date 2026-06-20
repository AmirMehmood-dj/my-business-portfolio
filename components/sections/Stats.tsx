"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 3,  suffix: "+", label: "Years of Experience",   desc: "Building real-world products" },
  { value: 30, suffix: "+", label: "Projects Delivered",    desc: "Across web, mobile & AI" },
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
    <section className="bg-white border-y border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-center hover:border-[#BFDBFE] hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 group"
            >
              <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1.5 text-sm sm:text-base font-semibold text-[#0F172A]">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-[#94A3B8] hidden sm:block">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
