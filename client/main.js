const { app, BrowserWindow, Tray, Menu, powerMonitor, desktopCapturer, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { exec, execFile, spawn } = require('child_process');

// ─── SECURITY: Server URL is hardcoded and CANNOT be overridden from config ───
const FIXED_SERVER_URL = 'https://kr-tasker-dashboard.krtaskersukltd.workers.dev';
const LEGACY_SERVER_URL = 'https://dashboard-two-pied-23.vercel.app';

// ─── Auto-update: current app version ────────────────────────────────────────
const CURRENT_APP_VERSION = app.getVersion();
const VERSION_CHECK_INTERVAL_MS = 30 * 60 * 1000; // check every 30 minutes
let updateCheckTimer = null;
let updateReadyToInstall = false;

// ─── SECURITY: Screenshot interval bounds (minutes) ───────────────────────────
const MIN_SCREENSHOT_INTERVAL = 1;   // Never faster than 1 min
const MAX_SCREENSHOT_INTERVAL = 60;  // Never slower than 60 min
const DEFAULT_SCREENSHOT_INTERVAL = 10;
const MIN_IDLE_LIMIT = 1;
const MAX_IDLE_LIMIT = 120;
const DEFAULT_IDLE_LIMIT = 10;

// ─── SECURITY: Activity buffer cap to prevent memory exhaustion ───────────────
const MAX_BUFFER_SIZE = 120; // max 120 entries (~2 hrs at 1/min)

// ─── SECURITY: Token max length ───────────────────────────────────────────────
const MAX_TOKEN_LENGTH = 4096;

let mainWindow = null;
let appTray = null;
let configPath = path.join(app.getPath('userData'), 'config.json');
let syncQueuePath = path.join(app.getPath('userData'), 'sync-queue.json');
const MAX_SYNC_QUEUE_ITEMS = 5000;
const MAX_SYNC_QUEUE_BYTES = 250 * 1024 * 1024;
let syncQueue = [];
let isFlushingQueue = false;
let currentSessionId = null;
let selectedTaskId = '';

// Tracking states
let isTracking = false;
let isOnBreak = false;
let currentTask = '';
let trackedSecondsToday = 0;
let trackingSegmentStartedAt = null;
let lastActivitySyncAt = null;
let breakStartedAt = null;
let activityLogBuffer = [];

// Keystrokes & Mouse Clicks Tracking
let trackerChild = null;
let nativeInputHook = null;
let nativeInputHookStarted = false;
let nativeInputListenersInstalled = false;
let keystrokesToday = 0;
let mouseClicksToday = 0;
let currentMinuteKeystrokes = 0;
let currentMinuteMouseClicks = 0;
let currentIntervalKeystrokes = 0;
let currentIntervalMouseClicks = 0;
let latestAppProcess = 'Idle';
let latestAppTitle = 'No activity';
let inputTrackerReady = false;

// Timers
let secondTimer = null;
let minuteTimer = null;
let screenshotTimer = null;
let midnightResetTimer = null;

// Default config (serverUrl is always overridden by FIXED_SERVER_URL)
let config = {
  serverUrl: FIXED_SERVER_URL,
  email: '',
  token: '',
  employeeId: '',
  employeeName: '',
  companyId: '',
  sessionMigrated: false,
  screenshotInterval: DEFAULT_SCREENSHOT_INTERVAL,
  idleLimitMinutes: DEFAULT_IDLE_LIMIT
};

function newClientEventId(prefix = 'evt') {
  return `${prefix}-${Date.now()}-${crypto.randomUUID()}`;
}

function loadSyncQueue() {
  try {
    if (!fs.existsSync(syncQueuePath)) return;
    const parsed = JSON.parse(fs.readFileSync(syncQueuePath, 'utf-8'));
    if (Array.isArray(parsed)) syncQueue = parsed.filter((item) => item && typeof item.endpoint === 'string' && item.payload).slice(-MAX_SYNC_QUEUE_ITEMS);
  } catch (error) {
    console.error('Could not load offline sync queue:', error.message);
    syncQueue = [];
  }
}

function saveSyncQueue() {
  try {
    let serialized = JSON.stringify(syncQueue);
    while (Buffer.byteLength(serialized, 'utf8') > MAX_SYNC_QUEUE_BYTES && syncQueue.length > 1) {
      const screenshotIndex = syncQueue.findIndex((item) => item.endpoint.includes('/screenshot'));
      syncQueue.splice(screenshotIndex >= 0 ? screenshotIndex : 0, 1);
      serialized = JSON.stringify(syncQueue);
    }
    const temporaryPath = `${syncQueuePath}.tmp`;
    fs.writeFileSync(temporaryPath, serialized, 'utf-8');
    fs.renameSync(temporaryPath, syncQueuePath);
  } catch (error) {
    console.error('Could not persist offline sync queue:', error.message);
  }
}

function enqueueSync(endpoint, payload, timeoutMs = 15000) {
  const item = { id: payload.clientEventId || newClientEventId('queue'), endpoint, payload, timeoutMs, createdAt: Date.now(), attempts: 0 };
  syncQueue.push(item);
  if (syncQueue.length > MAX_SYNC_QUEUE_ITEMS) syncQueue.splice(0, syncQueue.length - MAX_SYNC_QUEUE_ITEMS);
  saveSyncQueue();
  return item;
}

async function flushSyncQueue() {
  if (isFlushingQueue || !config.token || config.token.length > MAX_TOKEN_LENGTH || syncQueue.length === 0) return;
  isFlushingQueue = true;
  try {
    let processed = 0;
    while (syncQueue.length > 0 && processed < 60) {
      const item = syncQueue[0];
      try {
        const response = await fetch(`${FIXED_SERVER_URL}${item.endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.token}`, 'X-Client-Type': 'desktop' },
          body: JSON.stringify(item.payload),
          signal: AbortSignal.timeout(item.timeoutMs || 15000),
        });
        if (response.ok || response.status === 409) {
          syncQueue.shift();
          saveSyncQueue();
          processed += 1;
          continue;
        }
        if (response.status === 401 || response.status === 429 || response.status >= 500) break;
        // Invalid payloads must not permanently block newer events.
        syncQueue.shift();
        saveSyncQueue();
        processed += 1;
      } catch {
        item.attempts = (item.attempts || 0) + 1;
        saveSyncQueue();
        break;
      }
    }
  } finally {
    isFlushingQueue = false;
  }
}

