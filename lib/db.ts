import { DatabaseSync } from 'node:sqlite'
import path from 'path'
import fs from 'fs'

const dbDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const dbPath = path.join(dbDir, 'cms.db')

declare global {
  var __krCmsDb: DatabaseSync | undefined
}

function getDatabase(): DatabaseSync {
  if (!globalThis.__krCmsDb) {
    const db = new DatabaseSync(dbPath)
    db.exec('PRAGMA journal_mode = WAL;')
    initTables(db)
    globalThis.__krCmsDb = db
  }
  return globalThis.__krCmsDb
}

function initTables(db: DatabaseSync) {
  db.exec(`
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
      authorImage TEXT,
      status TEXT NOT NULL DEFAULT 'published',
      publishDate TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      readingTime TEXT NOT NULL,
      featuredImage TEXT NOT NULL,
      featuredImageAlt TEXT NOT NULL,
      content TEXT NOT NULL,
      tags TEXT NOT NULL,
      seo TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS team (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      photo TEXT NOT NULL,
      photoAlt TEXT NOT NULL,
      shortBio TEXT NOT NULL,
      linkedinUrl TEXT,
      twitterUrl TEXT,
      sortOrder INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'published',
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT,
      budget TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      filename TEXT NOT NULL,
      mimeType TEXT NOT NULL,
      sizeBytes INTEGER NOT NULL,
      altText TEXT NOT NULL,
      title TEXT,
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

  // Safe table migrations for existing columns
  try {
    db.exec(`ALTER TABLE pages ADD COLUMN templateKey TEXT DEFAULT 'standard';`)
  } catch {}
  try {
    db.exec(`ALTER TABLE pages ADD COLUMN parentSlug TEXT DEFAULT '';`)
  } catch {}
  try {
    db.exec(`ALTER TABLE pages ADD COLUMN sections TEXT DEFAULT '[]';`)
  } catch {}
  try {
    db.exec(`ALTER TABLE services ADD COLUMN featuredImage TEXT;`)
  } catch {}
}

export const db = getDatabase()
