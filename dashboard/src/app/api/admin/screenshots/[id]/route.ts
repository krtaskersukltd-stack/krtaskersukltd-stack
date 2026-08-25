import fs from 'fs/promises';
import path from 'path';
import { get } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserWithRole } from '@/lib/authorization';
import { getScreenshotBucket } from '@/lib/cloudflare-storage';

function isAllowedBlobUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.endsWith('.blob.vercel-storage.com');
  } catch {
    return false;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getUserWithRole(req, 'ADMIN');
  if (!admin?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const screenshot = await prisma.screenshot.findFirst({
    where: {
      id,
      user: { companyId: admin.companyId, role: 'EMPLOYEE' },
    },
    select: { filePath: true },
  });

  if (!screenshot) return NextResponse.json({ error: 'Screenshot not found' }, { status: 404 });

  const responseHeaders = {
    'Content-Type': 'image/jpeg',
    'Cache-Control': 'private, max-age=300, must-revalidate',
    'Content-Disposition': 'inline',
    'X-Content-Type-Options': 'nosniff',
  };

  if (screenshot.filePath.startsWith('/uploads/screenshots/')) {
    const filename = path.basename(screenshot.filePath);
    const file = await fs.readFile(path.join(process.cwd(), 'public', 'uploads', 'screenshots', filename));
    return new NextResponse(file, { headers: responseHeaders });
  }

  if (screenshot.filePath.startsWith('r2:')) {
    const bucket = await getScreenshotBucket();
    if (!bucket) return NextResponse.json({ error: 'Screenshot storage unavailable' }, { status: 503 });
    const object = await bucket.get(screenshot.filePath.slice(3));
    if (!object) return NextResponse.json({ error: 'Screenshot not found' }, { status: 404 });
    return new NextResponse(object.body, { headers: responseHeaders });
  }

  if (!isAllowedBlobUrl(screenshot.filePath)) {
    return NextResponse.json({ error: 'Invalid screenshot location' }, { status: 500 });
  }

  if (screenshot.filePath.includes('.private.blob.vercel-storage.com')) {
    const blob = await get(screenshot.filePath, { access: 'private' });
    if (!blob) return NextResponse.json({ error: 'Screenshot not found' }, { status: 404 });
    return new NextResponse(blob.stream, { headers: responseHeaders });
  }

  const blobResponse = await fetch(screenshot.filePath, { cache: 'no-store' });
  if (!blobResponse.ok || !blobResponse.body) {
    return NextResponse.json({ error: 'Screenshot not found' }, { status: 404 });
  }
  return new NextResponse(blobResponse.body, { headers: responseHeaders });
}
