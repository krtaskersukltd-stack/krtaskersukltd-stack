'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DESKTOP_INSTALLER_FILENAME, DESKTOP_INSTALLER_PATH, DESKTOP_VERSION } from '@/lib/desktop-release';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.replace(data.redirectTo || (data.user?.role === 'ADMIN' ? '/dashboard' : '/employee'));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col md:flex-row min-h-screen bg-surface">
      {/* Left Side: Login Form Canvas */}
      <section className="flex-1 flex items-center justify-center p-6 md:p-12 bg-surface-container-lowest">
        <div className="w-full max-w-md space-y-8">
          {/* Branding Header */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <img src="/Logo.svg" alt="KR Tasker Logo" className="h-10 md:h-12 object-contain" />
              <h1 className="font-bold text-2xl tracking-tight text-primary font-display">KR Tasker</h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface mt-4 font-display">Sign In to Dashboard</h2>
            <p className="text-sm text-on-surface-variant mt-2">Enter your credentials to access the enterprise hub.</p>
          </div>

          {error && (
            <div className="bg-error-container text-on-error-container border border-error/20 text-sm rounded-lg p-3.5 flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-error text-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@krtasker.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border border-outline-variant bg-surface-container-lowest py-2.5 px-3 text-on-surface shadow-sm focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider" htmlFor="password">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:text-primary-container font-semibold transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-outline-variant bg-surface-container-lowest py-2.5 px-3 text-on-surface shadow-sm focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center items-center gap-2 rounded-md bg-primary px-4 py-3 font-semibold text-sm text-on-primary shadow-sm hover:bg-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  <span>Authenticating...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-on-surface-variant">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Register here
            </Link>
          </div>

          {/* Desktop Installer Banner */}
          <div className="mt-8 pt-6 border-t border-outline-variant/50 flex flex-col items-center text-center">
            <p className="text-xs font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">Are you an employee?</p>
            <a
              href={DESKTOP_INSTALLER_PATH}
              download={DESKTOP_INSTALLER_FILENAME}
              className="inline-flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-primary border border-outline-variant text-xs font-bold py-2.5 px-5 rounded-lg transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-primary text-lg">download</span>
              Download Windows Installer v{DESKTOP_VERSION}
            </a>
            <p className="mt-2 text-[11px] leading-relaxed text-on-surface-variant">
              Install once. Future tracker updates download and install automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Right Side: Illustrative Feature Panel */}
      <section className="hidden md:flex flex-1 relative bg-surface-container-high items-center justify-center p-12 overflow-hidden border-l border-outline-variant/30">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-70" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDa3AP4CyPKtFwmEXd49dQnpL-_gFy5B7caZeqevOMGEDHf2mfOHsezbu_40qIPB2HgaykFPhy1-LOay2xNHQ6t7O4VMQ0EOTdiC32GqNw8YZXLzSJnCQFZZpjEFIWOZUR9MNkkrU05aIktyfVUXCsJ8qUVg2tLMFvKcI-TGTUzN3IEnI-32GnnkNbi919Z71Vlg3RGXkmvrFgeraBFNrH2rhLVpFh3sTfNJgK7toj-S0ge4vcFGfc')" }} />
        
        <div className="relative z-10 max-w-lg text-center bg-surface-container-lowest/90 backdrop-blur-md p-8 rounded-2xl border border-outline-variant shadow-lg">
          <div className="flex justify-center mb-6">
            <img src="/Logo.svg" alt="KR Tasker Logo" className="h-12 object-contain" />
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-2 font-display">Centralized Operations</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Monitor employee performance, track time, and manage operational workflows with our enterprise high-density data platform.
          </p>
        </div>
      </section>
    </main>
  );
}
