'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type AttendanceRow = {
  id: string; name: string; email: string; checkIn: string | null; checkOut: string | null;
  activeSeconds: number; idleSeconds: number; breakSeconds: number; trackedSeconds: number;
  status: string; reviewRequired: boolean; manualRequestCount: number;
};

const duration = (seconds: number) => `${Math.floor(seconds / 3600)}h ${Math.floor(seconds % 3600 / 60)}m`;
const time = (value: string | null) => value ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—';

export default function AttendancePage() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [rows, setRows] = useState<AttendanceRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/operations?view=attendance&date=${encodeURIComponent(date)}`, { cache: 'no-store' });
      const data = await response.json();
      if (response.ok) setRows(data.rows || []);
    } finally { setLoading(false); }
  }, [date]);

  useEffect(() => { load(); }, [load]);
  const present = rows.filter((row) => row.status !== 'ABSENT').length;
  const completed = rows.filter((row) => row.status === 'COMPLETED').length;
  const averages = useMemo(() => {
    const attended = rows.filter((row) => row.trackedSeconds > 0);
    return {
      active: attended.length ? attended.reduce((sum, row) => sum + row.activeSeconds, 0) / attended.length : 0,
      breaks: attended.length ? attended.reduce((sum, row) => sum + row.breakSeconds, 0) / attended.length : 0,
    };
  }, [rows]);

  return <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div><h1 className="text-xl font-bold font-display text-[#041f24]">Live Attendance & Shift Audit</h1><p className="text-xs text-[#6f797c] mt-0.5">Real check-in, check-out, active, idle, break and review status</p></div>
      <div className="flex gap-2">
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="border border-[#bec8cc] rounded-lg px-3 py-2 text-xs bg-white" />
        <a href={`/api/admin/reports?from=${date}&to=${date}&format=csv`} className="kr-btn-secondary text-xs flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">download</span>Export CSV</a>
      </div>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[['Present', `${present} / ${rows.length}`, '#0d7d59'], ['Completed', completed, '#041f24'], ['Avg active', duration(averages.active), '#005766'], ['Avg break', duration(averages.breaks), '#b45309']].map(([label, value, color]) => <div key={String(label)} className="kr-card p-5"><span className="text-xs font-semibold text-[#6f797c] uppercase">{label}</span><p className="text-2xl font-extrabold mt-1 tnum" style={{ color: String(color) }}>{value}</p></div>)}
    </div>
    <div className="kr-card overflow-hidden">
      <div className="px-6 py-4 border-b border-[#bec8cc] flex justify-between"><h2 className="text-base font-bold text-[#041f24]">Daily attendance</h2><button onClick={load} className="text-xs text-[#087184] font-bold">Refresh</button></div>
      <div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-[#e0f8ff] uppercase text-[11px]"><tr>{['Employee','Check-in','Check-out','Active','Idle','Break','Tracked','Status'].map((item) => <th key={item} className="py-3 px-4">{item}</th>)}</tr></thead><tbody className="divide-y divide-[#bec8cc]">
        {loading ? <tr><td colSpan={8} className="p-8 text-center">Loading attendance…</td></tr> : rows.map((row) => <tr key={row.id} className="hover:bg-[#f0fbff]"><td className="py-3 px-4"><b>{row.name}</b><div className="text-[10px] text-[#6f797c]">{row.email}</div></td><td className="py-3 px-4 tnum">{time(row.checkIn)}</td><td className="py-3 px-4 tnum">{time(row.checkOut)}</td><td className="py-3 px-4 text-[#0d7d59] font-bold">{duration(row.activeSeconds)}</td><td className="py-3 px-4 text-[#b45309]">{duration(row.idleSeconds)}</td><td className="py-3 px-4">{duration(row.breakSeconds)}</td><td className="py-3 px-4 font-bold">{duration(row.trackedSeconds)}</td><td className="py-3 px-4"><span className={`kr-badge ${row.status === 'ABSENT' ? 'kr-badge-offline' : row.reviewRequired ? 'kr-badge-idle' : 'kr-badge-working'}`}>{row.status.replaceAll('_',' ')}</span>{row.manualRequestCount > 0 && <div className="text-[10px] mt-1 text-[#5644d0]">{row.manualRequestCount} manual request</div>}</td></tr>)}
      </tbody></table></div>
    </div>
  </div>;
}
