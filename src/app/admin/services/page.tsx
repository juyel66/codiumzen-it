'use client';

import React, { useEffect, useState } from 'react';
import { Layers, CheckCircle2, RefreshCw } from 'lucide-react';
import { fetchAdminServices } from '@/lib/api/client';
import { Service } from '@/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminServices();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Enterprise Services</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Core software engineering, cloud architecture, and automation service offerings.
          </p>
        </div>

        <button
          onClick={loadData}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/10 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.slug}
            className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                {srv.category}
              </span>
              <h3 className="text-lg font-bold text-white">{srv.title}</h3>
              <p className="text-xs text-slate-400">{srv.shortDescription}</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {srv.fullDescription}
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Deliverables
              </span>
              <div className="space-y-1 text-xs text-slate-300">
                {srv.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
              {srv.technologies.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

