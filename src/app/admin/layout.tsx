'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Users,
  Briefcase,
  Boxes,
  Layers,
  FolderGit2,
  BookOpen,
  Search,
  Settings,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Menu,
  X
} from 'lucide-react';
import { getAdminAuthSession, adminLogout } from '@/lib/api/client';
import { COMPANY_INFO } from '@/config/company';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Inbound Leads', href: '/admin/leads', icon: Inbox },
  { name: 'Job Applications', href: '/admin/applications', icon: Users },
  { name: 'Products', href: '/admin/products', icon: Boxes },
  { name: 'Services', href: '/admin/services', icon: Layers },
  { name: 'Portfolio', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Blog & Articles', href: '/admin/blogs', icon: BookOpen },
  { name: 'Careers & Jobs', href: '/admin/jobs', icon: Briefcase },
  { name: 'SEO Settings', href: '/admin/seo', icon: Search },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<{ token: string | null; user: any | null }>({ token: null, user: null });
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const s = getAdminAuthSession();
    setSession(s);
    setLoading(false);

    if (!isLoginPage && !s.token) {
      router.push('/admin/login');
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    adminLogout();
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#070B14] text-slate-100">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070B14] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Verifying administrator credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900/80 border-b border-white/10 sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-400/30 shrink-0 shadow-md">
            <Image
              src="/logo.png"
              alt="CodiumZen IT Logo"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="font-bold text-white text-base">CodiumZen Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0A0F1D] border-r border-white/10 flex flex-col transform transition-transform duration-200 md:static md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-400/30 shadow-md shadow-blue-500/20 shrink-0">
              <Image
                src="/logo.png"
                alt="CodiumZen IT Logo"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-wide">CodiumZen IT</div>
              <div className="text-[11px] text-blue-400 font-mono">Control Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-blue-600/20 text-[#60A5FA] border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#60A5FA]' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
            <div className="text-slate-400">Logged in as</div>
            <div className="font-semibold text-white truncate">{session.user?.fullName || session.user?.username || 'Administrator'}</div>
            <div className="text-[10px] text-emerald-400 font-mono uppercase">{session.user?.role || 'admin'}</div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-medium transition-colors border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

