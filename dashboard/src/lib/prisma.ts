import { PrismaD1 } from '@prisma/adapter-d1';
import type { PrismaClient as PostgresPrismaClient } from '@prisma/client';
import { PrismaClient as D1PrismaClient } from '@/generated/d1';

type D1Binding = ConstructorParameters<typeof PrismaD1>[0];
type RuntimeClients = {
  postgres?: PostgresPrismaClient;
  d1?: D1PrismaClient;
};

const runtimeClients = globalThis as unknown as RuntimeClients;

function getRuntimeClient(): PostgresPrismaClient | D1PrismaClient {
  // OpenNext publishes the request context under this stable global symbol.
  // Reading it directly avoids context helper failures being mistaken for a
  // non-Cloudflare runtime and incorrectly falling back to the Node client.
  const cloudflareContext = (globalThis as Record<PropertyKey, unknown>)[
    Symbol.for('__cloudflare-context__')
  ] as { env?: { DB?: D1Binding } } | undefined;
  const binding = cloudflareContext?.env?.DB;
  if (binding) {
    runtimeClients.d1 ??= new D1PrismaClient({ adapter: new PrismaD1(binding) });
    return runtimeClients.d1;
  }

  // Outside Workers (local development and Vercel), use Postgres.
  if (!runtimeClients.postgres) {
    const { PrismaClient } = require('@prisma/client');
    runtimeClients.postgres = new PrismaClient();
  }
  return runtimeClients.postgres!;
}

export const prisma = new Proxy({} as PostgresPrismaClient, {
  get(_target, property) {
    const client = getRuntimeClient() as unknown as Record<PropertyKey, unknown>;
    const value = client[property];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
