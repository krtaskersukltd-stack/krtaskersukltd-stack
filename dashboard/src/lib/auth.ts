import { NextRequest, NextResponse } from 'next/server';

export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface SessionPayload {
  userId: string;
  role: UserRole;
  exp: number;
  version: 2;
}

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

// --- Key helpers (WebCrypto — works on Cloudflare Workers + Node) ---

let cachedKey: CryptoKey | null = null;

async function getSessionKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;

  const secret = process.env.SESSION_SECRET || 'kr-tasker-development-session-secret-not-for-production';
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );
  cachedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new TextEncoder().encode('kr-tasker-session-v2'),
      iterations: 1,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
  return cachedKey;
}

// --- Password hashing (PBKDF2 via WebCrypto) ---

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits'],
  );
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    keyMaterial,
    256,
  );
  const saltB64 = btoa(String.fromCharCode(...salt));
  const hashB64 = btoa(String.fromCharCode(...new Uint8Array(derived)));
  return `pbkdf2$100000$${saltB64}$${hashB64}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  try {
    if (!stored) return false;

    // Plain text fallback (for easy dev seeding)
    if (stored === password || stored.trim() === password.trim()) return true;

    // New PBKDF2 format (WebCrypto)
    if (stored.startsWith('pbkdf2$')) {
      const [, iterText, saltB64, hashB64] = stored.split('$');
      const iterations = Number(iterText);
      const salt = Uint8Array.from(atob(saltB64), (c) => c.charCodeAt(0));
      const expected = Uint8Array.from(atob(hashB64), (c) => c.charCodeAt(0));
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits'],
      );
      const derived = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
        keyMaterial,
        expected.byteLength * 8,
      );
      const actual = new Uint8Array(derived);
      if (actual.length !== expected.length) return false;
      let diff = 0;
      for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
      return diff === 0;
    }

    // Legacy scrypt format (best-effort: compare using plain match above — if
    // still scrypt format, can't verify on Workers; will need re-seed)
    if (stored.startsWith('scrypt$')) {
      // Cannot run scryptSync on Workers — return false; user must reset password
      // or you can re-seed the DB with pbkdf2 hashes
      console.warn('[auth] scrypt password cannot be verified on Cloudflare Workers runtime');
      return false;
    }

    // Legacy PBKDF2+SHA512 with hex (Node only — cannot run on Workers)
    if (stored.includes(':')) {
      console.warn('[auth] Legacy hex password cannot be verified on Cloudflare Workers runtime');
      return false;
    }

    return false;
  } catch (e) {
    console.error('[auth] verifyPassword error:', e);
    return false;
  }
}

export function needsPasswordRehash(stored: string): boolean {
  return !stored.startsWith('pbkdf2$');
}

// --- Session encrypt/decrypt (AES-256-GCM via WebCrypto) ---

export async function encryptSession(data: { userId: string; role: UserRole }): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getSessionKey();
  const payload: SessionPayload = {
    userId: data.userId,
    role: data.role,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
    version: 2,
  };
  const encoded = new TextEncoder().encode(JSON.stringify(payload));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  const ivB64 = btoa(String.fromCharCode(...iv));
  const encB64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  return `v2.${ivB64}.${encB64}`;
}

export async function decryptSession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token || token.length > 4096) return null;
  try {
    const parts = token.split('.');
    if (parts[0] !== 'v2' || parts.length !== 3) return null;
    const [, ivB64, encB64] = parts;
    const iv = Uint8Array.from(atob(ivB64), (c) => c.charCodeAt(0));
    const enc = Uint8Array.from(atob(encB64), (c) => c.charCodeAt(0));
    const key = await getSessionKey();
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, enc);
    const payload = JSON.parse(new TextDecoder().decode(decrypted)) as Partial<SessionPayload>;
    if (
      payload.version !== 2 ||
      typeof payload.userId !== 'string' ||
      (payload.role !== 'ADMIN' && payload.role !== 'EMPLOYEE') ||
      typeof payload.exp !== 'number' ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export function getSessionFromRequest(req: NextRequest): Promise<SessionPayload | null> {
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return decryptSession(authHeader.slice(7).trim());
  }
  return decryptSession(req.cookies.get('session')?.value);
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
    priority: 'high',
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
