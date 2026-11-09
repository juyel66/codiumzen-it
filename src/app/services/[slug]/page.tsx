import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ArrowRight, Code2 } from 'lucide-react';
import { fetchServices } from '@/lib/api/client';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const services = await fetchServices();
  const service = services.find((s) => s.slug === params.slug);
  if (!service) {
    return { title: 'Service Not Found | CodiumZen IT' };
  }
  return {
    title: `${service.title} | CodiumZen IT`,
    description: service.shortDescription
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const services = await fetchServices();
  const service = services.find((s) => s.slug === params.slug);
  if (!service) {
    notFound();
  }

  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Services</span>
      </Link>

      <div className="cz-glass rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
          {service.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">{service.title}</h1>
        <p className="text-lg text-[#60A5FA] font-medium leading-relaxed">{service.shortDescription}</p>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{service.fullDescription}</p>

        <div className="pt-4 border-t border-white/5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Core Scope &amp; Deliverables
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.deliverables?.map((d) => (
              <li key={d} className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-white/5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Technologies &amp; Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.technologies?.map((tech) => (
              <span key={tech} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Need this service for your business?</h3>
            <p className="text-xs text-slate-400">Consult directly with our engineering team.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#4263EB] to-[#8B5CF6] text-white text-sm font-bold shadow-lg hover:shadow-[#4263EB]/40 transition-all"
          >
            Request Proposal &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
