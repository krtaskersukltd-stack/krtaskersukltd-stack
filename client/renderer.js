const loginScreen = document.getElementById('login-screen');
const trackingScreen = document.getElementById('tracking-screen');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');

// Login Form Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-submit');
const loginSpinner = document.getElementById('login-spinner');
const loginError = document.getElementById('login-error');

// Tracking Screen Elements
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const userAvatarInitial = document.getElementById('user-avatar-initial');
const timerDisplay = document.getElementById('timer');
const statusPulse = document.getElementById('status-pulse');
const statusLabel = document.getElementById('status-label');
const taskInput = document.getElementById('task-input');
const assignedTaskOptions = document.getElementById('assigned-task-options');
const toggleTrackingBtn = document.getElementById('toggle-tracking-btn');
const logoutBtn = document.getElementById('logout-btn');
const syncStatus = document.getElementById('sync-status');
const syncText = document.getElementById('sync-text');
const breakBtn = document.getElementById('break-btn');
const inputHealth = document.getElementById('input-health');
const reportModal = document.getElementById('report-modal');
const reportTitle = document.getElementById('report-title');
const reportHelp = document.getElementById('report-help');
const reportNote = document.getElementById('report-note');
const reportError = document.getElementById('report-error');
const reportCancel = document.getElementById('report-cancel');
const reportSubmit = document.getElementById('report-submit');

// Window Controls
const minimizeBtn = document.getElementById('minimize-btn');
const closeBtn = document.getElementById('close-btn');

// Update Banner
const updateBanner = document.getElementById('update-banner');
const updateVersionText = document.getElementById('update-version-text');
const updateDownloadBtn = document.getElementById('update-download-btn');
let pendingDownloadUrl = '';

// In-memory display config (NO token ever stored here)
let currentConfig = {};
let trackingActive = false;
let breakActive = false;
let pendingReport = null;
let assignedTasks = [];

function selectedTask() {
  const task = taskInput.value.trim().slice(0, 200) || 'Working';
  const match = assignedTasks.find((item) => item.title === task);
  return { task, taskId: match?.id || '' };
}

async function loadAssignedTasks() {
  const result = await window.api.getEmployeeOperations();
  assignedTasks = result.ok && Array.isArray(result.data?.tasks) ? result.data.tasks : [];
  assignedTaskOptions.replaceChildren(...assignedTasks.map((item) => {
    const option = document.createElement('option');
    option.value = item.title;
    option.label = item.project?.name ? `${item.project.name} · ${item.status}` : item.status;
    return option;
  }));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map(v => String(v).padStart(2, '0')).join(':');
}

function showLoginError(msg) {
  loginError.textContent = String(msg).slice(0, 200);
  loginError.style.display = 'block';
}

function hideLoginError() {
  loginError.style.display = 'none';
}

function showScreen(screenId) {
  if (screenId === 'login') {
    loginScreen.classList.add('active');
    trackingScreen.classList.remove('active');
    passwordInput.value = ''; // Always clear password on showing login
  } else {
    loginScreen.classList.remove('active');
    trackingScreen.classList.add('active');
  }
}

function openReportModal(type, quitAfter = false) {
  pendingReport = { type, quitAfter };
  reportTitle.textContent = type === 'BREAK' ? 'Before your break' : 'Before you stop';
  reportHelp.textContent = type === 'BREAK'
    ? 'Add a quick progress update for the owner before pausing your timer.'
    : 'Summarize today’s work. It will be saved in the owner dashboard and emailed automatically.';
  reportSubmit.textContent = type === 'BREAK' ? 'Submit & take break' : 'Submit & stop tracker';
  reportError.textContent = '';
  reportNote.value = '';
  reportModal.classList.add('open');
  reportModal.setAttribute('aria-hidden', 'false');
  setTimeout(() => reportNote.focus(), 50);
}

function closeReportModal() {
  pendingReport = null;
  reportModal.classList.remove('open');
  reportModal.setAttribute('aria-hidden', 'true');
}

// ─── Initialize Application ───────────────────────────────────────────────────
async function init() {
  try {
    // getConfig returns safe fields only (no token)
    currentConfig = await window.api.getConfig();

    // Auto-fill saved email on login screen
    if (currentConfig.email) {
      emailInput.value = currentConfig.email;
    }

    // Check session via hasToken flag (main process validates internally)
    if (currentConfig.hasToken) {
      const isValid = await validateSession();
      if (isValid) {
        await loadAssignedTasks();
        setupTrackingView();
        showScreen('tracking');
      } else {
        // Expired - clear token in main process
        await window.api.saveConfig({ token: '' });
        showScreen('login');
      }
    } else {
      showScreen('login');
    }
  } catch (err) {
    console.error('Initialization error:', err);
    showScreen('login');
  }
}

