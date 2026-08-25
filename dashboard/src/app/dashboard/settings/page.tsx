'use client';

import { FormEvent, useEffect, useState } from 'react';

type Settings = {
  screenshotInterval: number;
  idleLimitMinutes: number;
  timezone: string;
  workDays: string;
  shiftStartMinutes: number;
  shiftEndMinutes: number;
  targetMinutes: number;
  maxShiftMinutes: number;
  maxBreakMinutes: number;
  screenshotRetentionDays: number;
  manualTimeRequiresApproval: boolean;
};

type Rule = {
  id: string;
  pattern: string;
  matchType: string;
  category: string;
};

const defaults: Settings = {
  screenshotInterval: 10,
  idleLimitMinutes: 10,
  timezone: 'Asia/Karachi',
  workDays: '1,2,3,4,5,6',
  shiftStartMinutes: 540,
  shiftEndMinutes: 1080,
  targetMinutes: 540,
  maxShiftMinutes: 720,
  maxBreakMinutes: 60,
  screenshotRetentionDays: 30,
  manualTimeRequiresApproval: true,
};

const timeValue = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

const fromTime = (value: string) => {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [rules, setRules] = useState<Rule[]>([]);
  const [pattern, setPattern] = useState('');
  const [category, setCategory] = useState('PRODUCTIVE');
  const [matchType, setMatchType] = useState('PROCESS');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const [settingRes, opsRes] = await Promise.all([
      fetch('/api/admin/settings', { cache: 'no-store' }),
      fetch('/api/admin/operations', { cache: 'no-store' }),
    ]);
    if (settingRes.ok) setSettings({ ...defaults, ...(await settingRes.json()) });
    if (opsRes.ok) setRules((await opsRes.json()).rules || []);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...settings, applyToAll: true }),
      });
      const data = await response.json();
      setMessage(response.ok ? 'Settings saved and applied to all employees.' : data.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const ruleAction = async (payload: Record<string, unknown>) => {
    await fetch('/api/admin/operations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setPattern('');
    await load();
  };

  const field = (key: keyof Settings, value: string | number | boolean) =>
    setSettings((current) => ({ ...current, [key]: value }));

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-on-surface font-display">Tracking & Shift Policies</h1>
        <p className="text-xs text-on-surface-variant mt-0.5">
          Company-wide activity limits, screenshot retention, manual time approvals, and productivity rules
        </p>
      </div>

      {message && (
        <div className="bg-surface-container-low border border-primary/20 text-primary p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{message}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={save} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/70 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-on-surface font-display flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">tune</span>
          Operational Policy Parameters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider">
              Screenshot Interval (Minutes)
            </label>
            <input
              type="number"
              min={1}
              max={60}
              value={settings.screenshotInterval}
              onChange={(e) => field('screenshotInterval', Number(e.target.value))}
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider">
              Long-Idle Threshold (Minutes)
            </label>
            <input
              type="number"
              min={1}
              max={120}
              value={settings.idleLimitMinutes}
              onChange={(e) => field('idleLimitMinutes', Number(e.target.value))}
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider">
              Screenshot Retention (Days)
            </label>
            <input
              type="number"
              min={1}
              max={365}
              value={settings.screenshotRetentionDays}
              onChange={(e) => field('screenshotRetentionDays', Number(e.target.value))}
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider">
              Shift Start Time
            </label>
            <input
              type="time"
              value={timeValue(settings.shiftStartMinutes)}
              onChange={(e) => field('shiftStartMinutes', fromTime(e.target.value))}
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider">
              Shift End Time
            </label>
            <input
              type="time"
              value={timeValue(settings.shiftEndMinutes)}
              onChange={(e) => field('shiftEndMinutes', fromTime(e.target.value))}
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider">
              Target Daily Duty (Minutes)
            </label>
            <input
              type="number"
              min={60}
              max={1440}
              value={settings.targetMinutes}
              onChange={(e) => field('targetMinutes', Number(e.target.value))}
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider">
              Max Shift Before Alert (Minutes)
            </label>
            <input
              type="number"
              min={60}
              max={1440}
              value={settings.maxShiftMinutes}
              onChange={(e) => field('maxShiftMinutes', Number(e.target.value))}
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider">
              Max Break Duration (Minutes)
            </label>
            <input
              type="number"
              min={5}
              max={480}
              value={settings.maxBreakMinutes}
              onChange={(e) => field('maxBreakMinutes', Number(e.target.value))}
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider">
              Timezone
            </label>
            <input
              type="text"
              value={settings.timezone}
              onChange={(e) => field('timezone', e.target.value)}
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-on-surface cursor-pointer">
            <input
              type="checkbox"
              checked={settings.manualTimeRequiresApproval}
              onChange={(e) => field('manualTimeRequiresApproval', e.target.checked)}
              className="rounded border-outline-variant text-primary focus:ring-primary"
            />
            Manual / Offline time entries require Admin approval
          </label>
          <p className="text-[11px] text-on-surface-variant mt-1">
            Note: The desktop tracker records actual active vs idle time continuously. Maximum shift thresholds issue review alerts for management.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-on-primary text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-container transition-colors shadow-xs cursor-pointer disabled:opacity-50"
        >
          {saving ? 'Saving Changes...' : 'Save & Apply to All Employees'}
        </button>
      </form>

      {/* App & Website Productivity Rules */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/70 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-on-surface font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-xl">insights</span>
            App & Website Productivity Categorization
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Classify application process names and window titles into Productive, Neutral, or Unproductive categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="e.g. vscode, github.com, slack"
            className="md:col-span-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <select
            value={matchType}
            onChange={(e) => setMatchType(e.target.value)}
            className="rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="PROCESS">App / Process Name</option>
            <option value="TITLE">Window / Site Title</option>
          </select>
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary flex-1"
            >
              <option value="PRODUCTIVE">PRODUCTIVE</option>
              <option value="NEUTRAL">NEUTRAL</option>
              <option value="UNPRODUCTIVE">UNPRODUCTIVE</option>
            </select>
            <button
              onClick={() => ruleAction({ action: 'CREATE_RULE', pattern, matchType, category })}
              disabled={!pattern.trim()}
              className="bg-primary text-on-primary text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary-container transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              Add Rule
            </button>
          </div>
        </div>

        <div className="divide-y divide-outline-variant/40 pt-2">
          {rules.map((rule) => (
            <div key={rule.id} className="py-2.5 flex items-center justify-between text-xs">
              <span className="text-on-surface">
                <strong className="font-bold text-primary">{rule.pattern}</strong>{' '}
                <span className="text-on-surface-variant">({rule.matchType})</span>
              </span>
              <span className="flex items-center gap-4">
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    rule.category === 'PRODUCTIVE'
                      ? 'bg-emerald-100 text-emerald-800'
                      : rule.category === 'UNPRODUCTIVE'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {rule.category}
                </span>
                <button
                  onClick={() => ruleAction({ action: 'DELETE_RULE', id: rule.id })}
                  className="text-error hover:underline font-semibold cursor-pointer"
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
          {rules.length === 0 && (
            <p className="text-xs text-on-surface-variant py-4 text-center">
              No productivity rules configured yet. Standard apps remain Neutral until classified.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
