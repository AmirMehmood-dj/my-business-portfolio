"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, Clock, X } from "lucide-react";
import { blogPosts as initialPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [showModal, setShowModal] = useState(false);

  function handleDelete(id: string) {
    if (confirm("Delete this post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Blog Posts</h1>
          <p className="text-sm text-[#64748B] mt-1">{posts.length} posts</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors"
          >
            {/* Thumbnail */}
            <div className="w-full sm:w-20 h-14 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-xl flex-shrink-0" />

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-xs font-medium bg-[#EFF6FF] text-[#2563EB] rounded-lg">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
                  <Clock size={10} />
                  {post.read_time} min
                </span>
                <span className="text-xs text-[#94A3B8]">
                  {formatDate(post.published_at)}
                </span>
              </div>
              <h3 className="font-medium text-[#0F172A] line-clamp-1">{post.title}</h3>
              <p className="text-sm text-[#94A3B8] line-clamp-1 mt-0.5">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
              >
                <Eye size={15} />
              </a>
              <button className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#7C3AED] hover:bg-[#F5F3FF] transition-colors">
                <Pencil size={15} />
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl w-full max-w-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-[#0F172A] text-lg">
                    New Blog Post
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1.5 rounded-lg text-[#94A3B8] hover:bg-[#F8FAFC]"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  {["title", "category", "read_time"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5 capitalize">
                        {field.replace("_", " ")}
                      </label>
                      <input
                        placeholder={`Enter ${field.replace("_", " ")}`}
                        className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      Excerpt
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Short summary..."
                      className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[#F1F5F9]">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 text-sm font-medium text-[#64748B] border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 text-sm font-medium bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-colors"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
