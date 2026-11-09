'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { COMPANY_INFO } from '@/config/company';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1220]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4263EB] to-[#8B5CF6] flex items-center justify-center text-white font-black text-xl shadow-md shadow-[#4263EB]/30 group-hover:scale-105 transition-transform">
              CZ
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                CodiumZen <span className="text-[#60A5FA]">IT</span>
              </span>
              <span className="block text-[10px] font-semibold text-[#94A3B8] tracking-widest uppercase">
                Software Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    isActive ? 'text-[#60A5FA] font-semibold' : 'text-[#94A3B8]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4263EB] to-[#8B5CF6] hover:from-[#364FC7] hover:to-[#7C3AED] text-white text-sm font-semibold shadow-md shadow-[#4263EB]/25 hover:shadow-lg hover:shadow-[#4263EB]/40 transition-all hover:-translate-y-0.5"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-[#0B1220]/98 backdrop-blur-xl border-b border-white/10 px-6 py-8 shadow-2xl transition-all">
          <nav className="flex flex-col gap-4">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    isActive ? 'bg-[#4263EB]/20 text-[#60A5FA] font-semibold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4263EB] to-[#8B5CF6] text-white text-center font-semibold text-sm shadow-md"
              >
                Start a Project &rarr;
              </Link>
              <Link
                href="/admin/login"
                className="text-xs text-center text-slate-500 hover:text-slate-400 py-1"
              >
                Admin Console
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
