import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { COMPANY_INFO } from '@/config/company';

export default function Footer() {
  return (
    <footer className="bg-[#090E18] border-t border-white/10 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4263EB] to-[#8B5CF6] flex items-center justify-center text-white font-black text-xl shadow-md">
                CZ
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                CodiumZen <span className="text-[#60A5FA]">IT</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {COMPANY_INFO.description}
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <p className="font-semibold text-slate-300">
                Founder &amp; CEO: <Link href="/founder/md-juyel-rana" className="text-[#60A5FA] hover:underline font-bold">{COMPANY_INFO.founder.name}</Link>
              </p>
              <p className="text-slate-500">{COMPANY_INFO.founder.profession}</p>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={COMPANY_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONFIG.footerLinks.solutions.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONFIG.footerLinks.products.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors flex items-center gap-1">
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                <a href={`mailto:${COMPANY_INFO.officialEmail}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.officialEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address.full}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-400 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/admin/login" className="hover:text-slate-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
