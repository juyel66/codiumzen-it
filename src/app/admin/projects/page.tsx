'use client';

import React, { useEffect, useState } from 'react';
import { FolderGit2, ExternalLink, CheckCircle2, RefreshCw } from 'lucide-react';
import { fetchAdminProjects } from '@/lib/api/client';
import { Project } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminProjects();
    setProjects(data);
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
            <FolderGit2 className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Portfolio & Case Studies</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Production case studies and engineered systems deployed for clients and commercial users.
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
        {projects.map((proj) => (
          <div
            key={proj.slug}
            className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                  {proj.category}
                </span>
                <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-slate-400">{proj.clientName}</p>
              </div>

              {proj.isDemoContent && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Demo Case Study
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {proj.summary}
            </p>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Key Results
              </span>
              <div className="space-y-1 text-xs text-slate-300">
                {proj.results.map((res, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex flex-wrap gap-1.5">
                {proj.technologies.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400">
                    {t}
                  </span>
                ))}
              </div>

              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-semibold"
                >
                  <span>Live App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

