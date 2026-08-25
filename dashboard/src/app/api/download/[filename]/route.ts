import { NextResponse } from 'next/server';
import { getScreenshotBucket } from '@/lib/cloudflare-storage';
import { DESKTOP_INSTALLER_FILENAME } from '@/lib/desktop-release';

const DOWNLOADS: Record<string, { contentType: string; disposition: 'attachment' | 'inline'; cacheControl: string }> = {
  [DESKTOP_INSTALLER_FILENAME]: {
    contentType: 'application/vnd.microsoft.portable-executable',
    disposition: 'attachment',
    cacheControl: 'public, max-age=31536000, immutable',
  },
  [`${DESKTOP_INSTALLER_FILENAME}.blockmap`]: {
    contentType: 'application/octet-stream',
    disposition: 'inline',
    cacheControl: 'public, max-age=31536000, immutable',
  },
  'latest.yml': {
    contentType: 'text/yaml; charset=utf-8',
    disposition: 'inline',
    cacheControl: 'public, max-age=300, must-revalidate',
  },
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;
  const download = DOWNLOADS[filename];
  if (!download) return NextResponse.json({ error: 'Download not found' }, { status: 404 });

  const bucket = await getScreenshotBucket();
  if (!bucket) return NextResponse.json({ error: 'Download storage unavailable' }, { status: 503 });

  const object = await bucket.get(`downloads/${filename}`);
  if (!object) return NextResponse.json({ error: 'Download not found' }, { status: 404 });

  return new NextResponse(object.body, {
    headers: {
      'Content-Type': download.contentType,
      'Content-Disposition': `${download.disposition}; filename="${filename}"`,
      'Cache-Control': download.cacheControl,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
