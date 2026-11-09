import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { fetchProducts } from '@/lib/api/client';

export const metadata: Metadata = {
  title: 'Products — Commercial Software & Tools | CodiumZen IT',
  description: 'Explore commercial software products and automated tools developed by CodiumZen IT, including IVAC Assistant Pro and upcoming digital utilities.'
};

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
          Software Portfolio
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          CodiumZen IT Products
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          High-performance, purpose-built digital products engineered for efficiency, speed, and real-world reliability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map((p) => {
          const isLive = p.status === 'live';
          return (
            <div
              key={p.slug}
              className="cz-glass rounded-2xl p-8 flex flex-col justify-between hover:border-[#4263EB]/50 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {p.category}
                  </span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      isLive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {isLive ? '● Live & Operational' : '⏳ In Development'}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white">{p.name}</h2>
                <p className="text-sm font-semibold text-[#60A5FA]">{p.tagline}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{p.description}</p>

                {/* Features */}
                <div className="pt-2">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Core Capabilities:
                  </h3>
                  <ul className="space-y-1.5">
                    {p.features?.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {p.technologies?.map((tech) => (
                    <span key={tech} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 mt-6 flex items-center justify-between">
                <Link
                  href={`/products/${p.slug}`}
                  className="text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Product Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {p.externalUrl ? (
                  <a
                    href={p.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4263EB] hover:bg-[#364FC7] text-white text-xs font-semibold shadow-md transition-colors"
                  >
                    <span>Visit Live Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500 font-medium italic">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
