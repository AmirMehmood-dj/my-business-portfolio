import type { Metadata } from "next";
import {
  FolderOpen,
  FileText,
  MessageSquare,
  Inbox,
  TrendingUp,
  Eye,
  Clock,
  Users,
} from "lucide-react";
import Link from "next/link";
import { projects, blogPosts, testimonials } from "@/lib/data";

export const metadata: Metadata = { title: "Dashboard" };

const statsCards = [
  {
    label: "Total Projects",
    value: projects.length,
    icon: FolderOpen,
    color: "text-[#2563EB]",
    bg: "bg-[#EFF6FF]",
    href: "/admin/projects",
  },
  {
    label: "Blog Posts",
    value: blogPosts.length,
    icon: FileText,
    color: "text-[#7C3AED]",
    bg: "bg-[#F5F3FF]",
    href: "/admin/blogs",
  },
  {
    label: "Testimonials",
    value: testimonials.length,
    icon: MessageSquare,
    color: "text-[#16A34A]",
    bg: "bg-[#F0FDF4]",
    href: "/admin/testimonials",
  },
  {
    label: "New Leads",
    value: 8,
    icon: Inbox,
    color: "text-[#EA580C]",
    bg: "bg-[#FFF7ED]",
    href: "/admin/contacts",
  },
];

const analyticsCards = [
  { label: "Page Views (30d)", value: "2,847", icon: Eye, delta: "+12%" },
  { label: "Unique Visitors", value: "1,432", icon: Users, delta: "+8%" },
  { label: "Avg. Session", value: "3m 24s", icon: Clock, delta: "+5%" },
  { label: "Conversion Rate", value: "4.2%", icon: TrendingUp, delta: "+1.2%" },
];

const recentContacts = [
  { name: "James Wilson", email: "james@example.com", budget: "$5,000–$10,000", status: "new", time: "2h ago" },
  { name: "Lisa Chen", email: "lisa@example.com", budget: "$1,000–$5,000", status: "read", time: "5h ago" },
  { name: "Ahmed Al-Rashid", email: "ahmed@example.com", budget: "$10,000+", status: "replied", time: "1d ago" },
];

const statusColors: Record<string, string> = {
  new: "bg-[#EFF6FF] text-[#2563EB]",
  read: "bg-[#F8FAFC] text-[#64748B]",
  replied: "bg-[#F0FDF4] text-[#16A34A]",
};

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard</h1>
        <p className="text-sm text-[#64748B] mt-1">
          Welcome back, Amir. Here&apos;s an overview.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="p-5 bg-white rounded-2xl border border-[#E2E8F0] hover:shadow-md hover:border-[#BFDBFE] transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
                <Icon size={18} className={card.color} />
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">{card.value}</p>
              <p className="text-sm text-[#64748B] mt-1">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Analytics */}
      <div>
        <h2 className="text-base font-semibold text-[#0F172A] mb-4">Analytics Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="p-5 bg-white rounded-2xl border border-[#E2E8F0]"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon size={16} className="text-[#94A3B8]" />
                  <span className="text-xs font-medium text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full">
                    {card.delta}
                  </span>
                </div>
                <p className="text-xl font-bold text-[#0F172A]">{card.value}</p>
                <p className="text-xs text-[#94A3B8] mt-1">{card.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent contacts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#0F172A]">Recent Leads</h2>
          <Link
            href="/admin/contacts"
            className="text-sm text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F1F5F9]">
                <th className="text-left px-5 py-3 text-xs font-medium text-[#94A3B8] uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#94A3B8] uppercase tracking-wide hidden sm:table-cell">Budget</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#94A3B8] uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#94A3B8] uppercase tracking-wide hidden md:table-cell">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {recentContacts.map((c) => (
                <tr key={c.email} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-[#0F172A]">{c.name}</p>
                    <p className="text-xs text-[#94A3B8]">{c.email}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell text-[#64748B]">{c.budget}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-[#94A3B8] text-xs">{c.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
