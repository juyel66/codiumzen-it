import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Rocket, Building2, TrendingUp, Laptop, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solutions — Built for Startups, Growth & Enterprises | CodiumZen IT',
  description: 'Tailored technology solutions and software architectures engineered for startups, growth-stage digital companies, and enterprise systems by CodiumZen IT.'
};

export default function SolutionsPage() {
  const tiers = [
    {
      title: 'Startups & Early-Stage Ventures',
      subtitle: 'From Concept to Scalable MVP in Weeks',
      icon: Rocket,
      desc: 'Rapidly transform your product vision into a production-grade, investor-ready web or mobile MVP with clean architecture and modern UX.',
      highlights: ['Rapid Prototyping & MVP Build', 'Next.js App Router Architecture', 'Stripe & Regional Payment Gateways', 'Cost-Effective Serverless Deployments']
    },
    {
      title: 'Growing Digital Businesses',
      subtitle: 'Scaling Systems & Eliminating Bottlenecks',
      icon: TrendingUp,
      desc: 'As your user base and transaction volumes expand, we re-architect databases, optimize query latency, and introduce automated background pipelines.',
      highlights: ['Database Sharding & Connection Pooling', 'Stateless JWT & Session Architecture', 'High-Concurrency Caching Layers', 'Automated Testing & CI/CD Pipelines']
    },
    {
      title: 'Product & SaaS Companies',
      subtitle: 'Multi-Tenant SaaS Engineering',
      icon: Laptop,
      desc: 'Complete engineering support for B2B and B2C software products. From subscription tiering to telemetry analytics and real-time alerts.',
      highlights: ['Multi-Tenant Data Partitioning', 'Seat-Based Licensing & Hardware Binding', 'Webhooks & Third-Party Integrations', 'Real-time WebSocket & SSE Relays']
    },
    {
      title: 'Enterprise Technology',
      subtitle: 'Security, Compliance & High Availability',
      icon: Building2,
      desc: 'Mission-critical software architectures with zero-trust access control, automated database failover, audit trails, and strict rate limiting.',
      highlights: ['Zero-Trust RBAC & Audit Trails', 'Reverse Proxy & Hardened Headers', 'Data Encryption at Rest & In-Transit', 'SLA-Driven Maintenance & Support']
    }
  ];

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
          Tailored Engineering
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Solutions for Every Growth Stage
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Whether you are launching your initial MVP or scaling an enterprise platform, we engineer systems that adapt to your exact scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tiers.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.title} className="cz-glass rounded-2xl p-8 flex flex-col justify-between hover:border-[#4263EB]/50 transition-all shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#4263EB]/20 to-[#8B5CF6]/20 border border-[#4263EB]/30 flex items-center justify-center text-[#60A5FA]">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">{t.title}</h2>
                <p className="text-sm font-semibold text-[#60A5FA]">{t.subtitle}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{t.desc}</p>

                <div className="pt-2">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Core Solutions:
                  </h3>
                  <ul className="space-y-1.5">
                    {t.highlights.map((h) => (
                      <li key={h} className="text-xs text-slate-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6">
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Discuss Your Architecture</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