// ─── Load configuration (serverUrl is always locked to FIXED_SERVER_URL) ──────
function loadConfig() {
  if (fs.existsSync(configPath)) {
    try {
      const data = fs.readFileSync(configPath, 'utf-8');
      const parsed = JSON.parse(data);

      // Merge loaded config but ALWAYS lock serverUrl
      config = { ...config, ...parsed };
      config.serverUrl = FIXED_SERVER_URL;

      // Sanitize token length on load
      if (config.token && config.token.length > MAX_TOKEN_LENGTH) {
        console.warn('Stored token too long, clearing.');
        config.token = '';
      }

      // Clamp screenshotInterval to safe bounds
      config.screenshotInterval = clampInterval(config.screenshotInterval);
      config.idleLimitMinutes = clampIdleLimit(config.idleLimitMinutes);
    } catch (e) {
      console.error('Failed to load config:', e);
    }
  }
}

async function migrateStoredSession() {
  if (!config.token || config.sessionMigrated) return;

  try {
    const ticketResponse = await fetch(`${LEGACY_SERVER_URL}/api/auth/migration-ticket`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${config.token}`, 'X-Client-Type': 'desktop' },
      signal: AbortSignal.timeout(15000)
    });
    if (!ticketResponse.ok) return;
    const ticketData = await ticketResponse.json();
    const ticket = String(ticketData.ticket || '');
    if (!ticket || ticket.length > MAX_TOKEN_LENGTH) return;

    const migrateResponse = await fetch(`${FIXED_SERVER_URL}/api/auth/migrate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Client-Type': 'desktop' },
      body: JSON.stringify({ ticket }),
      signal: AbortSignal.timeout(15000)
    });
    if (!migrateResponse.ok) return;
    const migrated = await migrateResponse.json();
    const token = String(migrated.token || '');
    if (!token || token.length > MAX_TOKEN_LENGTH) return;

    saveConfig({
      token,
      sessionMigrated: true,
      employeeId: migrated.user?.id || config.employeeId,
      employeeName: migrated.user?.name || config.employeeName,
      companyId: migrated.user?.companyId || config.companyId
    });
  } catch (error) {
    console.warn('Session migration deferred:', error.message);
  }
}

// ─── Clamp screenshot interval to safe bounds ─────────────────────────────────
function clampInterval(value) {
  const n = parseInt(value, 10);
  if (!Number.isFinite(n) || n < MIN_SCREENSHOT_INTERVAL) return MIN_SCREENSHOT_INTERVAL;
  if (n > MAX_SCREENSHOT_INTERVAL) return MAX_SCREENSHOT_INTERVAL;
  return n;
}

function clampIdleLimit(value) {
  const n = parseInt(value, 10);
  if (!Number.isFinite(n) || n < MIN_IDLE_LIMIT) return DEFAULT_IDLE_LIMIT;
  if (n > MAX_IDLE_LIMIT) return MAX_IDLE_LIMIT;
  return n;
}

// ─── Save configuration (serverUrl always locked) ─────────────────────────────
function saveConfig(newConfig) {
  const incoming = { ...newConfig };

  // Never allow renderer to override the server URL
  delete incoming.serverUrl;

  // Validate & clamp screenshotInterval if provided
  if ('screenshotInterval' in incoming) {
    incoming.screenshotInterval = clampInterval(incoming.screenshotInterval);
  }
  if ('idleLimitMinutes' in incoming) incoming.idleLimitMinutes = clampIdleLimit(incoming.idleLimitMinutes);

  // Validate token length if provided
  if ('token' in incoming) {
    if (typeof incoming.token !== 'string' || incoming.token.length > MAX_TOKEN_LENGTH) {
      incoming.token = '';
    }
  }

  config = { ...config, ...incoming };
  config.serverUrl = FIXED_SERVER_URL; // enforce always

  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    return { success: true };
  } catch (e) {
    console.error('Failed to save config:', e);
    return { success: false, error: e.message };
  }
}

