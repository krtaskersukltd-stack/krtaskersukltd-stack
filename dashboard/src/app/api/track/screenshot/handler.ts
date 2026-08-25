import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserWithRole } from '@/lib/authorization';
import { consumeRateLimit } from '@/lib/rate-limit';
import { boundedText, validTimestamp } from '@/lib/validation';
import { getScreenshotBucket } from '@/lib/cloudflare-storage';
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

export async function handleScreenshotPOST(req: NextRequest) {
  try {
    const user = await getUserWithRole(req, 'EMPLOYEE');
    if (!user || !user.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Supports up to four monitors even when the admin selects a 1-minute interval.
    const rateLimit = consumeRateLimit(`screenshot:${user.id}`, 240, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many screenshot uploads' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    const image = body?.image;
    const activityRate = Number(body?.activityRate);
    const parsedDate = validTimestamp(body?.timestamp);
    const clientEventId = typeof body?.clientEventId === 'string' ? body.clientEventId.slice(0, 120) : null;

    if (
      typeof image !== 'string' ||
      !Number.isInteger(activityRate) ||
      activityRate < 0 ||
      activityRate > 100 ||
      !parsedDate
    ) {
      return NextResponse.json({ error: 'Invalid screenshot details' }, { status: 400 });
    }

    if (image.length > 2_800_000) {
      return NextResponse.json({ error: 'Screenshot is too large' }, { status: 413 });
    }

    if (clientEventId) {
      const existing = await prisma.screenshot.findUnique({ where: { clientEventId }, select: { id: true } });
      if (existing) return NextResponse.json({ success: true, screenshotId: existing.id, duplicate: true });
    }

    // Parse base64 image data
    const matches = image.match(/^data:(image\/jpeg);base64,([A-Za-z0-9+/=]+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
    }

    const imageBuffer = Buffer.from(matches[2], 'base64');
    if (imageBuffer.length === 0 || imageBuffer.length > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'Screenshot is too large' }, { status: 413 });
    }
    
    // Create unique filename
    const filename = `${user.id}-${parsedDate.getTime()}.jpg`;
    
    let relativeFilePath = '';

    const screenshotBucket = await getScreenshotBucket();
    if (screenshotBucket) {
      const objectKey = `screenshots/${user.id}/${filename}`;
      await screenshotBucket.put(objectKey, imageBuffer, {
        httpMetadata: { contentType: 'image/jpeg' },
      });
      relativeFilePath = `r2:${objectKey}`;
    } else if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Existing Vercel storage remains the fallback during the parallel migration.
      const blob = await put(`screenshots/${filename}`, imageBuffer, {
        access: process.env.BLOB_ACCESS === 'private' ? 'private' : 'public',
        contentType: 'image/jpeg',
        addRandomSuffix: true,
      });
      relativeFilePath = blob.url;
    } else {
      // Local fallback for development
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'screenshots');
      
      // Ensure directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      relativeFilePath = `/uploads/screenshots/${filename}`;
      const absoluteFilePath = path.join(uploadDir, filename);

      // Save screenshot file
      fs.writeFileSync(absoluteFilePath, imageBuffer);
    }

    const keystrokes = Math.max(0, parseInt(body?.keystrokes || 0, 10) || 0);
    const mouseClicks = Math.max(0, parseInt(body?.mouseClicks || 0, 10) || 0);

    // Save database record
    const screenshot = await prisma.screenshot.create({
      data: {
        userId: user.id,
        filePath: relativeFilePath,
        activityRate,
        currentTask: boundedText(body.currentTask, 'Working'),
        timestamp: parsedDate,
        keystrokes,
        mouseClicks,
        clientEventId,
      }
    });

    // Enforce the employee/company screenshot retention policy in small batches.
    const retentionCutoff = new Date(Date.now() - user.screenshotRetentionDays * 24 * 60 * 60_000);
    const expired = await prisma.screenshot.findMany({
      where: { userId: user.id, timestamp: { lt: retentionCutoff } },
      select: { id: true, filePath: true },
      take: 25,
    });
    for (const old of expired) {
      if (screenshotBucket && old.filePath.startsWith('r2:')) {
        await screenshotBucket.delete(old.filePath.slice(3)).catch(() => undefined);
      }
    }
    if (expired.length) await prisma.screenshot.deleteMany({ where: { id: { in: expired.map((item) => item.id) } } });

    return NextResponse.json({
      success: true,
      screenshotId: screenshot.id,
      path: `/api/admin/screenshots/${screenshot.id}`,
    });
  } catch (err) {
    console.error('Track screenshot API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
