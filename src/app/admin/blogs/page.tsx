'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, Tag, RefreshCw } from 'lucide-react';
import { fetchAdminBlogs } from '@/lib/api/client';
import { Blog } from '@/types';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminBlogs();
    setBlogs(data);
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
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Engineering Articles & Insights</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Articles authored by Founder & CEO Md Juyel Rana and the CodiumZen engineering team.
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

      <div className="space-y-4">
        {blogs.map((b) => (
          <div
            key={b.slug}
            className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                  {b.category}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {b.readingTimeMinutes} min read
                </span>
              </div>
              <div className="text-xs text-slate-400">
                By <strong className="text-white">{b.author.name}</strong> ({b.author.role})
              </div>
            </div>

            <h3 className="text-lg font-bold text-white hover:text-blue-400 transition-colors">
              {b.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {b.excerpt}
            </p>

            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
              {b.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400 flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

