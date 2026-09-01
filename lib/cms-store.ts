import { db } from './db'
import type {
  PageRecord,
  ServiceRecord,
  CaseStudyRecord,
  BlogPostRecord,
  TeamMemberRecord,
  ContactEnquiryRecord,
  MediaItemRecord,
  RedirectRecord,
  GlobalSectionsRecord,
  SEOSettingsRecord,
  NavItemRecord,
} from './cms-types'

// Default Seed Constants
const DEFAULT_GLOBAL: GlobalSectionsRecord = {
  ctaHeading: 'Ready to elevate your digital presence?',
  ctaDescription: 'Partner with KR Tasker Digital for bespoke web engineering, CMS solutions, and search growth.',
  ctaButtonText: 'Get Started Today',
  ctaButtonLink: '/contact',
  footerPhone: '+44 (0) 20 8123 4567',
  footerEmail: 'info@krtaskerdigital.com',
  footerAddress: '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ',
  footerCopyright: '© 2026 KR Tasker UK Ltd. All rights reserved.',
  socialLinkedin: 'https://www.linkedin.com/company/kr-tasker-digital/',
  socialInstagram: 'https://www.instagram.com/krtaskerdigital/',
  socialFacebook: 'https://www.facebook.com/profile.php?id=61571387696002',
}

const DEFAULT_SEO: SEOSettingsRecord = {
  siteName: 'KR Tasker Digital',
  defaultTitleTemplate: '%s | KR Tasker Digital',
  defaultMetaDescription: 'Bespoke web development, CMS integration, and SEO optimization by KR Tasker Digital.',
  defaultOgImage: 'https://www.krtaskerdigital.com/og-default.jpg',
  robotsTxtContent: `User-agent: *\nAllow: /\nDisallow: /studio\nDisallow: /api/\nSitemap: https://www.krtaskerdigital.com/sitemap.xml`,
  sitemapEnabled: true,
}

const DEFAULT_NAV: NavItemRecord[] = [
  { id: 'nav-1', label: 'Home', href: '/', sortOrder: 1, isVisible: true },
  { id: 'nav-2', label: 'Work', href: '/work', sortOrder: 2, isVisible: true },
  { id: 'nav-3', label: 'About', href: '/about', sortOrder: 3, isVisible: true },
  { id: 'nav-4', label: 'Blog', href: '/blog', sortOrder: 4, isVisible: true },
  { id: 'nav-5', label: 'Contact', href: '/contact', sortOrder: 5, isVisible: true },
]

// 1. PAGES
export async function getCmsPages(): Promise<PageRecord[]> {
  try {
    const stmt = db.prepare('SELECT * FROM pages ORDER BY isSystemRoute DESC, internalName ASC')
    const rows = stmt.all() as any[]
    return rows.map((row) => ({
      id: row.id,
      routeKey: row.routeKey,
      internalName: row.internalName,
      publicTitle: row.publicTitle,
      slug: row.slug,
      publicUrl: row.publicUrl,
      isSystemRoute: Boolean(row.isSystemRoute),
      templateKey: row.templateKey || 'standard',
      parentSlug: row.parentSlug || '',
      status: row.status,
      seo: JSON.parse(row.seo || '{}'),
      contentKeys: JSON.parse(row.contentKeys || '[]'),
      sections: JSON.parse(row.sections || '[]'),
      updatedAt: row.updatedAt,
    }))
  } catch (err) {
    console.error('getCmsPages DB error', err)
    return []
  }
}

