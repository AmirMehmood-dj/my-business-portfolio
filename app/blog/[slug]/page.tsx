import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimateIn from "@/components/ui/AnimateIn";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await getSupabase()
    .from("blogs")
    .select("title, excerpt, published_at")
    .eq("slug", slug)
    .single();

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { data: post } = await getSupabase()
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateIn delay={0} direction="left">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#2563EB] transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back to blog
            </Link>
          </AnimateIn>

          <AnimateIn delay={0.08} direction="up">
            <div className="w-full h-64 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
              <BookOpen size={48} className="text-[#BFDBFE]" />
            </div>
          </AnimateIn>

          <AnimateIn delay={0.14} direction="up">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
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
          </AnimateIn>

          <AnimateIn delay={0.18} direction="up">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] leading-tight mb-6">
              {post.title}
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.22} direction="up">
            <div className="flex items-center gap-3 pb-6 border-b border-[#E2E8F0] mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                <span className="text-sm font-semibold text-white">AM</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Aamir Mehmood</p>
                <p className="text-xs text-[#94A3B8]">Website & Application Developer</p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.28} direction="up">
            {post.content ? (
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="text-[#475569] leading-relaxed text-base">
                {post.excerpt}
              </p>
            )}
          </AnimateIn>

        </div>
      </main>
      <Footer />
    </>
  );
}