// ─── Validate session (main process handles token) ────────────────────────────
async function validateSession() {
  try {
    // api-profile IPC now uses token from main process config (renderer has no token)
    const result = await window.api.getProfile();
    if (result.ok && result.data?.user) {
      const user = result.data.user;
      currentConfig.employeeName = user.name;
      currentConfig.email = user.email;

      // Update display config
      await window.api.saveConfig({
        employeeName: user.name
      });

      // Initialize daily timer
      if (result.data.todayTrackedSeconds !== undefined) {
        window.api.initializeTime(result.data.todayTrackedSeconds);
      }
      return true;
    }
    return false;
  } catch (e) {
    console.error('Session validation error:', e);
    return false;
  }
}

// ─── Setup tracking view ──────────────────────────────────────────────────────
function setupTrackingView() {
  profileName.textContent = currentConfig.employeeName || 'Employee';
  profileEmail.textContent = currentConfig.email || '';
  userAvatarInitial.textContent = (currentConfig.employeeName || 'E').charAt(0).toUpperCase();

  syncStatus.className = 'sync-status';
  syncText.textContent = 'Ready';
}

// ─── Login ────────────────────────────────────────────────────────────────────
loginBtn.addEventListener('click', async () => {
  hideLoginError();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Basic client-side validation
  if (!email || !password) {
    showLoginError('Email and password are required.');
    return;
  }
  if (email.length > 254) {
    showLoginError('Email address is too long.');
    return;
  }
  if (password.length > 128) {
    showLoginError('Password is too long.');
    return;
  }

  loginBtn.disabled = true;
  loginSpinner.classList.add('active');

  try {
    // main process will use FIXED_SERVER_URL, token is handled internally
    const result = await window.api.login(email, password);

    if (!result.ok) {
      throw new Error(result.data?.error || 'Invalid credentials or connection failed.');
    }

    const data = result.data;

    // Store only safe display fields (NO token in renderer)
    currentConfig = {
      email,
      employeeName: data.user?.name || '',
      companyId: data.user?.companyId || '',
      hasToken: true
    };

    // Initialize daily timer
    if (data.todayTrackedSeconds !== undefined) {
      window.api.initializeTime(data.todayTrackedSeconds);
    }

    setupTrackingView();
    await loadAssignedTasks();
    showScreen('tracking');

    const currentStatus = await window.api.getStatus();
    updateUIStatus(currentStatus);

  } catch (err) {
    showLoginError(err.message);
  } finally {
    loginBtn.disabled = false;
    loginSpinner.classList.remove('active');
  }
});

// ─── Logout ───────────────────────────────────────────────────────────────────
logoutBtn.addEventListener('click', async () => {
  if (trackingActive || breakActive) {
    window.api.stopTracking();
    return;
  }

  // Tell main process to clear the token
  await window.api.saveConfig({
    token: '',
    employeeId: '',
    employeeName: ''
  });

  currentConfig = {};
  showScreen('login');
});

// ─── Start/Stop Tracking ──────────────────────────────────────────────────────
toggleTrackingBtn.addEventListener('click', async () => {
  if (trackingActive) {
    window.api.stopTracking();
  } else {
    // Refresh profile/settings from server before starting
    try {
      await validateSession();
    } catch (e) {
      console.warn('Failed to refresh settings before tracking:', e);
    }
    window.api.startTracking(selectedTask());
  }
});

breakBtn.addEventListener('click', () => {
  if (trackingActive) openReportModal('BREAK');
});

reportCancel.addEventListener('click', closeReportModal);
reportSubmit.addEventListener('click', async () => {
  if (!pendingReport) return;
  const note = reportNote.value.trim();
  if (note.length < 3) {
    reportError.textContent = 'Please write at least a few words about your work.';
    return;
  }

  reportSubmit.disabled = true;
  reportCancel.disabled = true;
  reportError.textContent = '';
  const result = await window.api.submitWorkReport({ ...pendingReport, note });
  reportSubmit.disabled = false;
  reportCancel.disabled = false;
  if (!result.ok) {
    reportError.textContent = result.error || 'Report could not be submitted.';
    return;
  }
  closeReportModal();
  syncText.textContent = result.queued ? 'Report saved — syncing safely' : 'Report saved in dashboard';
  syncStatus.style.color = '#10b981';
});

const keystrokesCount = document.getElementById('keystrokes-count');
const clicksCount = document.getElementById('clicks-count');

