'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { DESKTOP_INSTALLER_FILENAME, DESKTOP_INSTALLER_PATH, DESKTOP_VERSION } from '@/lib/desktop-release';

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [adminName, setAdminName] = useState('Admin User');
  const [adminEmail, setAdminEmail] = useState('admin@krtasker.com');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        if (data?.user?.name) setAdminName(data.user.name);
        if (data?.user?.email) setAdminEmail(data.user.email);
      } catch (err) {
        console.error(err);
      }
    };
    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/login');
    router.refresh();
  };

  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: 'grid_view' },
    { name: 'Employees', href: '/dashboard/employees', icon: 'group' },
    { name: 'Departments', href: '/dashboard/departments', icon: 'domain' },
    { name: 'Tasks', href: '/dashboard/tasks', icon: 'check_box' },
    { name: 'Attendance', href: '/dashboard/attendance', icon: 'schedule' },
    { name: 'Projects', href: '/dashboard/projects', icon: 'folder' },
    { name: 'Calendar', href: '/dashboard/calendar', icon: 'calendar_month' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: 'analytics' },
    { name: 'Meetings', href: '/dashboard/meetings', icon: 'videocam' },
    { name: 'Chat', href: '/dashboard/chat', icon: 'forum' },
    { name: 'Files Vault', href: '/dashboard/files', icon: 'inventory_2' },
    { name: 'Settings', href: '/dashboard/settings', icon: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-surface text-on-surface font-sans overflow-hidden">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 h-16 border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-50 w-full">
        <div className="flex items-center gap-2">
          <img src="/Logo.svg" alt="KR Tasker Logo" className="h-7 object-contain" />
          <span className="font-bold text-lg text-primary font-display">KR Tasker</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-on-surface-variant hover:text-on-surface p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      {/* Sidebar - Stitch Specs (248px Width) */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-[248px] border-r border-outline-variant/70 bg-surface flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static md:h-screen shrink-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col flex-1 overflow-y-auto py-5 px-4">
          {/* Brand Header */}
          <div className="flex items-center justify-between mb-6 px-2">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <img src="/Logo.svg" alt="KR Tasker Logo" className="h-8 object-contain" />
              <div>
                <h1 className="font-bold text-lg text-primary font-display leading-tight">KR Tasker</h1>
                <p className="text-[10px] font-semibold text-on-surface-variant">Enterprise Hub</p>
              </div>
            </Link>
            <button className="md:hidden text-on-surface-variant p-1 cursor-pointer" onClick={() => setIsMobileOpen(false)}>
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer
                    ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-xs font-bold'
                        : 'text-on-surface hover:bg-surface-container-high hover:text-on-surface'
                    }
                  `}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer & Profile Block */}
        <div className="p-4 border-t border-outline-variant/60 space-y-3 bg-surface-container-low/40">
          <a
            href={DESKTOP_INSTALLER_PATH}
            download={DESKTOP_INSTALLER_FILENAME}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-primary bg-surface-container hover:bg-surface-container-high border border-outline-variant transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Installer v{DESKTOP_VERSION}</span>
          </a>

          {/* Profile Card */}
          <div className="flex items-center justify-between p-2.5 bg-surface-container-lowest border border-outline-variant/70 rounded-xl shadow-xs">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs font-display">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-on-surface truncate font-display">{adminName}</p>
                <p className="text-[10px] text-on-surface-variant truncate">{adminEmail}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-on-surface-variant hover:text-error p-1.5 transition-colors cursor-pointer rounded-lg hover:bg-surface-container-high"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header - 64px Height */}
        <header className="h-[64px] border-b border-outline-variant/60 bg-surface-container-lowest px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold font-display text-on-surface capitalize">
              {pathname === '/dashboard'
                ? 'Overview Dashboard'
                : pathname.replace('/dashboard/', '').replace(/-/g, ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-sm">search</span>
              <input
                type="text"
                placeholder="Search employees, tasks..."
                className="w-full pl-9 pr-4 py-1.5 bg-surface border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none focus:border-primary placeholder:text-on-surface-variant"
              />
            </div>
            <button className="relative p-2 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 overflow-y-auto p-6 bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}