// ─── Schedule midnight reset of daily tracked seconds ─────────────────────────
function scheduleMidnightReset() {
  if (midnightResetTimer) clearTimeout(midnightResetTimer);

  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setDate(now.getDate() + 1);
  nextMidnight.setHours(0, 0, 1, 0);

  const msUntilMidnight = nextMidnight.getTime() - now.getTime();

  midnightResetTimer = setTimeout(() => {
    trackedSecondsToday = 0;
    keystrokesToday = 0;
    mouseClicksToday = 0;
    currentMinuteKeystrokes = 0;
    currentMinuteMouseClicks = 0;
    currentIntervalKeystrokes = 0;
    currentIntervalMouseClicks = 0;
    activityLogBuffer = [];
    if (isTracking) {
      trackingSegmentStartedAt = Date.now();
      lastActivitySyncAt = trackingSegmentStartedAt;
    }
    sendUIState();
    scheduleMidnightReset();
  }, msUntilMidnight);
}

// ─── Auto-update: check for new version from Vercel ──────────────────────────
async function checkForUpdate(silent = false) {
  if (app.isPackaged) {
    try {
      await autoUpdater.checkForUpdates();
      return;
    } catch (error) {
      console.error('Automatic update check failed:', error.message);
    }
  }
  try {
    const response = await fetch(`${FIXED_SERVER_URL}/api/version`, {
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) return;

    const data = await response.json();
    const latestVersion = String(data.version || '').trim();
    const downloadUrl = String(data.downloadUrl || '').trim();
    const releaseNotes = String(data.releaseNotes || '').trim();

    if (!latestVersion || latestVersion === CURRENT_APP_VERSION) {
      if (!silent && mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('update-status', { hasUpdate: false });
      }
      return;
    }

    // New version available — notify renderer
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('update-available', {
        currentVersion: CURRENT_APP_VERSION,
        latestVersion,
        downloadUrl,
        releaseNotes
      });
    }
  } catch (err) {
    // Silently ignore network errors for update checks
    console.log('Update check skipped:', err.message);
  }
}

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.on('update-available', (info) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('update-available', {
      currentVersion: CURRENT_APP_VERSION,
      latestVersion: info.version,
      releaseNotes: 'Downloading securely in the background…',
      downloadUrl: '',
    });
  }
});
autoUpdater.on('update-downloaded', (info) => {
  updateReadyToInstall = true;
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('update-downloaded', { latestVersion: info.version, installsAfterStop: isTracking || isOnBreak });
  }
  if (!isTracking && !isOnBreak) setTimeout(() => autoUpdater.quitAndInstall(false, true), 8_000);
});
autoUpdater.on('error', (error) => console.error('Auto-updater error:', error.message));

// ─── Open download URL in system browser ─────────────────────────────────────
ipcMain.on('open-download-url', (_event, url) => {
  // Validate URL before opening
  try {
    const parsed = new URL(String(url));
    if (parsed.origin === FIXED_SERVER_URL) {
      require('electron').shell.openExternal(parsed.href);
    }
  } catch (e) {
    console.error('Invalid download URL:', e.message);
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 680,
    resizable: false,
    maximizable: false,
    title: 'KR Tasker Tracker',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  });

  mainWindow.loadFile('index.html');

  // Prevent default close - just hide to tray silently
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create a system tray icon
function createTray() {
  const iconPath = path.join(__dirname, 'tray_icon.png');
  appTray = new Tray(iconPath);

  appTray.setToolTip('KR Tasker Tracker');
  updateTrayMenu();

  appTray.on('double-click', () => {
    if (mainWindow) mainWindow.show();
  });
}

// ─── Global Input Tracking ────────────────────────────────────────────────────
function recordInput(keystrokes, mouseClicks) {
  if (!isTracking) return;
  keystrokesToday += keystrokes;
  mouseClicksToday += mouseClicks;
  currentMinuteKeystrokes += keystrokes;
  currentMinuteMouseClicks += mouseClicks;
  currentIntervalKeystrokes += keystrokes;
  currentIntervalMouseClicks += mouseClicks;
}

function startNativeInputHook() {
  try {
    nativeInputHook ||= require('uiohook-napi').uIOhook;
    if (!nativeInputListenersInstalled) {
      nativeInputHook.on('keydown', () => recordInput(1, 0));
      // Count the physical button-down event; it is emitted reliably even when
      // an application consumes the completed click event.
      nativeInputHook.on('mousedown', () => recordInput(0, 1));
      nativeInputListenersInstalled = true;
    }
    nativeInputHook.start();
    nativeInputHookStarted = true;
    inputTrackerReady = true;
    return true;
  } catch (error) {
    nativeInputHookStarted = false;
    console.error('Native input hook failed, using helper fallback:', error.message);
    return false;
  }
}

// Keep the standalone helper as a fallback for older Windows installations.
function startInputTrackerProcess() {
  stopInputTrackerProcess();

  if (startNativeInputHook()) return;

  const exePath = app.isPackaged
    ? path.join(process.resourcesPath, 'input_tracker.exe')
    : path.join(__dirname, 'input_tracker.exe');
  if (!fs.existsSync(exePath)) {
    inputTrackerReady = false;
    sendUIState();
    console.error('Input tracker helper is missing:', exePath);
    return;
  }

  try {
    trackerChild = spawn(exePath, [], {
      cwd: __dirname,
      windowsHide: true
    });

    let buffer = '';
    trackerChild.stdout.on('data', (data) => {
      buffer += data.toString('utf-8');
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep trailing partial line

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('{')) continue;
        try {
          const parsed = JSON.parse(trimmed);
          const k = Math.max(0, parseInt(parsed.keystrokes, 10) || 0);
          const c = Math.max(0, parseInt(parsed.mouseClicks, 10) || 0);
          inputTrackerReady = true;

          recordInput(k, c);

          if (parsed.process) latestAppProcess = parsed.process;
          if (parsed.title) latestAppTitle = parsed.title;
        } catch (e) {}
      }
    });

    trackerChild.on('error', (err) => {
      inputTrackerReady = false;
      sendUIState();
      console.error('Input tracker helper process error:', err.message);
    });
    trackerChild.on('exit', (code) => {
      trackerChild = null;
      inputTrackerReady = false;
      sendUIState();
      if (isTracking) console.error('Input tracker helper exited unexpectedly:', code);
    });
  } catch (e) {
    console.error('Failed to spawn input tracker process:', e.message);
  }
}

