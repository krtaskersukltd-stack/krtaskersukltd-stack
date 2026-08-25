'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Step state: 'REQUEST' | 'RESET'
  const [step, setStep] = useState<'REQUEST' | 'RESET'>('REQUEST');
  const [testCode, setTestCode] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Step 1: Request Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send reset code');
      }

      setSuccess(data.message || 'If that account exists, reset instructions are ready.');
      
      // Save test code if returned by API for local testing
      if (data.code) {
        setTestCode(data.code);
      }
      
      setStep('RESET');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      setSuccess('Password updated successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-height-screen flex items-center justify-center p-6 min-h-screen">
      <div className="glass-panel w-full max-w-md p-8 relative overflow-hidden">
        {/* Glow Elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/Logo.svg" alt="KR Tasker Logo" className="h-10 object-contain" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Reset Password</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {step === 'REQUEST' 
              ? 'Enter email to receive reset code' 
              : 'Enter verification code and new credentials'
            }
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3 mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-lg p-3 mb-6">
            {success}
          </div>
        )}

        {/* Display Code automatically for local developer testing */}
        {testCode && step === 'RESET' && (
          <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-lg p-4 mb-6">
            <p className="font-bold mb-1">🛠️ Local Testing Helper:</p>
            <p>Verification Code: <code className="text-white font-mono bg-zinc-950 px-2 py-0.5 rounded text-sm">{testCode}</code></p>
          </div>
        )}

        {step === 'REQUEST' ? (
          <form onSubmit={handleRequestCode} className="space-y-5">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Work Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glass"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-glow py-3 font-semibold text-white flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? 'Generating Code...' : 'Request Reset Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                6-Digit Verification Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="input-glass text-center font-mono tracking-[0.25em] text-lg"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                maxLength={128}
                pattern="(?=.*[A-Za-z])(?=.*[0-9]).{8,128}"
                title="Use 8 or more characters with at least one letter and one number"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-glass"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                maxLength={128}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-glass"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-glow py-3 font-semibold text-white flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="text-center mt-6 text-sm text-zinc-400">
          Remember your password?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
