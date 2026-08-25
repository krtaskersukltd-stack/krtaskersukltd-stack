'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
  email: string;
}

interface Metric {
  trackedTimeStr: string;
  totalMinutes: number;
  activeMinutes: number;
  idleMinutes: number;
  trackedSeconds: number;
  activeSeconds: number;
  idleSeconds: number;
  breakSeconds: number;
  breakTimeStr: string;
  productivity: number;
  totalKeystrokes?: number;
  totalMouseClicks?: number;
}

interface ActivityLog {
  id: string;
  timestamp: string;
  status: string;
  currentTask: string;
  keystrokes?: number;
  mouseClicks?: number;
}

interface Screenshot {
  id: string;
  timestamp: string;
  filePath: string;
  activityRate: number;
  currentTask: string;
  keystrokes?: number;
  mouseClicks?: number;
}

interface TopApp {
  process: string;
  title: string;
  minutes: number;
  percentage: number;
}

interface WorkReport {
  id: string;
  type: 'BREAK' | 'STOP';
  note: string;
  emailSent: boolean;
  createdAt: string;
  endedAt?: string | null;
  durationSeconds?: number | null;
}

export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id: employeeId } = use(params);

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [metrics, setMetrics] = useState<Metric | null>(null);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [topApps, setTopApps] = useState<TopApp[]>([]);
  const [workReports, setWorkReports] = useState<WorkReport[]>([]);

  const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lightboxImage, setLightboxImage] = useState<Screenshot | null>(null);

  useEffect(() => {
    fetchEmployeeLogs();
  }, [selectedDate]);

  const fetchEmployeeLogs = async () => {
    setLoading(true);
    try {
      const userRes = await fetch('/api/auth/me');
      if (!userRes.ok) {
        router.push('/login');
        return;
      }

      const logRes = await fetch(`/api/admin/employee/${employeeId}?date=${selectedDate}`);
      if (!logRes.ok) {
        throw new Error('Failed to fetch detailed employee data');
      }

      const logData = await logRes.json();
      setEmployee(logData.employee);
      setMetrics(logData.metrics);
      setScreenshots(logData.screenshots);
      setActivityLogs(logData.activityLogs);
      setTopApps(logData.topApps || []);
      setWorkReports(logData.workReports || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderHourlyTimeline = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return hours.map((hour) => {
      const hourLogs = activityLogs.filter((log) => {
        const date = new Date(log.timestamp);
        return date.getHours() === hour;
      });

      const blocks = Array.from({ length: 6 }, (_, blockIndex) => {
        const startMin = blockIndex * 10;
        const endMin = startMin + 9;
        
        const blockLogs = hourLogs.filter((log) => {
          const minutes = new Date(log.timestamp).getMinutes();
          return minutes >= startMin && minutes <= endMin;
        });

        let statusBg = 'bg-[#e0f8ff]';
        let tooltip = `${String(hour).padStart(2, '0')}:${String(startMin).padStart(2, '0')} - Offline`;

        if (blockLogs.length > 0) {
          const activeCount = blockLogs.filter((l) => l.status === 'ACTIVE').length;
          const currentTask = blockLogs[blockLogs.length - 1].currentTask;
          
          if (activeCount > 0) {
            statusBg = 'bg-[#0d7d59]';
            tooltip = `${String(hour).padStart(2, '0')}:${String(startMin).padStart(2, '0')} - Active (${currentTask})`;
          } else {
            statusBg = 'bg-[#b45309]';
            tooltip = `${String(hour).padStart(2, '0')}:${String(startMin).padStart(2, '0')} - Idle (${currentTask})`;
          }
        }

        return (
          <div
            key={blockIndex}
            className={`flex-1 h-5 ${statusBg} border-r border-white/40 cursor-pointer`}
            title={tooltip}
          />
        );
      });

      const hourLabel = `${String(hour).padStart(2, '0')}:00`;

      return (
        <div key={hour} className="flex flex-col items-center gap-1 min-w-[64px] flex-1">
          <div className="w-full flex rounded overflow-hidden border border-[#bec8cc]">
            {blocks}
          </div>
          <span className="text-[10px] text-[#6f797c] font-bold tnum">{hourLabel}</span>
        </div>
      );
    });
  };

  const formatScreenshotTime = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading && !employee) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#087184] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-xs text-[#6f797c] font-semibold">Loading Employee Activity Audit...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/employees" className="kr-btn-secondary text-xs flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Directory</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#6f797c]">Audit Date:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-white border border-[#bec8cc] text-xs font-bold text-[#041f24] px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#087184]"
          />
        </div>
      </div>

      {employee && (
        <div className="kr-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#005766] text-white flex items-center justify-center font-bold text-lg">
            {employee.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-lg font-bold font-display text-[#041f24]">{employee.name}</h1>
            <p className="text-xs text-[#6f797c]">{employee.email}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-[#ffdad6] border border-[#ba1a1a] text-[#ba1a1a] text-xs font-bold rounded-lg p-3">
          {error}
        </div>
      )}

      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="kr-card p-4">
            <span className="text-[10px] font-semibold text-[#6f797c] uppercase">Tracked Time</span>
            <p className="text-xl font-bold font-display text-[#041f24] mt-1 tnum">{metrics.trackedTimeStr}</p>
          </div>
          <div className="kr-card p-4">
            <span className="text-[10px] font-semibold text-[#6f797c] uppercase">Productivity</span>
            <p className="text-xl font-bold font-display text-[#0d7d59] mt-1 tnum">{metrics.productivity}%</p>
          </div>
          <div className="kr-card p-4">
            <span className="text-[10px] font-semibold text-[#6f797c] uppercase">Active Time</span>
            <p className="text-xl font-bold font-display text-[#005766] mt-1 tnum">{Math.floor(metrics.activeSeconds / 60)}m</p>
          </div>
          <div className="kr-card p-4">
            <span className="text-[10px] font-semibold text-[#6f797c] uppercase">Idle Time</span>
            <p className="text-xl font-bold font-display text-[#b45309] mt-1 tnum">{Math.floor(metrics.idleSeconds / 60)}m</p>
          </div>
          <div className="kr-card p-4">
            <span className="text-[10px] font-semibold text-[#6f797c] uppercase">Keystrokes</span>
            <p className="text-xl font-bold font-display text-[#041f24] mt-1 tnum">{(metrics.totalKeystrokes || 0).toLocaleString()}</p>
          </div>
          <div className="kr-card p-4">
            <span className="text-[10px] font-semibold text-[#6f797c] uppercase">Mouse Clicks</span>
            <p className="text-xl font-bold font-display text-[#5644d0] mt-1 tnum">{(metrics.totalMouseClicks || 0).toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Hourly Timeline */}
      <div className="kr-card p-5 space-y-4">
        <h2 className="text-sm font-bold font-display text-[#041f24] flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-[#005766]">timeline</span>
          <span>Activity Timeline Audit</span>
        </h2>
        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {renderHourlyTimeline()}
        </div>
      </div>

      {/* Screenshots Gallery */}
      <div className="kr-card p-5 space-y-4">
        <h2 className="text-sm font-bold font-display text-[#041f24] flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-[#005766]">photo_library</span>
          <span>Captured Screenshot Logs ({screenshots.length})</span>
        </h2>

        {screenshots.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#6f797c]">
            No screenshots captured on this date.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {screenshots.map((shot) => (
              <div
                key={shot.id}
                className="kr-card overflow-hidden cursor-pointer hover:border-[#087184] transition-all group"
                onClick={() => setLightboxImage(shot)}
              >
                <div className="relative aspect-video bg-[#f0fbff]">
                  <img src={shot.filePath} alt="Screenshot log" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-[#041f24]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {formatScreenshotTime(shot.timestamp)}
                  </span>
                </div>
                <div className="p-3 flex items-center justify-between text-xs">
                  <span className="text-[#3f484b] truncate font-medium max-w-[140px]">{shot.currentTask}</span>
                  <span className="kr-badge kr-badge-working text-[10px]">
                    {shot.activityRate}% Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
          <div className="bg-white rounded-xl p-4 max-w-4xl w-full space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#041f24]">Captured at {new Date(lightboxImage.timestamp).toLocaleTimeString()}</span>
              <button onClick={() => setLightboxImage(null)} className="text-[#6f797c] hover:text-[#ba1a1a] p-1">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <img src={lightboxImage.filePath} alt="Screenshot fullscreen" className="w-full max-h-[70vh] object-contain rounded-lg border border-[#bec8cc]" />
            <div className="flex justify-between text-xs font-medium text-[#3f484b]">
              <span>Task: {lightboxImage.currentTask}</span>
              <span>Keystrokes: {lightboxImage.keystrokes || 0} | Clicks: {lightboxImage.mouseClicks || 0}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
