'use client';

import { useState } from 'react';

type Meeting = {
  id: string;
  title: string;
  host: string;
  time: string;
  duration: string;
  participants: number;
  status: 'UPCOMING' | 'LIVE' | 'ENDED';
  link: string;
};

const MEETINGS: Meeting[] = [
  { id: '1', title: 'Daily Team Standup & Shift Review', host: 'Rizwan Ramzan', time: '10:00 AM', duration: '30 mins', participants: 8, status: 'LIVE', link: 'https://meet.krtasker.com/daily-standup' },
  { id: '2', title: 'Sprint Design Sync (Stitch System)', host: 'Rida Ramzan', time: '02:00 PM', duration: '45 mins', participants: 4, status: 'UPCOMING', link: 'https://meet.krtasker.com/design-sync' },
  { id: '3', title: 'Weekly Performance & Attendance Audit', host: 'Abdul Saboor', time: '05:00 PM', duration: '60 mins', participants: 12, status: 'UPCOMING', link: 'https://meet.krtasker.com/weekly-audit' },
];

export default function MeetingsPage() {
  const [inMeeting, setInMeeting] = useState(false);
  const [activeMeetingTitle, setActiveMeetingTitle] = useState('');
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  const startMeeting = (title: string) => {
    setActiveMeetingTitle(title);
    setInMeeting(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface font-display">Video Meetings & Conferences</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">High-definition video conferencing, screen sharing, and meeting logs</p>
        </div>
        {!inMeeting && (
          <button
            onClick={() => startMeeting('Instant Admin Conference')}
            className="bg-primary text-on-primary text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary-container shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">video_call</span>
            Start Instant Meeting
          </button>
        )}
      </div>

      {inMeeting ? (
        /* Active Call Canvas */
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/70 shadow-lg p-5 space-y-4">
          <div className="flex justify-between items-center px-2">
            <div>
              <h2 className="font-bold text-base text-on-surface font-display">{activeMeetingTitle}</h2>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Encrypted Video Stream
              </span>
            </div>
            <button
              onClick={() => setInMeeting(false)}
              className="bg-error text-on-error text-xs px-4 py-2 rounded-lg font-bold hover:bg-error/90 transition-colors cursor-pointer shadow-xs"
            >
              End Call
            </button>
          </div>

          {/* Video Frames Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[420px]">
            <div className="bg-surface-container-high rounded-xl relative overflow-hidden flex items-center justify-center border border-outline-variant">
              {videoOff ? (
                <div className="w-16 h-16 rounded-full bg-primary text-on-primary text-xl font-bold flex items-center justify-center font-display">
                  RR
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary mx-auto mb-2 flex items-center justify-center text-primary font-bold">
                    <span className="material-symbols-outlined text-3xl">videocam</span>
                  </div>
                  <p className="text-xs font-semibold text-on-surface">Rizwan Ramzan (You)</p>
                </div>
              )}
              <span className="absolute bottom-3 left-3 bg-on-surface/80 text-surface text-[11px] px-3 py-1 rounded-md font-medium backdrop-blur-xs">
                Rizwan Ramzan (Host) {micMuted && '• 🎤 Muted'}
              </span>
            </div>

            <div className="bg-surface-container-high rounded-xl relative overflow-hidden flex items-center justify-center border border-outline-variant">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary text-on-secondary text-lg font-bold mx-auto mb-2 flex items-center justify-center font-display">
                  HT
                </div>
                <p className="text-xs font-semibold text-on-surface">Husnain Tanveer</p>
              </div>
              <span className="absolute bottom-3 left-3 bg-on-surface/80 text-surface text-[11px] px-3 py-1 rounded-md font-medium backdrop-blur-xs">
                Husnain Tanveer
              </span>
            </div>
          </div>

          {/* Control Bar */}
          <div className="flex justify-center items-center gap-4 py-2">
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                micMuted ? 'bg-error text-on-error' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{micMuted ? 'mic_off' : 'mic'}</span>
              {micMuted ? 'Unmute Mic' : 'Mute Mic'}
            </button>
            <button
              onClick={() => setVideoOff(!videoOff)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                videoOff ? 'bg-error text-on-error' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{videoOff ? 'videocam_off' : 'videocam'}</span>
              {videoOff ? 'Turn Cam On' : 'Turn Cam Off'}
            </button>
            <button className="px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-xs font-bold hover:bg-surface-container flex items-center gap-2 cursor-pointer shadow-xs">
              <span className="material-symbols-outlined text-lg">screen_share</span>
              Share Screen
            </button>
          </div>
        </div>
      ) : (
        /* Meetings Schedule Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/70 shadow-xs">
              <h2 className="font-bold text-base text-on-surface mb-4 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">event</span>
                Scheduled & Live Meetings
              </h2>
              <div className="divide-y divide-outline-variant/40">
                {MEETINGS.map((m) => (
                  <div key={m.id} className="py-3.5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-on-surface font-display">{m.title}</span>
                        {m.status === 'LIVE' && (
                          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 animate-pulse">
                            ● LIVE NOW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Host: {m.host} • {m.time} ({m.duration}) • {m.participants} Participants
                      </p>
                    </div>
                    <button
                      onClick={() => startMeeting(m.title)}
                      className={`text-xs px-4 py-2 rounded-lg font-bold transition-all cursor-pointer shadow-xs ${
                        m.status === 'LIVE'
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-primary text-on-primary hover:bg-primary-container'
                      }`}
                    >
                      {m.status === 'LIVE' ? 'Join Call' : 'Start'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/70 shadow-xs space-y-3">
              <h3 className="font-bold text-sm text-on-surface font-display">Meeting Preferences</h3>
              <ul className="text-xs text-on-surface-variant space-y-3">
                <li className="flex items-center justify-between">
                  <span>Auto-record video sessions</span>
                  <input type="checkbox" defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary" />
                </li>
                <li className="flex items-center justify-between">
                  <span>HD 1080p Video Stream</span>
                  <input type="checkbox" defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary" />
                </li>
                <li className="flex items-center justify-between">
                  <span>Mute audio on join</span>
                  <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
