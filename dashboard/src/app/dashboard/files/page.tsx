'use client';

import { useState } from 'react';

type FileItem = {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'archive' | 'doc';
  uploadedBy: string;
  date: string;
  category: 'Designs' | 'Reports' | 'Assets' | 'Docs';
};

const FILES: FileItem[] = [
  { id: '1', name: 'KR_Tasker_Design_System_Stitch.pdf', size: '4.2 MB', type: 'pdf', uploadedBy: 'Rida Ramzan', date: '25 Aug 2026', category: 'Designs' },
  { id: '2', name: 'Desktop_Tracker_Installer_v1.3.0.exe', size: '77.6 MB', type: 'archive', uploadedBy: 'Rizwan Ramzan', date: '24 Aug 2026', category: 'Assets' },
  { id: '3', name: 'Monthly_Attendance_Audit_August.xlsx', size: '1.1 MB', type: 'doc', uploadedBy: 'Abdul Saboor', date: '24 Aug 2026', category: 'Reports' },
  { id: '4', name: 'Company_Brand_Assets_Pack.zip', size: '14.8 MB', type: 'archive', uploadedBy: 'Rida Ramzan', date: '20 Aug 2026', category: 'Assets' },
  { id: '5', name: 'Employee_Shift_Policy_2026.pdf', size: '520 KB', type: 'pdf', uploadedBy: 'Rizwan Ramzan', date: '15 Aug 2026', category: 'Docs' },
];

export default function FilesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFiles = FILES.filter(file => {
    const matchesCat = selectedCategory === 'ALL' || file.category.toUpperCase() === selectedCategory;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 w-full">
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface font-display">Files Vault & Storage Repository</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">Securely store, organize, and share enterprise documents, installer builds, and design assets</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-primary text-on-primary text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary-container shadow-xs transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-base">upload_file</span>
            Upload File
          </button>
        </div>
      </div>

      {/* Storage Vault Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/70 shadow-xs">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Total Vault Usage</span>
          <h2 className="text-xl font-bold text-on-surface mt-1 font-display">98.2 MB / 10 GB</h2>
          <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-primary h-full w-[10%]" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/70 shadow-xs">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Design Assets</span>
          <h2 className="text-xl font-bold text-primary mt-1 font-display">4.2 MB</h2>
          <span className="text-xs text-on-surface-variant">1 Design PDF</span>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/70 shadow-xs">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Software Builds</span>
          <h2 className="text-xl font-bold text-secondary mt-1 font-display">92.4 MB</h2>
          <span className="text-xs text-on-surface-variant">2 Installers</span>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/70 shadow-xs">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Company Policies</span>
          <h2 className="text-xl font-bold text-on-surface mt-1 font-display">1.6 MB</h2>
          <span className="text-xs text-on-surface-variant">2 Documents</span>
        </div>
      </div>

      {/* Category Filter & Search Bar */}
      <div className="bg-surface-container-lowest p-4 mb-6 rounded-xl border border-outline-variant/70 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'DESIGNS', 'REPORTS', 'ASSETS', 'DOCS'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search files by name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant"
          />
        </div>
      </div>

      {/* Files List Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/70 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant font-bold">
                <th className="p-3.5">File Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Size</th>
                <th className="p-3.5">Uploaded By</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                    No files found matching your search.
                  </td>
                </tr>
              ) : (
                filteredFiles.map(file => (
                  <tr key={file.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3.5 font-bold text-on-surface flex items-center gap-2.5">
                      <span className="p-1.5 rounded bg-surface-container text-primary font-mono text-[10px] uppercase font-bold">
                        {file.type}
                      </span>
                      {file.name}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-surface-container-high text-primary">
                        {file.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-on-surface-variant font-mono">{file.size}</td>
                    <td className="p-3.5 text-on-surface font-medium">{file.uploadedBy}</td>
                    <td className="p-3.5 text-on-surface-variant">{file.date}</td>
                    <td className="p-3.5 text-right">
                      <button className="text-primary hover:underline font-semibold flex items-center gap-1 justify-end ml-auto cursor-pointer">
                        <span className="material-symbols-outlined text-base">download</span>
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
