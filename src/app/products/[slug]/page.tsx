import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ExternalLink, Shield, Cpu, Layers } from 'lucide-react';
import { fetchProductBySlug, fetchProducts } from '@/lib/api/client';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found | CodiumZen IT' };
  }
  return {
    title: `${product.name} — ${product.tagline} | CodiumZen IT`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.tagline
    }
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const isLive = product.status === 'live';

  return (
    <div className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Products</span>
      </Link>

      {/* Main Showcase Header */}
      <div className="cz-glass rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
            {product.category}
          </span>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              isLive
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            {isLive ? '● Live Operational System' : '⏳ In Development / Beta'}
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">{product.name}</h1>
          <p className="text-lg sm:text-xl font-semibold text-[#60A5FA] mt-2">{product.tagline}</p>
        </div>

        <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
          {product.description}
        </p>

        {product.externalUrl ? (
          <div className="pt-4">
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4263EB] hover:bg-[#364FC7] text-white font-bold text-sm shadow-xl shadow-[#4263EB]/40 transition-all hover:-translate-y-0.5"
            >
              <span>Launch {product.name}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 max-w-md">
            📢 <strong>Product Announcement:</strong> Official public launch and distribution link for {product.name} will be released soon.
          </div>
        )}
      </div>

      {/* Features & Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="cz-glass rounded-2xl p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#60A5FA]" />
            <span>Architecture &amp; Features</span>
          </h2>
          <ul className="space-y-3 pt-2">
            {product.features?.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="cz-glass rounded-2xl p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#8B5CF6]" />
            <span>Technology Stack</span>
          </h2>
          <p className="text-xs text-slate-400">
            Engineered with modern full-stack frameworks, asynchronous event models, and low-latency protocol adapters.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {product.technologies?.map((tech) => (
              <span key={tech} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
