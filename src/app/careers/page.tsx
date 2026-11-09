'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { Job } from '@/types';
import { fetchJobs, submitJobApplication } from '@/lib/api/client';

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    resumeUrl: '',
    resumeFileName: '',
    coverLetter: '',
    portfolioUrl: '',
    linkedinUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    const position = selectedJob ? selectedJob.title : 'General Engineering Candidate';
    const res = await submitJobApplication({
      position,
      jobId: selectedJob?.id || selectedJob?._id,
      ...formData
    });

    setLoading(false);
    if (res.ok) {
      setStatusMsg({ text: res.message || 'Application submitted successfully!', isError: false });
      setFormData({
        applicantName: '',
        email: '',
        phone: '',
        resumeUrl: '',
        resumeFileName: '',
        coverLetter: '',
        portfolioUrl: '',
        linkedinUrl: ''
      });
      setSelectedJob(null);
    } else {
      setStatusMsg({ text: res.message || 'Failed to submit application. Please check your information.', isError: true });
    }
  };

  return (
    <div className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">
          Join CodiumZen IT
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Careers &amp; Engineering Opportunities
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Build high-impact digital products, browser automation tools, and scalable cloud systems.
        </p>
      </div>

      {/* Open Positions List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#60A5FA]" />
          <span>Active Openings ({jobs.length})</span>
        </h2>

        {jobs.length === 0 ? (
          <div className="cz-glass rounded-2xl p-8 text-center text-slate-400">
            No active public openings at this moment. You can submit a general application below.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <div
                key={job.slug}
                className="cz-glass rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#4263EB]/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-slate-300 font-medium">
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {job.employmentType}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                  <p className="text-sm text-slate-300 max-w-2xl">{job.overview}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob(job);
                    const formElement = document.getElementById('applySection');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-full bg-[#4263EB] hover:bg-[#364FC7] text-white text-xs font-bold transition-all shrink-0"
                >
                  Apply for this Role &rarr;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Form */}
      <div id="applySection" className="cz-glass rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {selectedJob ? `Apply for ${selectedJob.title}` : 'General Career Application'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Submit your resume and contact details directly to our engineering hiring team.
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4263EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
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
                LinkedIn Profile / GitHub URL
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4263EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Resume Link (Google Drive / Dropbox / PDF URL)
            </label>
            <input
              type="url"
              value={formData.resumeUrl}
              onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              placeholder="https://drive.google.com/your-resume-link"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4263EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Cover Letter / Brief Intro
            </label>
            <textarea
              rows={4}
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              placeholder="Tell us about your technical background and why you want to build products with CodiumZen IT..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4263EB]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#4263EB] to-[#8B5CF6] text-white font-bold text-sm shadow-xl hover:shadow-[#4263EB]/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <span>Submitting Profile...</span> : <span>Submit Career Application</span>}
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
