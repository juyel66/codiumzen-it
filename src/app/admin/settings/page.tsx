'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { COMPANY_INFO } from '@/config/company';

export default function AdminSettingsPage() {
  const [info, setInfo] = useState({
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    tagline: COMPANY_INFO.tagline,
    email: COMPANY_INFO.email,
    supportEmail: COMPANY_INFO.supportEmail,
    phone: COMPANY_INFO.phone,
    whatsapp: COMPANY_INFO.whatsapp,
    address: `${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.country}`,
    founderName: COMPANY_INFO.founder.name,
    founderRole: COMPANY_INFO.founder.role,
    founderEmail: COMPANY_INFO.founder.email,
    founderPhone: COMPANY_INFO.founder.phone,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Company & Site Settings</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Official corporate entity details, communications channels, and leadership metadata.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 transition-all self-start sm:self-auto"
        >
          {saved ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Settings Saved' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Corporate Identity */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            Corporate Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Company Brand Name</label>
              <input
                type="text"
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Legal Entity Name</label>
              <input
                type="text"
                value={info.legalName}
                onChange={(e) => setInfo({ ...info, legalName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Corporate Tagline</label>
            <input
              type="text"
              value={info.tagline}
              onChange={(e) => setInfo({ ...info, tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Leadership & Founder Details */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Executive Leadership
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Founder & CEO Name</label>
              <input
                type="text"
                value={info.founderName}
                onChange={(e) => setInfo({ ...info, founderName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Designation / Role</label>
              <input
                type="text"
                value={info.founderRole}
                onChange={(e) => setInfo({ ...info, founderRole: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Direct Founder Email</label>
              <input
                type="email"
                value={info.founderEmail}
                onChange={(e) => setInfo({ ...info, founderEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Direct Phone / WhatsApp</label>
              <input
                type="text"
                value={info.founderPhone}
                onChange={(e) => setInfo({ ...info, founderPhone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Channels & Location */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-400" />
            Official Communications Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">General Inquiry Email</label>
              <input
                type="email"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Direct Contact Hotline</label>
              <input
                type="text"
                value={info.phone}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Headquarters Address</label>
            <input
              type="text"
              value={info.address}
              onChange={(e) => setInfo({ ...info, address: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

