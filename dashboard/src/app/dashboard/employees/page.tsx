'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
  email: string;
  status: string;
  currentTask: string;
  trackedTime: string;
  productivity: number;
}

export default function EmployeesListPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('/api/admin/employees');
        if (!res.ok) throw new Error('Failed to load employees');
        const data = await res.json();
        setEmployees(data.employees || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeEmployee = async (employee: Employee) => {
    if (!window.confirm(`Remove ${employee.name}? Their activity, screenshots, and reports will be permanently deleted.`)) return;
    setRemovingId(employee.id);
    setError('');
    try {
      const response = await fetch(`/api/admin/employee/${employee.id}`, { method: 'DELETE' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Could not remove team member');
      setEmployees((current) => current.filter((item) => item.id !== employee.id));
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : 'Could not remove team member');
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-[#041f24]">Employee Directory</h1>
          <p className="text-xs text-[#6f797c] mt-0.5">Manage and audit historical activity for all monitored seats</p>
        </div>
        
        <div className="max-w-xs w-full">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#bec8cc] rounded-lg px-3.5 py-1.5 text-xs text-[#041f24] focus:outline-none focus:border-[#087184]"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-[#ba1a1a] bg-[#ffdad6] p-3 text-xs font-bold text-[#ba1a1a]">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-[#087184] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="kr-card p-8 text-center text-[#6f797c] text-xs">
          No employees found matching "{searchQuery}"
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="kr-card p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#005766] text-white flex items-center justify-center font-bold text-sm">
                    {emp.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`kr-badge ${
                    emp.status === 'ACTIVE'
                      ? 'kr-badge-working'
                      : emp.status === 'IDLE'
                      ? 'kr-badge-idle'
                      : 'kr-badge-offline'
                  }`}>
                    {emp.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold font-display text-[#041f24] mb-0.5">{emp.name}</h3>
                <p className="text-xs text-[#6f797c] mb-4">{emp.email}</p>

                <div className="space-y-2 bg-[#f0fbff] border border-[#bec8cc] p-3.5 rounded-lg text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6f797c] font-medium">Tracked Time</span>
                    <span className="text-[#041f24] font-bold tnum">{emp.trackedTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6f797c] font-medium">Productivity Level</span>
                    <span className="text-[#087184] font-bold tnum">{emp.productivity}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-2 pt-2 border-t border-[#bec8cc]">
                <Link
                  href={`/dashboard/employees/${emp.id}`}
                  className="kr-btn-secondary text-xs text-center py-1.5"
                >
                  View Activity
                </Link>
                <button
                  type="button"
                  onClick={() => removeEmployee(emp)}
                  disabled={removingId === emp.id}
                  className="px-3 py-1.5 rounded-md border border-[#ba1a1a] bg-[#ffdad6] text-xs font-bold text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white transition-colors"
                >
                  {removingId === emp.id ? 'Removing…' : 'Remove'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
