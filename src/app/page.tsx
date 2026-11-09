import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Laptop,
  Database,
  Cloud,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { COMPANY_INFO } from '@/config/company';
import { fetchProducts, fetchServices, fetchProjects, fetchBlogs } from '@/lib/api/client';

export default async function HomePage() {
  const [products, services, projects, blogs] = await Promise.all([
    fetchProducts(),
    fetchServices(),
    fetchProjects(),
    fetchBlogs()
  ]);

  return (
    <div className="relative overflow-hidden">
      {/* ==============================================================
          1. HERO SECTION
          ============================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Ambient Aura */}
        <div className="hero-glow-blob w-[500px] h-[500px] bg-[#4263EB] top-10 left-1/2 -translate-x-1/2" />
        <div className="hero-glow-blob w-[380px] h-[380px] bg-[#8B5CF6] top-40 left-10" />
        <div className="hero-glow-blob w-[380px] h-[380px] bg-[#60A5FA] top-40 right-10" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#60A5FA] backdrop-blur-md shadow-lg shadow-black/20">
            <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
            <span>Digital Engineering &amp; Modern Product Studio</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12]">
            Building Digital Products.{' '}
            <span className="cz-gradient-text block mt-1 sm:mt-2">
              Engineering Intelligent Solutions.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            {COMPANY_INFO.description}
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#4263EB] to-[#8B5CF6] hover:from-[#364FC7] hover:to-[#7C3AED] text-white font-bold text-base shadow-lg shadow-[#4263EB]/30 hover:shadow-xl hover:shadow-[#4263EB]/50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Explore Our Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold text-base transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>Start a Project</span>
            </Link>
          </div>

          {/* Core Values Strip */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 text-left">
            <div className="p-3">
              <div className="text-2xl font-bold text-white mb-1">Sub-Second</div>
              <div className="text-xs text-slate-400">Low-latency architecture &amp; caching</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-white mb-1">Full-Stack</div>
              <div className="text-xs text-slate-400">Next.js, TypeScript, Node.js, MongoDB</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-white mb-1">Enterprise</div>
              <div className="text-xs text-slate-400">Zero-trust security &amp; rate limiting</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-white mb-1">100% Native</div>
              <div className="text-xs text-slate-400">Production-tested software tools</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          2. COMPANY PRODUCTS SPOTLIGHT
          ============================================================== */}
      <section className="py-24 bg-[#0E1524] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
              Proprietary Technology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Commercial Products &amp; Automation Tools
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              Engineered by CodiumZen IT to solve mission-critical operational challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((p) => {
              const isLive = p.status === 'live';
              return (
                <div
                  key={p.slug}
                  className="cz-glass rounded-2xl p-8 flex flex-col justify-between relative group hover:border-[#4263EB]/50 transition-all duration-300 shadow-xl"
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
                        {isLive ? '● Live Product' : '⏳ In Development'}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm font-medium text-[#60A5FA]">{p.tagline}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{p.description}</p>

                    {/* Features List */}
                    <div className="pt-2">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Key Capabilities:
                      </h4>
                      <ul className="space-y-1.5">
                        {p.features?.slice(0, 4).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
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
                      className="text-sm font-semibold text-white hover:text-[#60A5FA] transition-colors flex items-center gap-1"
                    >
                      <span>Read Product Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>

                    {p.externalUrl ? (
                      <a
                        href={p.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4263EB] hover:bg-[#364FC7] text-white text-xs font-semibold shadow-md transition-colors"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium italic">
                        Official URL Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==============================================================
          3. CORE ENGINEERING SERVICES
          ============================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
            What We Deliver
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Full-Spectrum Engineering Services
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            From modern responsive frontends to fault-tolerant microservices and automation workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.slug}
              className="cz-glass rounded-2xl p-7 flex flex-col justify-between group hover:border-[#4263EB]/50 transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#4263EB]/20 to-[#8B5CF6]/20 border border-[#4263EB]/30 flex items-center justify-center text-[#60A5FA]">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.shortDescription}</p>

                <ul className="space-y-1.5 pt-2">
                  {s.deliverables?.slice(0, 3).map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6">
                <Link
                  href={`/services/${s.slug}`}
                  className="text-xs font-semibold text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Explore Service Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==============================================================
          4. FOUNDER & CEO LEADERSHIP SPOTLIGHT
          ============================================================== */}
      <section className="py-24 bg-[#090E18] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cz-glass rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Photo & Identity Box */}
              <div className="lg:col-span-4 text-center lg:text-left">
                <div className="w-40 h-40 mx-auto lg:mx-0 rounded-2xl bg-gradient-to-tr from-[#4263EB] to-[#8B5CF6] p-1 shadow-xl">
                  <div className="w-full h-full bg-[#0B1220] rounded-[14px] flex flex-col items-center justify-center text-center p-4">
                    <UserCheck className="w-12 h-12 text-[#60A5FA] mb-2" />
                    <span className="text-sm font-bold text-white">Full Stack Engineer</span>
                    <span className="text-[11px] text-slate-400">Founder &amp; CEO</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-white">{COMPANY_INFO.founder.name}</h3>
                  <p className="text-sm text-[#60A5FA] font-medium">{COMPANY_INFO.founder.designation}</p>
                  <p className="text-xs text-slate-400 mt-1">{COMPANY_INFO.founder.profession}</p>
                </div>
              </div>

              {/* Bio & Links */}
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
                  Leadership Profile
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  "Engineering software is not just about writing code; it is about building resilient digital foundations that scale with purpose."
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {COMPANY_INFO.founder.bio}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/founder/md-juyel-rana"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Read Executive Biography</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={COMPANY_INFO.founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-colors"
                  >
                    <span>GitHub Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={COMPANY_INFO.founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-colors"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          5. FEATURED PORTFOLIO PROJECTS
          ============================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">Case Studies</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Featured Engineering Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1 mt-4 sm:mt-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <div key={p.slug} className="cz-glass rounded-2xl p-8 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-slate-300">
                    {p.category}
                  </span>
                  {p.isDemoContent && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Illustrative Case Study
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">{p.summary}</p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Outcomes:</h4>
                  <ul className="space-y-1">
                    {p.results?.map((r) => (
                      <li key={r} className="text-xs text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-3">
                  {p.technologies?.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="text-xs font-semibold text-[#60A5FA] hover:text-white transition-colors"
                >
                  Full Case Study &rarr;
                </Link>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Live Product</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==============================================================
          6. INSIGHTS & ENGINEERING ARTICLES
          ============================================================== */}
      <section className="py-24 bg-[#0E1524] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">Knowledge Base</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                Latest Engineering Insights
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1 mt-4 sm:mt-0"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((b) => (
              <article key={b.slug} className="cz-glass rounded-2xl p-8 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-slate-300 font-medium">
                      {b.category}
                    </span>
                    <span>&bull;</span>
                    <span>{b.readingTimeMinutes} min read</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                    <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{b.excerpt}</p>
                </div>
                <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs text-slate-400">
                  <span>By {b.author.name}</span>
                  <Link href={`/blog/${b.slug}`} className="font-semibold text-[#60A5FA] hover:underline">
                    Read Article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
          7. BOTTOM CALL TO ACTION
          ============================================================== */}
      <section className="py-24 relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Build Your Next Digital Product?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Schedule a direct technical consultation with Md Juyel Rana and the CodiumZen IT engineering team. Let's discuss your project scope and architecture.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#4263EB] to-[#8B5CF6] hover:from-[#364FC7] hover:to-[#7C3AED] text-white font-bold text-base shadow-xl shadow-[#4263EB]/40 transition-all hover:-translate-y-0.5"
            >
              Start a Conversation &rarr;
            </Link>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-base font-semibold transition-colors"
            >
              WhatsApp Us Direct
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
