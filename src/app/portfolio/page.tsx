import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { fetchProjects } from '@/lib/api/client';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies — Software Projects | CodiumZen IT',
  description: 'Explore real-world software engineering case studies, automated tools, and platform architectures delivered by CodiumZen IT.'
};

export default async function PortfolioPage() {
  const projects = await fetchProjects();

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
          Proven Engineering
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Case Studies &amp; Portfolio
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          A showcase of scalable software products, custom extensions, and high-concurrency cloud systems built by CodiumZen IT.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <div key={p.slug} className="cz-glass rounded-2xl p-8 flex flex-col justify-between hover:border-[#4263EB]/50 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {p.category}
                </span>
                {p.isDemoContent && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Illustrative Demo Study
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-white">{p.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{p.summary}</p>

              {/* Outcomes */}
              <div className="space-y-1.5 pt-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Outcomes:</h3>
                {p.results?.map((r) => (
                  <div key={r} className="text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {p.technologies?.map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
              <Link
                href={`/portfolio/${p.slug}`}
                className="text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>Live URL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
