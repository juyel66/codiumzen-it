import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { fetchBlogs } from '@/lib/api/client';

export const metadata: Metadata = {
  title: 'Engineering Insights & Knowledge Base | CodiumZen IT',
  description: 'Technical articles, architectural deep dives, and software engineering tutorials written by engineers at CodiumZen IT.'
};

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
          Knowledge Base
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Engineering Insights
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Practical tutorials, architecture blueprints, and development insights from our software engineering team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((b) => (
          <article
            key={b.slug}
            className="cz-glass rounded-2xl p-8 flex flex-col justify-between hover:border-[#4263EB]/50 transition-all shadow-xl group"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#60A5FA] font-semibold">
                  {b.category}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {b.readingTimeMinutes} min read
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug">
                <Link href={`/blog/${b.slug}`}>{b.title}</Link>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">{b.excerpt}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                {b.tags?.map((tag) => (
                  <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs">
              <span className="text-slate-400">By {b.author.name}</span>
              <Link
                href={`/blog/${b.slug}`}
                className="font-bold text-[#60A5FA] hover:text-white flex items-center gap-1"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
