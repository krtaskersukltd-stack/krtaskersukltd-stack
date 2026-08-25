import { NextRequest, NextResponse } from 'next/server';
import {
  DESKTOP_INSTALLER_PATH,
  DESKTOP_RELEASE_DATE,
  DESKTOP_RELEASE_NOTES,
  DESKTOP_VERSION,
} from '@/lib/desktop-release';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    version: DESKTOP_VERSION,
    downloadUrl: new URL(DESKTOP_INSTALLER_PATH, request.url).toString(),
    releaseNotes: DESKTOP_RELEASE_NOTES,
    publishedAt: DESKTOP_RELEASE_DATE,
  }, {
    headers: {
      // Cache for 5 minutes so we don't hammer the server
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60'
    }
  });
}
