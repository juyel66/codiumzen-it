import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, FileCode } from 'lucide-react';
import { COMPANY_INFO } from '@/config/company';

export const metadata = {
  title: 'Terms and Conditions | CodiumZen IT',
  description: 'Terms of service and software licensing conditions governing the use of CodiumZen IT digital services and software products.'
};

export default function TermsAndConditionsPage() {
  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
          Legal Agreement
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-slate-400">
          Last revised: October 31, 2026. Please read these terms carefully before engaging our services or products.
        </p>
      </div>

      <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 leading-relaxed">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-3 text-white font-semibold text-lg">
            <Scale className="w-6 h-6 text-[#60A5FA]" />
            Agreement Overview
          </div>
          <p className="text-sm text-slate-300">
            By visiting this website, signing a master service agreement with {COMPANY_INFO.name}, or utilizing software products developed by CodiumZen IT (including IVAC Assistant Pro), you agree to comply with and be legally bound by these terms.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#60A5FA]" /> 1. Intellectual Property Rights
          </h2>
          <p>
            All custom software, architecture designs, source code, logos, trademarks, and documentation developed by {COMPANY_INFO.name} remain the proprietary intellectual property of CodiumZen IT or its licensed clients as defined in custom Master Service Agreements.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>Clients receive non-exclusive, perpetual licenses for commissioned custom software upon full settlement of contracted invoices.</li>
            <li>Proprietary tools, extensions, and SaaS products (such as IVAC Assistant) are licensed on an active subscription basis and cannot be decompiled, reverse-engineered, or redistributed without explicit authorization.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#60A5FA]" /> 2. Client Engagements & Delivery
          </h2>
          <p>
            Project deliverables, timelines, milestones, and payment schedules are governed by dedicated Statements of Work (SOW). We maintain enterprise industry standards in testing, code coverage, and documentation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#60A5FA]" /> 3. Limitation of Liability
          </h2>
          <p>
            CodiumZen IT provides software and automation solutions on an &quot;as is&quot; and &quot;as available&quot; basis. While we build robust, high-availability, enterprise-grade systems with 99.9% uptime targets, we are not liable for business interruptions caused by third-party upstream API failures, unauthorized client system modifications, or force majeure events.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            4. Governing Law & Jurisdiction
          </h2>
          <p>
            These terms and any dispute arising from them shall be governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Inquiries & Legal Notice</h2>
          <p>
            Legal notices or contractual inquiries can be addressed to:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-1">
            <p className="font-semibold text-white">{COMPANY_INFO.name}</p>
            <p className="text-slate-400">Founder & CEO: {COMPANY_INFO.founder.name}</p>
            <p className="text-slate-400">Email: {COMPANY_INFO.email}</p>
            <p className="text-slate-400">Phone: {COMPANY_INFO.phone}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
