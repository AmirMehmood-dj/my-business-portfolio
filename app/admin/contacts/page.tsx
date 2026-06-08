"use client";

import { useState } from "react";
import { Mail, MessageSquare, DollarSign, Calendar, Eye, Trash2, Reply } from "lucide-react";

const mockContacts = [
  {
    id: "1",
    name: "James Wilson",
    email: "james.wilson@techcorp.com",
    budget: "$5,000 – $10,000",
    message: "Hi Amir, I need a complete SaaS dashboard built with Next.js and Supabase. We have Figma designs ready and need it delivered within 6 weeks.",
    status: "new" as const,
    created_at: "2024-12-10",
  },
  {
    id: "2",
    name: "Lisa Chen",
    email: "lisa@startupventures.io",
    budget: "$1,000 – $5,000",
    message: "Looking for a React Native developer to build a fitness tracking app. Cross-platform (iOS + Android). Can we schedule a call?",
    status: "read" as const,
    created_at: "2024-12-08",
  },
  {
    id: "3",
    name: "Ahmed Al-Rashid",
    email: "ahmed@dubaidigital.ae",
    budget: "$10,000+",
    message: "We need a complete e-commerce platform with admin panel, mobile app, and AI-powered recommendations. Long-term partnership.",
    status: "replied" as const,
    created_at: "2024-12-05",
  },
  {
    id: "4",
    name: "Sofia Martinez",
    email: "sofia.m@agencyxyz.com",
    budget: "< $500",
    message: "Need help fixing some TypeScript errors and performance issues in our existing Next.js app. Should be a quick task.",
    status: "new" as const,
    created_at: "2024-12-03",
  },
];

const statusConfig = {
  new: { label: "New", color: "bg-[#EFF6FF] text-[#2563EB]" },
  read: { label: "Read", color: "bg-[#F8FAFC] text-[#64748B]" },
  replied: { label: "Replied", color: "bg-[#F0FDF4] text-[#16A34A]" },
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState(mockContacts);
  const [selected, setSelected] = useState<typeof mockContacts[0] | null>(null);

  function updateStatus(id: string, status: "new" | "read" | "replied") {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  }

  function handleDelete(id: string) {
    if (confirm("Delete this contact?")) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  }

  const newCount = contacts.filter((c) => c.status === "new").length;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Contact Leads</h1>
          <p className="text-sm text-[#64748B] mt-1">
            {contacts.length} total &mdash;{" "}
            <span className="text-[#2563EB] font-medium">{newCount} new</span>
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Leads list */}
        <div className="lg:col-span-2 space-y-3">
          {contacts.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelected(c);
                updateStatus(c.id, "read");
              }}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selected?.id === c.id
                  ? "border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2E8F0] bg-white hover:border-[#BFDBFE]"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-medium text-sm text-[#0F172A]">{c.name}</p>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ${statusConfig[c.status].color}`}
                >
                  {statusConfig[c.status].label}
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mb-1.5">{c.email}</p>
              <p className="text-xs text-[#64748B] line-clamp-2">{c.message}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-[#94A3B8]">
                <span className="flex items-center gap-1">
                  <DollarSign size={10} />
                  {c.budget}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {c.created_at}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail view */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-[#F1F5F9]">
                <div>
                  <h2 className="font-semibold text-[#0F172A] text-lg">
                    {selected.name}
                  </h2>
                  <p className="text-sm text-[#94A3B8] mt-0.5">{selected.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStatus(selected.id, "replied")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
                  >
                    <Reply size={12} />
                    Mark Replied
                  </button>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl">
                  <DollarSign size={16} className="text-[#2563EB]" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">Budget</p>
                    <p className="text-sm font-medium text-[#0F172A]">
                      {selected.budget}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl">
                  <Calendar size={16} className="text-[#2563EB]" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">Date</p>
                    <p className="text-sm font-medium text-[#0F172A]">
                      {selected.created_at}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wide mb-2">
                  Message
                </p>
                <p className="text-sm text-[#475569] leading-relaxed bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                  {selected.message}
                </p>
              </div>

              {/* Quick reply */}
              <div>
                <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wide mb-2">
                  Quick Reply
                </p>
                <div className="flex gap-3">
                  <a
                    href={`mailto:${selected.email}?subject=Re: Project Inquiry`}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white border border-[#E2E8F0] text-[#0F172A] rounded-xl hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                  >
                    <Mail size={14} />
                    Email
                  </a>
                  <a
                    href="https://wa.me/923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] rounded-xl hover:bg-[#DCFCE7] transition-colors"
                  >
                    <MessageSquare size={14} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 bg-white rounded-2xl border border-[#E2E8F0] flex items-center justify-center">
              <div className="text-center">
                <Eye size={32} className="text-[#E2E8F0] mx-auto mb-3" />
                <p className="text-sm text-[#94A3B8]">
                  Select a lead to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
