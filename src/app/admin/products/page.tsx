'use client';

import React, { useEffect, useState } from 'react';
import { Boxes, ExternalLink, Plus, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchAdminProducts } from '@/lib/api/client';
import { Product } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Software Products</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage flagship proprietary software products engineered by CodiumZen IT.
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
        {products.map((product) => (
          <div
            key={product.slug}
            className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                  {product.category}
                </span>
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <p className="text-xs text-slate-400">{product.tagline}</p>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                  product.status === 'live'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                {product.status.replace('_', ' ')}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Key Features
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex flex-wrap gap-1.5">
                {product.technologies.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400">
                    {t}
                  </span>
                ))}
              </div>

              {product.externalUrl ? (
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-slate-400 font-medium">Coming Soon</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

