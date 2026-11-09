import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Target, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '@/config/company';

export const metadata: Metadata = {
  title: 'About CodiumZen IT — Our Mission, Culture & Engineering Philosophy',
  description: 'Learn about CodiumZen IT, our leadership under Founder & CEO Md Juyel Rana, our engineering standards, and our commitment to building reliable software products.'
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Overview */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
          Company Overview
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          About CodiumZen IT
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          {COMPANY_INFO.description} Founded by Full Stack Software Engineer Md Juyel Rana, we bridge technical precision with commercial product execution.
        </p>
      </div>

      {/* Mission & Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="cz-glass rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#4263EB]/20 border border-[#4263EB]/40 flex items-center justify-center text-[#60A5FA]">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Our Mission</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            To engineer reliable, high-performance software products that eliminate operational friction and enable digital businesses to scale effortlessly.
          </p>
        </div>

        <div className="cz-glass rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Engineering First</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We avoid fragile abstractions and bloated dependencies. We believe in typed contracts, native driver connection pools, defensive rate-limiting, and 100% test verification.
          </p>
        </div>

        <div className="cz-glass rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Product Studio</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            In addition to bespoke software services, we incubate our own proprietary products, battle-testing architectures in live production environments with thousands of daily users.
          </p>
        </div>
      </div>

      {/* Leadership Highlight */}
      <div className="cz-glass rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
            Executive Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Led by Founder &amp; CEO Md Juyel Rana
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {COMPANY_INFO.founder.bio}
          </p>
        </div>
        <Link
          href="/founder/md-juyel-rana"
          className="px-6 py-3.5 rounded-full bg-[#4263EB] hover:bg-[#364FC7] text-white font-semibold text-sm shrink-0 transition-colors"
        >
          View Executive Profile &rarr;
        </Link>
      </div>
    </div>
  );
}
