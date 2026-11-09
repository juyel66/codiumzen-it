import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Code2,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award
} from 'lucide-react';
import { COMPANY_INFO } from '@/config/company';

export const metadata: Metadata = {
  title: 'Md Juyel Rana — Founder & CEO | CodiumZen IT',
  description: 'Executive profile and engineering portfolio of Md Juyel Rana, Founder & Chief Executive Officer of CodiumZen IT. Full Stack Software Engineer specializing in scalable cloud architectures.',
  openGraph: {
    title: 'Md Juyel Rana — Founder & CEO | CodiumZen IT',
    description: 'Executive profile of Md Juyel Rana, Full Stack Software Engineer and Founder & CEO of CodiumZen IT.',
    url: 'https://codiumzenit.com/founder/md-juyel-rana'
  }
};

export default function FounderPage() {
  const { founder } = COMPANY_INFO;

  return (
    <div className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header Profile Card */}
      <div className="cz-glass rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center">
            <div className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-tr from-[#4263EB] to-[#8B5CF6] p-1.5 shadow-2xl">
              <div className="w-full h-full bg-[#0B1220] rounded-[14px] flex flex-col items-center justify-center p-6 text-center">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6]">
                  MJR
                </span>
                <span className="text-xs font-semibold text-white mt-2">Md Juyel Rana</span>
                <span className="text-[10px] text-slate-400">Founder &amp; CEO</span>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-5">
              <a
                href={founder.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${COMPANY_INFO.officialEmail}`}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Direct Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#60A5FA]">
              <span>Executive Leadership Profile</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">{founder.name}</h1>
            <p className="text-lg font-bold text-[#60A5FA]">{founder.designation}</p>
            <p className="text-sm font-semibold text-slate-400">{founder.profession}</p>

            <p className="text-slate-300 text-sm leading-relaxed pt-2">
              {founder.bio}
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#60A5FA]" />
                Founder at CodiumZen IT
              </span>
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#60A5FA]" />
                TypeScript &bull; Node.js &bull; Next.js &bull; Cloud Architectures
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Focus & Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cz-glass rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#4263EB]/20 border border-[#4263EB]/40 flex items-center justify-center text-[#60A5FA]">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Full-Stack Architecture</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Architecting modern web applications with Next.js App Router, React 18/19, TypeScript, and Tailwind CSS for peak SEO performance and speed.
          </p>
        </div>

        <div className="cz-glass rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">High-Throughput Backends</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Engineering low-latency Node.js &amp; Express backends with connection pooling, native MongoDB operations, stateless JWT tokens, and rate-limiting.
          </p>
        </div>

        <div className="cz-glass rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Product Studio &amp; Tooling</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Creator of IVAC Assistant Pro, empowering thousands of active users with millisecond slot scanning, browser automation, and companion OTP syncing.
          </p>
        </div>
      </div>

      {/* Direct Contact CTA */}
      <div className="text-center pt-8 border-t border-white/10 space-y-4">
        <h3 className="text-2xl font-bold text-white">Connect with Md Juyel Rana</h3>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Interested in partnering, discussing technical architectures, or commissioning a software project?
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-[#4263EB] hover:bg-[#364FC7] text-white font-semibold text-sm transition-colors"
          >
            Send Project Brief &rarr;
          </Link>
          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors"
          >
            LinkedIn Message
          </a>
        </div>
      </div>
    </div>
  );
}
