import { NextRequest, NextResponse } from 'next/server';
import { handleLoginOPTIONS, handleLoginPOST } from '../auth/login/handler';
import { handleMeGET, handleMeOPTIONS } from '../auth/me/handler';
import { handleMigrationTicketPOST } from '../auth/migration-ticket/handler';
import { handleActivityPOST } from '../track/activity/handler';
import { handleReportPOST } from '../track/report/handler';
import { handleScreenshotPOST } from '../track/screenshot/handler';

type BridgeContext = { params: Promise<{ bridge: string[] }> };

async function bridge(request: NextRequest, context: BridgeContext) {
  const path = (await context.params).bridge.join('/');

  if (request.method === 'OPTIONS') {
    if (path === 'auth/login') return handleLoginOPTIONS();
    if (path === 'auth/me') return handleMeOPTIONS();
  }

  if (request.method === 'GET' && path === 'auth/me') return handleMeGET(request);

  if (request.method === 'POST') {
    if (path === 'auth/login') return handleLoginPOST(request);
    if (path === 'auth/migration-ticket') return handleMigrationTicketPOST(request);
    if (path === 'track/activity') return handleActivityPOST(request);
    if (path === 'track/report') return handleReportPOST(request);
    if (path === 'track/screenshot') return handleScreenshotPOST(request);
  }

  return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}

export const GET = bridge;
export const POST = bridge;
export const OPTIONS = bridge;
