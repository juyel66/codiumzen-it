'use client';

import React, { useEffect, useState } from 'react';
import { Inbox, Mail, Phone, Calendar, CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchAdminLeads, updateAdminLeadStatus } from '@/lib/api/client';
import { Lead } from '@/types';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const loadLeads = async () => {
    setLoading(true);
    const data = await fetchAdminLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const ok = await updateAdminLeadStatus(id, status);
    if (ok) {
      setLeads((prev) =>
        prev.map((l) => ((l as any)._id === id ? { ...l, status: status as any } : l))
      );
      if (selectedLead && (selectedLead as any)._id === id) {
        setSelectedLead({ ...selectedLead, status: status as any });
      }
    }
  };

  const filtered = leads.filter((l) => (filter === 'all' ? true : l.status === filter));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Inbound Project Leads</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage inquiries, project briefs, and consultation requests submitted via the CodiumZen IT website.
          </p>
        </div>

        <button
          onClick={loadLeads}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/10 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'new', 'contacted', 'closed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === tab
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {tab} ({leads.filter((l) => tab === 'all' ? true : l.status === tab).length})
          </button>
        ))}
      </div>

      {/* Main Grid: Leads List + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List column */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden">
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-8 text-center text-slate-400 text-sm">Loading inquiries...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No inquiries matching the selected filter.
              </div>
            ) : (
              filtered.map((lead: any) => {
                const isSelected = selectedLead && (selectedLead as any)._id === lead._id;
                return (
                  <div
                    key={lead._id || lead.email}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 sm:p-5 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-600/10 border-l-4 border-l-blue-500' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{lead.name}</span>
                          {lead.company && (
                            <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                              {lead.company}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-blue-400 font-medium">{lead.subject}</div>
                        <div className="text-xs text-slate-400 line-clamp-1">{lead.message}</div>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            lead.status === 'new'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : lead.status === 'contacted'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {lead.status || 'new'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Detail column */}
        <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 space-y-5">
          {selectedLead ? (
            <>
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  Lead Details
                </span>
                <h3 className="text-lg font-bold text-white">{selectedLead.name}</h3>
                {selectedLead.company && (
                  <p className="text-xs text-slate-400 font-medium">Company: {selectedLead.company}</p>
                )}
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${selectedLead.email}`} className="text-blue-400 underline">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{selectedLead.phone}</span>
                  </div>
                )}
                {selectedLead.budget && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[11px] text-slate-400">Estimated Budget</div>
                    <div className="text-emerald-400 font-bold">{selectedLead.budget}</div>
                  </div>
                )}
                {selectedLead.service && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[11px] text-slate-400">Interested Service</div>
                    <div className="text-white font-medium">{selectedLead.service}</div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-semibold text-slate-400">Client Message / Scope</label>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                  {selectedLead.message}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <label className="text-[11px] font-semibold text-slate-400">Update Lead Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['new', 'contacted', 'closed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange((selectedLead as any)._id, st)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                        selectedLead.status === st
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="py-16 text-center text-slate-400 text-xs">
              Select an inquiry from the list to view its complete details and manage its status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

