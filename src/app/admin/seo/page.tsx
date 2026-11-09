'use client';

import React, { useState } from 'react';
import { Search, Save, CheckCircle2, Globe } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

interface PageSeo {
  pageKey: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
}

const defaultPages: PageSeo[] = [
  {
    pageKey: 'home',
    name: 'Home Page',
    title: 'CodiumZen IT | Enterprise Software Engineering & Automation',
    description: 'CodiumZen IT, founded by Md Juyel Rana, delivers high-concurrency software engineering, cloud architecture, and intelligent workflow automation.',
    keywords: ['CodiumZen IT', 'Md Juyel Rana', 'Software Engineering', 'IVAC Assistant', 'Automation']
  },
  {
    pageKey: 'founder',
    name: 'Founder Profile',
    title: 'Md Juyel Rana | Founder & CEO, Lead Architect at CodiumZen IT',
    description: 'Learn about Md Juyel Rana, Founder & CEO of CodiumZen IT, leading high-concurrency software engineering, automation architecture, and full stack solutions.',
    keywords: ['Md Juyel Rana', 'CEO CodiumZen', 'Software Architect', 'IVAC Assistant Creator']
  },
  {
    pageKey: 'products',
    name: 'Products Page',
    title: 'Proprietary Software Products | CodiumZen IT',
    description: 'Explore high-concurrency desktop, cloud, and browser automation tools engineered by CodiumZen IT, including IVAC Assistant Pro.',
    keywords: ['IVAC Assistant', 'Indian Visa Auto fill', 'Browser Automation', 'Desktop Telemetry']
  },
  {
    pageKey: 'services',
    name: 'Services Page',
    title: 'Enterprise Software & Cloud Engineering Services | CodiumZen IT',
    description: 'Bespoke custom software, SaaS product development, scalable API engineering, and cloud automation built for modern enterprises.',
    keywords: ['Custom Software Development', 'API Engineering', 'Cloud DevOps', 'SaaS Architecture']
  },
  {
    pageKey: 'careers',
    name: 'Careers Page',
    title: 'Join Our Engineering Team | Careers at CodiumZen IT',
    description: 'Explore career opportunities in full stack software development, distributed systems, and automation engineering at CodiumZen IT.',
    keywords: ['Tech Jobs Dhaka', 'Full Stack Engineer Careers', 'Node.js Developer Bangladesh']
  }
];

export default function AdminSeoPage() {
  const [pages, setPages] = useState<PageSeo[]>(defaultPages);
  const [saved, setSaved] = useState(false);

  const handleUpdate = (index: number, field: keyof PageSeo, val: any) => {
    setPages((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">SEO & OpenGraph Metadata</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure titles, meta descriptions, canonical URLs, and indexing keywords for public search visibility.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 transition-all self-start sm:self-auto"
        >
          {saved ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved Changes' : 'Save SEO Configuration'}</span>
        </button>
      </div>

      <div className="space-y-6">
        {pages.map((p, idx) => (
          <div
            key={p.pageKey}
            className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{p.name}</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">/{p.pageKey === 'home' ? '' : p.pageKey}</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Browser Title Tag</label>
                <input
                  type="text"
                  value={p.title}
                  onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Meta Description</label>
                <textarea
                  rows={2}
                  value={p.description}
                  onChange={(e) => handleUpdate(idx, 'description', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Keywords (Comma separated)</label>
                <input
                  type="text"
                  value={p.keywords.join(', ')}
                  onChange={(e) =>
                    handleUpdate(
                      idx,
                      'keywords',
                      e.target.value.split(',').map((k) => k.trim())
                    )
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

