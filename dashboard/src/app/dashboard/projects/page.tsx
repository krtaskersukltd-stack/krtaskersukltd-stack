'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';

type Project = { id:string; name:string; code:string|null; status:string; tasks:{id:string;status:string;assignedUserId:string|null}[] };

export default function ProjectsPage() {
  const [projects,setProjects]=useState<Project[]>([]); const [name,setName]=useState(''); const [code,setCode]=useState(''); const [saving,setSaving]=useState(false);
  const load=useCallback(async()=>{const response=await fetch('/api/admin/operations',{cache:'no-store'});const data=await response.json();if(response.ok)setProjects(data.projects||[]);},[]);
  useEffect(()=>{load();},[load]);
  const create=async(event:FormEvent)=>{event.preventDefault();setSaving(true);try{const response=await fetch('/api/admin/operations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'CREATE_PROJECT',name,code})});if(response.ok){setName('');setCode('');await load();}}finally{setSaving(false);}};
  return <div className="space-y-6">
    <div><h1 className="text-xl font-bold text-[#041f24]">Projects</h1><p className="text-xs text-[#6f797c] mt-0.5">Real projects connected to assigned tasks and tracked work</p></div>
    <form onSubmit={create} className="kr-card p-4 flex flex-col sm:flex-row gap-3"><input required minLength={2} value={name} onChange={(e)=>setName(e.target.value)} placeholder="Project name" className="border border-[#bec8cc] rounded-lg px-3 py-2 text-xs flex-1"/><input value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Client/code (optional)" className="border border-[#bec8cc] rounded-lg px-3 py-2 text-xs"/><button disabled={saving} className="kr-btn-primary text-xs">{saving?'Creating…':'Create project'}</button></form>
    {projects.length===0?<div className="kr-card p-8 text-center text-xs text-[#6f797c]">Create your first project, then assign tasks from the Tasks page.</div>:<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{projects.map((project)=>{const done=project.tasks.filter((task)=>task.status==='DONE').length;const progress=project.tasks.length?Math.round(done/project.tasks.length*100):0;const assigned=new Set(project.tasks.map((task)=>task.assignedUserId).filter(Boolean)).size;return <div key={project.id} className="kr-card p-5 space-y-4"><div className="flex justify-between"><div><h3 className="font-bold text-[#041f24]">{project.name}</h3><p className="text-[10px] text-[#6f797c]">{project.code||'No project code'}</p></div><span className="kr-badge kr-badge-working">{project.status}</span></div><div className="h-2 bg-[#d8f2fa] rounded"><div className="h-full bg-[#0d7d59] rounded" style={{width:`${progress}%`}}/></div><div className="grid grid-cols-3 text-center text-xs"><div><b>{project.tasks.length}</b><span className="block text-[10px] text-[#6f797c]">Tasks</span></div><div><b>{done}</b><span className="block text-[10px] text-[#6f797c]">Done</span></div><div><b>{assigned}</b><span className="block text-[10px] text-[#6f797c]">People</span></div></div></div>;})}</div>}
  </div>;
}
