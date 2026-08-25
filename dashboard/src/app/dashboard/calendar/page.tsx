export default function CalendarPage() {



  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-[#041f24]">Operational Calendar</h1>
          <p className="text-xs text-[#6f797c] mt-0.5">Schedule shifts, deadlines, and milestone audits</p>
        </div>
        <button className="kr-btn-primary text-xs flex items-center gap-1.5 self-start">
          <span className="material-symbols-outlined text-sm">event</span>
          <span>Add Event</span>
        </button>
      </div>

      <div className="kr-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold font-display text-[#041f24]">August 2026</h2>
          <div className="flex gap-2">
            <button className="kr-btn-secondary text-xs p-1.5">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="kr-btn-secondary text-xs p-1.5">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-[#bec8cc] border border-[#bec8cc] rounded-lg overflow-hidden text-xs">
          {days.map((day, idx) => (
            <div key={idx} className="bg-[#e0f8ff] p-2 text-center font-bold text-[#3f484b] uppercase text-[11px]">
              {day}
            </div>
          ))}
          {dates.map((date) => (
            <div key={date} className="bg-white p-3 min-h-[70px] flex flex-col justify-between hover:bg-[#f0fbff] transition-colors">
              <span className="font-bold text-[#041f24] text-xs tnum">{date}</span>
              {date === 24 && (
                <span className="kr-badge kr-badge-working text-[10px]">Active Shift</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
