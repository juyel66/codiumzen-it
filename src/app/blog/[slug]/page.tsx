import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import { fetchBlogs } from '@/lib/api/client';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blogs = await fetchBlogs();
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return { title: 'Article Not Found | CodiumZen IT' };
  return {
    title: `${blog.title} | CodiumZen IT Engineering Blog`,
    description: blog.excerpt,
    openGraph: {
      type: 'article',
      title: blog.title,
      description: blog.excerpt
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const blogs = await fetchBlogs();
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) {
    notFound();
  }

  // Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: blog.title,
    description: blog.excerpt,
    author: {
      '@type': 'Person',
      name: blog.author.name
    },
    publisher: {
      '@type': 'Organization',
      name: 'CodiumZen IT',
      url: 'https://codiumzenit.com'
    },
    datePublished: blog.createdAt
  };

  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Insights</span>
      </Link>

      <article className="cz-glass rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#60A5FA] font-semibold">
              {blog.category}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {blog.readingTimeMinutes} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 border-t border-white/5">
            <User className="w-4 h-4 text-[#60A5FA]" />
            <span className="font-semibold text-slate-200">{blog.author.name}</span>
            <span>&bull;</span>
            <span className="text-slate-400">{blog.author.role}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-6 pt-4 border-t border-white/5">
          {blog.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
          {blog.tags?.map((tag) => (
            <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
