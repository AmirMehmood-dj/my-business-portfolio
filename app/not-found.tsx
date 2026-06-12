"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EFF6FF] via-white to-white px-4">
      <div className="text-center max-w-md">
        <div className="relative inline-block mb-8">
          <p className="text-[120px] font-bold text-[#E2E8F0] leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-4xl font-bold text-[#0F172A]">
              Amir<span className="text-[#2563EB]">.</span>
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#0F172A] mb-3">
          Page not found
        </h1>
        <p className="text-[#64748B] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white font-medium rounded-xl hover:bg-[#1D4ED8] transition-all text-sm shadow-md shadow-blue-200"
          >
            <Home size={15} />
            Go Home
          </Link>
          <button
            onClick={() => history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#64748B] font-medium rounded-xl border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] transition-all text-sm"
          >
            <ArrowLeft size={15} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
