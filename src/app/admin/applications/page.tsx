'use client';

import React, { useEffect, useState } from 'react';
import { Users, Mail, Phone, FileText, ExternalLink, RefreshCw, Briefcase } from 'lucide-react';
import { fetchAdminApplications } from '@/lib/api/client';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminApplications();
    setApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Job Applications</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Review candidate resumes, portfolios, and job applications submitted through the Careers portal.
          </p>
        </div>

        <button
          onClick={loadData}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/10 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden">
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-8 text-center text-slate-400 text-sm">Loading applications...</div>
            ) : applications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No candidate applications received yet.
              </div>
            ) : (
              applications.map((app) => {
                const isSelected = selectedApp && selectedApp._id === app._id;
                return (
                  <div
                    key={app._id}
                    onClick={() => setSelectedApp(app)}
                    className={`p-4 sm:p-5 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-600/10 border-l-4 border-l-blue-500' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="font-bold text-white text-sm">{app.applicantName}</div>
                        <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{app.position}</span>
                        </div>
                        <div className="text-xs text-slate-400">{app.email}</div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-400">
                          {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Candidate Details */}
        <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 space-y-5">
          {selectedApp ? (
            <>
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Candidate Profile
                </span>
                <h3 className="text-lg font-bold text-white">{selectedApp.applicantName}</h3>
                <p className="text-xs text-blue-400 font-medium">Applied for: {selectedApp.position}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${selectedApp.email}`} className="text-blue-400 underline">
                    {selectedApp.email}
                  </a>
                </div>
                {selectedApp.phone && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{selectedApp.phone}</span>
                  </div>
                )}
                {selectedApp.resumeUrl && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="truncate max-w-[150px]">{selectedApp.resumeFileName || 'Resume / CV'}</span>
                    </div>
                    <a
                      href={selectedApp.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                {selectedApp.portfolioUrl && (
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-400">Portfolio: </span>
                    <a href={selectedApp.portfolioUrl} target="_blank" rel="noreferrer" className="text-blue-400 underline">
                      {selectedApp.portfolioUrl}
                    </a>
                  </div>
                )}
                {selectedApp.linkedinUrl && (
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-400">LinkedIn: </span>
                    <a href={selectedApp.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-400 underline">
                      {selectedApp.linkedinUrl}
                    </a>
                  </div>
                )}
              </div>

              {selectedApp.coverLetter && (
                <div className="space-y-1.5 pt-2">
                  <label className="text-[11px] font-semibold text-slate-400">Cover Letter</label>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                    {selectedApp.coverLetter}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center text-slate-400 text-xs">
              Select an applicant from the list to view their qualifications, resume link, and contact details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

