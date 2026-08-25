const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Config
  saveConfig: (config) => ipcRenderer.invoke('save-config', config),
  getConfig: () => ipcRenderer.invoke('get-config'),

  // Auth - server URL and token handled entirely in main process
  login: (email, password) => ipcRenderer.invoke('api-login', { email, password }),
  getProfile: () => ipcRenderer.invoke('api-profile'),
  getEmployeeOperations: () => ipcRenderer.invoke('api-employee-operations'),

  // Tracking controls
  startTracking: (task) => ipcRenderer.send('start-tracking', task),
  stopTracking: () => ipcRenderer.send('stop-tracking'),
  submitWorkReport: (payload) => ipcRenderer.invoke('submit-work-report', payload),

  // Status & Updates
  getStatus: () => ipcRenderer.invoke('get-status'),
  onStatusChange: (callback) => ipcRenderer.on('status-change', (_event, data) => callback(data)),
  onUploadSuccess: (callback) => ipcRenderer.on('upload-success', (_event, data) => callback(data)),
  onError: (callback) => ipcRenderer.on('error', (_event, message) => callback(message)),
  onReportRequired: (callback) => ipcRenderer.on('report-required', (_event, data) => callback(data)),

  // App actions
  minimize: () => ipcRenderer.send('minimize-window'),
  quit: () => ipcRenderer.send('quit-app'),
  initializeTime: (seconds) => ipcRenderer.send('initialize-time', seconds),

  // Auto-update
  onUpdateAvailable: (callback) => ipcRenderer.on('update-available', (_event, data) => callback(data)),
  onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', (_event, data) => callback(data)),
  openDownloadUrl: (url) => ipcRenderer.send('open-download-url', url)
});
