import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimateIn from "@/components/ui/AnimateIn";
import { StaggerList, StaggerItem } from "@/components/ui/StaggerList";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on React, Next.js, TypeScript, mobile development, and AI engineering by Aamir Mehmood.",
};

const categoryColors: Record<string, string> = {
  "Next.js": "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  CSS: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
  AI: "bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]",
};

async function getPosts(): Promise<BlogPost[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .order("published_at", { ascending: false });
  return data ?? [];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn delay={0.05} direction="up" className="mb-12">
            <p className="text-sm font-medium text-[#2563EB] uppercase tracking-widest mb-3">
              Blog
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
              Articles &amp; Insights
            </h1>
            <p className="mt-3 text-[#64748B]">
              Thoughts on frontend development, mobile, and AI engineering.
            </p>
          </AnimateIn>

          {posts.length === 0 ? (
            <p className="text-center text-[#94A3B8] py-20">No posts yet.</p>
          ) : (
            <StaggerList delay={0.15} className="space-y-6">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <article className="group flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#BFDBFE] hover:shadow-lg transition-all duration-300">
                    <div className="w-full sm:w-48 h-36 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <BookOpen size={28} className="text-[#BFDBFE]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${
                            categoryColors[post.category] ||
                            "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
                          }`}
                        >
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
                          <Clock size={11} />
                          {post.read_time} min read
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          {formatDate(post.published_at)}
                        </span>
                      </div>

                      <h2 className="font-semibold text-[#0F172A] text-lg leading-snug mb-2 group-hover:text-[#2563EB] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:gap-3 transition-all duration-200"
                      >
                        Read article
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerList>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
