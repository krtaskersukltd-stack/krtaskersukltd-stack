import Link from 'next/link';
import { DESKTOP_INSTALLER_FILENAME, DESKTOP_INSTALLER_PATH, DESKTOP_VERSION } from '@/lib/desktop-release';

export default function LandingPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans">
      {/* Header / TopAppBar */}
      <header className="bg-surface h-[64px] sticky top-0 z-50 w-full shadow-xs flex justify-between items-center px-6 border-b border-outline-variant/60 backdrop-blur-md bg-surface/90">
        <div className="flex items-center gap-8">
          <Link className="font-bold text-xl text-primary flex items-center gap-2 font-display" href="/">
            <img src="/Logo.svg" alt="KR Tasker Logo" className="h-8 md:h-9 object-contain" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors" href="#features">
              Features
            </a>
            <a className="text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors" href="#how-it-works">
              How It Works
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={DESKTOP_INSTALLER_PATH}
            download={DESKTOP_INSTALLER_FILENAME}
            className="hidden sm:inline-flex items-center gap-1.5 bg-surface-container-low text-primary text-xs font-semibold px-3 py-2 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Installer v{DESKTOP_VERSION}</span>
          </a>
          <Link className="text-xs font-semibold text-on-surface-variant hover:text-on-surface px-3 py-2" href="/login">
            Sign In
          </Link>
          <Link className="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-xs" href="/register">
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] px-6 md:px-12 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-outline-variant text-primary text-xs font-bold uppercase tracking-wider w-fit">
              <span className="material-symbols-outlined text-sm">bolt</span>
              Automated Operational System
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0B5361] max-w-[620px] font-display leading-tight">
              Employee Time Tracking Without the Guesswork
            </h1>
            <p className="text-base md:text-lg text-on-surface-variant max-w-[520px] leading-relaxed">
              Track working hours, activity levels, app usage and screenshots from one secure dashboard built for remote and hybrid teams.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
              <Link className="bg-primary text-on-primary font-semibold text-sm px-6 py-3 rounded-lg flex items-center justify-center min-w-[160px] hover:bg-primary-container transition-all shadow-md" href="/dashboard">
                Enter Dashboard
                <span className="material-symbols-outlined text-base ml-2">arrow_forward</span>
              </Link>
            </div>

            <a className="text-xs text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1.5 font-medium mt-1" href={DESKTOP_INSTALLER_PATH} download={DESKTOP_INSTALLER_FILENAME}>
              <span className="material-symbols-outlined text-base text-primary">download</span>
              Download Windows Desktop App v{DESKTOP_VERSION}
            </a>
          </div>

          {/* Interactive Mocks Grid */}
          <div className="flex-1 w-full flex justify-end">
            <div className="relative w-full max-w-[680px] bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant overflow-hidden flex flex-col">
              <div className="h-9 bg-surface-container-low border-b border-outline-variant flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-error/60" />
                <div className="w-3 h-3 rounded-full bg-outline-variant" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <span className="text-[11px] font-mono text-on-surface-variant ml-2">krtasker-dashboard-live</span>
              </div>
              <div className="p-5 bg-surface space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/60 shadow-xs">
                    <div className="text-xs font-medium text-on-surface-variant mb-1">Total Active Time</div>
                    <div className="text-xl font-bold text-primary font-display">45h 12m</div>
                  </div>
                  <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/60 shadow-xs">
                    <div className="text-xs font-medium text-on-surface-variant mb-1">Avg. Productivity</div>
                    <div className="text-xl font-bold text-secondary font-display">87%</div>
                  </div>
                  <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/60 shadow-xs">
                    <div className="text-xs font-medium text-on-surface-variant mb-1">Idle Time</div>
                    <div className="text-xl font-bold text-error font-display">2h 45m</div>
                  </div>
                </div>

                <div className="w-full h-52 bg-surface-container-high rounded-xl border border-outline-variant overflow-hidden relative">
                  <img
                    alt="Dashboard Overview"
                    className="w-full h-full object-cover opacity-85"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHz60mZw6bIIEIetmQAL-RCC8WZm9vRNKOMdiUL5mmZ82V1CKFEKuEhecWr6cAfaEyelO-Xeelf7XUF12OW3WC0v88ztTIWKCeTJFtgbTImY6ngD63cOjfIay3G9WwWhhmEirGmqZNK4yrjFXrJIpUy_3Zl9shFduUgdlsP8aZx8LvMkYJp_97BO2ZnUGb8afryrz805PX_I7aTjYJMtt78OJYmU41SjD_tBi-VdkpGetS5YEb-WQu"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Security Bar */}
        <section className="w-full border-y border-outline-variant/60 bg-surface-container-lowest py-8 flex flex-col items-center justify-center gap-4">
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Trusted by remote and enterprise teams globally</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <span className="font-bold text-lg text-on-surface font-display">AcmeCorp</span>
            <span className="font-bold text-lg text-on-surface font-display">Globex Systems</span>
            <span className="font-bold text-lg text-on-surface font-display">Initech Work</span>
            <span className="font-bold text-lg text-on-surface font-display">Soylent Hub</span>
          </div>
          <div className="flex gap-6 mt-2">
            <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
              <span className="material-symbols-outlined text-base text-primary">lock</span> Secure Encrypted Storage
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
              <span className="material-symbols-outlined text-base text-primary">manage_accounts</span> Role-Based Access Control
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-[1440px] px-6 md:px-12 py-20 flex flex-col items-center gap-12" id="features">
          <h2 className="text-2xl md:text-4xl font-bold text-[#0B5361] text-center max-w-[600px] font-display">Built for Transparency and Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/70 shadow-xs flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-primary">timeline</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface font-display">Automatic Time Tracking</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                See exactly when employees are active, idle, or offline with a clear, color-coded timeline. Eliminate manual timesheet errors.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/70 shadow-xs flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-primary">screenshot_monitor</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface font-display">Smart Screenshots</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Configurable screen capture intervals with privacy-first blur options. Verify work visually while respecting employee boundaries.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/70 shadow-xs flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-secondary">monitoring</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface font-display">Productivity Reports</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Understand output trends with automated departmental insights. Identify bottlenecks and top performers through clear, actionable data.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/70 shadow-xs flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-primary">shield_person</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface font-display">Privacy Controls</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Configurable monitoring rules built for trust. Allow employees to review captures, delete private moments, and control tracking hours.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-inverse-surface text-inverse-on-surface py-10 px-6 md:px-12 border-t border-outline-variant">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-bold text-white font-display">
            <img src="/Logo.svg" alt="KR Tasker Logo" className="h-8 object-contain" />
          </div>
          <div className="text-xs text-outline">
            © 2026 KR Tasker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
