import fs from 'node:fs';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';

const root = process.cwd();
const envPath = path.join(root, '.env');

if (fs.existsSync(envPath)) {
  for (const rawLine of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separator = line.indexOf('=');
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] ??= value;
  }
}

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is missing');

const prisma = new PrismaClient();
const outputDir = path.join(root, '.migration');
const outputPath = path.join(outputDir, 'd1-data.sql');

const sqlValue = (value) => {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'boolean') return value ? '1' : '0';
  if (typeof value === 'number') return String(value);
  if (value instanceof Date) value = value.toISOString();
  return `'${String(value).replaceAll("'", "''")}'`;
};

const insert = (table, columns, record) =>
  `INSERT OR REPLACE INTO "${table}" (${columns.map((column) => `"${column}"`).join(',')}) VALUES (${columns.map((column) => sqlValue(record[column])).join(',')});`;

try {
  const [users, workReports, activityLogs, screenshots] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.workReport.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.activityLog.findMany({ orderBy: { timestamp: 'asc' } }),
    prisma.screenshot.findMany({ orderBy: { timestamp: 'asc' } }),
  ]);

  const lines = ['PRAGMA foreign_keys = OFF;'];
  lines.push(...users.map((row) => insert('User', [
    'id', 'email', 'name', 'password', 'role', 'companyId', 'screenshotInterval',
    'idleLimitMinutes', 'resetCode', 'resetExpires', 'createdAt', 'updatedAt',
  ], row)));
  lines.push(...workReports.map((row) => insert('WorkReport', [
    'id', 'userId', 'type', 'note', 'emailSent', 'createdAt', 'endedAt', 'durationSeconds',
  ], row)));
  lines.push(...activityLogs.map((row) => insert('ActivityLog', [
    'id', 'userId', 'timestamp', 'status', 'currentTask', 'appProcess', 'appTitle',
    'keystrokes', 'mouseClicks', 'durationSeconds', 'idleSeconds', 'continuousIdleSeconds',
  ], row)));
  lines.push(...screenshots.map((row) => insert('Screenshot', [
    'id', 'userId', 'timestamp', 'filePath', 'activityRate', 'currentTask',
    'keystrokes', 'mouseClicks',
  ], row)));
  lines.push('PRAGMA foreign_keys = ON;');

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, `${lines.join('\n')}\n`, 'utf8');

  console.log(JSON.stringify({
    users: users.length,
    workReports: workReports.length,
    activityLogs: activityLogs.length,
    screenshots: screenshots.length,
    outputPath,
    bytes: fs.statSync(outputPath).size,
  }, null, 2));
} finally {
  await prisma.$disconnect();
}
