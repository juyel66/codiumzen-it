'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Users,
  Boxes,
  Layers,
  FolderGit2,
  BookOpen,
  Briefcase,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight
} from 'lucide-react';
import { fetchAdminMetrics, fetchAdminLeads } from '@/lib/api/client';
import { DashboardMetrics, Lead } from '@/types';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [m, l] = await Promise.all([
        fetchAdminMetrics(),
        fetchAdminLeads()
      ]);
      setMetrics(m);
      setRecentLeads(l.slice(0, 5));
      setLoading(false);
    }
    loadData();
  }, []);

  const statCards = [
    { label: 'Inbound Leads', value: metrics?.statistics?.newLeads ?? 0, highlight: `${metrics?.statistics?.newLeads ?? 0} New`, icon: Inbox, color: 'text-blue-400', href: '/admin/leads' },
    { label: 'Job Applications', value: metrics?.statistics?.applications ?? 0, highlight: `${metrics?.statistics?.applications ?? 0} Received`, icon: Users, color: 'text-emerald-400', href: '/admin/applications' },
    { label: 'Products', value: metrics?.statistics?.products ?? 2, highlight: 'Live', icon: Boxes, color: 'text-cyan-400', href: '/admin/products' },
    { label: 'Services', value: metrics?.statistics?.services ?? 4, highlight: 'Active', icon: Layers, color: 'text-indigo-400', href: '/admin/services' },
    { label: 'Portfolio Items', value: metrics?.statistics?.projects ?? 2, highlight: 'Published', icon: FolderGit2, color: 'text-purple-400', href: '/admin/projects' },
    { label: 'Blog Posts', value: metrics?.statistics?.blogs ?? 2, highlight: 'Published', icon: BookOpen, color: 'text-amber-400', href: '/admin/blogs' },
    { label: 'Active Careers', value: metrics?.statistics?.openJobs ?? 1, highlight: 'Hiring', icon: Briefcase, color: 'text-pink-400', href: '/admin/jobs' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            System Overview & Metrics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time status of CodiumZen IT inbound inquiries, recruitment, products, and content.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-500/20 transition-all"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>View All Leads</span>
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={i}
              href={card.href}
              className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{card.label}</span>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">
                  {loading ? '...' : card.value}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {card.highlight}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Inbound Leads Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Inbound Client Inquiries
            </h2>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-slate-400 font-semibold border-b border-white/5">
              <tr>
                <th className="p-4">Contact</th>
                <th className="p-4">Subject & Service</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    Loading inquiries...
                  </td>
                </tr>
              ) : recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No inquiries received yet. Inquiries submitted via website contact form will appear here.
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead: any, idx: number) => (
                  <tr key={lead._id || idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-white">{lead.name}</div>
                      <div className="text-slate-400">{lead.email}</div>
                      {lead.phone && <div className="text-[11px] text-slate-400">{lead.phone}</div>}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white">{lead.subject}</div>
                      <div className="text-[11px] text-blue-400">{lead.service || 'General Consultation'}</div>
                    </td>
                    <td className="p-4 text-slate-300">
                      {lead.budget || 'Not specified'}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        lead.status === 'new'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : lead.status === 'contacted'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {lead.status || 'new'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
