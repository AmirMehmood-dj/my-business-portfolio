import type { Metadata } from "next";
import {
  FolderOpen, FileText, MessageSquare, Inbox,
  CheckCircle2, Clock, Star, TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = { title: "Dashboard" };

async function getCounts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [
    { count: projects },
    { count: blogs },
    { count: testimonials },
    { count: contacts },
    { count: newLeads },
    { count: repliedLeads },
    { count: leadsThisMonth },
    { count: featuredProjects },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contacts").select("*", { count: "exact", head: true }).eq("status", "replied"),
    supabase.from("contacts").select("*", { count: "exact", head: true }).gte("created_at", startOfMonth.toISOString()),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("featured", true),
  ]);

  const totalContacts = contacts ?? 0;
  const replied = repliedLeads ?? 0;
  const replyRate = totalContacts > 0 ? Math.round((replied / totalContacts) * 100) : 0;

  return {
    projects: projects ?? 0,
    blogs: blogs ?? 0,
    testimonials: testimonials ?? 0,
    contacts: totalContacts,
    newLeads: newLeads ?? 0,
    replyRate,
    leadsThisMonth: leadsThisMonth ?? 0,
    featuredProjects: featuredProjects ?? 0,
  };
}

async function getRecentContacts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data } = await supabase
    .from("contacts")
    .select("id, name, email, budget, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

const statusColors: Record<string, string> = {
  new: "bg-[#EFF6FF] text-[#2563EB]",
  read: "bg-[#F8FAFC] text-[#64748B]",
  replied: "bg-[#F0FDF4] text-[#16A34A]",
};


export default async function AdminDashboard() {
  const [counts, recentContacts] = await Promise.all([getCounts(), getRecentContacts()]);

  const analyticsCards = [
    { label: "Leads This Month", value: counts.leadsThisMonth, icon: TrendingUp, color: "text-[#2563EB]", bg: "bg-[#EFF6FF]" },
    { label: "Reply Rate", value: `${counts.replyRate}%`, icon: CheckCircle2, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
    { label: "Featured Projects", value: counts.featuredProjects, icon: Star, color: "text-[#D97706]", bg: "bg-[#FFFBEB]" },
    { label: "Total Leads", value: counts.contacts, icon: Clock, color: "text-[#7C3AED]", bg: "bg-[#F5F3FF]" },
  ];

  const statsCards = [
    { label: "Total Projects", value: counts.projects, icon: FolderOpen, color: "text-[#2563EB]", bg: "bg-[#EFF6FF]", href: "/admin/projects" },
    { label: "Blog Posts", value: counts.blogs, icon: FileText, color: "text-[#7C3AED]", bg: "bg-[#F5F3FF]", href: "/admin/blogs" },
    { label: "Testimonials", value: counts.testimonials, icon: MessageSquare, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]", href: "/admin/testimonials" },
    { label: "New Leads", value: counts.newLeads, icon: Inbox, color: "text-[#EA580C]", bg: "bg-[#FFF7ED]", href: "/admin/contacts" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard</h1>
        <p className="text-sm text-[#64748B] mt-1">Welcome back, Amir. Here&apos;s an overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} className="p-5 bg-white rounded-2xl border border-[#E2E8F0] hover:shadow-md hover:border-[#BFDBFE] transition-all group">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
                <Icon size={18} className={card.color} />
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">{card.value}</p>
              <p className="text-sm text-[#64748B] mt-1">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <div>
        <h2 className="text-base font-semibold text-[#0F172A] mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="p-5 bg-white rounded-2xl border border-[#E2E8F0]">
                <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                  <Icon size={16} className={card.color} />
                </div>
                <p className="text-xl font-bold text-[#0F172A]">{card.value}</p>
                <p className="text-xs text-[#94A3B8] mt-1">{card.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#0F172A]">Recent Leads</h2>
          <Link href="/admin/contacts" className="text-sm text-[#2563EB] hover:text-[#1D4ED8] transition-colors">View all</Link>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          {recentContacts.length === 0 ? (
            <p className="text-center text-[#94A3B8] text-sm py-8">No leads yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F1F5F9]">
                  <th className="text-left px-5 py-3 text-xs font-medium text-[#94A3B8] uppercase tracking-wide">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-[#94A3B8] uppercase tracking-wide hidden sm:table-cell">Budget</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-[#94A3B8] uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {recentContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F8FAFC] transition-colors">
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
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
