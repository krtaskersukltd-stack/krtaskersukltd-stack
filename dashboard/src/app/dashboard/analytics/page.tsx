'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type Row = { id:string; name:string; trackedSeconds:number; activeSeconds:number; idleSeconds:number; breakSeconds:number; manualSeconds:number; productivity:number; reviewRequired:boolean };
type AppUsage = { name:string; seconds:number; category:string };
const hours = (seconds:number) => `${(seconds / 3600).toFixed(1)}h`;

export default function AnalyticsPage() {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 6 * 86400000);
  const [from, setFrom] = useState(weekAgo.toISOString().slice(0,10));
  const [to, setTo] = useState(today.toISOString().slice(0,10));
  const [rows, setRows] = useState<Row[]>([]);
  const [apps, setApps] = useState<AppUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try { const response = await fetch(`/api/admin/reports?from=${from}&to=${to}`, { cache:'no-store' }); const data = await response.json(); if(response.ok){ setRows(data.rows||[]); setApps(data.appUsage||[]); } } finally { setLoading(false); }
  }, [from,to]);
  useEffect(() => { load(); }, [load]);
  const totals = useMemo(() => ({
    tracked: rows.reduce((sum,row)=>sum+row.trackedSeconds,0),
    idle: rows.reduce((sum,row)=>sum+row.idleSeconds,0),
    productivity: rows.length ? Math.round(rows.reduce((sum,row)=>sum+row.productivity,0)/rows.length) : 0,
    flagged: rows.filter((row)=>row.reviewRequired).length,
  }), [rows]);
  const maxApp = Math.max(1, ...apps.map((app)=>app.seconds));

  return <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 className="text-xl font-bold text-[#041f24]">Operational Analytics</h1><p className="text-xs text-[#6f797c] mt-0.5">Rated productivity, tracked hours, idle time and app usage</p></div><div className="flex flex-wrap gap-2"><input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} className="border rounded-lg px-2 text-xs"/><input type="date" value={to} onChange={(e)=>setTo(e.target.value)} className="border rounded-lg px-2 text-xs"/><a href={`/api/admin/reports?from=${from}&to=${to}&format=csv`} className="kr-btn-secondary text-xs">Export CSV</a></div></div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[['Rated productivity',`${totals.productivity}%`],['Tracked',hours(totals.tracked)],['Idle',hours(totals.idle)],['Needs review',totals.flagged]].map(([label,value])=><div className="kr-card p-5" key={String(label)}><span className="text-xs uppercase font-semibold text-[#6f797c]">{label}</span><p className="text-2xl font-extrabold text-[#005766] mt-1">{value}</p></div>)}</div>
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="kr-card p-5"><h2 className="font-bold text-[#041f24] mb-4">Employee performance</h2><div className="space-y-3">{loading ? 'Loading…' : rows.map((row)=><div key={row.id} className="border-b border-[#e3e8ea] pb-3"><div className="flex justify-between text-xs"><b>{row.name}</b><span>{row.productivity}% rated · {hours(row.trackedSeconds)} tracked</span></div><div className="h-2 bg-[#e0f8ff] rounded mt-2"><div className="h-full bg-[#0d7d59] rounded" style={{width:`${row.productivity}%`}}/></div><div className="text-[10px] text-[#6f797c] mt-1">Active {hours(row.activeSeconds)} · Idle {hours(row.idleSeconds)} · Break {hours(row.breakSeconds)} · Manual {hours(row.manualSeconds)}</div></div>)}</div></div>
      <div className="kr-card p-5"><h2 className="font-bold text-[#041f24] mb-4">Top apps & productivity category</h2><div className="space-y-3">{apps.length===0?<p className="text-xs text-[#6f797c]">No rated app activity in this period.</p>:apps.map((app)=><div key={app.name}><div className="flex justify-between text-xs"><span className="truncate max-w-[65%]">{app.name}</span><b className={app.category==='PRODUCTIVE'?'text-[#0d7d59]':app.category==='UNPRODUCTIVE'?'text-[#b45309]':'text-[#6f797c]'}>{app.category} · {hours(app.seconds)}</b></div><div className="h-1.5 bg-[#e0f8ff] rounded mt-1"><div className="h-full bg-[#087184] rounded" style={{width:`${Math.round(app.seconds/maxApp*100)}%`}}/></div></div>)}</div></div>
    </div>
  </div>;
}
