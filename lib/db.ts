import path from 'path'
import fs from 'fs'

declare global {
  var __krCmsDb: any | undefined
}

function getDatabase(): any | null {
  if (globalThis.__krCmsDb !== undefined) {
    return globalThis.__krCmsDb
  }

  try {
    // Dynamically require node:sqlite so environments without it won't crash at startup
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { DatabaseSync } = require('node:sqlite')
    if (!DatabaseSync) {
      globalThis.__krCmsDb = null
      return null
    }

    const dbDir = path.join(process.cwd(), 'data')
    try {
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true })
      }
    } catch {
      // Read-only filesystem (e.g. Vercel Serverless environment)
    }

    const dbPath = path.join(dbDir, 'cms.db')
    const database = new DatabaseSync(dbPath)

    try {
      database.exec('PRAGMA journal_mode = WAL;')
      initTables(database)
    } catch {
      // PRAGMA or table creation failed, non-fatal
    }

    globalThis.__krCmsDb = database
    return database
  } catch {
    // node:sqlite not available or read-only filesystem on Vercel
    globalThis.__krCmsDb = null
    return null
  }
}

function initTables(dbInstance: any) {
  try {
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS pages (
        id TEXT PRIMARY KEY,
        routeKey TEXT UNIQUE NOT NULL,
        internalName TEXT NOT NULL,
        publicTitle TEXT NOT NULL,
        slug TEXT NOT NULL,
        publicUrl TEXT NOT NULL,
        isSystemRoute INTEGER NOT NULL DEFAULT 1,
        templateKey TEXT DEFAULT 'standard',
        parentSlug TEXT DEFAULT '',
        status TEXT NOT NULL DEFAULT 'published',
        seo TEXT NOT NULL,
        contentKeys TEXT NOT NULL,
        sections TEXT DEFAULT '[]',
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        sortOrder INTEGER NOT NULL DEFAULT 1,
        eyebrow TEXT,
        heroHeading TEXT NOT NULL,
        heroDescription TEXT NOT NULL,
        heroCtaText TEXT,
        introHeading TEXT,
        introContent TEXT,
        featuredImage TEXT,
        features TEXT NOT NULL,
        metrics TEXT NOT NULL,
        seo TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS work (
        id TEXT PRIMARY KEY,
        client TEXT NOT NULL,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        year TEXT NOT NULL,
        category TEXT NOT NULL,
        featuredImage TEXT,
        featuredImageAlt TEXT,
        shortDescription TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        sortOrder INTEGER NOT NULL DEFAULT 1,
        overview TEXT,
        challenge TEXT,
        solution TEXT,
        results TEXT,
        metrics TEXT NOT NULL,
        seo TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS blogs (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        authorName TEXT NOT NULL,
        authorRole TEXT NOT NULL,
        authorAvatar TEXT,
        publishDate TEXT NOT NULL,
        readTime TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        featuredImage TEXT NOT NULL,
        featuredImageAlt TEXT NOT NULL,
        bodyHtml TEXT NOT NULL,
        tags TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        seo TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS team (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        bio TEXT NOT NULL,
        avatar TEXT NOT NULL,
        socialLinkedin TEXT,
        sortOrder INTEGER NOT NULL DEFAULT 1,
        status TEXT NOT NULL DEFAULT 'published',
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS enquiries (
        id TEXT PRIMARY KEY,
        fullName TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        serviceInterest TEXT NOT NULL,
        budget TEXT NOT NULL,
        timeline TEXT,
        message TEXT NOT NULL,
        hearAboutUs TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS media (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        url TEXT NOT NULL,
        mimeType TEXT NOT NULL,
        sizeBytes INTEGER NOT NULL,
        width INTEGER,
        height INTEGER,
        altText TEXT NOT NULL DEFAULT '',
        uploadedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS redirects (
        id TEXT PRIMARY KEY,
        sourcePath TEXT UNIQUE NOT NULL,
        destination TEXT NOT NULL,
        statusCode INTEGER NOT NULL DEFAULT 301,
        isActive INTEGER NOT NULL DEFAULT 1,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS global_sections (
        id TEXT PRIMARY KEY DEFAULT 'main',
        data TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS seo_settings (
        id TEXT PRIMARY KEY DEFAULT 'main',
        data TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS navigation (
        id TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        href TEXT NOT NULL,
        isExternal INTEGER NOT NULL DEFAULT 0,
        isOpenInNewTab INTEGER NOT NULL DEFAULT 0,
        sortOrder INTEGER NOT NULL DEFAULT 1,
        isVisible INTEGER NOT NULL DEFAULT 1
      );
    `)

    try {
      dbInstance.exec(`ALTER TABLE pages ADD COLUMN templateKey TEXT DEFAULT 'standard';`)
    } catch {}
    try {
      dbInstance.exec(`ALTER TABLE pages ADD COLUMN parentSlug TEXT DEFAULT '';`)
    } catch {}
    try {
      dbInstance.exec(`ALTER TABLE pages ADD COLUMN sections TEXT DEFAULT '[]';`)
    } catch {}
    try {
      dbInstance.exec(`ALTER TABLE services ADD COLUMN featuredImage TEXT;`)
    } catch {}
  } catch {
    // Ignore init table errors
  }
}

export const db = {
  prepare(sql: string) {
    const database = getDatabase()
    if (!database) {
      return {
        all: () => [] as any[],
        get: () => null as any,
        run: () => ({ changes: 0 } as any),
      }
    }
    try {
      return database.prepare(sql)
    } catch {
      return {
        all: () => [] as any[],
        get: () => null as any,
        run: () => ({ changes: 0 } as any),
      }
    }
  },
  exec(sql: string) {
    const database = getDatabase()
    if (database) {
      try {
        database.exec(sql)
      } catch {
        // Safe fail
      }
    }
  },
}