function stopInputTrackerProcess() {
  if (nativeInputHookStarted && nativeInputHook) {
    try {
      nativeInputHook.stop();
    } catch (error) {
      console.error('Failed to stop native input hook:', error.message);
    }
    nativeInputHookStarted = false;
  }
  if (trackerChild) {
    try {
      trackerChild.kill();
    } catch {}
    trackerChild = null;
  }
  inputTrackerReady = false;
}

function requestReport(type, quitAfter = false) {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.show();
  mainWindow.focus();
  mainWindow.webContents.send('report-required', { type, quitAfter });
}

// Update Tray Menu Status
function updateTrayMenu() {
  if (!appTray) return;
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open Dashboard', click: () => { if (mainWindow) mainWindow.show(); } },
    { type: 'separator' },
    { label: isOnBreak ? 'Resume Tracking' : 'Start Tracking', enabled: !isTracking, click: () => startTracking() },
    { label: 'Take a Break', enabled: isTracking, click: () => requestReport('BREAK') },
    { label: 'Stop Tracking', enabled: isTracking || isOnBreak, click: () => requestReport('STOP') },
    { type: 'separator' },
    {
      label: 'Quit', click: () => {
        if (isTracking || isOnBreak) requestReport('STOP', true);
        else {
          app.isQuitting = true;
          app.quit();
        }
      }
    }
  ]);
  appTray.setContextMenu(contextMenu);
}

function getTrackedSecondsToday() {
  if (!isTracking || !trackingSegmentStartedAt) return trackedSecondsToday;
  return trackedSecondsToday + Math.max(0, Math.floor((Date.now() - trackingSegmentStartedAt) / 1000));
}

function commitTrackingSegment() {
  trackedSecondsToday = getTrackedSecondsToday();
  trackingSegmentStartedAt = null;
}

async function closeBreakOnServer() {
  if (!config.token) return;
  enqueueSync('/api/track/report', {
    type: 'RESUME',
    clientEventId: newClientEventId('resume'),
    taskId: selectedTaskId || null,
  });
  await flushSyncQueue();
}

// Start tracking
async function startTracking(task = '', taskId = '') {
  if (isTracking) return;
  if (isOnBreak) await closeBreakOnServer();
  isTracking = true;
  isOnBreak = false;
  breakStartedAt = null;
  currentTask = task || currentTask || 'Working';
  selectedTaskId = typeof taskId === 'string' ? taskId.slice(0, 80) : '';
  currentSessionId = currentSessionId || newClientEventId('session');
  trackingSegmentStartedAt = Date.now();
  lastActivitySyncAt = trackingSegmentStartedAt;

  currentMinuteKeystrokes = 0;
  currentMinuteMouseClicks = 0;
  currentIntervalKeystrokes = 0;
  currentIntervalMouseClicks = 0;

  startInputTrackerProcess();

  updateTrayMenu();
  sendUIState();

  // Reset/start timers
  clearInterval(secondTimer);
  secondTimer = setInterval(sendUIState, 1000);

  clearInterval(minuteTimer);
  minuteTimer = setInterval(trackActivityMinute, 60000);

  // Screenshot interval: always clamped to safe bounds
  clearInterval(screenshotTimer);
  const intervalMins = clampInterval(config.screenshotInterval);
  const intervalMs = intervalMins * 60 * 1000;
  screenshotTimer = setInterval(captureAndUploadScreenshot, intervalMs);

  enqueueSync('/api/track/session', {
    event: 'START',
    clientSessionId: currentSessionId,
    currentTask,
    taskId: selectedTaskId || null,
  });
  void flushSyncQueue();
}

// Stop tracking
function stopTracking() {
  if (!isTracking && !isOnBreak) return;
  if (isTracking) commitTrackingSegment();
  isTracking = false;
  isOnBreak = false;
  breakStartedAt = null;
  lastActivitySyncAt = null;

  stopInputTrackerProcess();

  updateTrayMenu();
  sendUIState();

  clearInterval(secondTimer);
  clearInterval(minuteTimer);
  clearInterval(screenshotTimer);

  // Clear activity buffer on stop
  activityLogBuffer = [];
  currentSessionId = null;
  selectedTaskId = '';

  if (updateReadyToInstall) setTimeout(() => autoUpdater.quitAndInstall(false, true), 1_000);
}

function beginBreak() {
  if (!isTracking) return;
  commitTrackingSegment();
  isTracking = false;
  isOnBreak = true;
  breakStartedAt = Date.now();
  lastActivitySyncAt = null;
  stopInputTrackerProcess();
  clearInterval(secondTimer);
  clearInterval(minuteTimer);
  clearInterval(screenshotTimer);
  activityLogBuffer = [];
  secondTimer = setInterval(sendUIState, 1000);
  updateTrayMenu();
  sendUIState();
}

