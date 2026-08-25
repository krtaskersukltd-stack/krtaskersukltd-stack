export const MAX_TEXT_LENGTH = 200;

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export function normalizeName(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const name = value.trim().replace(/\s+/g, ' ');
  return name.length >= 2 && name.length <= 100 ? name : null;
}

export function validatePassword(value: unknown): string | null {
  if (typeof value !== 'string' || value.length < 8 || value.length > 128) return null;
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return null;
  return value;
}

export function normalizeCompanyId(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const companyId = value.trim();
  return companyId.length >= 8 && companyId.length <= 64 ? companyId : null;
}

export function boundedText(value: unknown, fallback = ''): string {
  if (typeof value !== 'string') return fallback;
  return value.trim().slice(0, MAX_TEXT_LENGTH) || fallback;
}

export function validTimestamp(value: unknown, maxAgeDays = 7): Date | null {
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  const parsed = new Date(value);
  const timestamp = parsed.getTime();
  const now = Date.now();
  if (!Number.isFinite(timestamp)) return null;
  if (timestamp > now + 5 * 60 * 1000) return null;
  if (timestamp < now - maxAgeDays * 24 * 60 * 60 * 1000) return null;
  return parsed;
}
