PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "companyId" TEXT,
  "screenshotInterval" INTEGER NOT NULL DEFAULT 10,
  "idleLimitMinutes" INTEGER NOT NULL DEFAULT 10,
  "resetCode" TEXT,
  "resetExpires" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

CREATE TABLE IF NOT EXISTS "WorkReport" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "note" TEXT NOT NULL,
  "emailSent" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "endedAt" DATETIME,
  "durationSeconds" INTEGER,
  CONSTRAINT "WorkReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "WorkReport_userId_createdAt_idx" ON "WorkReport"("userId", "createdAt");

CREATE TABLE IF NOT EXISTS "ActivityLog" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "status" TEXT NOT NULL,
  "currentTask" TEXT NOT NULL DEFAULT 'Working',
  "appProcess" TEXT,
  "appTitle" TEXT,
  "keystrokes" INTEGER NOT NULL DEFAULT 0,
  "mouseClicks" INTEGER NOT NULL DEFAULT 0,
  "durationSeconds" INTEGER NOT NULL DEFAULT 60,
  "idleSeconds" INTEGER NOT NULL DEFAULT 0,
  "continuousIdleSeconds" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "ActivityLog_userId_timestamp_idx" ON "ActivityLog"("userId", "timestamp");

CREATE TABLE IF NOT EXISTS "Screenshot" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "filePath" TEXT NOT NULL,
  "activityRate" INTEGER NOT NULL,
  "currentTask" TEXT NOT NULL DEFAULT 'Working',
  "keystrokes" INTEGER NOT NULL DEFAULT 0,
  "mouseClicks" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "Screenshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Screenshot_userId_timestamp_idx" ON "Screenshot"("userId", "timestamp");
