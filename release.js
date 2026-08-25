/**
 * KR Tasker - Full Auto Release Script
 * =====================================
 * Ek command se sab kuch:
 * 1. Client EXE build karta hai
 * 2. Version number auto-bump karta hai
 * 3. EXE ko dashboard/public/downloads/ mein copy karta hai
 * 4. Dashboard Vercel pe deploy karta hai
 *
 * Usage:
 *   node release.js              -> patch version bump (1.0.1 -> 1.0.2)
 *   node release.js minor        -> minor version bump (1.0.1 -> 1.1.0)
 *   node release.js major        -> major version bump (1.0.1 -> 2.0.0)
 *   node release.js --notes "Fix login bug"   -> custom release notes
 */

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ── Paths ────────────────────────────────────────────────────────────────────
const ROOT = __dirname;
const CLIENT_DIR = path.join(ROOT, 'client');
const DASHBOARD_DIR = path.join(ROOT, 'dashboard');
const VERSION_FILE = path.join(DASHBOARD_DIR, 'src', 'lib', 'desktop-release.ts');
const DOWNLOADS_DIR = path.join(ROOT, 'dist_downloads', 'downloads');
const CLIENT_PACKAGE = path.join(CLIENT_DIR, 'package.json');
const CLIENT_PACKAGE_LOCK = path.join(CLIENT_DIR, 'package-lock.json');

// ── Parse args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const bumpType = ['major', 'minor', 'patch'].find(t => args.includes(t)) || 'patch';
const notesFlag = args.indexOf('--notes');
const customNotes = notesFlag !== -1 ? args[notesFlag + 1] : null;

// ── Helpers ───────────────────────────────────────────────────────────────────
function log(msg) { console.log(`\n✅ ${msg}`); }
function warn(msg) { console.log(`⚠️  ${msg}`); }
function error(msg) { console.error(`\n❌ ${msg}`); process.exit(1); }

function run(cmd, cwd = ROOT) {
  console.log(`\n▶ ${cmd}`);
  const result = spawnSync(cmd, { shell: true, cwd, stdio: 'inherit' });
  if (result.status !== 0) error(`Command failed: ${cmd}`);
}

