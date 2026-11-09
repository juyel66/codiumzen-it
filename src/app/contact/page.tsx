'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, ArrowUpRight, Github, Linkedin, Facebook } from 'lucide-react';
import { COMPANY_INFO } from '@/config/company';
import { submitContactLead } from '@/lib/api/client';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    service: 'Custom Software Development',
    budget: '$1,000 - $5,000',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    const res = await submitContactLead(formData);
    setLoading(false);

    if (res.ok) {
      setStatusMsg({
        text: 'Thank you! Your inquiry was successfully received by CodiumZen IT. We will respond within 24 hours.',
        isError: false
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        service: 'Custom Software Development',
        budget: '$1,000 - $5,000',
        message: ''
      });
    } else {
      setStatusMsg({
        text: res.message || 'Failed to deliver message. Please contact us directly via WhatsApp or phone.',
        isError: true
      });
    }
  };

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
          Start a Conversation
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Contact CodiumZen IT
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Have an upcoming software project, technical challenge, or product consultation? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 cz-glass rounded-3xl p-8 sm:p-10 space-y-8 h-fit">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Direct Communication</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              We respond promptly to all corporate inquiries, product questions, and technical proposals.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#4263EB]/20 border border-[#4263EB]/40 flex items-center justify-center text-[#60A5FA] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-semibold uppercase">Official Email</span>
                <a href={`mailto:${COMPANY_INFO.officialEmail}`} className="text-sm font-semibold text-white hover:text-[#60A5FA] transition-colors">
                  {COMPANY_INFO.officialEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-semibold uppercase">Phone &amp; WhatsApp</span>
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors block">
                  {COMPANY_INFO.phone}
                </a>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                >
                  <span>Chat on WhatsApp &rarr;</span>
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-semibold uppercase">Location</span>
                <span className="text-sm font-medium text-white block">
                  {COMPANY_INFO.address.full}
                </span>
                <span className="text-xs text-slate-500">{COMPANY_INFO.country}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
              Follow &amp; Connect
            </span>
            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Facebook Page"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="lg:col-span-7 cz-glass rounded-3xl p-8 sm:p-10 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Project Inquiry Form</h2>
            <p className="text-sm text-slate-400 mt-1">
              Provide your project requirements for an architectural consultation.
            </p>
          </div>

          {statusMsg && (
            <div
              className={`p-4 rounded-xl flex items-center gap-3 text-sm ${
                statusMsg.isError
                  ? 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
                  : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
              }`}
            >
              {statusMsg.isError ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4263EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4263EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Phone / WhatsApp *
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+8801700000000"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4263EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4263EB]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Project Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief summary (e.g. Next.js SaaS Web App Development)"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4263EB]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Target Service
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E1524] border border-white/10 text-white text-sm focus:outline-none focus:border-[#4263EB]"
                >
                  <option value="Custom Software Development">Custom Software Development</option>
                  <option value="Web Application Development">Web Application Development</option>
                  <option value="SaaS Product Engineering">SaaS Product Engineering</option>
                  <option value="Automation & Workflow Solutions">Automation &amp; Workflow Solutions</option>
                  <option value="Cloud Architecture & DevOps">Cloud Architecture &amp; DevOps</option>
                  <option value="Technical Consultation">Technical Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Estimated Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E1524] border border-white/10 text-white text-sm focus:outline-none focus:border-[#4263EB]"
                >
                  <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                  <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                  <option value="$50,000+">$50,000+ Enterprise</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Project Scope &amp; Details *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your technical requirements, goals, timeline, and any specific architectural preferences..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4263EB]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#4263EB] to-[#8B5CF6] text-white font-bold text-sm shadow-xl hover:shadow-[#4263EB]/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <span>Sending Message...</span> : <span>Send Project Inquiry</span>}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
