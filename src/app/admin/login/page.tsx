'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { adminLogin } from '@/lib/api/client';
import { COMPANY_INFO } from '@/config/company';

export default function AdminLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('codiumzenit@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await adminLogin(identifier, password);
    setLoading(false);

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError(res.message || 'Invalid administrator credentials. Access restricted.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-xl shadow-[#4263EB]/25">
            <Image
              src="/logo.png"
              alt="CodiumZen IT Logo"
              fill
              priority
              className="object-cover"
              sizes="64px"
            />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            CodiumZen Management Portal
          </h1>
          <p className="text-xs text-slate-400">
            Dedicated administrative console for {COMPANY_INFO.name}. Unauthorized access prohibited.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Email or Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@codiumzenit.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Encrypted Session • PBKDF2 Token Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
}