// Send updates to renderer process
function sendUIState() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('status-change', {
      isTracking,
      isOnBreak,
      trackedSecondsToday: getTrackedSecondsToday(),
      breakSeconds: isOnBreak && breakStartedAt ? Math.floor((Date.now() - breakStartedAt) / 1000) : 0,
      idleSeconds: isTracking ? powerMonitor.getSystemIdleTime() : 0,
      idleLimitMinutes: clampIdleLimit(config.idleLimitMinutes),
      currentTask,
      email: config.email,
      employeeName: config.employeeName,
      keystrokesToday,
      mouseClicksToday,
      inputTrackerReady
    });
  }
}

// Track activity for a single minute
async function trackActivityMinute() {
  if (!isTracking || !config.token) return;

  // Guard: token must be valid length
  if (config.token.length > MAX_TOKEN_LENGTH) return;

  const now = Date.now();
  const durationSeconds = Math.min(120, Math.max(1, Math.round((now - (lastActivitySyncAt || now - 60_000)) / 1000)));
  lastActivitySyncAt = now;
  const idleTime = powerMonitor.getSystemIdleTime();
  const idleSeconds = Math.min(durationSeconds, idleTime);
  const status = idleSeconds >= Math.min(60, durationSeconds) ? 'IDLE' : 'ACTIVE';

  let appProcess = null;
  let appTitle = null;

  if (status === 'ACTIVE') {
    if (latestAppProcess && latestAppProcess !== 'Idle') {
      appProcess = latestAppProcess;
      appTitle = latestAppTitle;
    } else {
      try {
        const activeWin = await getActiveWindowReliable();
        appProcess = formatProcessName(activeWin.process);
        const cleanTitle = cleanAppTitle(activeWin.process, activeWin.title);
        appTitle = activeWin.domain
          ? `${activeWin.domain}${cleanTitle && !cleanTitle.toLowerCase().includes(activeWin.domain) ? ` (${cleanTitle})` : ''}`
          : cleanTitle;
      } catch (e) {
        console.error('Failed to get active window:', e);
      }
    }
  } else {
    appProcess = 'Idle';
    appTitle = 'No activity';
  }

  const minuteKeystrokes = currentMinuteKeystrokes;
  const minuteMouseClicks = currentMinuteMouseClicks;
  currentMinuteKeystrokes = 0;
  currentMinuteMouseClicks = 0;

  // Cap buffer to prevent memory exhaustion
  if (activityLogBuffer.length < MAX_BUFFER_SIZE) {
    activityLogBuffer.push({ timestamp: now, status, appProcess, appTitle, durationSeconds, idleSeconds });
  }

  enqueueSync('/api/track/activity', {
    clientEventId: newClientEventId('activity'),
    status,
    currentTask,
    taskId: selectedTaskId || null,
    timestamp: new Date().toISOString(),
    appProcess,
    appTitle,
    keystrokes: minuteKeystrokes,
    mouseClicks: minuteMouseClicks,
    durationSeconds,
    idleSeconds,
    continuousIdleSeconds: idleTime,
  });
  await flushSyncQueue();
}

// Capture and upload screenshot
async function captureAndUploadScreenshot() {
  if (!isTracking || !config.token) return;

  // Guard: token must be valid length
  if (config.token.length > MAX_TOKEN_LENGTH) return;

  // Keep the heartbeat and exact idle counter running, but avoid storing the
  // same unattended screen repeatedly after the admin's long-idle threshold.
  if (powerMonitor.getSystemIdleTime() >= clampIdleLimit(config.idleLimitMinutes) * 60) {
    activityLogBuffer = [];
    currentIntervalKeystrokes = 0;
    currentIntervalMouseClicks = 0;
    return;
  }

  try {
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: { width: 1280, height: 720 }
    });

    const screenSources = sources.filter((source) => source.thumbnail && !source.thumbnail.isEmpty());
    if (screenSources.length === 0) {
      console.error('No screen sources found.');
      return;
    }

    // Calculate activity rate over last interval
    const totalSeconds = activityLogBuffer.reduce((sum, log) => sum + log.durationSeconds, 0);
    const idleSeconds = activityLogBuffer.reduce((sum, log) => sum + log.idleSeconds, 0);
    const activityRate = totalSeconds > 0 ? Math.round(((totalSeconds - idleSeconds) / totalSeconds) * 100) : 0;

    // Clear buffer for next interval
    activityLogBuffer = [];

    const intervalKeystrokes = currentIntervalKeystrokes;
    const intervalMouseClicks = currentIntervalMouseClicks;
    currentIntervalKeystrokes = 0;
    currentIntervalMouseClicks = 0;

    const captureTime = Date.now();
    let queuedScreens = 0;

    // Upload every connected monitor as its own screenshot. Activity counters are
    // attached only to the first image so dashboard totals are never duplicated.
    for (let index = 0; index < screenSources.length; index += 1) {
      const source = screenSources[index];
      const jpegBuffer = source.thumbnail.toJPEG(80);
      const base64Image = `data:image/jpeg;base64,${jpegBuffer.toString('base64')}`;

      enqueueSync('/api/track/screenshot', {
        clientEventId: newClientEventId('screenshot'),
        image: base64Image,
        activityRate,
        currentTask,
        taskId: selectedTaskId || null,
        // Millisecond offset keeps local-development filenames unique.
        timestamp: new Date(captureTime + index).toISOString(),
        keystrokes: index === 0 ? intervalKeystrokes : 0,
        mouseClicks: index === 0 ? intervalMouseClicks : 0,
      }, 30000);
      queuedScreens += 1;
    }

    await flushSyncQueue();

    if (queuedScreens > 0 && mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('upload-success', {
        screenshotsUploaded: queuedScreens,
        screensDetected: screenSources.length
      });
    }
  } catch (err) {
    console.error('Error capturing/uploading screenshot:', err.message);
  }
}

