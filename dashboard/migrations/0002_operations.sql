PRAGMA foreign_keys = ON;

ALTER TABLE "User" ADD COLUMN "timezone" TEXT NOT NULL DEFAULT 'Asia/Karachi';
ALTER TABLE "User" ADD COLUMN "workDays" TEXT NOT NULL DEFAULT '1,2,3,4,5,6';
ALTER TABLE "User" ADD COLUMN "shiftStartMinutes" INTEGER NOT NULL DEFAULT 540;
ALTER TABLE "User" ADD COLUMN "shiftEndMinutes" INTEGER NOT NULL DEFAULT 1080;
ALTER TABLE "User" ADD COLUMN "targetMinutes" INTEGER NOT NULL DEFAULT 540;
ALTER TABLE "User" ADD COLUMN "maxShiftMinutes" INTEGER NOT NULL DEFAULT 720;
ALTER TABLE "User" ADD COLUMN "maxBreakMinutes" INTEGER NOT NULL DEFAULT 60;
ALTER TABLE "User" ADD COLUMN "screenshotRetentionDays" INTEGER NOT NULL DEFAULT 30;
ALTER TABLE "User" ADD COLUMN "manualTimeRequiresApproval" INTEGER NOT NULL DEFAULT 1;

ALTER TABLE "ActivityLog" ADD COLUMN "clientEventId" TEXT;
ALTER TABLE "ActivityLog" ADD COLUMN "taskId" TEXT;
ALTER TABLE "ActivityLog" ADD COLUMN "productivityCategory" TEXT NOT NULL DEFAULT 'NEUTRAL';
CREATE UNIQUE INDEX IF NOT EXISTS "ActivityLog_clientEventId_key" ON "ActivityLog"("clientEventId");

ALTER TABLE "WorkReport" ADD COLUMN "clientEventId" TEXT;
ALTER TABLE "WorkReport" ADD COLUMN "taskId" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "WorkReport_clientEventId_key" ON "WorkReport"("clientEventId");

ALTER TABLE "Screenshot" ADD COLUMN "clientEventId" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "Screenshot_clientEventId_key" ON "Screenshot"("clientEventId");

CREATE TABLE IF NOT EXISTS "TrackingSession" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "clientSessionId" TEXT,
  "userId" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "dateKey" TEXT NOT NULL,
  "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "endedAt" DATETIME,
  "lastHeartbeatAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "status" TEXT NOT NULL DEFAULT 'TRACKING',
  "breakStartedAt" DATETIME,
  "activeSeconds" INTEGER NOT NULL DEFAULT 0,
  "idleSeconds" INTEGER NOT NULL DEFAULT 0,
  "breakSeconds" INTEGER NOT NULL DEFAULT 0,
  "reviewRequired" INTEGER NOT NULL DEFAULT 0,
  "reviewReason" TEXT,
  "currentTask" TEXT NOT NULL DEFAULT 'Working',
  "taskId" TEXT,
  CONSTRAINT "TrackingSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "TrackingSession_clientSessionId_key" ON "TrackingSession"("clientSessionId");
CREATE INDEX IF NOT EXISTS "TrackingSession_userId_dateKey_idx" ON "TrackingSession"("userId", "dateKey");
CREATE INDEX IF NOT EXISTS "TrackingSession_companyId_lastHeartbeatAt_idx" ON "TrackingSession"("companyId", "lastHeartbeatAt");

CREATE TABLE IF NOT EXISTS "Project" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "code" TEXT,
  "status" TEXT NOT NULL DEFAULT 'ACTIVE',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);
CREATE INDEX IF NOT EXISTS "Project_companyId_status_idx" ON "Project"("companyId", "status");

CREATE TABLE IF NOT EXISTS "Task" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "projectId" TEXT,
  "assignedUserId" TEXT,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "status" TEXT NOT NULL DEFAULT 'OPEN',
  "priority" TEXT NOT NULL DEFAULT 'NORMAL',
  "dueDate" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "Task_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "Task_companyId_status_idx" ON "Task"("companyId", "status");
CREATE INDEX IF NOT EXISTS "Task_assignedUserId_status_idx" ON "Task"("assignedUserId", "status");

CREATE TABLE IF NOT EXISTS "ProductivityRule" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "pattern" TEXT NOT NULL,
  "matchType" TEXT NOT NULL DEFAULT 'PROCESS',
  "category" TEXT NOT NULL DEFAULT 'NEUTRAL',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "ProductivityRule_companyId_pattern_matchType_key" ON "ProductivityRule"("companyId", "pattern", "matchType");
CREATE INDEX IF NOT EXISTS "ProductivityRule_companyId_category_idx" ON "ProductivityRule"("companyId", "category");

CREATE TABLE IF NOT EXISTS "ManualTimeRequest" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "startAt" DATETIME NOT NULL,
  "endAt" DATETIME NOT NULL,
  "note" TEXT NOT NULL,
  "projectId" TEXT,
  "taskId" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "reviewedBy" TEXT,
  "reviewedAt" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "ManualTimeRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "ManualTimeRequest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "ManualTimeRequest_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "ManualTimeRequest_companyId_status_createdAt_idx" ON "ManualTimeRequest"("companyId", "status", "createdAt");
CREATE INDEX IF NOT EXISTS "ManualTimeRequest_userId_createdAt_idx" ON "ManualTimeRequest"("userId", "createdAt");

CREATE TABLE IF NOT EXISTS "Alert" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "userId" TEXT,
  "type" TEXT NOT NULL,
  "severity" TEXT NOT NULL DEFAULT 'WARNING',
  "message" TEXT NOT NULL,
  "metadata" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "readAt" DATETIME,
  CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "Alert_companyId_readAt_createdAt_idx" ON "Alert"("companyId", "readAt", "createdAt");

CREATE TABLE IF NOT EXISTS "AuditLog" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "actorUserId" TEXT,
  "action" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT,
  "details" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "AuditLog_companyId_createdAt_idx" ON "AuditLog"("companyId", "createdAt");
