"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  "Next.js": "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  CSS: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
  AI: "bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]",
};

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-sm font-medium text-[#2563EB] uppercase tracking-widest mb-3">
              Blog
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
              Latest articles
            </h2>
            <p className="mt-2 text-[#64748B]">
              Thoughts on frontend, mobile dev, and AI engineering.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2563EB] hover:gap-3 transition-all duration-200 flex-shrink-0"
          >
            View all posts
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: "0 16px 32px -8px rgba(0,0,0,0.07)" }}
              className="group bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] overflow-hidden hover:border-[#BFDBFE] transition-colors duration-200"
            >
              {/* Thumbnail placeholder */}
              <div className="relative h-44 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] flex items-center justify-center overflow-hidden">
                <BookOpen size={36} className="text-[#BFDBFE]" />
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-lg border ${
                    categoryColors[post.category] ||
                    "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
                  }`}
                >
                  {post.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-[#94A3B8] mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.read_time} min read
                  </span>
                  <span>·</span>
                  <span>{formatDate(post.published_at)}</span>
                </div>

                <h3 className="font-semibold text-[#0F172A] leading-snug mb-2 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:gap-2.5 transition-all duration-200"
                >
                  Read more
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
