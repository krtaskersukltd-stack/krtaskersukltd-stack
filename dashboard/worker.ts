import openNextWorker, {
  BucketCachePurge,
  DOQueueHandler,
  DOShardedTagCache,
} from './.open-next/worker.js';
import { DESKTOP_INSTALLER_FILENAME } from './src/lib/desktop-release';

export { BucketCachePurge, DOQueueHandler, DOShardedTagCache };

type R2ObjectBody = {
  body: ReadableStream;
  size: number;
  httpEtag?: string;
};

type WorkerEnv = {
  SCREENSHOTS: {
    get(key: string): Promise<R2ObjectBody | null>;
  };
};

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

async function serveDownload(request: Request, env: WorkerEnv, filename: string): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
  }

  const download = DOWNLOADS[filename];
  if (!download) return new Response('Download not found', { status: 404 });

  const object = await env.SCREENSHOTS.get(`downloads/${filename}`);
  if (!object) return new Response('Download not found', { status: 404 });

  const headers = new Headers({
    'Content-Type': download.contentType,
    'Content-Disposition': `${download.disposition}; filename="${filename}"`,
    'Content-Length': String(object.size),
    'Cache-Control': download.cacheControl,
    'X-Content-Type-Options': 'nosniff',
  });
  if (object.httpEtag) headers.set('ETag', object.httpEtag);

  return new Response(request.method === 'HEAD' ? null : object.body, { headers });
}

export default {
  async fetch(request: Request, env: WorkerEnv, ctx: unknown): Promise<Response> {
    const url = new URL(request.url);
    const prefix = '/api/download/';
    if (url.pathname.startsWith(prefix)) {
      const filename = decodeURIComponent(url.pathname.slice(prefix.length));
      return serveDownload(request, env, filename);
    }

    return openNextWorker.fetch(request, env, ctx);
  },
};