export async function saveCmsPages(pages: PageRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM pages')
  const insertStmt = db.prepare(`
    INSERT INTO pages (id, routeKey, internalName, publicTitle, slug, publicUrl, isSystemRoute, templateKey, parentSlug, status, seo, contentKeys, sections, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const p of pages) {
      insertStmt.run(
        p.id,
        p.routeKey,
        p.internalName,
        p.publicTitle,
        p.slug,
        p.publicUrl,
        p.isSystemRoute ? 1 : 0,
        p.templateKey || 'standard',
        p.parentSlug || '',
        p.status,
        JSON.stringify(p.seo || {}),
        JSON.stringify(p.contentKeys || []),
        JSON.stringify(p.sections || []),
        p.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 2. SERVICES
export async function getCmsServices(): Promise<ServiceRecord[]> {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { SERVICES_QUERY } = await import('@/sanity/lib/queries')
      const sanityData = await client.fetch(SERVICES_QUERY)
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        return sanityData.map((s: any) => ({
          id: s._id || s.id || `srv-${s.slug}`,
          name: s.name,
          slug: s.slug,
          status: s.status || 'published',
          sortOrder: s.sortOrder || 1,
          eyebrow: s.eyebrow || '',
          heroHeading: s.heroHeading || '',
          heroDescription: s.heroDescription || '',
          heroCtaText: s.heroCtaText || 'Get Started',
          introHeading: s.introHeading || '',
          introContent: s.introContent || '',
          featuredImage: s.featuredImage || '',
          features: s.features || [],
          metrics: s.metrics || [],
          seo: s.seo || {
            metaTitle: s.name,
            metaDescription: s.heroDescription,
            h1: s.name,
            focusKeyword: s.name,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          updatedAt: s._updatedAt || new Date().toISOString(),
        }))
      }
    }
  } catch (err) {
    // Sanity query failed or offline, fall back to SQLite
  }

  try {
    const stmt = db.prepare('SELECT * FROM services ORDER BY sortOrder ASC')
    const rows = stmt.all() as any[]
    if (rows && rows.length > 0) {
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        status: row.status,
        sortOrder: row.sortOrder,
        eyebrow: row.eyebrow,
        heroHeading: row.heroHeading,
        heroDescription: row.heroDescription,
        heroCtaText: row.heroCtaText,
        introHeading: row.introHeading,
        introContent: row.introContent,
        featuredImage: row.featuredImage || '',
        features: JSON.parse(row.features || '[]'),
        metrics: JSON.parse(row.metrics || '[]'),
        seo: JSON.parse(row.seo || '{}'),
        updatedAt: row.updatedAt,
      }))
    }
  } catch (err) {
    console.error('getCmsServices DB error', err)
  }

  // Fallback to static bundled services.json
  try {
    const bundled = (await import('@/data/cms/services.json')).default as ServiceRecord[]
    if (Array.isArray(bundled) && bundled.length > 0) {
      return bundled
    }
  } catch {
    // ignore
  }

  return []
}

export async function getCmsServiceBySlug(slug: string): Promise<ServiceRecord | null> {
  const cleanSlug = slug.replace(/^\/services\//, '').replace(/^\//, '')

  // 1. Sanity
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { SERVICE_BY_SLUG_QUERY } = await import('@/sanity/lib/queries')
      const s = await client.fetch(SERVICE_BY_SLUG_QUERY, { slug: cleanSlug })
      if (s && s.name) {
        return {
          id: s._id || s.id || `srv-${s.slug}`,
          name: s.name,
          slug: s.slug,
          status: s.status || 'published',
          sortOrder: s.sortOrder || 1,
          eyebrow: s.eyebrow || '',
          heroHeading: s.heroHeading || '',
          heroDescription: s.heroDescription || '',
          heroCtaText: s.heroCtaText || 'Start a Project',
          introHeading: s.introHeading || '',
          introContent: s.introContent || '',
          featuredImage: s.featuredImage || '',
          features: s.features || [],
          metrics: s.metrics || [],
          seo: s.seo || {
            metaTitle: s.name,
            metaDescription: s.heroDescription,
            h1: s.name,
            focusKeyword: s.name,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          updatedAt: s._updatedAt || new Date().toISOString(),
        }
      }
    }
  } catch (err) {
    console.warn('Sanity getCmsServiceBySlug error, falling back:', err)
  }

  // 2. Local DB / Fallback
  const allServices = await getCmsServices()
  return allServices.find((s) => s.slug === cleanSlug || s.slug === `/services/${cleanSlug}` || s.id === cleanSlug) || null
}

export async function saveCmsServices(services: ServiceRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM services')
  const insertStmt = db.prepare(`
    INSERT INTO services (id, name, slug, status, sortOrder, eyebrow, heroHeading, heroDescription, heroCtaText, introHeading, introContent, featuredImage, features, metrics, seo, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const s of services) {
      insertStmt.run(
        s.id,
        s.name,
        s.slug,
        s.status,
        s.sortOrder || 1,
        s.eyebrow || '',
        s.heroHeading,
        s.heroDescription,
        s.heroCtaText || '',
        s.introHeading || '',
        s.introContent || '',
        s.featuredImage || '',
        JSON.stringify(s.features || []),
        JSON.stringify(s.metrics || []),
        JSON.stringify(s.seo || {}),
        s.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 3. WORK
export async function getCmsWork(): Promise<CaseStudyRecord[]> {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { WORK_QUERY } = await import('@/sanity/lib/queries')
      const sanityData = await client.fetch(WORK_QUERY)
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        return sanityData.map((w: any) => ({
          id: w._id || w.id || `work-${w.slug}`,
          client: w.client || '',
          title: w.title,
          slug: w.slug,
          year: w.year || '2026',
          category: w.category || 'Case Study',
          featuredImage: typeof w.featuredImage === 'string' ? w.featuredImage : '',
          featuredImageAlt: w.featuredImageAlt || w.title,
          shortDescription: w.shortDescription || '',
          status: w.status || 'published',
          sortOrder: w.sortOrder || 1,
          overview: w.overview || '',
          challenge: w.challenge || '',
          solution: w.solution || '',
          results: w.results || '',
          metrics: w.metrics || [],
          seo: w.seo || {
            metaTitle: w.title,
            metaDescription: w.shortDescription,
            h1: w.title,
            focusKeyword: w.title,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          updatedAt: w._updatedAt || new Date().toISOString(),
        }))
      }
    }
  } catch (err) {
    // Sanity query fallback
  }

  try {
    const stmt = db.prepare('SELECT * FROM work ORDER BY sortOrder ASC')
    const rows = stmt.all() as any[]
    if (rows && rows.length > 0) {
      return rows.map((row) => ({
        id: row.id,
        client: row.client,
        title: row.title,
        slug: row.slug,
        year: row.year,
        category: row.category,
        featuredImage: row.featuredImage,
        featuredImageAlt: row.featuredImageAlt,
        shortDescription: row.shortDescription,
        status: row.status,
        sortOrder: row.sortOrder,
        overview: row.overview,
        challenge: row.challenge,
        solution: row.solution,
        results: row.results,
        metrics: JSON.parse(row.metrics || '[]'),
        seo: JSON.parse(row.seo || '{}'),
        updatedAt: row.updatedAt,
      }))
    }
  } catch (err) {
    console.error('getCmsWork DB error', err)
  }

  // Fallback to static bundled work.json
  try {
    const bundled = (await import('@/data/cms/work.json')).default as CaseStudyRecord[]
    if (Array.isArray(bundled) && bundled.length > 0) {
      return bundled
    }
  } catch {
    // ignore
  }

  return []
}

export async function getCmsWorkBySlug(slug: string): Promise<CaseStudyRecord | null> {
  const cleanSlug = slug.replace(/^\/work\//, '').replace(/^\//, '')

  // 1. Sanity
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { CASE_STUDY_BY_SLUG_QUERY } = await import('@/sanity/lib/queries')
      const w = await client.fetch(CASE_STUDY_BY_SLUG_QUERY, { slug: cleanSlug })
      if (w && w.title) {
        return {
          id: w._id || w.id || `work-${w.slug}`,
          client: w.client || '',
          title: w.title,
          slug: w.slug,
          year: w.year || '2026',
          category: w.category || 'Case Study',
          featuredImage: typeof w.featuredImage === 'string' ? w.featuredImage : '',
          featuredImageAlt: w.featuredImageAlt || w.title,
          shortDescription: w.shortDescription || '',
          status: w.status || 'published',
          sortOrder: w.sortOrder || 1,
          overview: w.overview || '',
          challenge: w.challenge || '',
          solution: w.solution || '',
          results: w.results || '',
          metrics: w.metrics || [],
          seo: w.seo || {
            metaTitle: w.title,
            metaDescription: w.shortDescription,
            h1: w.title,
            focusKeyword: w.title,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          updatedAt: w._updatedAt || new Date().toISOString(),
        }
      }
    }
  } catch (err) {
    console.warn('Sanity getCmsWorkBySlug error, falling back:', err)
  }

  // 2. Local DB / Bundled Fallback
  const allWork = await getCmsWork()
  return allWork.find((w) => w.slug === cleanSlug || w.slug === `/work/${cleanSlug}` || w.id === cleanSlug) || null
}

export async function saveCmsWork(work: CaseStudyRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM work')
  const insertStmt = db.prepare(`
    INSERT INTO work (id, client, title, slug, year, category, featuredImage, featuredImageAlt, shortDescription, status, sortOrder, overview, challenge, solution, results, metrics, seo, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const w of work) {
      insertStmt.run(
        w.id,
        w.client,
        w.title,
        w.slug,
        w.year,
        w.category,
        w.featuredImage || '',
        w.featuredImageAlt || '',
        w.shortDescription,
        w.status,
        w.sortOrder || 1,
        w.overview || '',
        w.challenge || '',
        w.solution || '',
        w.results || '',
        JSON.stringify(w.metrics || []),
        JSON.stringify(w.seo),
        w.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 4. BLOGS
export async function getCmsBlogs(): Promise<BlogPostRecord[]> {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { POSTS_QUERY } = await import('@/sanity/lib/queries')
      const sanityData = await client.fetch(POSTS_QUERY)
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        return sanityData.map((b: any) => ({
          id: b._id || b.id || `blog-${b.slug}`,
          slug: b.slug,
          title: b.title,
          category: b.category || 'Engineering',
          authorName: b.authorName || 'KR Tasker Editorial',
          authorRole: b.authorRole || 'Digital Lead',
          authorImage: b.authorImage || '',
          status: b.status || 'published',
          publishDate: b.publishDate || new Date().toISOString().split('T')[0],
          excerpt: b.excerpt || '',
          readingTime: b.readingTime || '5 min read',
          featuredImage: typeof b.featuredImage === 'string' ? b.featuredImage : '/images/services-grid/seo.png',
          featuredImageAlt: b.featuredImageAlt || b.title,
          content: typeof b.content === 'string' ? b.content : '',
          tags: b.tags || [],
          seo: b.seo || {
            metaTitle: b.title,
            metaDescription: b.excerpt,
            h1: b.title,
            focusKeyword: b.category,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          updatedAt: b._updatedAt || new Date().toISOString(),
        }))
      }
    }
  } catch (err) {
    // Sanity query fallback
  }

  try {
    const stmt = db.prepare('SELECT * FROM blogs ORDER BY publishDate DESC')
    const rows = stmt.all() as any[]
    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category,
      authorName: row.authorName,
      authorRole: row.authorRole,
      authorImage: row.authorImage,
      status: row.status,
      publishDate: row.publishDate,
      excerpt: row.excerpt,
      readingTime: row.readingTime,
      featuredImage: row.featuredImage,
      featuredImageAlt: row.featuredImageAlt,
      content: row.content,
      tags: JSON.parse(row.tags),
      seo: JSON.parse(row.seo),
      updatedAt: row.updatedAt,
    }))
  } catch (err) {
    console.error('getCmsBlogs DB error', err)
    return []
  }
}

export async function saveCmsBlogs(blogs: BlogPostRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM blogs')
  const insertStmt = db.prepare(`
    INSERT INTO blogs (id, slug, title, category, authorName, authorRole, authorImage, status, publishDate, excerpt, readingTime, featuredImage, featuredImageAlt, content, tags, seo, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const b of blogs) {
      insertStmt.run(
        b.id,
        b.slug,
        b.title,
        b.category,
        b.authorName,
        b.authorRole,
        b.authorImage || '',
        b.status,
        b.publishDate,
        b.excerpt,
        b.readingTime,
        b.featuredImage,
        b.featuredImageAlt,
        typeof b.content === 'string' ? b.content : JSON.stringify(b.content),
        JSON.stringify(b.tags || []),
        JSON.stringify(b.seo),
        b.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 5. TEAM
export async function getCmsTeam(): Promise<TeamMemberRecord[]> {
  try {
    const stmt = db.prepare('SELECT * FROM team ORDER BY sortOrder ASC')
    const rows = stmt.all() as any[]
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      photo: row.photo,
      photoAlt: row.photoAlt,
      shortBio: row.shortBio,
      linkedinUrl: row.linkedinUrl,
      twitterUrl: row.twitterUrl,
      sortOrder: row.sortOrder,
      status: row.status,
      updatedAt: row.updatedAt,
    }))
  } catch (err) {
    console.error('getCmsTeam DB error', err)
    return []
  }
}

export async function saveCmsTeam(team: TeamMemberRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM team')
  const insertStmt = db.prepare(`
    INSERT INTO team (id, name, role, photo, photoAlt, shortBio, linkedinUrl, twitterUrl, sortOrder, status, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const t of team) {
      insertStmt.run(
        t.id,
        t.name,
        t.role,
        t.photo,
        t.photoAlt,
        t.shortBio,
        t.linkedinUrl || '',
        t.twitterUrl || '',
        t.sortOrder || 1,
        t.status,
        t.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 6. ENQUIRIES
export async function getCmsEnquiries(): Promise<ContactEnquiryRecord[]> {
  try {
    const stmt = db.prepare('SELECT * FROM enquiries ORDER BY createdAt DESC')
    const rows = stmt.all() as any[]
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      service: row.service,
      budget: row.budget,
      message: row.message,
      status: row.status,
      createdAt: row.createdAt,
    }))
  } catch (err) {
    console.error('getCmsEnquiries DB error', err)
    return []
  }
}

export async function saveCmsEnquiries(enquiries: ContactEnquiryRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM enquiries')
  const insertStmt = db.prepare(`
    INSERT INTO enquiries (id, name, email, phone, service, budget, message, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const e of enquiries) {
      insertStmt.run(
        e.id,
        e.name,
        e.email,
        e.phone || '',
        e.service || '',
        e.budget || '',
        e.message,
        e.status,
        e.createdAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 7. MEDIA
export async function getCmsMedia(): Promise<MediaItemRecord[]> {
  try {
    const stmt = db.prepare('SELECT * FROM media ORDER BY uploadedAt DESC')
    const rows = stmt.all() as any[]
    return rows.map((row) => ({
      id: row.id,
      url: row.url,
      filename: row.filename,
      mimeType: row.mimeType,
      sizeBytes: row.sizeBytes,
      altText: row.altText,
      title: row.title,
      uploadedAt: row.uploadedAt,
    }))
  } catch (err) {
    console.error('getCmsMedia DB error', err)
    return []
  }
}

export async function saveCmsMedia(media: MediaItemRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM media')
  const insertStmt = db.prepare(`
    INSERT INTO media (id, url, filename, mimeType, sizeBytes, altText, title, uploadedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const m of media) {
      insertStmt.run(
        m.id,
        m.url,
        m.filename,
        m.mimeType,
        m.sizeBytes || 0,
        m.altText,
        m.title || '',
        m.uploadedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 8. REDIRECTS
export async function getCmsRedirects(): Promise<RedirectRecord[]> {
  try {
    const stmt = db.prepare('SELECT * FROM redirects ORDER BY updatedAt DESC')
    const rows = stmt.all() as any[]
    return rows.map((row) => ({
      id: row.id,
      sourcePath: row.sourcePath,
      destination: row.destination,
      statusCode: row.statusCode,
      isActive: Boolean(row.isActive),
      updatedAt: row.updatedAt,
    }))
  } catch (err) {
    console.error('getCmsRedirects DB error', err)
    return []
  }
}

export async function saveCmsRedirects(redirects: RedirectRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM redirects')
  const insertStmt = db.prepare(`
    INSERT INTO redirects (id, sourcePath, destination, statusCode, isActive, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const r of redirects) {
      insertStmt.run(
        r.id,
        r.sourcePath,
        r.destination,
        r.statusCode,
        r.isActive ? 1 : 0,
        r.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 9. GLOBAL SECTIONS
export async function getCmsGlobal(): Promise<GlobalSectionsRecord> {
  try {
    const stmt = db.prepare('SELECT data FROM global_sections WHERE id = "main"')
    const row = stmt.get() as any
    if (row && row.data) return JSON.parse(row.data)
  } catch (err) {
    console.error('getCmsGlobal DB error', err)
  }
  return DEFAULT_GLOBAL
}

export async function saveCmsGlobal(globalData: GlobalSectionsRecord): Promise<void> {
  const stmt = db.prepare('INSERT OR REPLACE INTO global_sections (id, data) VALUES ("main", ?)')
  stmt.run(JSON.stringify(globalData))
}

// 10. SEO SETTINGS
export async function getCmsSeo(): Promise<SEOSettingsRecord> {
  try {
    const stmt = db.prepare('SELECT data FROM seo_settings WHERE id = "main"')
    const row = stmt.get() as any
    if (row && row.data) return JSON.parse(row.data)
  } catch (err) {
    console.error('getCmsSeo DB error', err)
  }
  return DEFAULT_SEO
}

export async function saveCmsSeo(seoData: SEOSettingsRecord): Promise<void> {
  const stmt = db.prepare('INSERT OR REPLACE INTO seo_settings (id, data) VALUES ("main", ?)')
  stmt.run(JSON.stringify(seoData))
}

// 11. NAVIGATION MENU
export async function getCmsNavigation(): Promise<NavItemRecord[]> {
  try {
    const stmt = db.prepare('SELECT * FROM navigation ORDER BY sortOrder ASC')
    const rows = stmt.all() as any[]
    if (rows.length > 0) {
      return rows.map((row) => ({
        id: row.id,
        label: row.label,
        href: row.href,
        isExternal: Boolean(row.isExternal),
        isOpenInNewTab: Boolean(row.isOpenInNewTab),
        sortOrder: row.sortOrder,
        isVisible: Boolean(row.isVisible),
      }))
    }
  } catch (err) {
    console.error('getCmsNavigation DB error', err)
  }
  return DEFAULT_NAV
}

export async function saveCmsNavigation(items: NavItemRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM navigation')
  const insertStmt = db.prepare(`
    INSERT INTO navigation (id, label, href, isExternal, isOpenInNewTab, sortOrder, isVisible)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const nav of items) {
      insertStmt.run(
        nav.id,
        nav.label,
        nav.href,
        nav.isExternal ? 1 : 0,
        nav.isOpenInNewTab ? 1 : 0,
        nav.sortOrder || 1,
        nav.isVisible ? 1 : 0
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}
