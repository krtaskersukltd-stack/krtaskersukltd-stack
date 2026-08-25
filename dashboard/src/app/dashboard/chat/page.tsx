'use client';

import { useState } from 'react';

type Channel = {
  id: string;
  name: string;
  type: 'channel' | 'dm';
  unreadCount?: number;
  avatar?: string;
  role?: string;
};

type Message = {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  content: string;
  isSelf?: boolean;
};

const CHANNELS: Channel[] = [
  { id: '1', name: 'general', type: 'channel' },
  { id: '2', name: 'dev-team', type: 'channel', unreadCount: 3 },
  { id: '3', name: 'design-updates', type: 'channel' },
  { id: '4', name: 'urgent-alerts', type: 'channel', unreadCount: 1 },
];

const DIRECT_MESSAGES: Channel[] = [
  { id: 'dm1', name: 'Husnain Tanveer', type: 'dm', avatar: 'HT', role: 'Fullstack Dev', unreadCount: 2 },
  { id: 'dm2', name: 'Rida Ramzan', type: 'dm', avatar: 'RR', role: 'UI/UX Designer' },
  { id: 'dm3', name: 'Abdul Saboor', type: 'dm', avatar: 'AS', role: 'Backend Lead' },
  { id: 'dm4', name: 'Sana Malik', type: 'dm', avatar: 'SM', role: 'QA Lead' },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  '1': [
    { id: 'm1', sender: 'Rida Ramzan', avatar: 'RR', time: '10:14 AM', content: 'Hey everyone! New Stitch design system components have been updated for KR Tasker.' },
    { id: 'm2', sender: 'Abdul Saboor', avatar: 'AS', time: '10:16 AM', content: 'Awesome! I am updating the backend API routes to sync with D1 database.' },
    { id: 'm3', sender: 'Rizwan Ramzan (Admin)', avatar: 'R', time: '10:20 AM', content: 'Great progress team. Ensure shift tracking & manual time approval features stay offline-safe.', isSelf: true }
  ],
  'dm1': [
    { id: 'm10', sender: 'Husnain Tanveer', avatar: 'HT', time: '09:45 AM', content: 'Sir, I have submitted the manual time request for the client call.' },
    { id: 'm11', sender: 'Rizwan Ramzan (Admin)', avatar: 'R', time: '09:50 AM', content: 'Approved! Keep up the good work.', isSelf: true }
  ]
};

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<string>('1');
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');

  const currentChat = [...CHANNELS, ...DIRECT_MESSAGES].find(c => c.id === activeTab);
  const activeMessages = messages[activeTab] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'Rizwan Ramzan (Admin)',
      avatar: 'R',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: inputMessage.trim(),
      isSelf: true
    };

    setMessages(prev => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), newMessage]
    }));

    setInputMessage('');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface font-display">Team Chat & Collaboration</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">Real-time departmental messaging, topic channels, and direct staff support</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-surface-container-low text-primary border border-outline-variant">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live WebSocket Connected
          </span>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/70 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-4 h-[660px]">
        {/* Sidebar Navigation */}
        <div className="border-r border-outline-variant/60 bg-surface-container-low/40 flex flex-col">
          <div className="p-3.5 border-b border-outline-variant/60">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">search</span>
              <input
                type="text"
                placeholder="Search channels or staff..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-5">
            {/* Channels List */}
            <div>
              <div className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase px-2 mb-2">Channels</div>
              <div className="space-y-1">
                {CHANNELS.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveTab(ch.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === ch.id
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'text-on-surface hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="opacity-70 font-mono">#</span> {ch.name}
                    </span>
                    {ch.unreadCount && (
                      <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                        activeTab === ch.id ? 'bg-surface text-primary' : 'bg-error text-on-error'
                      }`}>
                        {ch.unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Messages List */}
            <div>
              <div className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase px-2 mb-2">Direct Messages</div>
              <div className="space-y-1">
                {DIRECT_MESSAGES.map(dm => (
                  <button
                    key={dm.id}
                    onClick={() => setActiveTab(dm.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === dm.id
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'text-on-surface hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center ${
                        activeTab === dm.id ? 'bg-surface text-primary' : 'bg-primary text-on-primary'
                      }`}>
                        {dm.avatar}
                      </div>
                      <span className="truncate">{dm.name}</span>
                    </div>
                    {dm.unreadCount && (
                      <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                        activeTab === dm.id ? 'bg-surface text-primary' : 'bg-error text-on-error'
                      }`}>
                        {dm.unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Conversation Window */}
        <div className="md:col-span-3 flex flex-col bg-surface-container-lowest">
          {/* Header */}
          <div className="p-4 border-b border-outline-variant/60 flex items-center justify-between bg-surface-container-low/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container text-primary font-bold text-xs flex items-center justify-center font-display">
                {currentChat?.type === 'channel' ? '#' : currentChat?.avatar || 'C'}
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface font-display">
                  {currentChat?.type === 'channel' ? `#${currentChat.name}` : currentChat?.name}
                </h3>
                <p className="text-[11px] text-on-surface-variant">
                  {currentChat?.type === 'channel' ? 'Department & Team Topic Channel' : currentChat?.role || 'Staff Member'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span className="hidden sm:inline font-medium">KR Tasker Enterprise Encrypted Sync</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
            {activeMessages.length === 0 ? (
              <div className="text-center py-20 text-xs text-on-surface-variant">
                No messages in this conversation yet. Send a message to start!
              </div>
            ) : (
              activeMessages.map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.isSelf ? 'flex-row-reverse' : ''}`}>
                  <div className="w-7 h-7 rounded-full bg-primary text-on-primary font-bold text-[10px] flex items-center justify-center flex-shrink-0 font-display">
                    {msg.avatar}
                  </div>
                  <div className={`max-w-[75%] space-y-1 ${msg.isSelf ? 'items-end text-right' : ''}`}>
                    <div className="flex items-center gap-2 text-[10px] text-on-surface-variant px-1">
                      <span className="font-semibold text-on-surface">{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      msg.isSelf
                        ? 'bg-primary text-on-primary rounded-tr-none font-medium'
                        : 'bg-surface-container-lowest text-on-surface border border-outline-variant/60 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-outline-variant/60 bg-surface-container-lowest flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder={`Message ${currentChat?.type === 'channel' ? `#${currentChat.name}` : currentChat?.name}...`}
              className="flex-1 px-3.5 py-2.5 text-xs bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 hover:bg-primary-container transition-colors shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">send</span>
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
