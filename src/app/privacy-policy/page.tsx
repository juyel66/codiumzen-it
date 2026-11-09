import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Mail } from 'lucide-react';
import { COMPANY_INFO } from '@/config/company';

export const metadata = {
  title: 'Privacy Policy | CodiumZen IT',
  description: 'Learn how CodiumZen IT collects, protects, and manages your personal and business data.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
          Data Governance & Privacy
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-400">
          Last updated: October 31, 2026. Effective immediately.
        </p>
      </div>

      <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 leading-relaxed">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-3 text-white font-semibold text-lg">
            <ShieldCheck className="w-6 h-6 text-[#60A5FA]" />
            Commitment to Privacy
          </div>
          <p className="text-sm text-slate-300">
            {COMPANY_INFO.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), led by Founder & CEO {COMPANY_INFO.founder.name}, is committed to protecting the privacy, security, and integrity of data entrusted to us by clients, software users, and website visitors across all our digital platforms, including IVAC Assistant Pro and custom client solutions.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#60A5FA]" /> 1. Information We Collect
          </h2>
          <p>
            When you browse our website, request a consultation, apply for an open position, or utilize our software products, we may collect:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li><strong className="text-white">Contact & Inquiry Information:</strong> Full name, professional email address, phone number, company name, project requirements, and budget expectations submitted via inquiry forms.</li>
            <li><strong className="text-white">Career Application Data:</strong> Resume/CV links, portfolio URLs, GitHub/LinkedIn profiles, and work history provided voluntarily.</li>
            <li><strong className="text-white">Technical & Usage Data:</strong> Anonymized server logs, browser type, operating system, and IP address collected automatically to protect our infrastructure against security threats and optimize delivery.</li>
            <li><strong className="text-white">Product Licensing Information:</strong> For authorized users of IVAC Assistant, we securely verify device authorization tokens and active subscription validity.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#60A5FA]" /> 2. How We Use Your Information
          </h2>
          <p>
            Information collected by CodiumZen IT is strictly used to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>Deliver enterprise software engineering, cloud integration, and workflow automation services.</li>
            <li>Communicate project proposals, architectural blueprints, and support updates.</li>
            <li>Authenticate and maintain user accounts and product licenses.</li>
            <li>Prevent fraud, enforce terms of service, and protect critical system security.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#60A5FA]" /> 3. Data Protection & Zero Third-Party Selling
          </h2>
          <p>
            <strong className="text-white">We never sell, rent, trade, or monetize your personal or commercial data.</strong> All data is stored in cryptographically secured databases protected by multi-tier encryption at rest and in transit (TLS 1.3).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#60A5FA]" /> 4. Contact Our Data Protection Team
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data erasure or updates, contact our engineering office:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-1">
            <p className="font-semibold text-white">{COMPANY_INFO.name}</p>
            <p className="text-slate-400">Attn: Founder & CEO {COMPANY_INFO.founder.name}</p>
            <p className="text-slate-400">Email: <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#60A5FA] underline">{COMPANY_INFO.email}</a></p>
            <p className="text-slate-400">Direct Hotline: {COMPANY_INFO.phone}</p>
            <p className="text-slate-400">{COMPANY_INFO.address.city}, {COMPANY_INFO.address.country}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
