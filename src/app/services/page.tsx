import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Code2, CheckCircle2 } from 'lucide-react';
import { fetchServices } from '@/lib/api/client';

export const metadata: Metadata = {
  title: 'Engineering Services — Custom Software, Next.js & Cloud | CodiumZen IT',
  description: 'Explore full-spectrum software engineering services provided by CodiumZen IT: bespoke web applications, Next.js engineering, SaaS platforms, automation workflows, and cloud DevOps.'
};

export default async function ServicesPage() {
  const services = await fetchServices();

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
          Capabilities &amp; Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Software Engineering Services
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          High-performance digital engineering services tailored to your technical and business milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.slug}
            className="cz-glass rounded-2xl p-8 flex flex-col justify-between group hover:border-[#4263EB]/50 transition-all shadow-xl"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#4263EB]/20 to-[#8B5CF6]/20 border border-[#4263EB]/40 flex items-center justify-center text-[#60A5FA]">
                <Code2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                {s.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">{s.shortDescription}</p>

              <div className="pt-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Key Deliverables:
                </h3>
                <ul className="space-y-1.5">
                  {s.deliverables?.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {s.technologies?.map((tech) => (
                  <span key={tech} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mt-6">
              <Link
                href={`/services/${s.slug}`}
                className="text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Read Full Scope</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