// Write a simple default green circle icon.png if it doesn't exist
function ensureIconExists() {
  const iconPath = path.join(__dirname, 'icon.png');
  if (!fs.existsSync(iconPath)) {
    const base64Icon = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4T2NkYGD4D8QwwMTAwMAIxAwnGTEwMDAyMDCgC8IU41NH1QDZhg0EdgEZmFEXYdMAMwQbCOwCkM1EdwE2DTAuwxZg1wAzkGgX4NIAk4NoF+CSALoBWA3AmQAOIOjN8G4Alnux2A/mEqwBRk6g2w9zAzlhhA4+GKaQ1wD2MDF2n2Dq+cHYfQJ3A+g+wew+QfM2HGBk+M8AAHT/R1B6W/J1AAAAAElFTkSuQmCC';
    try {
      fs.writeFileSync(iconPath, Buffer.from(base64Icon, 'base64'));
    } catch (e) {
      console.error('Failed to write icon.png:', e);
    }
  }
}

// Get Foreground active window process name and title (Windows only)
function getActiveWindow() {
  return new Promise((resolve) => {
    const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -Command "
      Add-Type -TypeDefinition @'
      using System;
      using System.Runtime.InteropServices;
      public class Win32 {
        [DllImport(\\"user32.dll\\")] public static extern IntPtr GetForegroundWindow();
        [DllImport(\\"user32.dll\\")] public static extern int GetWindowText(IntPtr hWnd, System.Text.StringBuilder text, int count);
        [DllImport(\\"user32.dll\\")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
      }
'@
      $hwnd = [Win32]::GetForegroundWindow()
      if ($hwnd -ne [IntPtr]::Zero) {
        $builder = New-Object System.Text.StringBuilder 256
        [Win32]::GetWindowText($hwnd, $builder, 256) | Out-Null
        $pid = 0
        [Win32]::GetWindowThreadProcessId($hwnd, [ref]$pid) | Out-Null
        $proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($proc) {
          @{ Process = $proc.ProcessName; Title = $builder.ToString() } | ConvertTo-Json -Compress
        } else {
          @{ Process = \\"unknown\\"; Title = \\"\\\" } | ConvertTo-Json -Compress
        }
      } else {
        @{ Process = \\"idle\\"; Title = \\"\\\" } | ConvertTo-Json -Compress
      }
    "`;

    exec(cmd, { timeout: 8000 }, (error, stdout) => {
      if (error) {
        resolve({ process: 'Unknown', title: 'Idle' });
        return;
      }
      try {
        const parsed = JSON.parse(stdout.trim());
        resolve({
          process: parsed.Process || 'Unknown',
          title: parsed.Title || 'Idle'
        });
      } catch (e) {
        resolve({ process: 'Unknown', title: 'Idle' });
      }
    });
  });
}

function getActiveWindowReliable() {
  return new Promise((resolve) => {
    const script = `
      Add-Type -TypeDefinition @'
      using System;
      using System.Runtime.InteropServices;
      public class ActiveWindowApi {
        [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
        [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr hWnd, System.Text.StringBuilder text, int count);
        [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
      }
'@
      Add-Type -AssemblyName UIAutomationClient
      Add-Type -AssemblyName UIAutomationTypes
      $hwnd = [ActiveWindowApi]::GetForegroundWindow()
      if ($hwnd -eq [IntPtr]::Zero) {
        @{ Process = 'Idle'; Title = ''; Url = '' } | ConvertTo-Json -Compress
        exit
      }
      $builder = New-Object System.Text.StringBuilder 512
      [ActiveWindowApi]::GetWindowText($hwnd, $builder, 512) | Out-Null
      [uint32]$processId = 0
      [ActiveWindowApi]::GetWindowThreadProcessId($hwnd, [ref]$processId) | Out-Null
      $proc = Get-Process -Id $processId -ErrorAction SilentlyContinue
      if (-not $proc) {
        @{ Process = 'Unknown'; Title = $builder.ToString(); Url = '' } | ConvertTo-Json -Compress
        exit
      }
      $activeUrl = ''
      if ($proc.ProcessName -match '^(chrome|msedge|brave|firefox|opera|vivaldi)$') {
        try {
          $root = [System.Windows.Automation.AutomationElement]::FromHandle($hwnd)
          $condition = [System.Windows.Automation.PropertyCondition]::new(
            [System.Windows.Automation.AutomationElement]::ControlTypeProperty,
            [System.Windows.Automation.ControlType]::Edit
          )
          $edits = $root.FindAll([System.Windows.Automation.TreeScope]::Descendants, $condition)
          foreach ($element in $edits) {
            $label = "$($element.Current.Name) $($element.Current.AutomationId)"
            if ($label -notmatch '(?i)address|location|search.*address|enter.*address') { continue }
            try {
              $pattern = $element.GetCurrentPattern([System.Windows.Automation.ValuePattern]::Pattern)
              $candidate = $pattern.Current.Value
              if ($candidate -match '(?i)^(https?://|[a-z0-9-]+\.)') {
                $activeUrl = $candidate
                break
              }
            } catch {}
          }
        } catch {}
      }
      @{ Process = $proc.ProcessName; Title = $builder.ToString(); Url = $activeUrl } | ConvertTo-Json -Compress
    `;

    execFile('powershell.exe', [
      '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script
    ], { timeout: 8000, windowsHide: true, maxBuffer: 1024 * 1024 }, (error, stdout) => {
      if (error) {
        console.error('Active window lookup failed:', error.message);
        resolve({ process: 'Unknown', title: 'Unknown window', domain: '' });
        return;
      }
      try {
        const parsed = JSON.parse(stdout.trim());
        const rawUrl = String(parsed.Url || '').trim();
        let domain = '';
        if (rawUrl) {
          try {
            const normalizedUrl = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
            domain = new URL(normalizedUrl).hostname.replace(/^www\./i, '').toLowerCase();
          } catch {}
        }
        resolve({
          process: parsed.Process || 'Unknown',
          title: parsed.Title || 'Unknown window',
          domain
        });
      } catch (error) {
        console.error('Active window response was invalid:', error.message);
        resolve({ process: 'Unknown', title: 'Unknown window', domain: '' });
      }
    });
  });
}

function formatProcessName(processName) {
  const names = {
    chrome: 'Google Chrome',
    msedge: 'Microsoft Edge',
    firefox: 'Mozilla Firefox',
    brave: 'Brave Browser',
    opera: 'Opera',
    vivaldi: 'Vivaldi',
    code: 'Visual Studio Code',
    devenv: 'Visual Studio',
    winword: 'Microsoft Word',
    excel: 'Microsoft Excel',
    powerpnt: 'Microsoft PowerPoint',
    teams: 'Microsoft Teams',
    applicationframehost: 'Windows App'
  };
  const raw = String(processName || 'Unknown');
  return names[raw.toLowerCase()] || raw;
}

// Clean active window title formatting
function cleanAppTitle(processName, title) {
  if (!title) return '';
  let clean = title;
  const browserSuffixes = [
    ' - Google Chrome',
    ' - Microsoft Edge',
    ' - Mozilla Firefox',
    ' - Brave',
    ' - Opera',
    ' - Personal - Microsoft​ Edge'
  ];
  for (const suffix of browserSuffixes) {
    if (clean.endsWith(suffix)) {
      clean = clean.substring(0, clean.length - suffix.length);
    }
  }
  return clean.trim();
}

// ─── IPC Handlers ─────────────────────────────────────────────────────────────
ipcMain.handle('save-config', async (event, data) => {
  // Only allow plain objects from renderer
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { success: false, error: 'Invalid config data' };
  }
  return saveConfig(data);
});

ipcMain.handle('get-config', async () => {
  loadConfig();
  // Never expose token to renderer in get-config - renderer only needs these fields
  return {
    serverUrl: FIXED_SERVER_URL,
    email: config.email,
    employeeName: config.employeeName,
    // Send whether we HAVE a token (boolean), not the token itself
    hasToken: !!(config.token && config.token.length > 0 && config.token.length <= MAX_TOKEN_LENGTH),
    companyId: config.companyId
  };
});

ipcMain.handle('api-login', async (_event, data) => {
  try {
    // SECURITY: Always use FIXED_SERVER_URL regardless of what renderer sends
    const email = String(data?.email || '').trim().toLowerCase();
    const password = String(data?.password || '');
    if (!email || email.length > 254 || !password || password.length > 128) {
      return { ok: false, status: 400, data: { error: 'Invalid login details' } };
    }

    const response = await fetch(`${FIXED_SERVER_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Client-Type': 'desktop' },
      body: JSON.stringify({ email, password }),
      signal: AbortSignal.timeout(15000)
    });
    const responseData = await response.json();

    // On success, store token directly in main process config (never expose to renderer)
    if (response.ok && responseData.token) {
      const token = String(responseData.token);
      if (token.length <= MAX_TOKEN_LENGTH) {
        saveConfig({
          token,
          sessionMigrated: true,
          email,
          employeeId: responseData.user?.id || '',
          employeeName: responseData.user?.name || '',
          companyId: responseData.user?.companyId || '',
          screenshotInterval: clampInterval(responseData.user?.screenshotInterval || DEFAULT_SCREENSHOT_INTERVAL),
          idleLimitMinutes: clampIdleLimit(responseData.user?.idleLimitMinutes || DEFAULT_IDLE_LIMIT)
        });
      }
      // Return user info but NOT the token to renderer
      return {
        ok: true,
        status: response.status,
        data: {
          user: {
            id: responseData.user?.id,
            name: responseData.user?.name,
            email: responseData.user?.email,
            role: responseData.user?.role,
            companyId: responseData.user?.companyId
          },
          todayTrackedSeconds: responseData.todayTrackedSeconds
        }
      };
    }

    return { ok: false, status: response.status, data: responseData };
  } catch (error) {
    return { ok: false, status: 0, data: { error: error.message || 'Connection failed' } };
  }
});

ipcMain.handle('api-profile', async (_event, data) => {
  try {
    // Use token from main process config, NOT from renderer
    const token = config.token;
    if (!token || token.length > MAX_TOKEN_LENGTH) {
      return { ok: false, status: 401, data: {} };
    }

    const response = await fetch(`${FIXED_SERVER_URL}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}`, 'X-Client-Type': 'desktop' },
      signal: AbortSignal.timeout(15000)
    });
    const responseData = await response.json();

    // Update local config from fresh profile data
    if (response.ok && responseData.user) {
      saveConfig({
        employeeName: responseData.user.name || config.employeeName,
        screenshotInterval: clampInterval(responseData.user.screenshotInterval || DEFAULT_SCREENSHOT_INTERVAL),
        idleLimitMinutes: clampIdleLimit(responseData.user.idleLimitMinutes || DEFAULT_IDLE_LIMIT)
      });
    }

    const safeResponseData = responseData.user ? {
      ...responseData,
      user: {
        id: responseData.user.id,
        name: responseData.user.name,
        email: responseData.user.email,
        role: responseData.user.role,
        companyId: responseData.user.companyId
      }
    } : responseData;
    return { ok: response.ok, status: response.status, data: safeResponseData };
  } catch {
    return { ok: false, status: 0, data: {} };
  }
});

ipcMain.handle('api-employee-operations', async () => {
  try {
    if (!config.token || config.token.length > MAX_TOKEN_LENGTH) return { ok: false, data: {} };
    const response = await fetch(`${FIXED_SERVER_URL}/api/employee/operations`, {
      headers: { Authorization: `Bearer ${config.token}`, 'X-Client-Type': 'desktop' },
      signal: AbortSignal.timeout(15000),
    });
    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, data };
  } catch {
    return { ok: false, status: 0, data: {} };
  }
});

ipcMain.handle('get-status', async () => {
  return {
    isTracking,
    isOnBreak,
    trackedSecondsToday: getTrackedSecondsToday(),
    breakSeconds: isOnBreak && breakStartedAt ? Math.floor((Date.now() - breakStartedAt) / 1000) : 0,
    idleSeconds: isTracking ? powerMonitor.getSystemIdleTime() : 0,
    idleLimitMinutes: clampIdleLimit(config.idleLimitMinutes),
    currentTask,
    keystrokesToday,
    mouseClicksToday,
    inputTrackerReady
  };
});

ipcMain.handle('submit-work-report', async (_event, payload) => {
  const type = payload?.type === 'BREAK' || payload?.type === 'STOP' ? payload.type : null;
  const note = typeof payload?.note === 'string' ? payload.note.trim().slice(0, 2000) : '';
  const quitAfter = payload?.quitAfter === true;
  if (!type || note.length < 3 || !config.token || config.token.length > MAX_TOKEN_LENGTH) {
    return { ok: false, error: 'Please enter a short work report.' };
  }

  // Persist first so break/stop remains reliable even without internet.
  if (isTracking && lastActivitySyncAt && Date.now() - lastActivitySyncAt >= 1000) {
    await trackActivityMinute();
  }

  enqueueSync('/api/track/report', {
    type,
    note,
    clientEventId: newClientEventId(type.toLowerCase()),
    taskId: selectedTaskId || null,
  });
  void flushSyncQueue();

  if (type === 'BREAK') beginBreak();
  else stopTracking();

  if (quitAfter) {
    app.isQuitting = true;
    setTimeout(() => app.quit(), 150);
  }
  return { ok: true, queued: true };
});

ipcMain.on('start-tracking', (event, input) => {
  const task = typeof input === 'object' ? input?.task : input;
  const taskId = typeof input === 'object' ? input?.taskId : '';
  const safeTask = typeof task === 'string' ? task.slice(0, 200) : 'Working';
  const safeTaskId = typeof taskId === 'string' ? taskId.slice(0, 80) : '';
  startTracking(safeTask, safeTaskId);
});

ipcMain.on('stop-tracking', () => {
  requestReport('STOP');
});

ipcMain.on('minimize-window', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('initialize-time', (event, seconds) => {
  const s = parseInt(seconds, 10);
  trackedSecondsToday = Number.isFinite(s) && s >= 0 ? s : 0;
  if (isTracking) trackingSegmentStartedAt = Date.now();
  sendUIState();
});

ipcMain.on('quit-app', () => {
  if (isTracking || isOnBreak) requestReport('STOP', true);
  else {
    app.isQuitting = true;
    app.quit();
  }
});

// ─── App Lifecycle ─────────────────────────────────────────────────────────────
const hasSingleInstanceLock = app.requestSingleInstanceLock();
if (!hasSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });
}

app.whenReady().then(async () => {
  ensureIconExists();
  loadConfig();
  loadSyncQueue();
  await migrateStoredSession();
  void flushSyncQueue();

  // Register the installed app with Windows startup. Electron uses the
  // packaged executable path, so this remains valid after installation.
  if (app.isPackaged) {
    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: false,
      path: process.execPath
    });
  }
  createWindow();
  createTray();
  scheduleMidnightReset();

  // Check for updates on startup (after 5 second delay for app to settle)
  setTimeout(() => checkForUpdate(true), 5000);

  // Then check every 30 minutes
  updateCheckTimer = setInterval(() => checkForUpdate(true), VERSION_CHECK_INTERVAL_MS);
  setInterval(() => void flushSyncQueue(), 30_000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else if (mainWindow) {
      mainWindow.show();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
