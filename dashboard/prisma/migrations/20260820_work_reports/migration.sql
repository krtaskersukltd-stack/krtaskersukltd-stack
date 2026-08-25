CREATE TABLE "WorkReport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WorkReport_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "WorkReport_userId_createdAt_idx" ON "WorkReport"("userId", "createdAt");

ALTER TABLE "WorkReport"
ADD CONSTRAINT "WorkReport_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
