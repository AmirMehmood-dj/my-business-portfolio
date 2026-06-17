"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923018659791"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-semibold rounded-full shadow-lg shadow-green-300 hover:shadow-xl hover:shadow-green-300 hover:-translate-y-1 transition-all duration-300"
    >
      <MessageCircle size={20} fill="white" />
      WhatsApp
    </a>
  );
}