// ─── UI Status Update ─────────────────────────────────────────────────────────
function updateUIStatus(data) {
  trackingActive = data.isTracking;
  breakActive = data.isOnBreak === true;
  timerDisplay.textContent = formatTime(data.trackedSecondsToday);

  if (keystrokesCount && data.keystrokesToday !== undefined) {
    keystrokesCount.textContent = (data.keystrokesToday || 0).toLocaleString();
  }
  if (clicksCount && data.mouseClicksToday !== undefined) {
    clicksCount.textContent = (data.mouseClicksToday || 0).toLocaleString();
  }

  if (data.currentTask && document.activeElement !== taskInput) {
    taskInput.value = data.currentTask;
  }

  if (trackingActive) {
    toggleTrackingBtn.textContent = 'Stop Tracking';
    toggleTrackingBtn.className = 'tracking-btn stop-state';
    statusPulse.className = 'status-pulse tracking';
    statusLabel.textContent = 'TRACKING';
    breakBtn.disabled = false;
    breakBtn.textContent = 'Take Break';
  } else if (breakActive) {
    toggleTrackingBtn.textContent = 'Resume Tracking';
    toggleTrackingBtn.className = 'tracking-btn start-state';
    statusPulse.className = 'status-pulse idle';
    statusLabel.textContent = `ON BREAK · ${formatTime(data.breakSeconds || 0)}`;
    breakBtn.disabled = true;
    breakBtn.textContent = 'Break in progress';
  } else {
    toggleTrackingBtn.textContent = 'Start Tracking';
    toggleTrackingBtn.className = 'tracking-btn start-state';
    statusPulse.className = 'status-pulse';
    statusLabel.textContent = 'PAUSED';
    breakBtn.disabled = true;
    breakBtn.textContent = 'Take Break';
  }

  if (inputHealth) {
    inputHealth.textContent = trackingActive
      ? (data.inputTrackerReady ? 'Input monitor active' : 'Starting input monitor…')
      : 'Input monitor starts with tracking';
    inputHealth.className = `input-health ${trackingActive && data.inputTrackerReady ? 'healthy' : ''}`;
  }
}

// ─── IPC Listeners ────────────────────────────────────────────────────────────
window.api.onStatusChange((data) => {
  updateUIStatus(data);
});

window.api.onUploadSuccess((data) => {
  syncStatus.className = 'sync-status';
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  syncText.textContent = `Synced (${timeStr})`;
  syncStatus.style.color = '#10b981';
  setTimeout(() => {
    syncStatus.style.color = '#71717a';
  }, 3000);
});

window.api.onError((msg) => {
  syncText.textContent = `Sync Error: ${String(msg).slice(0, 100)}`;
  syncStatus.style.color = '#ef4444';
});

window.api.onReportRequired((data) => openReportModal(data.type, data.quitAfter === true));

// ─── Window Controls ──────────────────────────────────────────────────────────
minimizeBtn.addEventListener('click', () => { window.api.minimize(); });
closeBtn.addEventListener('click', () => { window.api.quit(); });

// ─── Task input live sync ─────────────────────────────────────────────────────
taskInput.addEventListener('change', () => {
  if (trackingActive) {
    window.api.startTracking(selectedTask());
  }
});

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
let clientTheme = 'dark';
themeToggleBtn.addEventListener('click', () => {
  clientTheme = clientTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', clientTheme);

  if (clientTheme === 'dark') {
    themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  } else {
    themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
  }

  localStorage.setItem('client-theme', clientTheme);
});

const savedClientTheme = localStorage.getItem('client-theme') || 'dark';
if (savedClientTheme === 'light') {
  clientTheme = 'dark';
  themeToggleBtn.click();
}

// ─── Auto-Update Notification ──────────────────────────────────────────────────
window.api.onUpdateAvailable((data) => {
  pendingDownloadUrl = data.downloadUrl || '';
  if (updateVersionText) {
    updateVersionText.textContent = `v${data.currentVersion} → v${data.latestVersion} — ${data.releaseNotes || 'Update available'}`;
  }
  if (updateBanner) {
    updateBanner.style.display = 'block';
  }
});

window.api.onUpdateDownloaded((data) => {
  pendingDownloadUrl = '';
  if (updateVersionText) {
    updateVersionText.textContent = data.installsAfterStop
      ? `v${data.latestVersion} is ready and will install after tracking stops.`
      : `v${data.latestVersion} is ready. The app will restart automatically.`;
  }
  if (updateDownloadBtn) updateDownloadBtn.style.display = 'none';
  if (updateBanner) updateBanner.style.display = 'block';
});

if (updateDownloadBtn) {
  updateDownloadBtn.addEventListener('click', () => {
    if (pendingDownloadUrl) {
      window.api.openDownloadUrl(pendingDownloadUrl);
    }
  });
}

// ─── Start ────────────────────────────────────────────────────────────────────
init();
