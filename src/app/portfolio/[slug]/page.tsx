import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ExternalLink, Cpu, Layers } from 'lucide-react';
import { fetchProjects } from '@/lib/api/client';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const projects = await fetchProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found | CodiumZen IT' };
  return {
    title: `${project.title} — Case Study | CodiumZen IT`,
    description: project.summary
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const projects = await fetchProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Portfolio</span>
      </Link>

      <div className="cz-glass rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
            {project.category}
          </span>
          {project.isDemoContent && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Illustrative Demo Content
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white">{project.title}</h1>
        <p className="text-slate-300 text-base leading-relaxed">{project.summary}</p>

        {project.challenge && (
          <div className="pt-4 border-t border-white/5 space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              The Challenge
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">{project.challenge}</p>
          </div>
        )}

        {project.solution && (
          <div className="pt-4 border-t border-white/5 space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Our Architectural Solution
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
          </div>
        )}

        {project.results && project.results.length > 0 && (
          <div className="pt-4 border-t border-white/5 space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Results &amp; Impact
            </h2>
            <ul className="space-y-2">
              {project.results.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t border-white/5 space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Technologies Utilized
          </h2>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.technologies?.map((tech) => (
              <span key={tech} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.liveUrl && (
          <div className="pt-6 border-t border-white/5">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4263EB] hover:bg-[#364FC7] text-white font-semibold text-sm transition-colors"
            >
              <span>Explore Live Project</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