function bumpVersion(current, type) {
  const [major, minor, patch] = current.split('.').map(Number);
  if (type === 'major') return `${major + 1}.0.0`;
  if (type === 'minor') return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

function getCurrentVersion() {
  const content = fs.readFileSync(VERSION_FILE, 'utf-8');
  const match = content.match(/DESKTOP_VERSION\s*=\s*['"]([^'"]+)['"]/);
  if (!match) error('Could not find DESKTOP_VERSION in desktop-release.ts');
  return match[1];
}

function findBuiltExe(version) {
  const distDir = path.join(CLIENT_DIR, 'dist');
  if (!fs.existsSync(distDir)) error('dist/ folder not found. Build may have failed.');
  const expectedName = `KRTaskerTracker-Setup-${version}.exe`;
  const expectedPath = path.join(distDir, expectedName);
  if (!fs.existsSync(expectedPath)) error(`Expected installer not found: ${expectedName}`);
  return expectedPath;
}

// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║     KR Tasker Auto Release Script           ║');
  console.log('╚══════════════════════════════════════════════╝');

  // ── Step 1: Get current version and calculate new version ─────────────────
  const currentVersion = getCurrentVersion();
  const newVersion = bumpVersion(currentVersion, bumpType);
  const releaseNotes = customNotes || `Version ${newVersion} - Security and stability improvements.`;

  console.log(`\n📦 Version: ${currentVersion} → ${newVersion} (${bumpType} bump)`);
  console.log(`📝 Release Notes: ${releaseNotes}`);

  // ── Step 2: Update the Electron package version ──────────────────────────
  // app.getVersion() reads package.json. Keeping the lockfile in sync also
  // makes the generated installer and updater metadata use the same version.
  log('Updating desktop package version...');
  const packageJson = JSON.parse(fs.readFileSync(CLIENT_PACKAGE, 'utf-8'));
  packageJson.version = newVersion;
  fs.writeFileSync(CLIENT_PACKAGE, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf-8');

  const packageLock = JSON.parse(fs.readFileSync(CLIENT_PACKAGE_LOCK, 'utf-8'));
  packageLock.version = newVersion;
  if (packageLock.packages?.['']) packageLock.packages[''].version = newVersion;
  fs.writeFileSync(CLIENT_PACKAGE_LOCK, `${JSON.stringify(packageLock, null, 2)}\n`, 'utf-8');

  // ── Step 3: Build the EXE ─────────────────────────────────────────────────
  log('Compiling C# input tracker helper...');
  run('powershell -NoProfile -ExecutionPolicy Bypass -Command "Add-Type -TypeDefinition (Get-Content -Raw \'input_tracker.cs\') -ReferencedAssemblies \'System.Windows.Forms.dll\',\'System.Drawing.dll\' -OutputAssembly \'input_tracker.exe\' -OutputType ConsoleApplication"', CLIENT_DIR);

  log('Building desktop app EXE...');
  run('npm run build', CLIENT_DIR);

  // ── Step 4: Find and copy EXE to dashboard ────────────────────────────────
  log('Staging installer and updater metadata...');
  const builtExe = findBuiltExe(newVersion);
  if (!fs.existsSync(DOWNLOADS_DIR)) fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
  const releaseFiles = [path.basename(builtExe), `${path.basename(builtExe)}.blockmap`, 'latest.yml'];
  for (const filename of releaseFiles) {
    fs.copyFileSync(path.join(CLIENT_DIR, 'dist', filename), path.join(DOWNLOADS_DIR, filename));
  }
  const sizeMB = (fs.statSync(path.join(DOWNLOADS_DIR, path.basename(builtExe))).size / 1024 / 1024).toFixed(1);
  console.log(`   Copied: ${path.basename(builtExe)} (${sizeMB} MB)`);

  // ── Step 5: Update version in dashboard API route ─────────────────────────
  log(`Updating version API to v${newVersion}...`);
  let versionContent = fs.readFileSync(VERSION_FILE, 'utf-8');
  versionContent = versionContent.replace(
    /DESKTOP_VERSION\s*=\s*['"][^'"]+['"]/, 
    `DESKTOP_VERSION = '${newVersion}'`
  );
  versionContent = versionContent.replace(
    /DESKTOP_RELEASE_DATE\s*=\s*['"][^'"]+['"]/, 
    `DESKTOP_RELEASE_DATE = '${new Date().toISOString()}'`
  );
  versionContent = versionContent.replace(
    /DESKTOP_RELEASE_NOTES\s*=\s*\n?\s*['"][^'"]*['"]/, 
    `DESKTOP_RELEASE_NOTES =\n  ${JSON.stringify(releaseNotes)}`
  );
  fs.writeFileSync(VERSION_FILE, versionContent, 'utf-8');

  // ── Step 6: Deploy dashboard to Vercel ────────────────────────────────────
  log('Uploading updater files to Cloudflare R2...');
  for (const filename of releaseFiles) {
    run(`npx wrangler r2 object put "kr-tasker-storage/downloads/${filename}" --file "${path.join(DOWNLOADS_DIR, filename)}" --remote`, DASHBOARD_DIR);
  }
  log('Deploying dashboard to Cloudflare...');
  run('npm run cf:deploy', DASHBOARD_DIR);

  // ── Done! ──────────────────────────────────────────────────────────────────
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log(`║  🎉 Release v${newVersion} COMPLETE!              ║`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`\n🌐 Live: https://kr-tasker-dashboard.krtaskersukltd.workers.dev`);
  console.log(`📥 EXE: https://kr-tasker-dashboard.krtaskersukltd.workers.dev/api/download/${path.basename(builtExe)}`);
  console.log(`🔍 API: https://kr-tasker-dashboard.krtaskersukltd.workers.dev/api/version\n`);
}

main().catch(err => {
  console.error('\n❌ Release failed:', err.message);
  process.exit(1);
});
