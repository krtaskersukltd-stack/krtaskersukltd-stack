'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DESKTOP_INSTALLER_FILENAME, DESKTOP_INSTALLER_PATH, DESKTOP_VERSION } from '@/lib/desktop-release';

interface Employee {
  id: string;
  name: string;
  email: string;
  trackedTime: string;
  status: string;
  currentTask: string;
  productivity: number;
  idleSeconds: number;
  currentIdleSeconds: number;
  longIdle: boolean;
  breakSeconds: number;
  lastSeen?: string;
}

export default function DashboardOverview() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [companyId, setCompanyId] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userRes = await fetch('/api/auth/me');
      if (!userRes.ok) {
        router.push('/login');
        return;
      }
      const userData = await userRes.json();
      if (userData.user.role !== 'ADMIN') {
        router.push('/login');
        return;
      }

      const empRes = await fetch('/api/admin/employees');
      if (!empRes.ok) {
        throw new Error('Failed to load employee activity');
      }
      const empData = await empRes.json();
      setEmployees(empData.employees);
      setCompanyId(empData.companyId);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyCompanyId = () => {
    navigator.clipboard.writeText(companyId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSeconds = (seconds = 0) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${String(secs).padStart(2, '0')}s`;
  };

  const activeCount = employees.filter((e) => e.status === 'ACTIVE').length;
  const idleCount = employees.filter((e) => e.status === 'IDLE').length;
  const breakCount = employees.filter((e) => e.status === 'BREAK').length;
  const offlineCount = employees.length - activeCount - idleCount - breakCount;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-9 h-9 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="mt-3 text-xs text-on-surface-variant font-semibold">Loading KR Tasker Enterprise Portal...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Invite Code Banner Card */}
      {companyId && (
        <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-surface-container text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">vpn_key</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-on-surface-variant">Company Invite Code</p>
              <code className="text-base font-bold font-mono text-primary tracking-wider">{companyId}</code>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyCompanyId}
              className="bg-surface-container-low text-primary text-xs font-semibold px-4 py-2.5 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">content_copy</span>
              <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
            </button>
            <a
              href={DESKTOP_INSTALLER_PATH}
              download={DESKTOP_INSTALLER_FILENAME}
              className="bg-primary text-on-primary text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-container transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Download Tracker v{DESKTOP_VERSION}</span>
            </a>
          </div>
        </div>
      )}

      {/* Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Staff</span>
            <span className="material-symbols-outlined text-emerald-600">check_circle</span>
          </div>
          <p className="text-3xl font-bold font-display text-on-surface">{activeCount}</p>
          <p className="text-xs text-on-surface-variant mt-1">out of {employees.length} monitored staff</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Currently Idle</span>
            <span className="material-symbols-outlined text-amber-600">schedule</span>
          </div>
          <p className="text-3xl font-bold font-display text-on-surface">{idleCount}</p>
          <p className="text-xs text-on-surface-variant mt-1">idle warning threshold</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">On Break</span>
            <span className="material-symbols-outlined text-rose-600">pause_circle</span>
          </div>
          <p className="text-3xl font-bold font-display text-on-surface">{breakCount}</p>
          <p className="text-xs text-on-surface-variant mt-1">running break time</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Offline Agents</span>
            <span className="material-symbols-outlined text-on-surface-variant">power_off</span>
          </div>
          <p className="text-3xl font-bold font-display text-on-surface">{offlineCount}</p>
          <p className="text-xs text-on-surface-variant mt-1">agents currently logged out</p>
        </div>
      </div>

      {/* High-Density Employee Activity Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/70 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/60 flex items-center justify-between bg-surface-container-low/20">
          <div>
            <h2 className="text-base font-bold font-display text-on-surface">Employee Operational Roster</h2>
            <p className="text-xs text-on-surface-variant">Real-time status, active tasks, and productivity monitoring</p>
          </div>
          <Link href="/dashboard/employees" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            View All Roster
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        {employees.length === 0 ? (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">badge</span>
            <h3 className="text-sm font-bold text-on-surface font-display">No Employee Agents Connected</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1 mb-4">
              Share your Invite Code to start receiving live desktop activity streams.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Active Task</th>
                  <th className="py-3 px-4">Today's Hours</th>
                  <th className="py-3 px-4">Idle Time</th>
                  <th className="py-3 px-4">Productivity</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs font-display">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <Link href={`/dashboard/employees/${emp.id}`} className="font-bold text-on-surface hover:text-primary font-display">
                            {emp.name}
                          </Link>
                          <p className="text-[11px] text-on-surface-variant">{emp.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          emp.status === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-800'
                            : emp.status === 'IDLE'
                            ? 'bg-amber-100 text-amber-800'
                            : emp.status === 'BREAK'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {emp.status === 'ACTIVE' ? 'check_circle' : emp.status === 'IDLE' ? 'schedule' : emp.status === 'BREAK' ? 'pause' : 'power_off'}
                        </span>
                        {emp.longIdle ? 'LONG IDLE' : emp.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs truncate font-medium text-on-surface-variant">
                      {emp.status === 'BREAK'
                        ? `On break · ${formatSeconds(emp.breakSeconds)}`
                        : emp.status === 'IDLE'
                        ? `Idle now · ${formatSeconds(emp.currentIdleSeconds)}`
                        : emp.status !== 'OFFLINE'
                        ? emp.currentTask
                        : 'Offline'}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-on-surface font-mono">{emp.trackedTime}</td>

                    <td className="py-3.5 px-4 text-amber-700 font-medium font-mono">
                      {formatSeconds(emp.idleSeconds)}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-surface-container rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${Math.min(100, Math.max(0, emp.productivity))}%` }}
                          />
                        </div>
                        <span className="font-bold text-xs text-on-surface font-mono">{emp.productivity}%</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/dashboard/employees/${emp.id}`}
                        className="bg-surface-container-low hover:bg-surface-container text-primary font-bold text-[11px] py-1 px-3 rounded-lg border border-outline-variant transition-colors"
                      >
                        Detail Logs
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
