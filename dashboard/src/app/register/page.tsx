'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'EMPLOYEE'>('ADMIN');
  const [companyId, setCompanyId] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          companyId: role === 'EMPLOYEE' ? companyId : undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess('Registration successful! Opening your account...');
      router.replace(data.redirectTo || (role === 'ADMIN' ? '/dashboard' : '/employee'));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col md:flex-row min-h-screen bg-surface">
      {/* Left Side: Register Form */}
      <section className="flex-1 flex items-center justify-center p-6 md:p-12 bg-surface-container-lowest">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-3">
              <img src="/Logo.svg" alt="KR Tasker Logo" className="h-10 md:h-12 object-contain" />
              <h1 className="font-bold text-2xl tracking-tight text-primary font-display">KR Tasker</h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface mt-2 font-display">Create Account</h2>
            <p className="text-sm text-on-surface-variant mt-1.5">Get started with KR Tasker operational suite</p>
          </div>

          {error && (
            <div className="bg-error-container text-on-error-container border border-error/20 text-sm rounded-lg p-3.5 flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-error text-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-surface-container-low text-primary border border-primary/20 text-sm rounded-lg p-3.5 flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Account Role Selector */}
            <div className="flex bg-surface-container p-1 rounded-xl border border-outline-variant/60 relative overflow-hidden">
              <button
                type="button"
                onClick={() => setRole('ADMIN')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all relative z-10 cursor-pointer ${
                  role === 'ADMIN' ? 'text-on-primary font-extrabold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {role === 'ADMIN' && (
                  <motion.span
                    layoutId="register-role-indicator"
                    className="absolute inset-0 bg-primary rounded-lg -z-10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                Company Admin
              </button>

              <button
                type="button"
                onClick={() => setRole('EMPLOYEE')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all relative z-10 cursor-pointer ${
                  role === 'EMPLOYEE' ? 'text-on-primary font-extrabold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {role === 'EMPLOYEE' && (
                  <motion.span
                    layoutId="register-role-indicator"
                    className="absolute inset-0 bg-primary rounded-lg -z-10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                Employee Tracker
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1 uppercase tracking-wider" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Husnain Tanveer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border border-outline-variant bg-surface-container-lowest py-2.5 px-3 text-on-surface shadow-sm focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1 uppercase tracking-wider" htmlFor="email">
                Work Email Address
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
              <label className="block text-xs font-semibold text-on-surface mb-1 uppercase tracking-wider" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                maxLength={128}
                pattern="(?=.*[A-Za-z])(?=.*[0-9]).{8,128}"
                title="Use 8 or more characters with at least one letter and one number"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-outline-variant bg-surface-container-lowest py-2.5 px-3 text-on-surface shadow-sm focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors"
              />
              <p className="text-[11px] text-on-surface-variant mt-1">At least 8 characters with a letter and a number.</p>
            </div>

            {role === 'EMPLOYEE' && (
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1 uppercase tracking-wider" htmlFor="companyId">
                  Invite Code / Company ID
                </label>
                <input
                  id="companyId"
                  name="companyId"
                  type="text"
                  required
                  placeholder="e.g. KR-ORG-8832"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  className="block w-full rounded-md border border-outline-variant bg-surface-container-lowest py-2.5 px-3 text-on-surface shadow-sm focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors"
                />
                <p className="text-[11px] text-on-surface-variant mt-1">Ask your administrator for your organization invite code.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center items-center gap-2 rounded-md bg-primary px-4 py-3 font-semibold text-sm text-on-primary shadow-sm hover:bg-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  <span>Creating Account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center mt-4 text-sm text-on-surface-variant">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign In here
            </Link>
          </div>
        </div>
      </section>

      {/* Right Side: Feature Panel */}
      <section className="hidden md:flex flex-1 relative bg-surface-container-high items-center justify-center p-12 overflow-hidden border-l border-outline-variant/30">
        <div className="relative z-10 max-w-lg text-center bg-surface-container-lowest/90 backdrop-blur-md p-8 rounded-2xl border border-outline-variant shadow-lg">
          <div className="flex justify-center mb-4">
            <img src="/Logo.svg" alt="KR Tasker Logo" className="h-12 object-contain" />
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-2 font-display">Secure Onboarding</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Join the KR Tasker platform for real-time tracking, seamless employee productivity monitoring, and automated shifts management.
          </p>
        </div>
      </section>
    </main>
  );
}
